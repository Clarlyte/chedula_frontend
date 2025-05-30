import { CalendarDays, Camera, ClipboardCheck, Clock, Shield, UserCheck } from "lucide-react"

const features = [
  {
    icon: CalendarDays,
    title: "AI-Powered Scheduling",
    description: "Natural language interface for managing appointments and services"
  },
  {
    icon: ClipboardCheck,
    title: "Smart Calendar",
    description: "Visual calendar with conflict detection and flexible scheduling options"
  },
  {
    icon: UserCheck,
    title: "Customer Management",
    description: "Store customer information and track service history"
  },
  {
    icon: Shield,
    title: "Service Catalog",
    description: "Manage your services, equipment, and resources with availability tracking"
  },
  {
    icon: Clock,
    title: "Booking Links",
    description: "Shareable booking pages for customers to self-schedule appointments"
  },
  {
    icon: Camera,
    title: "Contract Generation",
    description: "Automated service agreements with digital signatures"
  }
]

export const Features = () => {
  return (
    <section id="features" className="bg-secondary py-12 md:py-24 lg:py-32 border-y border-gold-700/20">
      <div className="responsive-container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-sm text-gold-500">
            <span className="font-medium">Premium Features</span>
          </div>
          <div className="space-y-2">
            <h2 className="responsive-heading font-bold tracking-tighter">
              Powerful <span className="text-gold-400">Features</span>
            </h2>
            <p className="max-w-[900px] text-muted-foreground responsive-body">
              Everything you need to run your camera rental business efficiently
            </p>
          </div>
        </div>
        <div className="responsive-container mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 rounded-lg border border-gold-700/30 p-6 shadow-lg hover:shadow-gold-500/10 transition-all duration-300 group">
                <div className="rounded-full bg-gold-500/10 p-3 group-hover:bg-gold-500/20 transition-colors duration-300">
                  <feature.icon className="h-10 w-10 text-gold-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-center text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 