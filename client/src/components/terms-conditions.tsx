import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsConditions() {
  return (
    <section id="terms-conditions" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms & Conditions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Please read our terms of service carefully before using our services
            <br />
            <span className="text-brand-blue font-medium">
              हमारी सेवाओं का उपयोग करने से पहले कृपया हमारी सेवा की शर्तों को ध्यान से पढ़ें
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white dark:bg-slate-800">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="text-white text-2xl" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Service Guarantee
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We guarantee professional service delivery and customer satisfaction
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FileText className="text-white text-2xl" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Document Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                All documents and personal information are handled securely
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <AlertCircle className="text-white text-2xl" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Liability Limits
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Service limitations and liability terms clearly defined
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Terms</h3>
          <ul className="mb-8">
            <li>All services are subject to availability and government regulations</li>
            <li>Customers must provide accurate and complete information</li>
            <li>We reserve the right to refuse service for incomplete or false information</li>
            <li>Service charges are as displayed and subject to change with notice</li>
            <li>Payment is required before service completion unless otherwise agreed</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Customer Responsibilities</h3>
          <ul className="mb-8">
            <li>Provide valid and accurate documentation</li>
            <li>Pay service charges as agreed</li>
            <li>Respect other customers and staff</li>
            <li>Follow government guidelines for document applications</li>
            <li>Collect completed services within specified timeframes</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Government Services Disclaimer</h3>
          <ul className="mb-8">
            <li>We are service facilitators, not government agencies</li>
            <li>Application approval is subject to government verification</li>
            <li>Processing times depend on government departments</li>
            <li>We cannot guarantee approval of any application</li>
            <li>Refunds are subject to our refund policy</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Refund Policy</h3>
          <ul className="mb-8">
            <li>Service charges are generally non-refundable once work begins</li>
            <li>Refunds considered for technical failures on our part</li>
            <li>Government application fees are non-refundable</li>
            <li>Travel booking cancellations subject to operator policies</li>
            <li>Refund requests must be made within 24 hours</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitations of Liability</h3>
          <ul className="mb-8">
            <li>Our liability is limited to the service charges paid</li>
            <li>We are not responsible for government processing delays</li>
            <li>Travel booking issues are handled per operator terms</li>
            <li>Force majeure events exempt us from liability</li>
            <li>Customer data loss due to external factors not our responsibility</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy and Confidentiality</h3>
          <ul className="mb-8">
            <li>Customer information is kept strictly confidential</li>
            <li>Documents are securely stored and disposed of properly</li>
            <li>No information shared without customer consent</li>
            <li>CCTV monitoring for security purposes</li>
            <li>Staff bound by confidentiality agreements</li>
          </ul>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-start">
              <XCircle className="text-red-600 mr-3 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-bold text-red-900 dark:text-red-200 mb-2">Important Notice</h4>
                <p className="text-red-800 dark:text-red-300">
                  These terms are subject to change without prior notice. Continued use of our services 
                  constitutes acceptance of updated terms. For any disputes, local jurisdiction applies.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-brand-blue text-white rounded-lg p-6 text-center mt-8">
            <h4 className="text-xl font-bold mb-2">Questions About Terms?</h4>
            <p>Contact us at: terms@mahechcafe.com or visit our center for clarification</p>
          </div>
        </div>
      </div>
    </section>
  );
}