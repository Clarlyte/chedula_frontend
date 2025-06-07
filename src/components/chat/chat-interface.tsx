"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Send, MessageSquare, Loader2, CheckCircle, AlertCircle, User, Bot, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { useData } from "@/components/providers/data-provider"
import { createAIAssistantWebSocket, type ChatMessage } from "@/lib/websocket"

interface ActionFeedback {
  action_id: string
  status: 'completed' | 'failed' | 'pending_confirmation'
  message: string
  result?: any
}

interface ChatInterfaceProps {
  onCalendarUpdate?: () => void // Callback for when calendar should refresh
}

export function ChatInterface({ onCalendarUpdate }: ChatInterfaceProps) {
  const { user, getToken, authLoading } = useAuth()
  const { refreshAll, refreshCustomers, refreshServices, refreshBookings, refreshCalendar } = useData()
  
  // Load persisted session state on mount
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('chat-messages')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [actionFeedbacks, setActionFeedbacks] = useState<ActionFeedback[]>([])
  const [shownActionIds, setShownActionIds] = useState<Set<string>>(new Set())
  const [sessionId, setSessionId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('chat-session-id')
    }
    return null
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<ReturnType<typeof createAIAssistantWebSocket> | null>(null)
  const initializedRef = useRef(false)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Persist messages to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chat-messages', JSON.stringify(messages))
    }
  }, [messages])

  // Persist session ID to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionId) {
        sessionStorage.setItem('chat-session-id', sessionId)
      } else {
        sessionStorage.removeItem('chat-session-id')
      }
    }
  }, [sessionId])

  // Function to start a new chat session (only on logout)
  const startNewSession = useCallback(() => {
    console.log('Clearing chat session due to logout')
    
    // Clear persisted session data
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('chat-messages')
      sessionStorage.removeItem('chat-session-id')
    }
    
    // Reset all state for new session
    setMessages([])
    setActionFeedbacks([])
    setShownActionIds(new Set())
    setSessionId(null)
    setIsTyping(false)
    
    // Disconnect existing WebSocket if any
    if (wsRef.current) {
      wsRef.current.disconnect()
      wsRef.current = null
    }
    
    // Reset connection state
    setIsConnected(false)
    setIsLoading(false)
  }, [])

  // Initialize WebSocket connection
  const initializeChat = useCallback(async () => {
    if (!user || authLoading) return
    
    // Disconnect existing connection if any before creating new one
    if (wsRef.current) {
      wsRef.current.disconnect()
      wsRef.current = null
    }

    try {
      setIsLoading(true)
      
      // Only reset session state if this is a completely new session (no existing messages)
      // This allows the session to persist when navigating between pages
      if (messages.length === 0) {
        console.log('Starting fresh AI chat session...')
        setActionFeedbacks([])
        setShownActionIds(new Set())
        setSessionId(null)
        setIsTyping(false)
      } else {
        console.log('Reconnecting to existing AI chat session...')
      }
      
      // Get authentication token
      const token = await getToken()
      if (!token) {
        throw new Error('Authentication required - please refresh the page')
      }

      // Create WebSocket connection
      const ws = createAIAssistantWebSocket()
      wsRef.current = ws

      // Set up event listeners
      ws.on('connection.established', () => {
        console.log('WebSocket connected, authenticating...')
        ws.authenticate(token)
      })

      ws.on('authentication.success', (data) => {
        console.log('WebSocket authenticated successfully:', data)
        setIsConnected(true)
        setIsLoading(false)
        // Don't load chat history - start fresh session
        console.log('Ready for new chat session')
      })

      ws.on('chat.history', (data) => {
        console.log('Received chat history:', data)
        // Only set messages if we actually requested history
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages)
        }
      })

      ws.on('chat.response', (data) => {
        console.log('Received AI response:', data)
        
        // Add AI message
        const aiMessage: ChatMessage = {
          id: data.ai_message_id || Date.now().toString(),
          sender_type: 'ai',
          content: data.message,
          timestamp: data.timestamp,
          status: 'processed',
          metadata: data.metadata
        }
        
        setMessages(prev => [...prev, aiMessage])
        setIsLoading(false)
        setIsTyping(false)
        
        // Trigger global data refresh and calendar callback
        refreshAll()
        if (onCalendarUpdate) {
          onCalendarUpdate()
        }
      })

      ws.on('ai.typing', (data) => {
        setIsTyping(data.status)
      })

      ws.on('action.feedback', (data) => {
        const actionId = data.action_id || Date.now().toString()
        
        // Skip if we've already shown feedback for this action
        setShownActionIds(prev => {
          if (prev.has(actionId)) {
            return prev
          }
          
          const feedback: ActionFeedback = {
            action_id: actionId,
            status: data.status || 'completed',
            message: data.message || 'Action completed',
            result: data.result
          }
          setActionFeedbacks(feedbackPrev => [...feedbackPrev, feedback])
          
          return new Set(Array.from(prev).concat([actionId]))
        })
      })

      // Listen for AI actions completion
      ws.on('ai.action.completed', (action) => {
        console.log('AI action completed:', action)
        
        const actionId = action.action_id
        
        // Skip if we've already shown feedback for this action
        setShownActionIds(prev => {
          if (prev.has(actionId)) {
            // Still trigger data refresh even if we skip the feedback
            if (action.action_type === 'create_booking' || action.action_type === 'update_booking' || action.action_type === 'cancel_booking') {
              refreshBookings()
              refreshCalendar()
            } else if (action.action_type === 'create_customer' || action.action_type === 'update_customer') {
              refreshCustomers()
            } else if (action.action_type === 'create_service' || action.action_type === 'update_service') {
              refreshServices()
            }
            
            if (onCalendarUpdate && ['create_booking', 'update_booking', 'cancel_booking'].includes(action.action_type)) {
              onCalendarUpdate()
            }
            
            return prev
          }
          
          let actionMessage = 'Action completed successfully'
          if (action.action_type === 'create_booking') {
            actionMessage = `✅ Booking created: ${action.result?.title || 'New booking'}`
            refreshBookings()
            refreshCalendar()
          } else if (action.action_type === 'update_booking') {
            actionMessage = `✅ Booking updated: ${action.result?.title || 'Booking'}`
            refreshBookings()
            refreshCalendar()
          } else if (action.action_type === 'cancel_booking') {
            actionMessage = `❌ Booking cancelled: ${action.result?.title || 'Booking'}`
            refreshBookings()
            refreshCalendar()
          } else if (action.action_type === 'create_customer') {
            actionMessage = `👤 Customer created: ${action.result?.full_name || action.result?.first_name || 'New customer'}`
            refreshCustomers()
          } else if (action.action_type === 'update_customer') {
            actionMessage = `👤 Customer updated: ${action.result?.full_name || action.result?.first_name || 'Customer'}`
            refreshCustomers()
          } else if (action.action_type === 'create_service') {
            actionMessage = `🔧 Service created: ${action.result?.name || 'New service'}`
            refreshServices()
          } else if (action.action_type === 'update_service') {
            actionMessage = `🔧 Service updated: ${action.result?.name || 'Service'}`
            refreshServices()
          }

          const feedback: ActionFeedback = {
            action_id: actionId,
            status: 'completed',
            message: actionMessage,
            result: action.result
          }
          setActionFeedbacks(feedbackPrev => [...feedbackPrev, feedback])
          
          // Call calendar update callback for booking-related actions
          if (onCalendarUpdate && ['create_booking', 'update_booking', 'cancel_booking'].includes(action.action_type)) {
            onCalendarUpdate()
          }
          
          return new Set(Array.from(prev).concat([actionId]))
        })
      })

      // Listen for AI action failures
      ws.on('ai.action.failed', (action) => {
        console.error('AI action failed:', action)
        
        const actionId = action.action_id
        
        // Skip if we've already shown feedback for this action
        setShownActionIds(prev => {
          if (prev.has(actionId)) {
            return prev
          }
          
          const feedback: ActionFeedback = {
            action_id: actionId,
            status: 'failed',
            message: `❌ Failed to ${action.action_type.replace('_', ' ')}: ${action.error}`,
            result: null
          }
          setActionFeedbacks(feedbackPrev => [...feedbackPrev, feedback])
          
          return new Set(Array.from(prev).concat([actionId]))
        })
      })

      ws.on('error', (data) => {
        console.error('WebSocket error:', data)
        const errorMessage: ChatMessage = {
          id: Date.now().toString(),
          sender_type: 'system',
          content: `Error: ${data.error}`,
          timestamp: new Date().toISOString(),
          status: 'failed'
        }
        setMessages(prev => [...prev, errorMessage])
        setIsLoading(false)
        setIsTyping(false)
      })

      ws.on('connection.closed', () => {
        console.log('WebSocket connection closed')
        setIsConnected(false)
      })

      ws.on('connection.error', (data) => {
        console.error('WebSocket connection error:', data)
        setIsConnected(false)
      })

      // Connect to WebSocket
      await ws.connect()

    } catch (error) {
      console.error('Error initializing chat:', error)
      setIsConnected(false)
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        sender_type: 'system',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to connect to AI Assistant'}`,
        timestamp: new Date().toISOString(),
        status: 'failed'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [user, getToken, authLoading, onCalendarUpdate, refreshAll, refreshCustomers, refreshServices, refreshBookings, refreshCalendar])

  // Send message via WebSocket
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user || !wsRef.current || !isConnected) return

    const messageContent = inputMessage.trim()
    setInputMessage("")
    setIsLoading(true)

    // Add user message to UI immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender_type: 'user',
      content: messageContent,
      timestamp: new Date().toISOString(),
      status: 'sent'
    }
    setMessages(prev => [...prev, userMessage])

    try {
      // Send message via WebSocket
      wsRef.current.sendMessage(messageContent)
      
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender_type: 'system',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to send message'}`,
        timestamp: new Date().toISOString(),
        status: 'failed'
      }
      setMessages(prev => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Initialize on mount - connect immediately
  useEffect(() => {
    if (user && !authLoading) {
      // Always try to initialize/reconnect when component mounts and user is available
      const timer = setTimeout(() => {
        initializeChat()
      }, 100)
      
      // Mark as initialized after first successful connection
      if (!initializedRef.current) {
        initializedRef.current = true
      }
      
      return () => clearTimeout(timer)
    }
  }, [user, authLoading, initializeChat])

  // Reset session when user logs out (only after being logged in)
  useEffect(() => {
    // Only reset if user was previously logged in and now is logged out
    if (!user && initializedRef.current) {
      console.log('User logged out, resetting chat session')
      initializedRef.current = false
      startNewSession()
    }
  }, [user, startNewSession])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect()
        wsRef.current = null
      }
    }
  }, [])

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">Please sign in to use the AI Assistant</p>
        </div>
      </div>
    )
  }

  // Show loading state only when really needed
  if (authLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    )
  }

  // Show minimal loading for connection
  if (user && isLoading && !isConnected && messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Connecting to AI Assistant...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Status indicator - top right */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border rounded-full px-3 py-1 text-sm">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-muted-foreground">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Messages area or welcome screen */}
      <div className="flex-1 overflow-hidden">
        {messages.length === 0 && isConnected ? (
          // Welcome screen
          <div className="h-full flex flex-col items-center justify-center px-4 w-full">
            <div className="text-center w-full max-w-6xl mx-auto">
              <h1 className="text-3xl font-semibold mb-6">What can I help with?</h1>
              
              <div className="mb-8 text-muted-foreground">
                <p className="mb-4">I'm your AI scheduling assistant for camera rental and equipment management.</p>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground">📅 Booking Commands</h3>
                    <div className="space-y-1">
                      <p>"Schedule Camera A for John Smith next Monday"</p>
                      <p>"Book the Red Camera for Sarah Johnson tomorrow"</p>
                      <p>"Cancel booking #123"</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground">👥 Customer Management</h3>
                    <div className="space-y-1">
                      <p>"Add customer Jane Doe, email jane@example.com"</p>
                      <p>"Show me John's booking history"</p>
                      <p>"Update John's phone number to 555-1234"</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground">🔧 Equipment Queries</h3>
                    <div className="space-y-1">
                      <p>"What cameras are available next week?"</p>
                      <p>"Check Camera B availability"</p>
                      <p>"Show all equipment status"</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground">ℹ️ General Help</h3>
                    <div className="space-y-1">
                      <p>"Help me schedule a rental"</p>
                      <p>"What can you do?"</p>
                      <p>"Show today's schedule"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Messages area
          <ScrollArea className="h-full w-full">
            <div className="w-full px-4 py-8">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-3 max-w-[80%] ${
                      message.sender_type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.sender_type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : message.sender_type === 'system'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-muted'
                      }`}>
                        {message.sender_type === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : message.sender_type === 'system' ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>

                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender_type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : message.sender_type === 'system'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-muted'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">
                            {formatTimestamp(message.timestamp)}
                          </span>
                          {message.metadata?.actions_count && message.metadata.actions_count > 0 && (
                            <Badge variant="secondary" className="text-xs ml-2">
                              {message.metadata.actions_count} action{message.metadata.actions_count > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-muted-foreground">AI is typing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Feedbacks */}
                {actionFeedbacks.map((feedback) => (
                  <div key={feedback.action_id} className="flex justify-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                      feedback.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : feedback.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feedback.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : feedback.status === 'failed' ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      {feedback.message}
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Fixed input area at bottom */}
      <div className="border-t bg-background p-4 w-full">
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isConnected 
                  ? "Ask anything..."
                  : "Connecting to AI Assistant..."
              }
              disabled={!isConnected || isLoading}
              className="pr-20 py-3 text-base rounded-3xl border-2 focus:border-primary"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                disabled
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                onClick={sendMessage}
                disabled={!inputMessage.trim() || !isConnected || isLoading}
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {!isConnected && !isLoading && (
            <div className="mt-2 text-center">
              <p className="text-xs text-red-600">
                Failed to connect to AI Assistant.
              </p>
              <button 
                onClick={() => initializeChat()}
                className="text-xs text-blue-600 hover:underline mt-1"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 