import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

export function HeroSection() {
  const navigate = useNavigate(); // ✅ initialize navigate
  

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://www.ayurvedadoctor.net/wp-content/uploads/2023/10/Featured-Inside-125.webp"
          alt="Meditation and wellness center"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl mb-6 font-bold stroke-5">
            Authentic Ayurvedic Panchkarma Treatments
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Restore balance, rejuvenate your body, and revitalize your spirit
            with our traditional 5-step detoxification program
         
          </p>
          
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4"
              onClick={() => navigate("/login")} // ✅ works now
            >
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4"
              onClick={() => {
                const aboutSection = document.getElementById("about");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Learn More
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
}
