// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";

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
import DoctorDashboard from "./pages/Doctordashboard";
import AdminDashboard from "./pages/Admindashboard"; // 1. Import AdminDashboard
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./firebase"; // 2. Import auth for logout functionality

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const showFooter = location.pathname === "/";

  // 3. Define handler functions for props
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/"); // Redirect to home page after logout
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // This function will handle the "Switch Role" button
  const handleSwitchRole = (role) => {
    if (role === 'practitioner') {
      navigate('/practitioner-dashboard');
    }
    // Add more logic here if you have other roles to switch to
  };


  return (
    <div className="flex flex-col min-h-screen">
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

          {/* Patient dashboard */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />

          {/* Doctor (Practitioner) dashboard */}
          <Route
            path="/practitioner-dashboard"
            element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}
          />
          
          {/* 4. Add route for Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard 
                  onSwitchRole={handleSwitchRole} 
                  onLogout={handleLogout} 
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
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