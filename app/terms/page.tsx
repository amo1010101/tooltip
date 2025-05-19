import Link from "next/link"
import { ArrowLeft, BarChart2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ResponsiveHeader } from "@/components/responsive-header"

export default function TermsPage() {
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
              <h1 className="text-3xl font-bold tracking-tight mb-6">Terms of Service</h1>

              <div className="prose prose-blue max-w-none">
                <p className="text-muted-foreground">Last updated: June 1, 2023</p>

                <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
                <p>
                  Welcome to Insytra. These Terms of Service ("Terms") govern your use of our website, products,
                  and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms.
                  If you disagree with any part of the terms, you may not access the Services.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">2. Use of Services</h2>
                <p>
                  Our Services are intended for business and professional use. You may use our Services only as
                  permitted by law and according to these Terms. Insytra reserves the right to modify, suspend, or
                  discontinue the Services at any time without notice.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information. You
                  are responsible for safeguarding the password and for all activities that occur under your account.
                  You agree to notify us immediately of any unauthorized use of your account.
                </p>
                <p>
                  We reserve the right to disable any user account at any time if, in our opinion, you have failed to
                  comply with any provision of these Terms.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">4. Subscription and Payment</h2>
                <p>
                  Some of our Services require payment of fees. You agree to pay all fees in accordance with the fees,
                  charges, and billing terms in effect at the time a fee is due and payable. You are responsible for
                  paying all applicable taxes.
                </p>
                <p>
                  Subscription fees are non-refundable except as required by law or as explicitly stated in these Terms.
                  You may cancel your subscription at any time, but no refund will be issued for the current billing
                  period.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
                <p>
                  The Services and their original content, features, and functionality are and will remain the exclusive
                  property of Insytra and its licensors. The Services are protected by copyright, trademark, and
                  other laws of both the United States and foreign countries.
                </p>
                <p>
                  Our trademarks and trade dress may not be used in connection with any product or service without the
                  prior written consent of Insytra.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">6. User Content</h2>
                <p>
                  Our Services may allow you to post, link, store, share and otherwise make available certain
                  information, text, graphics, videos, or other material. You are responsible for the content you post
                  and its legality, reliability, and appropriateness.
                </p>
                <p>
                  By posting content, you grant us the right to use, modify, publicly perform, publicly display,
                  reproduce, and distribute such content on and through our Services.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
                <p>
                  In no event shall Insytra, nor its directors, employees, partners, agents, suppliers, or
                  affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                  resulting from your access to or use of or inability to access or use the Services.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">8. Disclaimer</h2>
                <p>
                  Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS
                  AVAILABLE" basis. The Services are provided without warranties of any kind, whether express or
                  implied, including, but not limited to, implied warranties of merchantability, fitness for a
                  particular purpose, non-infringement or course of performance.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">9. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of the United States, without
                  regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms
                  will not be considered a waiver of those rights.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By
                  continuing to access or use our Services after those revisions become effective, you agree to be bound
                  by the revised terms.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">11. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at:</p>
                <p className="mt-2">
                  <strong>Email:</strong> contact@insytra.com
                  <br />
                  <strong>Legal Name:</strong> AJD HK Limited
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
