import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/common/navbar"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
