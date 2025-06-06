"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Send, MessageSquare, Loader2, CheckCircle, AlertCircle, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { useSupabase } from "@/components/providers/supabase-provider"

interface ChatMessage {
  id: string
  sender_type: 'user' | 'ai' | 'system'
  content: string
  timestamp: string
  status?: 'sent' | 'processing' | 'processed' | 'failed'
  metadata?: {
    processing_time_ms?: number
    entities?: any[]
    actions_count?: number
  }
}

interface ActionFeedback {
  action_id: string
  status: 'completed' | 'failed' | 'pending_confirmation'
  message: string
  result?: any
}

export function ChatInterface() {
  const { user, getToken, authLoading } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [actionFeedbacks, setActionFeedbacks] = useState<ActionFeedback[]>([])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // API helper function with improved error handling
  const makeAPIRequest = async (endpoint: string, options: RequestInit = {}) => {
    try {
      const token = await getToken()
      
      if (!token) {
        throw new Error('Authentication required - please refresh the page')
      }

      const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://your-backend-domain.com' : 'http://localhost:8000'}/api/v1/ai/${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Initialize connection and load chat history
  const initializeChat = useCallback(async () => {
    if (!user || authLoading) return

    try {
      setIsLoading(true)
      
      // Wait a bit for Supabase session to be fully ready
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Test connection
      await makeAPIRequest('test/')
      setIsConnected(true)

      // Create or get session
      if (!sessionId) {
        const sessionData = await makeAPIRequest('chat/session/', {
          method: 'POST'
        })
        setSessionId(sessionData.session_id)
      }

      // Load chat history
      const historyData = await makeAPIRequest(`chat/history/?limit=50${sessionId ? `&session_id=${sessionId}` : ''}`)
      setMessages(historyData.messages.map((msg: any) => ({
        id: msg.id,
        sender_type: msg.sender_type,
        content: msg.content,
        timestamp: msg.timestamp,
        status: 'processed',
        metadata: msg.metadata
      })))

    } catch (error) {
      console.error('Error initializing chat:', error)
      setIsConnected(false)
    } finally {
      setIsLoading(false)
    }
  }, [user, sessionId, getToken, authLoading])

  // Send message to AI
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return

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
      // Send message to API
      const response = await makeAPIRequest('chat/send/', {
        method: 'POST',
        body: JSON.stringify({
          message: messageContent,
          session_id: sessionId
        })
      })

      if (response.success) {
        // Add AI response to messages
        const aiMessage: ChatMessage = {
          id: response.ai_response.id,
          sender_type: 'ai',
          content: response.ai_response.content,
          timestamp: response.ai_response.timestamp,
          status: 'processed',
          metadata: response.ai_response.metadata
        }
        setMessages(prev => [...prev, aiMessage])

        // Handle any actions
        if (response.actions && response.actions.length > 0) {
          const newFeedbacks: ActionFeedback[] = response.actions.map((action: any) => ({
            action_id: action.action_id || Date.now().toString(),
            status: action.status || 'completed',
            message: action.message || 'Action completed',
            result: action.result
          }))
          setActionFeedbacks(prev => [...prev, ...newFeedbacks])
        }

        // Update session ID if provided
        if (response.session_id) {
          setSessionId(response.session_id)
        }
      }

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
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Initialize on mount
  useEffect(() => {
    if (user && !authLoading) {
      // Small delay to ensure UI is ready
      const timer = setTimeout(() => {
        initializeChat()
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [user, authLoading, initializeChat])

  const getConnectionStatusColor = () => {
    if (isLoading) return 'bg-yellow-500'
    return isConnected ? 'bg-green-500' : 'bg-red-500'
  }

  const getConnectionStatusText = () => {
    if (isLoading) return 'Loading...'
    return isConnected ? 'Connected' : 'Disconnected'
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (!user) {
    return (
      <Card className="w-full h-[600px] flex items-center justify-center">
        <CardContent>
          <div className="text-center">
            <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">Please sign in to use the AI Assistant</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show loading state while auth is loading or initializing
  if (authLoading || (user && isLoading && messages.length === 0)) {
    return (
      <Card className="w-full h-[600px] flex items-center justify-center">
        <CardContent>
          <div className="text-center">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin" />
            <p className="text-muted-foreground">
              {authLoading ? 'Loading authentication...' : 'Connecting to AI Assistant...'}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Assistant
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getConnectionStatusColor()}`} />
          <span className="text-sm text-muted-foreground">
            {getConnectionStatusText()}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && isConnected && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Hi! I'm your AI scheduling assistant.</p>
                <p className="text-sm">Try saying: "Schedule Camera A for John Smith next Monday"</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${
                  message.sender_type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
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

                  <div className={`rounded-lg px-3 py-2 ${
                    message.sender_type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : message.sender_type === 'system'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
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

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Feedbacks */}
            {actionFeedbacks.map((feedback) => (
              <div key={feedback.action_id} className="flex justify-center">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                  feedback.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : feedback.status === 'failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {feedback.status === 'completed' ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : feedback.status === 'failed' ? (
                    <AlertCircle className="h-3 w-3" />
                  ) : (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  )}
                  {feedback.message}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isConnected 
                  ? "Type your message... (e.g., 'Book Camera A for John next Monday')"
                  : "Connecting to AI Assistant..."
              }
              disabled={!isConnected || isLoading}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage}
              disabled={!inputMessage.trim() || !isConnected || isLoading}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {!isConnected && !isLoading && (
            <div className="mt-2">
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
      </CardContent>
    </Card>
  )
} 