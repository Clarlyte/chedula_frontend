import Image from "next/image"
import { TestimonialCard } from "@/components/ui/TestimonialCard"

const testimonials = [
  {
    name: "Maria Santos",
    role: "Owner, PixelPerfect Rentals",
    image: "/testimonials/maria-santos.jpg",
    quote:
      "Since implementing Rent n' Snap, our booking errors have decreased by 95%. The digital contracts and ID verification have saved us countless hours of paperwork.",
    rating: 5,
  },
  {
    name: "Juan Reyes",
    role: "Manager, Manila Camera Hub",
    image: "/testimonials/juan-reyes.png",
    quote:
      "The scheduling system is flawless. We can now manage multiple locations from a single dashboard, and our customers love the professional experience.",
    rating: 5,
  },
  {
    name: "Sofia Cruz",
    role: "Owner, LensMasters Philippines",
    image: "/testimonials/sofia-cruz.jpg",
    quote:
      "Rent n' Snap has completely transformed how we manage our premium equipment. The gold-standard security features give us peace of mind with high-value rentals.",
    rating: 5,
  },
]

const additionalTestimonials = [
  {
    name: "Isabella Garcia",
    role: "Owner, Davao Camera Co.",
    image: "/testimonials/isabella-garcia.jpg",
    quote:
      "The customer experience is seamless from booking to return. Our clients specifically mention how professional our process has become.",
    rating: 5,
  },
  {
    name: "Rafael Tan",
    role: "Manager, ProCam Rentals",
    image: "/testimonials/rafael-tan.jpg",
    quote:
      "The analytics dashboard helps us make informed decisions about inventory. We've optimized our equipment selection based on the data and increased profitability.",
    rating: 5,
  },
]

const partners = [
  {
    name: "Rent n Snap Cebu Rentals",
    logo: "/partners/Cebu.svg",
    alt: "RentnSnap Cebu Rentals Logo"
  },
  {
    name: "Rent n Snap Davao Rentals",
    logo: "/partners/Davao.svg",
    alt: "Rentnsnap Davao Rentals Logo"
  },
  {
    name: "Rent n Snap Siargao Rentals",
    logo: "/partners/Siargao.svg",
    alt: "RentnSnap Siargao Rentals Logo"
  }
]

export const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-secondary py-12 md:py-24 lg:py-32 border-y border-gold-700/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-900/10 via-transparent to-transparent"></div>
      <div className="responsive-container relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-sm text-gold-500">
            <span className="font-medium">Client Success Stories</span>
          </div>
          <div className="space-y-2">
            <h2 className="responsive-heading font-bold tracking-tighter">
              What Our <span className="text-gold-400">Clients Say</span>
            </h2>
            <p className="max-w-[900px] text-muted-foreground responsive-body">
              Hear from rental shop owners who transformed their business with Rent n&apos; Snap
            </p>
          </div>
        </div>

        <div className="responsive-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 max-w-[1200px] mx-auto">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 mt-8 max-w-[800px] mx-auto">
            {additionalTestimonials.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center space-y-16 w-full">
          <h3 className="text-2xl font-bold text-center">Trusted by Leading Rental Businesses</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 w-full px-4">
            {partners.map((partner, i) => (
              <div key={i} className="flex items-center justify-center w-[150px] h-[150px] relative">
                <div className="group relative w-full h-full rounded-full overflow-hidden border-2 border-gold-500/30 hover:border-gold-500/80 transition-all duration-300">
                  <Image
                    src={partner.logo}
                    fill
                    style={{ objectFit: 'cover' }}
                    alt={partner.alt}
                    className="grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 