import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6 md:px-12 xl:px-20 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-slate-600">Last updated: March 17, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 xl:px-20 py-12 md:py-16">
        <div className="max-w-4xl mx-auto prose prose-slate">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              By accessing or using Axentia.AI's website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>
            <p className="text-slate-700 leading-relaxed">
              These terms apply to all visitors, users, students, and others who access or use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Program Enrollment and Eligibility</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>2.1 Eligibility Requirements:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>DCAP: Fresh graduates or career changers with relevant educational qualifications</li>
              <li>EAP: By invitation only, based on DCAP performance</li>
              <li>Online Foundation: Open enrollment for all interested learners</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>2.2 Application Process:</strong> All applications are subject to review and approval. Axentia.AI reserves the right to accept or reject any application at its sole discretion.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>2.3 Enrollment Confirmation:</strong> Your enrollment is confirmed only upon receipt of payment and written confirmation from Axentia.AI.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Fees and Payment</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>3.1 Program Fees:</strong> Program fees are as stated on our website at the time of enrollment. Fees are subject to change for future cohorts.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>3.2 Payment Terms:</strong> Payment must be made according to the schedule provided during enrollment. Late payments may result in suspension of access to program materials.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>3.3 Apprenticeship Stipend:</strong> DCAP and EAP participants may receive apprenticeship stipends as outlined in their program agreements. Stipends are subject to performance and attendance requirements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Student Responsibilities</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Students are expected to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Attend all scheduled classes and training sessions</li>
              <li>Complete assignments and projects on time</li>
              <li>Maintain professional conduct during apprenticeships</li>
              <li>Comply with all program policies and guidelines</li>
              <li>Respect intellectual property rights</li>
              <li>Maintain confidentiality regarding proprietary information</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>5.1 Our Content:</strong> All course materials, curriculum, videos, documents, and other content provided by Axentia.AI are protected by intellectual property laws and remain the property of Axentia.AI.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>5.2 Student Work:</strong> Students retain ownership of their original work, but grant Axentia.AI a license to use such work for educational and promotional purposes.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>5.3 Restrictions:</strong> Students may not reproduce, distribute, or share course materials without written permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Code of Conduct</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Students must maintain professional and respectful behavior at all times. The following are prohibited:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Harassment, discrimination, or bullying of any kind</li>
              <li>Academic dishonesty or plagiarism</li>
              <li>Violation of partner organization policies during apprenticeships</li>
              <li>Sharing of proprietary or confidential information</li>
              <li>Any illegal activities or violation of applicable laws</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              Violation of this code of conduct may result in immediate termination from the program without refund.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Program Completion and Certification</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>7.1 Requirements:</strong> Students must meet all program requirements, including attendance, assignments, projects, and assessments, to receive certification.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>7.2 No Guarantee of Employment:</strong> While we provide apprenticeship opportunities and career support, Axentia.AI does not guarantee employment or placement with any organization.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>7.3 Certification:</strong> Certificates are awarded upon successful completion of program requirements and are subject to verification of all criteria.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              To the fullest extent permitted by law, Axentia.AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Use or inability to use our services</li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Any conduct or content of third parties</li>
              <li>Any other matter relating to our services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Modifications to Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              Axentia.AI reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Termination</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>10.1 By Student:</strong> Students may withdraw from a program according to the refund policy outlined in our Refund Policy document.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>10.2 By Axentia.AI:</strong> We reserve the right to terminate a student's enrollment for violation of these terms, non-payment, or other reasonable cause.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Governing Law</h2>
            <p className="text-slate-700 leading-relaxed">
              These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              For questions about these Terms and Conditions, please contact us:
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
