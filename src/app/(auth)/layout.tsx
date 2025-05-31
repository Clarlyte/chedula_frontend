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
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  )
} 