import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Load role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute initials for profile circle
  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  // Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("role"); // ✅ clear role on logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // ✅ Function to navigate by role
  const goToDashboard = () => {
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "practitioner") {
      navigate("/practitioner-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-10 py-1">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/Ayurlogo.png"
              alt="Leaf Icon"
              className="h-14 w-14 text-green-600"
            />
            <span className="text-xl font-semibold text-green-800">
              AyurSutra
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link smooth to="/#home" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link smooth to="/#about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link smooth to="/#services" className="text-gray-700 hover:text-green-600">
              Services
            </Link>
            <Link smooth to="/#practitioners" className="text-gray-700 hover:text-green-600">
              Practitioners
            </Link>
            <Link smooth to="/#contact" className="text-gray-700 hover:text-green-600">
              Contact
            </Link>

            {/* Profile Circle / Login */}
            {user ? (
              <div>
                <div
                  onClick={goToDashboard} // ✅ navigate based on role
                  className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center cursor-pointer hover:bg-green-700"
                  title={user.displayName || "Profile"}
                >
                  {initials}
                </div>
              </div>
            ) : (
              <button
                className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                smooth
                to="/#home"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                smooth
                to="/#about"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                smooth
                to="/#services"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                smooth
                to="/#practitioners"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Practitioners
              </Link>
              <Link
                smooth
                to="/#contact"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <>
                  <button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded px-4 py-2 w-full text-left"
                    onClick={() => {
                      goToDashboard(); // ✅ role-based routing
                      setIsMenuOpen(false);
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2 w-full"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 w-full"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
