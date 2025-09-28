// src/App.jsx (Updated)

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // 1. Import useLocation

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
  // 2. Get the current location
  const location = useLocation();

  // 3. Define the routes where the header and footer should be hidden
  const hideOnRoutes = ["/login", "/signup", "/dashboard"];

  // 4. Check if the current route is in the hide list
  const shouldShowHeaderAndFooter = !hideOnRoutes.includes(location.pathname);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* 5. Conditionally render the Header */}
        {shouldShowHeaderAndFooter && <Header />}

        <main className="flex-1">
          <Routes>
            {/* Home Page Sections */}
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

            {/* Auth and Dashboard Pages */}
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

        {/* 6. Conditionally render the Footer */}
        {shouldShowHeaderAndFooter && <Footer />}

      </div>
    </Router>
  );
}