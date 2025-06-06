import { Metadata } from "next"
import { ChatInterface } from "@/components/chat/chat-interface"

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "Chat with your AI scheduling assistant",
}

export default function ChatPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Assistant</h2>
        <p className="text-muted-foreground">
          Manage your schedules, customers, and equipment through natural language
        </p>
      </div>
      
      <div className="grid gap-4">
        <ChatInterface />
      </div>
      
      {/* Quick Actions Panel */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Example Commands</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• "Book Camera A for John Smith next Monday"</p>
            <p>• "Check availability for this Friday"</p>
            <p>• "Add new customer Jane Doe"</p>
            <p>• "Update Camera B daily rate to $150"</p>
          </div>
        </div>
        
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Booking Management</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Create new bookings</p>
            <p>• Reschedule existing bookings</p>
            <p>• Cancel or modify bookings</p>
            <p>• Check equipment availability</p>
          </div>
        </div>
        
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Customer & Equipment</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Add or update customers</p>
            <p>• Search customer history</p>
            <p>• Manage equipment catalog</p>
            <p>• Update pricing and availability</p>
          </div>
        </div>
      </div>
    </div>
  )
} 