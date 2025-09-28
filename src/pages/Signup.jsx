import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Separator } from "../components/ui/separator";
import { Checkbox } from "../components/ui/checkbox";
import { Link } from "react-router-dom";

import { Loader2, Mail, Lock, User, Leaf, ArrowRight, UserPlus, Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";


export default function Signup({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Mock auth functions (replace with your Firebase functions)
  const createUserWithEmailAndPassword = async (auth, email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (email === "existing@test.com") {
      throw new Error("User already exists with this email");
    }
    return { user: { email, uid: "mock-uid" } };
  };

  const signInWithPopup = async (auth, provider) => {
    // Simulate Google signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { user: { email: "user@gmail.com", displayName: "John Doe" } };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    
    if (!formData.email) {
      setError("Please enter your email address.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.password) {
      setError("Please enter a password.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (!formData.role) {
      setError("Please select your role.");
      return false;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions.");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(null, formData.email, formData.password);
      localStorage.setItem("role", formData.role);
      setSuccess("Account created successfully! Welcome to Panchkarma Ayurveda.");
      
      // Simulate redirect after success
      setTimeout(() => {
        console.log("Signup successful! Redirecting to dashboard...");
      }, 1500);
    } catch (err) {
      setError(err.message || "An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!formData.role) {
      setError("Please select your role before signing up with Google.");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions before continuing.");
      return;
    }

    setError("");
    setIsGoogleLoading(true);

    try {
      await signInWithPopup(null, null);
      localStorage.setItem("role", formData.role);
      setSuccess("Account created successfully with Google! Welcome to Panchkarma Ayurveda.");
      
      setTimeout(() => {
        console.log("Google signup successful! Redirecting to dashboard...");
      }, 1500);
    } catch (err) {
      setError(err.message || "An error occurred during Google signup.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case "patient":
        return "Access personalized wellness plans, track your healing journey, and connect with certified practitioners.";
      case "practitioner":
        return "Manage patient consultations, create treatment plans, and share ancient Ayurvedic wisdom.";
      case "admin":
        return "Oversee platform operations, manage users, and maintain the integrity of Ayurvedic practices.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1724833377978-ed06f4d478cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMG1lZGl0YXRpb24lMjB3ZWxsbmVzcyUyMG5hdHVyZXxlbnwxfHx8fDE3NTg3MzY1MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Ayurveda background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-4">
               <img
              src="/Ayurlogo.png"
              alt="Leaf Icon"
              className="h-20 w-20 text-green-600"
            />
          
            </div>
            <CardTitle className="-mt-7 text-2xl text-emerald-800">
              Join Ayursutra
            </CardTitle>
            <CardDescription className="text-emerald-600 -mt-3">
              Begin your journey to holistic wellness
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-emerald-200 bg-emerald-50">
                <AlertDescription className="text-emerald-700">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2 text-emerald-700">
                  <UserPlus className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-emerald-700">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-emerald-700">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password (min. 6 characters)"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-emerald-700">
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-2 text-emerald-700">
                  <User className="h-4 w-4" />
                  Select Your Role
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                  required
                >
                  <SelectTrigger className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient" className="bg-white p-2 rounded-none hover:bg-emerald-50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Patient
                      </div>
                    </SelectItem>
                    <SelectItem value="practitioner" className="bg-white p-2 rounded-none hover:bg-emerald-50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Practitioner
                      </div>
                    </SelectItem>
                    <SelectItem value="admin" className="bg-white p-2 rounded-none hover:bg-emerald-50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {formData.role && (
                  <p className="text-xs text-emerald-600 mt-1">
                    {getRoleDescription(formData.role)}
                  </p>
                )}
              </div>


              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked)}
                  className="border-emerald-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                />
                <Label htmlFor="terms" className="text-sm text-emerald-700 leading-relaxed">
                  I agree to the{" "}
                  <button type="button" className="text-emerald-600 hover:text-emerald-800 underline underline-offset-2">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-emerald-600 hover:text-emerald-800 underline underline-offset-2">
                    Privacy Policy
                  </button>
                </Label>
              </div>

              {/* Signup Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Leaf className="mr-2 h-4 w-4" />
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <Separator className="bg-emerald-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-3 text-sm text-emerald-600">or</span>
              </div>
            </div>

            {/* Google Signup Button */}
            <Button
              onClick={handleGoogleSignup}
              variant="outline"
              className="w-full border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 text-emerald-700 transition-all duration-200"
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </>
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center pt-4">

            <p className="text-sm text-emerald-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-700 hover:text-emerald-800 transition-colors duration-200 underline underline-offset-4"
              >
                Sign in here
              </Link>
            </p>

            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-emerald-600/80">
            Join thousands on their journey to holistic wellness
          </p>
        </div>
      </div>
    </div>
  );
}