import React, { useState, useEffect } from "react";

// shadcn/ui components
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// Custom components
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Icons (lucide-react)
import {
  Mail,
  MapPin,
  Phone,
  Leaf,
  Heart,
  Activity,
  BookOpen,
  LogOut,
  CalendarDays,
  Waves,
  Flame,
  Mountain,
  Sparkles,
  TrendingUp,
  User,
  LayoutDashboard,
  CalendarIcon,
  Clock,
  MessageSquare,
  Users,
  CheckCircle,
  Stethoscope,
  Star,
  RefreshCw,
  GraduationCap,
  Award,
  UserCheck,
  ThumbsUp,
  MapPin as LocationIcon,
  Bot,
  Send,
  X,
  Minimize2,
} from "lucide-react";

export default function Dashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [user, setUser] = useState({
    fullName: "Aman M",
    email: "aman.m@ayurveda.com",
    role: "patient",
    phone: "+1 (555) 987-6543",
    location: "California, USA",
    dateJoined: "March 2024",
    avatar: "",
    therapyProgress: 68,
    dominantDosha: "Vata",
    doshaBalance: {
      vata: 65,
      pitta: 25,
      kapha: 10,
    },
    currentTherapy: "Panchakarma Detox Program",
    nextAppointment: "Dec 28, 2024 at 2:00 PM",
    totalSessions: 12,
    completedSessions: 8,
    upcomingSessions: 4,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTherapy, setSelectedTherapy] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [success, setSuccess] = useState("");

  // AI Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Ayurvedic wellness assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

  // Load user data from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      if (savedRole === "practitioner") {
        setUser((prev) => ({
          ...prev,
          fullName: "Dr. Priya Sharma",
          email: "priya.sharma@ayurveda.com",
          role: "practitioner",
          location: "Mumbai, India",
          dateJoined: "January 2023",
        }));
      } else if (savedRole === "admin") {
        setUser((prev) => ({
          ...prev,
          fullName: "Rajesh Kumar",
          email: "admin@ayurveda.com",
          role: "admin",
          location: "Delhi, India",
          dateJoined: "October 2022",
        }));
      }
    }
  }, []);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "booking", label: "Book Session", icon: CalendarIcon },
    { id: "schedule", label: "My Schedule", icon: Clock },
    { id: "doctors", label: "Our Doctors", icon: Stethoscope },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
  ];

  const therapyTypes = [
    "Abhyanga (Oil Massage)",
    "Shirodhara (Oil Pouring)",
    "Panchakarma Detox",
    "Nasya (Nasal Therapy)",
    "Basti (Enema Therapy)",
    "Udvartana (Powder Massage)",
  ];

  const doctors = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      specialty: "Panchakarma Specialist",
      availability: ["09:00", "11:00", "14:00", "16:00"],
      experience: "15 years",
      qualification: "BAMS, MD (Ayurveda), PhD",
      patientsHealed: 2500,
      rating: 4.9,
      totalReviews: 342,
      languages: ["English", "Hindi", "Sanskrit"],
      location: "Mumbai, India",
      about:
        "Dr. Priya Sharma is a renowned Panchakarma specialist with over 15 years of experience in traditional Ayurvedic medicine. She has successfully treated thousands of patients with chronic conditions using authentic Ayurvedic therapies.",
      specializations: [
        "Panchakarma",
        "Chronic Pain Management",
        "Digestive Disorders",
        "Stress Management",
      ],
      consultationFee: "$150",
      education: [
        "BAMS - Government Ayurveda College, Mumbai (2008)",
        "MD (Ayurveda) - National Institute of Ayurveda, Jaipur (2011)",
        "PhD - Advanced Ayurvedic Research Institute (2015)",
      ],
      awards: [
        "Best Ayurvedic Practitioner Award 2023",
        "Excellence in Panchakarma Therapy 2022",
        "Traditional Medicine Research Award 2021",
      ],
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      specialty: "Ayurvedic Physician",
      availability: ["10:00", "13:00", "15:00", "17:00"],
      experience: "12 years",
      qualification: "BAMS, MD (Kayachikitsa)",
      patientsHealed: 1800,
      rating: 4.7,
      totalReviews: 256,
      languages: ["English", "Hindi", "Bengali"],
      location: "Delhi, India",
      about:
        "Dr. Rajesh Kumar specializes in internal medicine and has extensive experience in treating metabolic disorders, respiratory conditions, and cardiovascular diseases through Ayurvedic principles.",
      specializations: [
        "Internal Medicine",
        "Diabetes Management",
        "Respiratory Disorders",
        "Heart Health",
      ],
      consultationFee: "$120",
      education: [
        "BAMS - All India Institute of Ayurveda, Delhi (2011)",
        "MD (Kayachikitsa) - Rajiv Gandhi University, Bangalore (2014)",
      ],
      awards: [
        "Outstanding Physician Award 2022",
        "Research Excellence in Ayurveda 2021",
      ],
    },
    {
      id: "3",
      name: "Dr. Anita Patel",
      specialty: "Women's Health",
      availability: ["09:30", "12:00", "14:30", "16:30"],
      experience: "10 years",
      qualification: "BAMS, MD (Prasuti Tantra)",
      patientsHealed: 1200,
      rating: 4.8,
      totalReviews: 189,
      languages: ["English", "Hindi", "Gujarati"],
      location: "Ahmedabad, India",
      about:
        "Dr. Anita Patel is a specialist in women's health and reproductive medicine. She has helped hundreds of women with fertility issues, menstrual disorders, and pregnancy care using traditional Ayurvedic methods.",
      specializations: [
        "Women's Health",
        "Fertility Treatment",
        "Prenatal Care",
        "Menstrual Disorders",
      ],
      consultationFee: "$130",
      education: [
        "BAMS - Gujarat Ayurveda University, Jamnagar (2013)",
        "MD (Prasuti Tantra) - Institute of Post Graduate Ayurvedic Education & Research, Gujarat (2016)",
      ],
      awards: [
        "Women's Health Excellence Award 2023",
        "Best Gynecologist in Ayurveda 2022",
      ],
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      therapy: "Abhyanga Massage",
      doctor: "Dr. Priya Sharma",
      date: "Dec 28, 2024",
      time: "2:00 PM",
      status: "confirmed"
    },
    {
      id: 2,
      therapy: "Shirodhara",
      doctor: "Dr. Rajesh Kumar",
      date: "Jan 3, 2025",
      time: "10:00 AM",
      status: "pending"
    }
  ];

  const pastAppointments = [
    {
      id: 1,
      therapy: "Panchakarma Consultation",
      doctor: "Dr. Priya Sharma",
      date: "Dec 20, 2024",
      time: "11:00 AM",
      status: "completed",
      rating: 5
    },
    {
      id: 2,
      therapy: "Abhyanga Massage",
      doctor: "Dr. Anita Patel",
      date: "Dec 15, 2024",
      time: "3:00 PM",
      status: "completed",
      rating: 4
    }
  ];

  const handleBookAppointment = () => {
    if (!selectedTherapy || !selectedDoctor || !selectedTime || !selectedDate) {
      setSuccess("Please fill in all fields to book your appointment.");
      return;
    }
    setSuccess("Appointment booked successfully! You'll receive a confirmation email shortly.");
    // Reset form
    setSelectedTherapy("");
    setSelectedDoctor("");
    setSelectedTime("");
    setTimeout(() => setSuccess(""), 4000);
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText || feedbackRating === 0) {
      setSuccess("Please provide both a rating and feedback text.");
      return;
    }
    setSuccess("Thank you for your feedback! It helps us improve our services.");
    setFeedbackText("");
    setFeedbackRating(0);
    setTimeout(() => setSuccess(""), 4000);
  };

  const getDoshaIcon = (dosha) => {
    switch (dosha.toLowerCase()) {
      case "vata": return <Waves className="h-4 w-4" />;
      case "pitta": return <Flame className="h-4 w-4" />;
      case "kapha": return <Mountain className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const getDoshaColor = (dosha) => {
    switch (dosha.toLowerCase()) {
      case "vata": return "from-blue-400 to-purple-500";
      case "pitta": return "from-orange-400 to-red-500";
      case "kapha": return "from-green-400 to-emerald-500";
      default: return "from-gray-400 to-gray-500";
    }
  };

  const renderStars = (rating, interactive = false, onRate) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating 
              ? "fill-yellow-400 text-yellow-400" 
              : "text-gray-300"
          } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
          onClick={() => interactive && onRate && onRate(star)}
        />
      ))}
    </div>
  );
};


const handleSendMessage = () => {
  if (!currentMessage.trim()) return;

  const newMessage = {
    id: chatMessages.length + 1,
    text: currentMessage,
    sender: "user",
    timestamp: new Date(),
  };

  setChatMessages((prev) => [...prev, newMessage]);
  setCurrentMessage("");

  // Simulate AI response
  setTimeout(() => {
    const aiResponse = {
      id: chatMessages.length + 2,
      text: getAIResponse(currentMessage),
      sender: "ai",
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, aiResponse]);
  }, 1000);
};


  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("appointment") || lowerMessage.includes("book")) {
      return "I can help you book an appointment! You can go to the 'Book Session' section to schedule with our expert doctors. Would you like me to guide you through the available therapies?";
    } else if (lowerMessage.includes("doctor") || lowerMessage.includes("practitioner")) {
      return "Our clinic has experienced Ayurvedic doctors specializing in different areas. Dr. Priya Sharma is our Panchakarma expert, Dr. Rajesh Kumar focuses on internal medicine, and Dr. Anita Patel specializes in women's health. Check the 'Our Doctors' section for more details!";
    } else if (lowerMessage.includes("therapy") || lowerMessage.includes("treatment")) {
      return "We offer various Ayurvedic therapies including Abhyanga (oil massage), Shirodhara, Panchakarma detox, Nasya, Basti, and Udvartana. Each therapy has specific benefits for different health conditions. What specific health concern would you like to address?";
    } else if (lowerMessage.includes("dosha") || lowerMessage.includes("constitution")) {
      return "Your Ayurvedic constitution shows Vata dominance (65%). This means you might benefit from grounding practices, warm oil treatments, and regular routines. Panchakarma therapy can help balance your doshas effectively.";
    } else if (lowerMessage.includes("feedback") || lowerMessage.includes("review")) {
      return "You can share your experience in the 'Feedback' section. Your reviews help us improve our services and assist other patients in choosing the right treatments.";
    } else {
      return "I'm here to help with any questions about Ayurvedic treatments, booking appointments, or understanding your wellness journey. Feel free to ask about our doctors, therapies, or your treatment progress!";
    }
  };

  const renderAIChat = () => (
    <>
      {/* AI Chat Bubble */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* AI Chat Window */}
      {isChatOpen && (
        <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-2xl border border-emerald-200 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-80 h-96'
        }`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="text-sm">AI Wellness Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-3 max-h-64 overflow-y-auto">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-emerald-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about treatments, doctors, appointments..."
                    className="flex-1 px-3 py-2 border border-emerald-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-emerald-800">Welcome back, {user.fullName.split(' ')[0]}!</h1>
          <p className="text-emerald-600">Track your wellness journey and manage your sessions</p>
        </div>
        <Button variant="outline" className="border-emerald-200 text-emerald-700">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Upcoming Sessions</p>
                <p className="text-3xl">{user.upcomingSessions}</p>
                <p className="text-emerald-200 text-sm">Sessions scheduled</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Leaf className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Sessions</p>
                <p className="text-3xl">{user.totalSessions}</p>
                <p className="text-blue-200 text-sm">All time bookings</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Activity className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Completed</p>
                <p className="text-3xl">{user.completedSessions}</p>
                <p className="text-yellow-200 text-sm">Sessions finished</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Star className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Overview & Current Therapy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <User className="h-5 w-5" />
              Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar} alt={user.fullName} />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                  {user.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl text-emerald-800">{user.fullName}</h3>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  Patient
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <Phone className="h-4 w-4" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CalendarDays className="h-4 w-4" />
                <span>Joined {user.dateJoined}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <Heart className="h-5 w-5" />
              Current Therapy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="text-emerald-800 mb-2">{user.currentTherapy}</h4>
              <p className="text-emerald-600 text-sm mb-3">
                A comprehensive detoxification program designed to eliminate toxins and restore balance to your body and mind.
              </p>
              <div className="flex items-center gap-2 text-emerald-700">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Next: {user.nextAppointment}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Therapy Progress & Ayurvedic Constitution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <TrendingUp className="h-5 w-5" />
              Treatment Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl text-emerald-700 mb-2">{user.therapyProgress}%</div>
              <p className="text-emerald-600 mb-4">{user.completedSessions} of {user.totalSessions} Sessions</p>
              <Progress value={user.therapyProgress} className="h-3" />
            </div>
            <div className="text-center text-sm text-emerald-600">
              Complete more sessions to track progress
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <Sparkles className="h-5 w-5" />
              Ayurvedic Constitution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(user.doshaBalance).map(([dosha, percentage]) => (
              <div key={dosha} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${getDoshaColor(dosha)}`}>
                      {getDoshaIcon(dosha)}
                    </div>
                    <span className="capitalize text-emerald-700">{dosha}</span>
                  </div>
                  <span className="text-emerald-600">{percentage}%</span>
                </div>
                <Progress value={Number(percentage)} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
              <div className="p-2 bg-emerald-200 rounded-full">
                <Leaf className="h-4 w-4 text-emerald-700" />
              </div>
              <div className="flex-1">
                <p className="text-emerald-800">Completed Abhyanga therapy session</p>
                <p className="text-emerald-600 text-sm">Today at 10:30 AM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-200 rounded-full">
                <BookOpen className="h-4 w-4 text-blue-700" />
              </div>
              <div className="flex-1">
                <p className="text-blue-800">Daily meditation practice logged</p>
                <p className="text-blue-600 text-sm">Yesterday at 6:00 AM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="p-2 bg-orange-200 rounded-full">
                <Heart className="h-4 w-4 text-orange-700" />
              </div>
              <div className="flex-1">
                <p className="text-orange-800">Health assessment completed</p>
                <p className="text-orange-600 text-sm">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBooking = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-emerald-800 mb-2">Book a Session</h2>
        <p className="text-emerald-600">Schedule your next Ayurvedic therapy session</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-emerald-800">Session Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-emerald-700">Therapy Type</Label>
              <Select value={selectedTherapy} onValueChange={setSelectedTherapy}>
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Select therapy type" />
                </SelectTrigger>
                <SelectContent>
                  {therapyTypes.map((therapy) => (
                    <SelectItem key={therapy} value={therapy}>
                      {therapy}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-emerald-700">Select Doctor</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Choose your practitioner" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div>
                        <div>{doctor.name}</div>
                        <div className="text-sm text-gray-500">{doctor.specialty}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDoctor && (
              <div className="space-y-2">
                <Label className="text-emerald-700">Available Time Slots</Label>
                <div className="grid grid-cols-2 gap-2">
                  {doctors.find(d => d.id === selectedDoctor)?.availability.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`${
                        selectedTime === time 
                          ? "bg-emerald-600 hover:bg-emerald-700" 
                          : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={handleBookAppointment}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </CardContent>
        </Card>

       <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
  <CardHeader>
    <CardTitle className="text-emerald-800">Select Date</CardTitle>
  </CardHeader>
  <CardContent>
    <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
      minDate={new Date()}
      className="rounded-md border border-emerald-200"
    />
  </CardContent>
</Card>

      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-emerald-800 mb-2">My Schedule</h2>
        <p className="text-emerald-600">View your past and upcoming therapy sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <Clock className="h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border border-emerald-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-emerald-800">{appointment.therapy}</h4>
                    <Badge className={`${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 text-sm mb-1">
                    <Users className="h-4 w-4" />
                    <span>{appointment.doctor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{appointment.date} at {appointment.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <CheckCircle className="h-5 w-5" />
              Past Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border border-emerald-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-emerald-800">{appointment.therapy}</h4>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 text-sm mb-1">
                    <Stethoscope className="h-4 w-4" />
                    <span>{appointment.doctor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 text-sm mb-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{appointment.date} at {appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 text-sm">Rating:</span>
                    {renderStars(appointment.rating || 0)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDoctors = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-emerald-800 mb-2">Our Expert Doctors</h2>
        <p className="text-emerald-600">Meet our experienced Ayurvedic practitioners</p>
      </div>

      {/* Compact Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="border-0 bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Doctor Header */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="" alt={doctor.name} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-emerald-800 truncate">{doctor.name}</h3>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                      {doctor.specialty}
                    </Badge>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  {renderStars(doctor.rating)}
                  <span className="text-emerald-600 text-sm">
                    {doctor.rating} ({doctor.totalReviews})
                  </span>
                </div>

                {/* Key Stats */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600">Experience:</span>
                    <span className="text-emerald-800">{doctor.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600">Patients Healed:</span>
                    <span className="text-emerald-800">{doctor.patientsHealed.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600">Consultation:</span>
                    <span className="text-emerald-800">{doctor.consultationFee}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-emerald-600 text-sm">
                  <LocationIcon className="h-4 w-4" />
                  <span>{doctor.location}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Book Consultation
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Book Consultation with {doctor.name}</DialogTitle>
                        <DialogDescription>
                          Schedule a consultation session with {doctor.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Available Time Slots</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {doctor.availability.map((time) => (
                              <Button
                                key={time}
                                variant="outline"
                                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                          Confirm Booking
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                        <User className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="" alt={doctor.name} />
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-emerald-800">{doctor.name}</h3>
                            <p className="text-emerald-600">{doctor.specialty}</p>
                          </div>
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6 py-4">
                        {/* About */}
                        <div>
                          <h4 className="text-emerald-800 mb-2">About</h4>
                          <p className="text-emerald-700 text-sm leading-relaxed">{doctor.about}</p>
                        </div>

                        {/* Key Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-emerald-700">
                              <GraduationCap className="h-4 w-4" />
                              <span>{doctor.qualification}</span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-700">
                              <Award className="h-4 w-4" />
                              <span>{doctor.experience} experience</span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-700">
                              <UserCheck className="h-4 w-4" />
                              <span>{doctor.patientsHealed.toLocaleString()} patients healed</span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-700">
                              <LocationIcon className="h-4 w-4" />
                              <span>{doctor.location}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              {renderStars(doctor.rating)}
                              <span className="text-emerald-600 text-sm">
                                {doctor.rating} ({doctor.totalReviews} reviews)
                              </span>
                            </div>
                            <div className="pt-2">
                              <p className="text-emerald-700 text-lg">{doctor.consultationFee}</p>
                              <p className="text-emerald-600 text-sm">Consultation Fee</p>
                            </div>
                          </div>
                        </div>

                        {/* Specializations and Languages */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-emerald-800 mb-2">Specializations</h4>
                            <div className="flex flex-wrap gap-2">
                              {doctor.specializations.map((spec, index) => (
                                <Badge key={index} variant="outline" className="border-emerald-200 text-emerald-700">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-emerald-800 mb-2">Languages</h4>
                            <div className="flex flex-wrap gap-2">
                              {doctor.languages.map((lang, index) => (
                                <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Education */}
                        <div>
                          <h4 className="text-emerald-800 mb-2">Education</h4>
                          <div className="space-y-1">
                            {doctor.education.map((edu, index) => (
                              <p key={index} className="text-emerald-700 text-sm">• {edu}</p>
                            ))}
                          </div>
                        </div>

                        {/* Awards */}
                        <div>
                          <h4 className="text-emerald-800 mb-2">Awards & Recognition</h4>
                          <div className="space-y-1">
                            {doctor.awards.map((award, index) => (
                              <p key={index} className="text-emerald-700 text-sm flex items-center gap-2">
                                <Award className="h-3 w-3" />
                                {award}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          Book Consultation
                        </Button>
                        <Button variant="outline" className="border-emerald-200 text-emerald-700">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overall Statistics */}
      <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <ThumbsUp className="h-5 w-5" />
            Our Healthcare Excellence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl text-emerald-700">
                {doctors.reduce((sum, doctor) => sum + doctor.patientsHealed, 0).toLocaleString()}
              </div>
              <p className="text-emerald-600">Total Patients Healed</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl text-emerald-700">
                {(doctors.reduce((sum, doctor) => sum + doctor.rating, 0) / doctors.length).toFixed(1)}
              </div>
              <p className="text-emerald-600">Average Rating</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl text-emerald-700">
                {doctors.reduce((sum, doctor) => sum + parseInt(doctor.experience), 0)}+
              </div>
              <p className="text-emerald-600">Years Combined Experience</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl text-emerald-700">
                {doctors.reduce((sum, doctor) => sum + doctor.totalReviews, 0)}
              </div>
              <p className="text-emerald-600">Patient Reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-emerald-800 mb-2">Feedback</h2>
        <p className="text-emerald-600">Share your experience and help us improve our services</p>
      </div>

      <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <MessageSquare className="h-5 w-5" />
            Submit Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-emerald-700">Overall Rating</Label>
            <div className="flex items-center gap-2">
              {renderStars(feedbackRating, true, setFeedbackRating)}
              <span className="text-emerald-600 text-sm ml-2">
                {feedbackRating > 0 && `${feedbackRating} star${feedbackRating > 1 ? 's' : ''}`}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-emerald-700">Your Feedback</Label>
            <Textarea
              placeholder="Tell us about your experience with the therapy and practitioner..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="border-emerald-200 focus:border-emerald-500 min-h-[120px]"
            />
          </div>

          <Button 
            onClick={handleSubmitFeedback}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <Star className="h-5 w-5" />
            Your Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-emerald-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-emerald-800">Abhyanga Massage Session</h4>
                  <p className="text-emerald-600 text-sm">Dr. Anita Patel • Dec 15, 2024</p>
                </div>
                {renderStars(4)}
              </div>
              <p className="text-emerald-700 text-sm">
                "Wonderful session! Dr. Patel was very knowledgeable and the massage was deeply relaxing. I felt much better afterwards."
              </p>
            </div>

            <div className="p-4 border border-emerald-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-emerald-800">Panchakarma Consultation</h4>
                  <p className="text-emerald-600 text-sm">Dr. Priya Sharma • Dec 20, 2024</p>
                </div>
                {renderStars(5)}
              </div>
              <p className="text-emerald-700 text-sm">
                "Excellent consultation! Dr. Sharma provided detailed explanations and a comprehensive treatment plan. Highly recommended."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return renderDashboard();
      case "booking": return renderBooking();
      case "schedule": return renderSchedule();
      case "doctors": return renderDoctors();
      case "feedback": return renderFeedback();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1730977806307-3351cb73a9b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMG1lZGl0YXRpb24lMjB0aGVyYXB5fGVufDF8fHx8MTc1ODgyMTEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Ayurveda background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Sidebar */}
      <div className="relative z-10 w-64 bg-white/95 backdrop-blur-sm shadow-xl border-r border-emerald-200">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg text-emerald-800">AyurSutra</h1>
              <p className="text-emerald-600 text-sm">Wellness Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-emerald-600 text-white shadow-lg" 
                      : "text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.fullName} />
                  <AvatarFallback className="bg-emerald-600 text-white text-sm">
                    {user.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-emerald-800 text-sm truncate">{user.fullName}</p>
                  <p className="text-emerald-600 text-xs">{user.role}</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => onLogout && onLogout()}
              variant="outline"
              className="w-full border-red-200 text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl text-emerald-800">Patient Dashboard</h1>
            <p className="text-emerald-600">Patient Portal</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-emerald-200 text-emerald-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {success && (
          <Alert className="mb-6 border-emerald-200 bg-emerald-50">
            <AlertDescription className="text-emerald-700">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Content */}
        {renderContent()}
      </div>

      {/* AI Chat Component */}
      {renderAIChat()}
    </div>
  );
}