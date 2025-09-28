import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, Users, Star } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "Complete Panchkarma Program",
      duration: "14-28 days",
      description: "Comprehensive detoxification program including all five therapeutic procedures, personalized diet, and lifestyle guidance.",
      image: "https://www.harithaayurveda.com/images/ayurveda-panchakarma-treatment.jpg",
      price: "₹45,000 - ₹85,000",
      features: [
        "Initial consultation & assessment",
        "Customized treatment plan",
        "Daily monitoring by experts",
        "Organic herbal medicines",
        "Post-treatment care guidance"
      ]
    },
    {
      title: "Rejuvenation Package",
      duration: "7-14 days",
      description: "Focused treatments for stress relief, rejuvenation, and maintaining optimal health for healthy individuals.",
      image: "https://static-assets.ayursh.com/skin_and_hair_care_mumbai/ayursh_navara_facial.jpg",
      price: "₹25,000 - ₹45,000",
      features: [
        "Abhyanga (oil massage)",
        "Shirodhara treatment",
        "Steam therapy",
        "Herbal detox drinks",
        "Yoga & meditation sessions"
      ]
    },
    {
      title: "Therapeutic Treatments",
      duration: "3-7 days",
      description: "Targeted treatments for specific health conditions like arthritis, diabetes, skin disorders, and digestive issues.",
      image: "https://images.unsplash.com/photo-1603790090292-ef562ccac38e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZSUyMGJvdHRsZXMlMjBheXVydmVkYXxlbnwxfHx8fDE3NTgxMTg2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "₹15,000 - ₹35,000",
      features: [
        "Condition-specific protocols",
        "Specialized medications",
        "Regular monitoring",
        "Diet & lifestyle counseling",
        "Follow-up consultations"
      ]
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">
            Our Treatment Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of Panchkarma treatments, each designed to address specific health needs and wellness goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
  <div className="relative w-full h-64 overflow-hidden">
    <ImageWithFallback
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover"
    />
  </div>

  <CardHeader>
    <div className="flex justify-between items-start mb-2">
      <CardTitle className="text-xl">{service.title}</CardTitle>
      <div className="flex items-center text-sm text-gray-600">
        <Clock className="w-4 h-4 mr-1" />
        {service.duration}
      </div>
    </div>
    <p className="text-gray-600">{service.description}</p>
  </CardHeader>

  <CardContent className="flex flex-col flex-grow">
    <div className="mb-4 flex-grow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-semibold text-green-600">{service.price}</span>
        <div className="flex items-center text-sm text-gray-600">
          <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
          <span>4.8/5</span>
        </div>
      </div>
      <ul className="space-y-2 text-sm text-gray-600 mb-6">
        {service.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center">
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
            {feature}
          </li>
        ))}
      </ul>
    </div>

    <Button className="w-full bg-green-600 hover:bg-green-700 mt-auto">
      Book Consultation
    </Button>
  </CardContent>
</Card>

          ))}
        </div>
      </div>
    </section>
  );
}