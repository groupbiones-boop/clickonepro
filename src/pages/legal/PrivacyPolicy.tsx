import Layout from "@/components/layout/Layout";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <AnimatedSection animation="fade-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">
              Last Updated: January 2, 2025
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ClickOne AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website clickonepro.com and use our AI-powered communication services (collectively, the "Services"). This policy is designed to comply with applicable U.S. federal and state privacy laws, including the California Consumer Privacy Act (CCPA), California Privacy Rights Act (CPRA), and other applicable regulations.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  By accessing or using our Services, you agree to this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-medium mb-3">2.1 Personal Information You Provide</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you voluntarily provide when using our Services, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Business information (company name, industry, company size)</li>
                  <li>Account credentials (username and password)</li>
                  <li>Communication preferences</li>
                  <li>Information provided through our contact forms, demo requests, or customer support inquiries</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">2.2 Information Collected Automatically</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you access our Services, we automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, click patterns)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Referral source and navigation patterns</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">2.3 Information from Third Parties</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may receive information about you from third-party sources, including business partners, marketing partners, and publicly available sources.
                </p>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>To provide, maintain, and improve our Services</li>
                  <li>To process transactions and send related information</li>
                  <li>To send promotional communications (with your consent where required)</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To analyze usage patterns and improve user experience</li>
                  <li>To detect, prevent, and address technical issues or fraud</li>
                  <li>To comply with legal obligations</li>
                  <li>To enforce our Terms of Service</li>
                </ul>
              </section>

              {/* Disclosure of Your Information */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Disclosure of Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (hosting, analytics, payment processing)</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                  <li><strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property</li>
                  <li><strong>With Your Consent:</strong> When you have given us permission to share your information</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We do not sell your personal information to third parties for their direct marketing purposes.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures designed to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, firewalls, secure server infrastructure, and access controls. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with our legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </section>

              {/* Your Privacy Rights */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Your Privacy Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Right to Know:</strong> Request information about the categories and specific pieces of personal information we have collected</li>
                  <li><strong>Right to Delete:</strong> Request deletion of your personal information, subject to certain exceptions</li>
                  <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>
                  <li><strong>Right to Opt-Out:</strong> Opt out of the sale or sharing of your personal information</li>
                  <li><strong>Right to Non-Discrimination:</strong> Exercise your rights without discriminatory treatment</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, please contact us at contato@clickonepro.com or call +1 (770) 501-7321.
                </p>
              </section>

              {/* California Privacy Rights */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">8. California Privacy Rights (CCPA/CPRA)</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). These include the right to know what personal information we collect, the right to delete your information, and the right to opt-out of the sale of your personal information. We do not sell personal information as defined under CCPA/CPRA. To make a request, please contact us using the information provided in this policy.
                </p>
              </section>

              {/* Cookies and Tracking */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to collect and track information and to improve our Services. Types of cookies we use include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our Services.
                </p>
              </section>

              {/* Third-Party Links */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete that information as soon as possible. If you believe a child has provided us with personal information, please contact us.
                </p>
              </section>

              {/* International Data Transfers */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">12. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our Services, you consent to the transfer of your information to the United States and other jurisdictions where we operate.
                </p>
              </section>

              {/* Changes to This Policy */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
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

export default PrivacyPolicy;
