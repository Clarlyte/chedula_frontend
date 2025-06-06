import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms for Chedula",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
} 