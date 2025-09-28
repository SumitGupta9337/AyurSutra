import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import { HeroSection } from "./components/herosection";
import { AboutSection } from "./components/about";
import { ServicesSection } from "./components/services";
import { PractitionersSection } from "./components/practitioner";
import { BookingSection } from "./components/booking";
import Footer from "./components/footer";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";


export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Sticky Header */}
        <Header />

        {/* Main Scrollable Content */}
        <main className="flex-1">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <AboutSection />
                  <ServicesSection />
                  <PractitionersSection />
                  <BookingSection />
                </>
              }
            />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
      
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />


          
          </Routes>
        </main>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </Router>
  );
}
