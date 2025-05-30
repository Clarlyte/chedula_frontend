import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with your AI assistant",
}

export default function ChatPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Chat</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          {/* Chat interface will go here */}
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Chat interface coming soon...
            </p>
          </div>
        </div>
        <div className="col-span-3">
          {/* Chat history or additional info will go here */}
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Chat history coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 