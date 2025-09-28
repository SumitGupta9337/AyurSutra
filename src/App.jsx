// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";

import { HeroSection } from "./components/herosection";
import { AboutSection } from "./components/about";
import { ServicesSection } from "./components/services";
import { PractitionersSection } from "./components/practitioner";
import { BookingSection } from "./components/booking";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {
  const location = useLocation();

  // Footer sirf "/" route par dikhna chahiye
  const showFooter = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header: Hamesha dikhega */}
      <Header />

      <main className="flex-1">
        <Routes>
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

      {/* Footer: Sirf home page par */}
      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
