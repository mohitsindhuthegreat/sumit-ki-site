import { Shield, Lock, Eye, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <section id="privacy-policy" className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your privacy and data security are our top priorities
            <br />
            <span className="text-brand-blue font-medium">
              आपकी गोपनीयता और डेटा सुरक्षा हमारी सर्वोच्च प्राथमिकता है
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-slate-50 dark:bg-slate-700">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <Shield className="text-white text-2xl" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Data Protection
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li>• All personal information is encrypted and secured</li>
                <li>• Documents are handled with strict confidentiality</li>
                <li>• No data is shared with third parties</li>
                <li>• Regular security audits and updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-700">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <Lock className="text-white text-2xl" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Information Collection
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li>• Only necessary information is collected</li>
                <li>• Used solely for service provision</li>
                <li>• Stored securely with limited access</li>
                <li>• Deleted after service completion</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h3>
          <p className="mb-6">
            We collect only the information necessary to provide our services, including:
          </p>
          <ul className="mb-8">
            <li>Personal identification information (name, address, phone number)</li>
            <li>Government ID details (only for official applications)</li>
            <li>Banking information (only for transaction purposes)</li>
            <li>Travel preferences (for booking services)</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h3>
          <ul className="mb-8">
            <li>To process government ID applications</li>
            <li>To facilitate banking and bill payment services</li>
            <li>To book travel tickets and accommodations</li>
            <li>To provide printing and documentation services</li>
            <li>To contact you regarding your service requests</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h3>
          <p className="mb-6">
            We implement industry-standard security measures to protect your personal information:
          </p>
          <ul className="mb-8">
            <li>SSL encryption for all data transmission</li>
            <li>Secure storage with access controls</li>
            <li>Regular security updates and monitoring</li>
            <li>Staff training on data protection protocols</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h3>
          <p className="mb-6">You have the right to:</p>
          <ul className="mb-8">
            <li>Request access to your personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for data processing</li>
          </ul>

          <div className="bg-brand-blue text-white rounded-lg p-6 text-center">
            <h4 className="text-xl font-bold mb-2">Questions About Privacy?</h4>
            <p>Contact us at: privacy@mahechcafe.com or call +91 98765 43210</p>
          </div>
        </div>
      </div>
    </section>
  );
}