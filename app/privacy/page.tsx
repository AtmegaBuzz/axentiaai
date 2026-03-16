import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6 md:px-12 xl:px-20 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600">Last updated: March 17, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 xl:px-20 py-12 md:py-16">
        <div className="max-w-4xl mx-auto prose prose-slate">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Welcome to Axentia.AI ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Educational background and professional experience</li>
              <li>Application and enrollment information</li>
              <li>Payment and billing information</li>
              <li>Communication preferences</li>
              <li>Any other information you choose to provide</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Process your applications and enrollments</li>
              <li>Provide and manage our educational programs</li>
              <li>Communicate with you about programs, events, and updates</li>
              <li>Process payments and maintain financial records</li>
              <li>Improve our services and develop new offerings</li>
              <li>Comply with legal obligations</li>
              <li>Protect against fraud and maintain security</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>Enterprise Partners:</strong> For apprenticeship and employment opportunities</li>
              <li><strong>Service Providers:</strong> Third-party vendors who assist in our operations</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
            <p className="text-slate-700 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission or storage system is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Rights</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Access and receive a copy of your personal information</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict certain processing of your information</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-slate-700 leading-relaxed">
              We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Children's Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have questions or concerns about this privacy policy or our privacy practices, please contact us:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <p className="text-slate-700 mb-2"><strong>Email:</strong> info@axentiaai.com</p>
              <p className="text-slate-700 mb-2"><strong>Phone:</strong> +91-9217665361</p>
              <p className="text-slate-700"><strong>Address:</strong> 1st Floor, IDEMIA Building, Plot No - 1 - A, Sector 73, Noida, Uttar Pradesh 201316</p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link 
              href="/" 
              className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
