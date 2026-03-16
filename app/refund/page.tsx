import Link from 'next/link';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6 md:px-12 xl:px-20 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Refund Policy
          </h1>
          <p className="text-lg text-slate-600">Last updated: March 17, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 xl:px-20 py-12 md:py-16">
        <div className="max-w-4xl mx-auto prose prose-slate">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Overview</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              At Axentia.AI, we are committed to providing high-quality educational programs. This Refund Policy outlines the conditions under which refunds may be granted for our various programs.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Please read this policy carefully before enrolling in any program. By enrolling, you agree to the terms of this Refund Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. DCAP (Daksha Career Accelerator Program)</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">2.1 Before Program Start</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li><strong>More than 30 days before start:</strong> Full refund minus 5% administrative fee</li>
                <li><strong>15-30 days before start:</strong> 75% refund</li>
                <li><strong>Less than 15 days before start:</strong> 50% refund</li>
                <li><strong>Within 7 days of start:</strong> No refund</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">2.2 After Program Start</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li><strong>Within first 2 weeks:</strong> 50% refund of remaining program fees</li>
                <li><strong>After 2 weeks:</strong> No refund</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">2.3 Special Circumstances</h3>
              <p className="text-slate-700 leading-relaxed">
                Refunds for medical emergencies or other exceptional circumstances will be considered on a case-by-case basis and require appropriate documentation.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. EAP (Elite Acceleration Program)</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>3.1 Invitation-Only Program:</strong> EAP is an invitation-only program for DCAP graduates. Refund terms are provided in the individual EAP enrollment agreement.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>3.2 General Policy:</strong> Given the selective nature and advanced stage of this program, refunds are generally not available once the program begins. Exceptional cases will be reviewed individually.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Online Foundation Program</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">4.1 Self-Paced Learning</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li><strong>Within 7 days of purchase:</strong> Full refund if less than 10% of course content accessed</li>
                <li><strong>7-14 days after purchase:</strong> 50% refund if less than 25% of course content accessed</li>
                <li><strong>After 14 days:</strong> No refund</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">4.2 Access Policy</h3>
              <p className="text-slate-700 leading-relaxed">
                If you have downloaded course materials or completed more than the specified percentage of content, you are not eligible for a refund.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Non-Refundable Items</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The following are non-refundable under all circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Application fees</li>
              <li>Registration fees</li>
              <li>Material fees for physical resources already shipped</li>
              <li>Certification fees</li>
              <li>Third-party service fees (e.g., payment processing fees)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Refund Process</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">6.1 How to Request a Refund</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                To request a refund, you must:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                <li>Submit a written refund request to info@axentiaai.com</li>
                <li>Include your full name, enrollment details, and reason for refund</li>
                <li>Provide any supporting documentation if applicable</li>
              </ol>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">6.2 Processing Time</h3>
              <p className="text-slate-700 leading-relaxed">
                Refund requests are typically processed within 15-20 business days from the date of approval. Refunds will be issued to the original payment method.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">6.3 Notification</h3>
              <p className="text-slate-700 leading-relaxed">
                You will receive email notification once your refund request has been reviewed and a decision has been made.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Program Cancellation by Axentia.AI</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>7.1 Full Refund:</strong> If Axentia.AI cancels a program before it starts, all enrolled students will receive a full refund of program fees.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>7.2 Program Changes:</strong> If significant changes are made to a program after enrollment, students may request a full refund within 7 days of being notified of the changes.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>7.3 Alternative Options:</strong> In case of program cancellation, we may offer enrollment in a future cohort or an alternative program of equivalent value.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Termination by Axentia.AI</h2>
            <p className="text-slate-700 leading-relaxed">
              If a student is terminated from a program due to violation of our Terms and Conditions, Code of Conduct, or non-payment, no refund will be provided.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Apprenticeship Stipends</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>9.1 Not Subject to Refund:</strong> Apprenticeship stipends received during the program are not subject to refund or repayment if you withdraw from the program.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>9.2 Future Stipends:</strong> If you withdraw, you forfeit any future stipend payments that have not yet been disbursed.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Payment Plans</h2>
            <p className="text-slate-700 leading-relaxed">
              If you are on a payment plan and request a refund, the refund amount will be calculated based on the total program fee, and any outstanding payments must be settled before the refund is processed.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Disputes</h2>
            <p className="text-slate-700 leading-relaxed">
              If you disagree with a refund decision, you may submit an appeal in writing within 10 days of receiving the decision. All refund decisions made after appeal are final.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Changes to This Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              Axentia.AI reserves the right to modify this Refund Policy at any time. Changes will not affect enrollments made prior to the policy change unless required by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              For refund requests or questions about this policy, please contact us:
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
