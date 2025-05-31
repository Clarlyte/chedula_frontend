import Link from "next/link"
import Image from "next/image"

export function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-0 group">
          <Image 
            src="/images/logo.svg" 
            alt="Chedula Logo" 
            width={50} 
            height={50} 
            className="h-14 w-14 sm:h-16 sm:w-16 interactive-icon"
          />
          <span className="text-lg sm:text-xl font-bold">
            Chedula
          </span>
        </Link>
      </div>
    </header>
  )
} 