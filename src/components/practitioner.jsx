import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Star, Award, BookOpen } from "lucide-react";

export function PractitionersSection() {
  const practitioners = [
    {
      name: "Dr.Rajesh Kumar",
      title: "Senior Ayurvedic Consultant",
      education: "BAMS, M.D. (Kayachikitsa)",
      experience: "35+ years",
      specialization: [
        "Chronic Disease Management",
        "Geriatric Care",
        "Pain Management",
      ],
      rating: 4.9,
      patients: "3500+",
      bio: "With over 30 years of experience, Dr. Rajesh Kumar is a senior physician specializing in managing complex chronic conditions through Ayurveda.",
      image:
        "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png",
    },
    {
      name: "Dr. Priya Sharma",
      title: "Senior Consultant",
      education: "BAMS, MS (Ayurveda Samhita)",
      experience: "15+ years",
      specialization: [
        "Women's Health",
        "Stress Management",
        "Skin Disorders",
      ],
      rating: 4.8,
      patients: "3500+",
      bio: "Dr. Sharma specializes in women's health and stress-related disorders, combining traditional Ayurvedic wisdom with modern therapeutic approaches.",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Dr. Amit Patel",
      title: "Panchkarma Specialist",
      education: "BAMS, PhD (Kayachikitsa)",
      experience: "12+ years",
      specialization: [
        "Detoxification",
        "Digestive Disorders",
        "Joint Care",
      ],
      rating: 4.9,
      patients: "2800+",
      bio: "Dr. Patel is an expert in detoxification therapies and digestive health, known for his gentle approach and personalized treatment protocols.",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
    },
  ];

  return (
    <section id="practitioners" className="py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">
            Our Expert Practitioners
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our team of certified Ayurvedic physicians and
            Panchkarma specialists, dedicated to your health and
            wellness journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {practitioners.map((doctor, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-lg transition-shadow flex flex-col"
            >
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage
                      src={doctor.image}
                      alt={doctor.name}
                    />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-green-600 mb-2">
                    {doctor.title}
                  </p>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm">
                      {doctor.rating} • {doctor.patients}{" "}
                      treated
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{doctor.education}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-2" />
                    <span>{doctor.experience} experience</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Specializations:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specialization.map(
                      (spec, specIndex) => (
                        <Badge
                          key={specIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {spec}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  {doctor.bio}
                </p>

                <div className="mt-auto">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                        Book Consultation
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All our practitioners are certified by the Central
            Council of Indian Medicine (CCIM)
          </p>
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            View All Practitioners
          </Button>
        </div>
      </div>
    </section>
  );
}