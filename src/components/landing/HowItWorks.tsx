const steps = [
  {
    step: 1,
    title: "Customer Requests Booking",
    description: "Customer selects a service (or equipment) and preferred date/time via chat or form.",
  },
  {
    step: 2,
    title: "AI Checks Availability",
    description: "AI assistant automatically verifies availability, detects conflicts, and suggests alternatives if needed.",
  },
  {
    step: 3,
    title: "AI Collects Details",
    description: "AI gathers all necessary customer information and required documents (e.g., ID, preferences).",
  },
  {
    step: 4,
    title: "Contract Generation",
    description: "A digital contract is automatically created with all booking details and terms.",
  },
  {
    step: 5,
    title: "Digital Signature",
    description: "Customer reviews and signs the contract electronically for security and compliance.",
  },
  {
    step: 6,
    title: "Booking Confirmed",
    description: "Both customer and business receive instant confirmation and all relevant details.",
  },
]

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="responsive-padding bg-background">
      <div className="responsive-container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-sm text-gold-500">
            <span className="font-medium">Simple Process</span>
          </div>
          <div className="space-y-2">
            <h2 className="responsive-heading font-bold tracking-tighter">
              How It <span className="text-gold-400">Works</span>
            </h2>
            <p className="max-w-[900px] text-muted-foreground responsive-body">
              Simple, AI-powered process for both business owners and customers
            </p>
          </div>
        </div>
        <div className="responsive-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {steps.map((item, i) => (
              <div key={i} className="flex flex-col items-center space-y-4 group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 text-2xl font-bold group-hover:bg-gold-500 group-hover:text-black transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-center group-hover:text-gold-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-center text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 