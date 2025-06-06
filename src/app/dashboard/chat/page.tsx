import { Metadata } from "next"
import { ChatInterface } from "@/components/chat/chat-interface"

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "Chat with your AI scheduling assistant",
}

export default function ChatPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">
          Chat with your AI assistant to manage bookings, customers, and equipment easily.
        </p>
      </div>

      <div className="grid gap-6">
        <ChatInterface />
        
        {/* Quick Start Guide */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold mb-3">Quick Start Guide</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">📅 Booking Commands</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>"Schedule Camera A for John Smith next Monday"</li>
                <li>"Book Lens Kit for 3 days starting tomorrow"</li>
                <li>"Cancel booking #123"</li>
                <li>"Extend rental until Friday"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">👥 Customer Management</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>"Add customer Jane Doe, email jane@example.com"</li>
                <li>"Update John's phone number to 555-1234"</li>
                <li>"Show me John's booking history"</li>
                <li>"Create customer profile for new client"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">📋 Equipment Queries</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>"What cameras are available next week?"</li>
                <li>"Check Camera B availability"</li>
                <li>"Show all equipment status"</li>
                <li>"When is the next available slot for Camera A?"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">ℹ️ General Help</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>"Help me schedule a rental"</li>
                <li>"What can you do?"</li>
                <li>"Show today's schedule"</li>
                <li>"Generate daily report"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 