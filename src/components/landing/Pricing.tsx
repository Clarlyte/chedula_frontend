import Link from "next/link"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starter",
    description: "Perfect for solo owners",
    price: "₱999",
    originalPrice: "₱1,999",
    period: "/month",
    features: [
      "Manage bookings and camera rentals",
      "SMS & email rental reminders",
      "1 admin user",
      "Up to 10 equipment entries",
      "Basic performance dashboard"
    ],
    badge: {
      text: "Launch",
      position: "left"
    },
    buttonText: "Get Started",
    buttonLink: "/payment?plan=starter"
  },
  {
    name: "Pro",
    description: "For scaling businesses",
    price: "₱1,999",
    period: "/month",
    features: [
      "All Starter features",
      "Unlimited equipment entries",
      "Booking analytics + trends",
      "Customer rental history",
      "Multi-admin access (up to 3 users)",
      "Discount & promo codes",
      "Priority support"
    ],
    badge: {
      text: "Popular",
      position: "right"
    },
    buttonText: "Get Started",
    buttonLink: "/payment?plan=pro",
    isPopular: true
  },
  {
    name: "Lifetime Pro",
    description: "One-time payment",
    price: "₱14,999",
    features: [
      "All Pro Plan features for life",
      "Access to all future upgrades",
      "No renewal fees ever",
      "Personalized onboarding"
    ],
    badge: {
      text: "Best value",
      position: "right"
    },
    buttonText: "Get Lifetime Access",
    buttonLink: "/payment?plan=lifetime",
    isLifetime: true
  }
]

export const Pricing = () => {
  return (
    <section id="pricing" className="py-12 md:py-24 lg:py-32">
      <div className="responsive-container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-sm text-gold-500">
            <span className="font-medium">Flexible Plans</span>
          </div>
          <div className="space-y-2">
            <h2 className="responsive-heading font-bold tracking-tighter">
              Pricing <span className="text-gold-400">Plans</span>
            </h2>
            <p className="max-w-[900px] text-muted-foreground responsive-body">
              Choose the plan that fits your business needs
            </p>
          </div>
        </div>
        <div className="responsive-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`flex flex-col rounded-lg border ${
                  plan.isPopular 
                    ? "border-gold-500/50 gold-glow" 
                    : "border-gold-700/30"
                } bg-background p-6 shadow-lg hover:shadow-gold-500/10 transition-all duration-300 relative overflow-hidden`}
              >
                {plan.badge && (
                  <div className={`absolute top-0 ${
                    plan.badge.position === "left" 
                      ? "left-0 -translate-x-8 translate-y-4 rotate-[-45deg]" 
                      : "right-0 translate-x-8 translate-y-4 rotate-[45deg]"
                  } w-[140px] ${
                    plan.isLifetime ? "bg-purple-500 text-white" : "bg-gold-500 text-black"
                  } font-medium py-1 text-sm text-center`}>
                    {plan.badge.text}
                  </div>
                )}
                <div className="flex flex-col items-center space-y-2 pb-6 relative z-10">
                  <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
                  <p className="text-center text-muted-foreground">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-5xl font-bold ${
                      plan.isLifetime ? "text-purple-400" : 
                      plan.isPopular ? "text-gold-400" : ""
                    }`}>{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">{plan.originalPrice}{plan.period}</div>
                  )}
                  {plan.isLifetime && (
                    <div className="text-sm text-gold-400">One-time payment</div>
                  )}
                </div>
                <ul className="space-y-2 pb-6 relative z-10">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`mr-2 h-4 w-4 ${
                          plan.isLifetime ? "text-purple-400" : "text-gold-400"
                        }`}
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto relative z-10">
                  <Link href={plan.buttonLink}>
                    <Button 
                      className={`w-full ${
                        plan.isLifetime 
                          ? "bg-purple-500 hover:bg-purple-600 text-white" 
                          : "gold-gradient hover:opacity-90"
                      } transition-all ${
                        plan.isPopular ? "animate-pulse-gold" : ""
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 