import { Card, CardContent } from "./ui/card";
import { Heart, Droplets, Wind, Flame, Leaf } from "lucide-react";

export function AboutSection() {
  const treatments = [
    {
      name: "Vamana",
      icon: <Wind className="h-8 w-8 text-blue-600" />,
      description: "Therapeutic vomiting to eliminate excess Kapha dosha and respiratory disorders"
    },
    {
      name: "Virechana",
      icon: <Droplets className="h-8 w-8 text-yellow-600" />,
      description: "Purgation therapy to cleanse the small intestine and eliminate Pitta disorders"
    },
    {
      name: "Basti",
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      description: "Medicated enemas to balance Vata dosha and treat neurological conditions"
    },
    {
      name: "Nasya",
      icon: <Flame className="h-8 w-8 text-red-600" />,
      description: "Nasal administration of medicines to treat head and neck disorders"
    },
    {
      name: "Raktamokshana",
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      description: "Bloodletting therapy to purify blood and treat skin disorders"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">
            Understanding Panchkarmas
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Panchkarma is a comprehensive Ayurvedic detoxification and rejuvenation program consisting of five main therapeutic procedures. These time-tested treatments work synergistically to eliminate toxins, restore balance, and promote optimal health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {treatments.map((treatment, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {treatment.icon}
                </div>
                <h3 className="text-xl mb-3 text-gray-900">{treatment.name}</h3>
                <p className="text-gray-600">{treatment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl mb-4 text-gray-900">Benefits of Panchkarma</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Complete detoxification of body and mind
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Strengthens immune system
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Improves digestion and metabolism
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Enhances mental clarity and focus
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Promotes longevity and vitality
                </li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="text-lg mb-3 text-gray-900">Treatment Duration</h4>
              <p className="text-gray-600 mb-4">
                A complete Panchkarma program typically ranges from 7 to 28 days, depending on individual constitution, health condition, and treatment goals.
              </p>
              <p className="text-sm text-green-700">
                *All treatments are personalized based on detailed consultation and Ayurvedic assessment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}