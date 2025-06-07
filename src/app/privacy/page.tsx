import { Navbar } from "@/components/common/navbar"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy - Chedula",
  description: "Privacy policy for Chedula users",
}

export default function PrivacyPage() {
  return (
    <section className="relative overflow-hidden text-gold-400">
      <Navbar></Navbar>
      <div className="mt-5 mb-5 responsive-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter text-gold-400 text-balance">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground text-balance">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">1. Information We Collect</h2>
                <p className="text-gold-500/70">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-gold-500/70 space-y-2">
                  <li>Name and contact information</li>
                  <li>Account credentials</li>
                  <li>Payment information</li>
                  <li>Booking and appointment details</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">2. How We Use Your Information</h2>
                <p className="text-gold-500/70">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gold-500/70 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Process your bookings and payments</li>
                  <li>Send you important updates and notifications</li>
                  <li>Improve our services and user experience</li>
                  <li>Communicate with you about your account</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">3. Information Sharing</h2>
                <p className="text-gold-500/70">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-gold-500/70 space-y-2">
                  <li>Service providers who assist in operating our platform</li>
                  <li>Business partners who provide services you book</li>
                  <li>Legal authorities when required by law</li>
                </ul>
                <p className="text-gold-500/70 mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">4. Data Security</h2>
                <p className="text-gold-500/70">
                  We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">5. Your Rights</h2>
                <p className="text-gold-500/70">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gold-500/70 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">6. Cookies and Tracking</h2>
                <p className="text-gold-500/70">
                  We use cookies and similar tracking technologies to improve your experience on our platform. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">7. Children's Privacy</h2>
                <p className="text-gold-500/70">
                  Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">8. Changes to Privacy Policy</h2>
                <p className="text-gold-500/70">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-400">9. Contact Us</h2>
                <p className="text-gold-500/70">
                  If you have any questions about this Privacy Policy, please contact us at privacy@chedula.com
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-gold-500/20">
              <p className="text-sm text-muted-foreground text-center">
                By using Chedula, you agree to the terms of this Privacy Policy. For more information about our terms of service, please visit our <Link href="/terms" className="text-gold-400 hover:text-gold-300 underline">Terms and Conditions</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 