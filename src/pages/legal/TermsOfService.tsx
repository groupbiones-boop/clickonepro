import Layout from "@/components/layout/Layout";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { useTranslation } from "react-i18next";

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <AnimatedSection animation="fade-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">
              Last Updated: January 2, 2025
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to ClickOne AI. These Terms of Service ("Terms") govern your access to and use of the ClickOne AI website (clickonepro.com), software-as-a-service platform, and related services (collectively, the "Services") provided by ClickOne AI ("Company," "we," "our," or "us").
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services. If you are using the Services on behalf of a business or organization, you represent and warrant that you have the authority to bind that entity to these Terms.
                </p>
              </section>

              {/* Description of Services */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ClickOne AI provides AI-powered communication and customer service automation solutions, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>AI Voice Receptionist for automated phone call handling</li>
                  <li>Conversational AI Attendant for multi-channel messaging</li>
                  <li>Automated appointment scheduling and management</li>
                  <li>Customer relationship management integrations</li>
                  <li>Analytics and reporting dashboards</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  The specific features and functionalities available to you depend on your subscription plan and may be modified by us from time to time.
                </p>
              </section>

              {/* Account Registration */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Account Registration and Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To access certain features of our Services, you must register for an account. When registering, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your login credentials confidential and secure</li>
                  <li>Notify us immediately of any unauthorized access to your account</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We reserve the right to suspend or terminate accounts that violate these Terms or for any other reason at our sole discretion.
                </p>
              </section>

              {/* Subscription and Payments */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payments</h2>
                
                <h3 className="text-xl font-medium mb-3">4.1 Subscription Plans</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access to our Services requires a paid subscription. Subscription plans, pricing, and features are described during the registration process or provided to you directly by our sales team. We reserve the right to modify pricing and features upon reasonable notice.
                </p>

                <h3 className="text-xl font-medium mb-3 mt-6">4.2 Payment Terms</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By subscribing to our Services, you agree to pay all applicable fees. Payment terms include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Fees are billed in advance on a monthly or annual basis</li>
                  <li>All payments are non-refundable unless otherwise specified</li>
                  <li>You authorize us to charge your payment method on file</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">4.3 Cancellation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You may cancel your subscription at any time through your account settings or by contacting customer support. Cancellation will be effective at the end of the current billing period. No refunds will be provided for partial periods.
                </p>
              </section>

              {/* Acceptable Use */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree NOT to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Violate any applicable federal, state, local, or international law or regulation</li>
                  <li>Send unsolicited communications (spam) or violate TCPA, CAN-SPAM, or similar laws</li>
                  <li>Impersonate or attempt to impersonate another person or entity</li>
                  <li>Engage in any conduct that restricts or inhibits anyone's use of the Services</li>
                  <li>Use the Services to transmit malware, viruses, or harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Collect or harvest user information without consent</li>
                  <li>Use automated scripts to collect information or interact with the Services</li>
                  <li>Interfere with or disrupt the integrity or performance of the Services</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-medium mb-3">6.1 Our Intellectual Property</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Services, including all content, features, and functionality (including but not limited to software, algorithms, text, displays, images, video, and audio), are owned by ClickOne AI and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-medium mb-3 mt-6">6.2 Your Content</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You retain ownership of any content you submit, post, or display through the Services ("Your Content"). By providing Your Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display Your Content solely for the purpose of providing and improving the Services.
                </p>

                <h3 className="text-xl font-medium mb-3 mt-6">6.3 Feedback</h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you provide us with feedback, suggestions, or ideas regarding the Services, you grant us the right to use such feedback without restriction or compensation to you.
                </p>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Privacy and Data Protection</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your use of the Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Services, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You are responsible for obtaining appropriate consents from your customers and end-users before using our Services to communicate with them or process their personal information.
                </p>
              </section>

              {/* Confidentiality */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Confidentiality</h2>
                <p className="text-muted-foreground leading-relaxed">
                  "Confidential Information" means any non-public information disclosed by either party that is designated as confidential or that reasonably should be understood to be confidential. Each party agrees to protect the other party's Confidential Information using the same degree of care it uses to protect its own confidential information, but in no event less than reasonable care.
                </p>
              </section>

              {/* Service Level */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Service Availability and Support</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to provide reliable Services but do not guarantee uninterrupted availability. We may perform scheduled maintenance and updates, which may temporarily affect service availability. We will make reasonable efforts to notify you in advance of any planned maintenance.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Technical support is available according to your subscription plan. Support hours and response times may vary based on the plan selected.
                </p>
              </section>

              {/* Disclaimer of Warranties */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND TITLE. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  WE DO NOT GUARANTEE ANY SPECIFIC RESULTS FROM THE USE OF OUR SERVICES. AI-GENERATED RESPONSES AND AUTOMATION MAY NOT ALWAYS BE ACCURATE OR APPROPRIATE FOR EVERY SITUATION.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CLICKONE AI AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  IN NO EVENT SHALL OUR AGGREGATE LIABILITY EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100).
                </p>
              </section>

              {/* Indemnification */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify, defend, and hold harmless ClickOne AI and its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or in any way connected with: (a) your access to or use of the Services; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) Your Content.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Governing Law and Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Georgia, United States, without regard to its conflict of law provisions. Any dispute arising from these Terms or the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive relief in any court of competent jurisdiction.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will cease immediately. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the new Terms on our website or by sending you an email. Your continued use of the Services after such modifications constitutes your acceptance of the updated Terms.
                </p>
              </section>

              {/* General Provisions */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">16. General Provisions</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Entire Agreement:</strong> These Terms, together with the Privacy Policy, constitute the entire agreement between you and ClickOne AI.</li>
                  <li><strong>Severability:</strong> If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue in full force and effect.</li>
                  <li><strong>Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</li>
                  <li><strong>Assignment:</strong> You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.</li>
                  <li><strong>Force Majeure:</strong> We shall not be liable for any failure to perform due to causes beyond our reasonable control.</li>
                </ul>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 p-6 bg-muted/30 rounded-lg">
                  <p className="font-semibold mb-2">ClickOne AI</p>
                  <p className="text-muted-foreground">Email: contato@clickonepro.com</p>
                  <p className="text-muted-foreground">Phone: +1 (770) 501-7321</p>
                  <p className="text-muted-foreground">Location: United States</p>
                </div>
              </section>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
