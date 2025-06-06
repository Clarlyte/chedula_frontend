import { Navbar } from "@/components/common/navbar"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms and Conditions - Chedula",
  description: "Terms and conditions for using Chedula",
}

export default function TermsPage() {
  return (
    <section className="relative overflow-hidden text-gold-400">
      <Navbar></Navbar>
      <div className="mt-5 mb-5 responsive-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter text-gold-400 text-balance">
                Terms and Conditions
              </h1>
              <p className="text-muted-foreground text-balance">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">1. Acceptance of Terms</h2>
                <p className="text-gold-500/70">
                  By accessing and using Chedula, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">2. Description of Service</h2>
                <p className="text-gold-500/70">
                  Chedula is a scheduling and management platform that allows users to book and manage appointments, services, and equipment. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">3. User Accounts</h2>
                <p className="text-gold-500/70">
                  To use certain features of Chedula, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">4. Booking and Cancellations</h2>
                <p className="text-gold-500/70">
                  Users can book appointments and services through our platform. Cancellation policies may vary depending on the service provider. Please review individual service terms for specific cancellation policies.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">5. Payment Terms</h2>
                <p className="text-gold-500/70">
                  All payments are processed securely through our platform. Prices are subject to change without notice. Refund policies may vary depending on the service provider and circumstances.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">6. Privacy Policy</h2>
                <p className="text-gold-500/70">
                  Your privacy is important to us. Please review our <Link href="/privacy" className="text-gold-400 hover:text-gold-300 underline">Privacy Policy</Link> to understand how we collect, use, and protect your personal information.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">7. Intellectual Property</h2>
                <p className="text-gold-500/70">
                  All content, features, and functionality of Chedula are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">8. Limitation of Liability</h2>
                <p className="text-gold-500/70">
                  Chedula is provided "as is" without any warranties. We are not liable for any damages arising from the use or inability to use our service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">9. Changes to Terms</h2>
                <p className="text-gold-500/70">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">10. Contact Information</h2>
                <p className="text-gold-500/70">
                  If you have any questions about these Terms and Conditions, please contact us at support@chedula.com
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-gold-500/20">
              <p className="text-sm text-muted-foreground text-center">
                By using Chedula, you acknowledge that you have read and understood these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 