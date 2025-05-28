'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export function Navbar() {
  const scrollToSection = useSmoothScroll()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="responsive-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-gold-400 interactive-icon" />
          <span className="text-lg sm:text-xl font-bold">
            Chedula
          </span>
        </Link>
        <nav className="hidden md:flex gap-4 lg:gap-6">
          <a 
            href="#features" 
            onClick={(e) => handleNavClick(e, 'features')}
            className="text-sm md:text-base font-medium hover:text-gold-400 transition-colors cursor-pointer"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => handleNavClick(e, 'how-it-works')}
            className="text-sm md:text-base font-medium hover:text-gold-400 transition-colors cursor-pointer"
          >
            How It Works
          </a>
          <a 
            href="#testimonials" 
            onClick={(e) => handleNavClick(e, 'testimonials')}
            className="text-sm md:text-base font-medium hover:text-gold-400 transition-colors cursor-pointer"
          >
            Testimonials
          </a>
          <a 
            href="#pricing" 
            onClick={(e) => handleNavClick(e, 'pricing')}
            className="text-sm md:text-base font-medium hover:text-gold-400 transition-colors cursor-pointer"
          >
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 interactive-icon" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l border-gold-700/30 w-[280px] sm:w-[320px]">
              <div className="flex flex-col gap-4 sm:gap-6 mt-8">
                <a 
                  href="#features" 
                  onClick={(e) => handleNavClick(e, 'features')}
                  className="text-base font-medium hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => handleNavClick(e, 'how-it-works')}
                  className="text-base font-medium hover:text-gold-400 transition-colors cursor-pointer"
                >
                  How It Works
                </a>
                <a 
                  href="#testimonials" 
                  onClick={(e) => handleNavClick(e, 'testimonials')}
                  className="text-base font-medium hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Testimonials
                </a>
                <a 
                  href="#pricing" 
                  onClick={(e) => handleNavClick(e, 'pricing')}
                  className="text-base font-medium hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Pricing
                </a>
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full text-sm">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full gold-gradient text-sm">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/login" className="hidden md:block">
            <Button variant="outline" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 text-sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup" className="hidden md:block">
            <Button className="gold-gradient hover:opacity-90 transition-opacity text-sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 