import { Card } from "@/components/ui/card";

const galleryItems = [
  {
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Main Computer Area",
    description: "Spacious and comfortable workstations"
  },
  {
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Gaming Zone",
    description: "High-end gaming computers"
  },
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Printing Station",
    description: "Professional printing & scanning"
  },
  {
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Comfortable Environment",
    description: "Clean and organized space"
  },
  {
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Customer Service",
    description: "Friendly and helpful staff"
  },
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "High-Speed Network",
    description: "Latest networking technology"
  }
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Facility</h2>
          <p className="text-xl text-gray-600">
            Take a look at our modern, comfortable, and well-equipped internet cafe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <Card key={index} className="bg-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-64 object-cover" 
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
