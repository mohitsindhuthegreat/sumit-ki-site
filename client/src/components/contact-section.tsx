import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useContactInfo } from "@/hooks/use-contact-info";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const contactInfo = useContactInfo();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Check for prefilled service request
  useEffect(() => {
    const serviceRequest = localStorage.getItem('service_request');
    if (serviceRequest) {
      const request = JSON.parse(serviceRequest);
      setFormData(prev => ({
        ...prev,
        message: `Service Request: ${request.service_type}\n\nDetails: ${request.details}\n\nPlease contact me regarding this service.`
      }));
      // Clear the service request after using it
      localStorage.removeItem('service_request');
    }
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! We will get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600">
            Visit us today or contact us for any inquiries
            <br />
            <span className="text-brand-blue">आज ही हमसे मिलें या किसी भी जानकारी के लिए संपर्क करें</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-slate-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Name / नाम *
                  </Label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone / फोन *
                  </Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Message / संदेश *
                  </Label>
                  <Textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="How can we help you?"
                    className="w-full"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-blue hover:bg-brand-navy text-white py-3 font-semibold"
                  disabled={contactMutation.isPending}
                >
                  <Send className="mr-2 h-5 w-5" />
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      {contactInfo.address ? contactInfo.address.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      )) : 'Shop No. 123, Main Market\nNear City Center Mall\nNew Delhi - 110001'.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-cyan rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">{contactInfo.phone || '+91 98765 43210'}</p>
                    {contactInfo.phoneAlt && <p className="text-gray-600">{contactInfo.phoneAlt}</p>}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">{contactInfo.email || 'info@mahechcafe.com'}</p>
                    {contactInfo.emailSupport && <p className="text-gray-600">{contactInfo.emailSupport}</p>}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">{contactInfo.businessHours || 'Monday - Sunday: 8:00 AM - 11:00 PM'}</p>
                    <p className="text-sm text-green-600">Open 7 days a week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <Card className="overflow-hidden h-64">
              <CardContent className="p-0 h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.904943074297!2d77.21!3d28.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzM2LjAiTiA3N8KwMTInMzYuMCJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mahech Internet Cafe Location"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}