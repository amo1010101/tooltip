import Link from "next/link"
import { ArrowLeft, BarChart2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ResponsiveHeader } from "@/components/responsive-header"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1 bg-gradient-to-b from-white to-blue-50">
        <div className="container px-4 py-8 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
            </Button>

            <div className="bg-white rounded-lg border shadow-sm p-6 md:p-8">
              <h1 className="text-3xl font-bold tracking-tight mb-6">Privacy Policy</h1>

              <div className="prose prose-blue max-w-none">
                <p className="text-muted-foreground">Last updated: June 1, 2023</p>

                <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
                <p>
                  Welcome to Insytra ("we," "our," or "us"). We respect your privacy and are committed to
                  protecting your personal data. This privacy policy will inform you about how we look after your
                  personal data when you visit our website and tell you about your privacy rights and how the law
                  protects you.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">2. The Data We Collect About You</h2>
                <p>
                  Personal data, or personal information, means any information about an individual from which that
                  person can be identified. We may collect, use, store and transfer different kinds of personal data
                  about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>
                    <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
                  </li>
                  <li>
                    <strong>Contact Data</strong> includes email address and telephone numbers.
                  </li>
                  <li>
                    <strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser
                    type and version, time zone setting and location, browser plug-in types and versions, operating
                    system and platform, and other technology on the devices you use to access this website.
                  </li>
                  <li>
                    <strong>Usage Data</strong> includes information about how you use our website, products, and
                    services.
                  </li>
                  <li>
                    <strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing
                    from us and our third parties and your communication preferences.
                  </li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Collect Your Personal Data</h2>
                <p>We use different methods to collect data from and about you including through:</p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>
                    <strong>Direct interactions.</strong> You may give us your Identity and Contact Data by filling in
                    forms or by corresponding with us by post, phone, email, or otherwise.
                  </li>
                  <li>
                    <strong>Automated technologies or interactions.</strong> As you interact with our website, we may
                    automatically collect Technical Data about your equipment, browsing actions, and patterns.
                  </li>
                  <li>
                    <strong>Third parties or publicly available sources.</strong> We may receive personal data about you
                    from various third parties and public sources.
                  </li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">4. How We Use Your Personal Data</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your
                  personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>
                    Where we need to perform the contract we are about to enter into or have entered into with you.
                  </li>
                  <li>
                    Where it is necessary for our legitimate interests (or those of a third party) and your interests
                    and fundamental rights do not override those interests.
                  </li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being
                  accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we
                  limit access to your personal data to those employees, agents, contractors, and other third parties
                  who have a business need to know.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">6. Data Retention</h2>
                <p>
                  We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we
                  collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or
                  reporting requirements.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">7. Your Legal Rights</h2>
                <p>
                  Under certain circumstances, you have rights under data protection laws in relation to your personal
                  data, including the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Request access to your personal data.</li>
                  <li>Request correction of your personal data.</li>
                  <li>Request erasure of your personal data.</li>
                  <li>Object to processing of your personal data.</li>
                  <li>Request restriction of processing your personal data.</li>
                  <li>Request transfer of your personal data.</li>
                  <li>Right to withdraw consent.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to the Privacy Policy</h2>
                <p>
                  We may update our privacy policy from time to time. We will notify you of any changes by posting the
                  new privacy policy on this page and updating the "Last updated" date at the top of this privacy
                  policy.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> contact@insytra.com
                  <br />
                  <strong>Address:</strong> 1 Glenealy Street, Hong Kong
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Insytra</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                AI-powered market research platform delivering instant, comprehensive reports for smarter business
                decisions.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/features" className="text-muted-foreground hover:text-foreground">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/reports" className="text-muted-foreground hover:text-foreground">
                      Reports
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Insytra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
