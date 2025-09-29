import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Loader2, Mail, Lock, User, Leaf, ArrowRight, IdCard } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [doctorId, setDoctorId] = useState(""); // NEW state
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();

  // Load saved role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!role) {
      setError("Please select your role before logging in.");
      setIsLoading(false);
      return;
    }

    // Validation for doctor ID if practitioner
    if (role === "practitioner" && !doctorId.trim()) {
      setError("Doctor ID is required for practitioners.");
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("role", role);

      if (role === "practitioner") {
        localStorage.setItem("doctorId", doctorId); // Save doctor ID
      }

      if (role === "patient") {
        navigate("/patient-dashboard");
      } else if (role === "practitioner") {
        navigate("/practitioner-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      }

    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!role) {
      setError("Please select your role before logging in with Google.");
      return;
    }

    // Validation for doctor ID if practitioner
    if (role === "practitioner" && !doctorId.trim()) {
      setError("Doctor ID is required for practitioners.");
      return;
    }

    setError("");
    setIsGoogleLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("role", role);

      if (role === "practitioner") {
        localStorage.setItem("doctorId", doctorId);
      }

      if (role === "patient") {
  navigate("/dashboard");
} else if (role === "practitioner") {
  navigate("/practitioner-dashboard");
} else if (role === "admin") {
  navigate("/admin-dashboard");
}

    } catch (err) {
      setError(err.message || "Google login failed.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1724833377978-ed06f4d478cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
          alt="Ayurveda background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-0">
            <div className="flex justify-center">
              <img src="/Ayurlogo.png" alt="Leaf Icon" className="h-20 w-20 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-emerald-800 -mt-5">AyurSutra</CardTitle>
            <CardDescription className="text-emerald-600">Welcome back to your wellness journey</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-2 text-emerald-700">
                  <User className="h-4 w-4" /> Select Your Role
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-emerald-200 shadow-md">
                    <SelectItem value="patient" className=" hover:bg-emerald-50">Patient</SelectItem>
                    <SelectItem value="practitioner" className=" hover:bg-emerald-50">Practitioner</SelectItem>
                    <SelectItem value="admin" className=" hover:bg-emerald-50">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Doctor ID (only for Practitioner) */}
              {role === "practitioner" && (
                <div className="space-y-2">
                  <Label htmlFor="doctorId" className="flex items-center gap-2 text-emerald-700">
                    <IdCard className="h-4 w-4" /> Doctor ID
                  </Label>
                  <Input
                    id="doctorId"
                    type="text"
                    placeholder="Enter your Doctor ID(1234)"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                    required={role === "practitioner"}
                  />
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-emerald-700">
                  <Mail className="h-4 w-4" /> Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-emerald-700">
                  <Lock className="h-4 w-4" /> Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Leaf className="mr-2 h-4 w-4" /> Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Google Login */}
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 text-emerald-700 transition-all duration-200"
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>Continue with Google</>
              )}
            </Button>

            {/* Signup Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-emerald-600">
                New to Ayurvedic healing?{" "}
                <Link to="/signup" className="text-emerald-700 hover:text-emerald-800 underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
