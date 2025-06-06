import type { User } from "@supabase/supabase-js"

export interface ChatMessage {
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

export interface WebSocketMessage {
  type: string
  [key: string]: any
}

export interface WebSocketConfig {
  url: string
  reconnectDelay?: number
  maxReconnectAttempts?: number
  pingInterval?: number
}

export class AIAssistantWebSocket {
  private ws: WebSocket | null = null
  private config: WebSocketConfig
  private listeners: Map<string, ((data: any) => void)[]> = new Map()
  private reconnectAttempts = 0
  private reconnectTimeout: NodeJS.Timeout | null = null
  private pingInterval: NodeJS.Timeout | null = null
  private isAuthenticated = false
  
  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectDelay: 3000,
      maxReconnectAttempts: 5,
      pingInterval: 30000,
      ...config
    }
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.config.url)

        this.ws.onopen = () => {
          console.log('AI Assistant WebSocket connected')
          this.reconnectAttempts = 0
          this.startPing()
          this.emit('connection.established', { connected: true })
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            this.handleMessage(data)
          } catch (error) {
            console.error('Error parsing WebSocket message:', error)
          }
        }

        this.ws.onclose = (event) => {
          console.log('AI Assistant WebSocket disconnected:', event.code, event.reason)
          this.isAuthenticated = false
          this.stopPing()
          this.emit('connection.closed', { 
            code: event.code, 
            reason: event.reason,
            wasClean: event.wasClean
          })

          // Attempt to reconnect
          if (!event.wasClean && this.reconnectAttempts < (this.config.maxReconnectAttempts || 5)) {
            this.scheduleReconnect()
          }
        }

        this.ws.onerror = (error) => {
          console.error('AI Assistant WebSocket error:', error)
          this.emit('connection.error', { error })
          reject(error)
        }

      } catch (error) {
        reject(error)
      }
    })
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }
    
    this.stopPing()
    
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect')
      this.ws = null
    }
  }

  authenticate(token: string): void {
    this.send({
      type: 'authenticate',
      token
    })
  }

  sendMessage(message: string): void {
    this.send({
      type: 'chat.message',
      message
    })
  }

  getChatHistory(limit: number = 50): void {
    this.send({
      type: 'get_history',
      limit
    })
  }

  private send(data: WebSocketMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.warn('WebSocket not connected, message not sent:', data)
    }
  }

  private handleMessage(data: WebSocketMessage): void {
    // Handle authentication success
    if (data.type === 'authentication.success') {
      this.isAuthenticated = true
    }

    // Emit to all listeners for this message type
    this.emit(data.type, data)
  }

  private scheduleReconnect(): void {
    this.reconnectAttempts++
    const delay = Math.min(
      this.config.reconnectDelay! * Math.pow(2, this.reconnectAttempts - 1),
      30000 // Max 30 seconds
    )

    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`)
    
    this.reconnectTimeout = setTimeout(() => {
      this.connect().catch(error => {
        console.error('Reconnection failed:', error)
      })
    }, delay)
  }

  private startPing(): void {
    if (this.config.pingInterval) {
      this.pingInterval = setInterval(() => {
        this.send({ type: 'ping' })
      }, this.config.pingInterval)
    }
  }

  private stopPing(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
      this.pingInterval = null
    }
  }

  // Event listener methods
  on(event: string, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  off(event: string, callback: (data: any) => void): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      const index = eventListeners.indexOf(callback)
      if (index > -1) {
        eventListeners.splice(index, 1)
      }
    }
  }

  private emit(event: string, data: any): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data))
    }
  }

  // Getters
  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }

  get isAuthenticatedConnection(): boolean {
    return this.isConnected && this.isAuthenticated
  }

  get connectionState(): string {
    if (!this.ws) return 'disconnected'
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING: return 'connecting'
      case WebSocket.OPEN: return 'connected'
      case WebSocket.CLOSING: return 'closing'
      case WebSocket.CLOSED: return 'disconnected'
      default: return 'unknown'
    }
  }
}

// Factory function to create WebSocket instance
export function createAIAssistantWebSocket(): AIAssistantWebSocket {
  const wsUrl = process.env.NODE_ENV === 'production'
    ? 'wss://your-backend-domain.com/ws/chat/'
    : 'ws://localhost:8000/ws/chat/'

  return new AIAssistantWebSocket({
    url: wsUrl,
    reconnectDelay: 3000,
    maxReconnectAttempts: 5,
    pingInterval: 30000
  })
} 