import { Metadata } from "next"
import { ChatInterface } from "@/components/chat/chat-interface"

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "Chat with your AI scheduling assistant",
}

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">AI Assistant</h1>
          </div>
          <div className="ml-auto">
            <p className="text-sm text-muted-foreground">
              Chat with your AI assistant to manage bookings, customers, and equipment easily.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Interface - Takes remaining space */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  )
} 