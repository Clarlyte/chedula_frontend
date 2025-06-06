import Link from "next/link"
import { Camera, Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-gold-700/20">
      <div className="responsive-container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="footer-section space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 group">
              <Camera className="h-6 w-6 text-gold-400 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-xl font-bold">
                Rent n&apos; <span className="text-gold-400">Snap</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Streamline your business with our powerful ai-booking platform.
            </p>
            <div className="flex space-x-6 justify-center sm:justify-start">
              <a href="#" className="footer-social-icon">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="footer-social-icon">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="footer-social-icon">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="footer-section space-y-4 text-center sm:text-left">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="footer-link">Features</a>
              </li>
              <li>
                <a href="#how-it-works" className="footer-link">How It Works</a>
              </li>
              <li>
                <a href="#testimonials" className="footer-link">Testimonials</a>
              </li>
              <li>
                <a href="#pricing" className="footer-link">Pricing</a>
              </li>
            </ul>
          </div>
          <div className="footer-section space-y-4 text-center sm:text-left">
            <h3 className="footer-heading">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="footer-link">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="footer-link">Terms of Service</Link>
              </li>
              <li>
                <Link href="/legal/cookie-policy" className="footer-link">Cookie Policy</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section space-y-4 text-center sm:text-left">
            <h3 className="footer-heading">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:chedula.ph@gmail.com" className="footer-contact-info inline-block">
                  chedula.ph@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+639641412274" className="footer-contact-info inline-block">
                  +639641412274
                </a>
              </li>
              <li className="footer-contact-info inline-block">
                Gorordo Avenue, Lahug<br />
                Cebu City, 6000
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center w-full sm:text-left sm:w-auto">
              © {new Date().getFullYear()} Rent n&apos; Snap. All rights reserved.
            </p>
            <div className="flex items-center justify-center sm:justify-end gap-6 w-full sm:w-auto">
              <Link href="/privacy" className="footer-link">Privacy</Link>
              <Link href="/terms" className="footer-link">Terms</Link>
              <a href="#" className="footer-link">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 