const steps = [
  {
    step: 1,
    title: "Customer Books Equipment",
    description: "Customers select equipment and preferred rental dates",
  },
  {
    step: 2,
    title: "System Checks Availability",
    description: "Automatic verification ensures no scheduling conflicts",
  },
  {
    step: 3,
    title: "Contract Generation",
    description: "Digital contract is created with customer details and rental terms",
  },
  {
    step: 4,
    title: "ID Verification",
    description: "Customer uploads ID for verification and security",
  },
  {
    step: 5,
    title: "Digital Signature",
    description: "Customer signs the contract electronically",
  },
  {
    step: 6,
    title: "Rental Confirmed",
    description: "Both parties receive confirmation and rental details",
  },
]

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-24 lg:py-32">
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
              Simple process for both rental shop owners and customers
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