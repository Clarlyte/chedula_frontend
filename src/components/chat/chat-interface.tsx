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
  const { user } = useAuth()
  const { supabase } = useSupabase()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected')
  const [actionFeedbacks, setActionFeedbacks] = useState<ActionFeedback[]>([])
  
  const ws = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const connectWebSocket = useCallback(async () => {
    if (!user) return

    try {
      setConnectionStatus('connecting')
      
      // Get WebSocket URL (adjust based on your backend URL)
      const wsUrl = process.env.NODE_ENV === 'production' 
        ? 'wss://your-backend-domain.com/ws/chat/'
        : 'ws://localhost:8000/ws/chat/'

      ws.current = new WebSocket(wsUrl)

      ws.current.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        setConnectionStatus('connected')
        
        // Authenticate after connection
        authenticateWebSocket()
      }

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          handleWebSocketMessage(data)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      ws.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason)
        setIsConnected(false)
        setIsAuthenticated(false)
        setConnectionStatus('disconnected')
        
        // Attempt to reconnect after 3 seconds
        if (!event.wasClean) {
          reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000)
        }
      }

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        setConnectionStatus('error')
      }

    } catch (error) {
      console.error('Error connecting to WebSocket:', error)
      setConnectionStatus('error')
    }
  }, [user])

  const authenticateWebSocket = async () => {
    if (!ws.current || !user) return

    try {
      // Get current session token
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.access_token) {
        ws.current.send(JSON.stringify({
          type: 'authenticate',
          token: session.access_token
        }))
      }
    } catch (error) {
      console.error('Error authenticating WebSocket:', error)
    }
  }

  const handleWebSocketMessage = (data: any) => {
    switch (data.type) {
      case 'connection.established':
        console.log('Connection established:', data.message)
        break

      case 'authentication.success':
        console.log('Authentication successful')
        setIsAuthenticated(true)
        // Load chat history
        loadChatHistory()
        break

      case 'chat.response':
        // Add AI response to messages
        const aiMessage: ChatMessage = {
          id: data.ai_message_id || Date.now().toString(),
          sender_type: 'ai',
          content: data.message,
          timestamp: data.timestamp,
          status: 'processed',
          metadata: data.metadata
        }
        setMessages(prev => [...prev, aiMessage])
        setIsTyping(false)
        break

      case 'ai.typing':
        setIsTyping(data.status)
        break

      case 'action.feedback':
        // Handle action feedback
        const feedback: ActionFeedback = {
          action_id: data.action_id,
          status: data.status,
          message: data.message,
          result: data.result
        }
        setActionFeedbacks(prev => [...prev, feedback])
        break

      case 'chat.history':
        // Load historical messages
        setMessages(data.messages.map((msg: any) => ({
          id: msg.id.toString(),
          sender_type: msg.sender_type,
          content: msg.content,
          timestamp: msg.timestamp,
          status: msg.status,
          metadata: msg.metadata
        })))
        break

      case 'error':
        console.error('WebSocket error:', data.error)
        // You could show a toast notification here
        break

      case 'pong':
        // Handle keepalive response
        break

      default:
        console.log('Unknown message type:', data.type)
    }
  }

  const loadChatHistory = () => {
    if (!ws.current || !isAuthenticated) return

    ws.current.send(JSON.stringify({
      type: 'get_history',
      limit: 50
    }))
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !ws.current || !isAuthenticated) return

    const messageContent = inputMessage.trim()
    setInputMessage("")

    // Add user message to UI immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender_type: 'user',
      content: messageContent,
      timestamp: new Date().toISOString(),
      status: 'sent'
    }
    setMessages(prev => [...prev, userMessage])

    // Send message via WebSocket
    ws.current.send(JSON.stringify({
      type: 'chat.message',
      message: messageContent
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Connect on component mount
  useEffect(() => {
    if (user) {
      connectWebSocket()
    }

    // Cleanup on unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [user, connectWebSocket])

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'bg-green-500'
      case 'connecting': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return isAuthenticated ? 'Connected' : 'Authenticating...'
      case 'connecting': return 'Connecting...'
      case 'error': return 'Connection Error'
      default: return 'Disconnected'
    }
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
          <p className="text-muted-foreground">Please sign in to use the AI Assistant</p>
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
            {messages.length === 0 && isAuthenticated && (
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
                      : 'bg-muted'
                  }`}>
                    {message.sender_type === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>

                  <div className={`rounded-lg px-3 py-2 ${
                    message.sender_type === 'user'
                      ? 'bg-primary text-primary-foreground'
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

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">AI is typing...</span>
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
                isAuthenticated 
                  ? "Type your message... (e.g., 'Book Camera A for John next Monday')"
                  : "Connecting to AI Assistant..."
              }
              disabled={!isAuthenticated}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage}
              disabled={!inputMessage.trim() || !isAuthenticated}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {!isConnected && (
            <p className="text-xs text-muted-foreground mt-2">
              Reconnecting to AI Assistant...
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 