import { Users, Clock, Shield, DollarSign } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals",
    color: "bg-brand-blue"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Always available",
    color: "bg-brand-cyan"
  },
  {
    icon: Shield,
    title: "Secure Environment",
    description: "Safe & trusted",
    color: "bg-green-600"
  },
  {
    icon: DollarSign,
    title: "Affordable Rates",
    description: "Best prices",
    color: "bg-orange-600"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Mahech Internet Cafe</h2>
            <p className="text-lg text-gray-600 mb-6">
              Established as your trusted digital partner, Mahech Internet Cafe has been serving the community with reliable technology services and high-speed internet access. We are committed to bridging the digital divide and providing affordable technology solutions.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              <span className="text-brand-blue font-semibold">महेच इंटरनेट कैफे</span> आपके विश्वसनीय डिजिटल पार्टनर के रूप में समुदाय की सेवा में तत्पर है। हम सभी को किफायती तकनीकी समाधान प्रदान करने के लिए प्रतिबद्ध हैं।
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center`}>
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:pl-8">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern computer setup with multiple monitors" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
