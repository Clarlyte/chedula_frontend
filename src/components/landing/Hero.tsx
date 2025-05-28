"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VideoModal } from "./VideoModal"
import { useState } from "react"

export const Hero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <section className="responsive-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-900/20 via-background to-background"></div>
      <div className="responsive-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-sm text-gold-500 w-fit mx-auto lg:mx-0">
              <span className="font-medium">Premium Booking System</span>
            </div>
            <div className="space-y-2">
              <h1 className="responsive-heading font-bold tracking-tighter">
                Streamline Your <span className="text-gold-400">Business Booking</span> Process
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                Manage reservations, generate contracts, and verify customers - all in one place. Perfect for camera
                services in the Philippines.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full gold-gradient hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10"
                onClick={() => setIsVideoModalOpen(true)}
              >
                View Demo
              </Button>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 opacity-30 blur-xl"></div>
            <video
              className="relative rounded-lg object-cover border border-gold-500/20 shadow-lg w-full aspect-video"
              playsInline
              muted
              loop
              autoPlay
              preload="auto"
            >
              <source src="/demo/tutorial.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </section>
  )
} 