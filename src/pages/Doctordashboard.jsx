import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { auth } from "../firebase"; // ✅ Import auth from your firebase config
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Alert, AlertDescription } from "../components/ui/alert";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "../components/ui/sheet";
import {
  Leaf,
  LogOut,
  Calendar,
  Clock,
  User,
  Phone,
  Star,
  MessageSquare,
  Activity,
  CheckCircle,
  TrendingUp,
  Users,
  FileText,
  Menu,
  Plus,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Mock data for demonstration
const todaysAppointments = [
  {
    id: 1,
    patientName: "Priya Sharma",
    patientAge: 32,
    patientGender: "Female",
    phone: "+91 98765 43210",
    time: "09:00 AM",
    treatment: "Abhyanga Massage",
    duration: "60 min",
    notes: "First session, stress relief",
    status: "upcoming",
    avatar: "PS",
  },
  {
    id: 2,
    patientName: "Rajesh Kumar",
    patientAge: 45,
    patientGender: "Male",
    phone: "+91 87654 32109",
    time: "11:00 AM",
    treatment: "Shirodhara Therapy",
    duration: "90 min",
    notes: "Follow-up session, chronic headaches",
    status: "completed",
    avatar: "RK",
  },
  {
    id: 3,
    patientName: "Anita Desai",
    patientAge: 28,
    patientGender: "Female",
    phone: "+91 76543 21098",
    time: "02:30 PM",
    treatment: "Panchakarma Detox",
    duration: "120 min",
    notes: "Week 2 of detox program",
    status: "upcoming",
    avatar: "AD",
  },
  {
    id: 4,
    patientName: "Vikram Singh",
    patientAge: 38,
    patientGender: "Male",
    phone: "+91 65432 10987",
    time: "04:00 PM",
    treatment: "Ayurvedic Consultation",
    duration: "45 min",
    notes: "New patient consultation",
    status: "upcoming",
    avatar: "VS",
  },
];

const pastPatients = [
  {
    id: 1,
    name: "Meera Patel",
    age: 35,
    lastVisit: "2025-01-25",
    totalSessions: 8,
    treatment: "Stress Management Program",
    improvement: "85%",
    phone: "+91 98765 12345",
    avatar: "MP",
  },
  {
    id: 2,
    name: "Arjun Reddy",
    age: 42,
    lastVisit: "2025-01-23",
    totalSessions: 12,
    treatment: "Joint Pain Relief",
    improvement: "70%",
    phone: "+91 87654 23456",
    avatar: "AR",
  },
  {
    id: 3,
    name: "Kavya Nair",
    age: 29,
    lastVisit: "2025-01-20",
    totalSessions: 6,
    treatment: "Skin Health Program",
    improvement: "92%",
    phone: "+91 76543 34567",
    avatar: "KN",
  },
  {
    id: 4,
    name: "Suresh Gupta",
    age: 55,
    lastVisit: "2025-01-18",
    totalSessions: 15,
    treatment: "Digestive Health",
    improvement: "78%",
    phone: "+91 65432 45678",
    avatar: "SG",
  },
  {
    id: 5,
    name: "Anjali Joshi",
    age: 31,
    lastVisit: "2025-01-15",
    totalSessions: 9,
    treatment: "Respiratory Wellness",
    improvement: "88%",
    phone: "+91 54321 09876",
    avatar: "AJ",
  },
  {
    id: 6,
    name: "Ramesh Iyer",
    age: 48,
    lastVisit: "2025-01-12",
    totalSessions: 20,
    treatment: "Cardiac Health Program",
    improvement: "75%",
    phone: "+91 43210 98765",
    avatar: "RI",
  },
  {
    id: 7,
    name: "Deepika Sinha",
    age: 26,
    lastVisit: "2025-01-10",
    totalSessions: 5,
    treatment: "Women's Health Care",
    improvement: "90%",
    phone: "+91 32109 87654",
    avatar: "DS",
  },
  {
    id: 8,
    name: "Vinod Sharma",
    age: 52,
    lastVisit: "2025-01-08",
    totalSessions: 18,
    treatment: "Diabetes Management",
    improvement: "82%",
    phone: "+91 21098 76543",
    avatar: "VS",
  },
];

const feedbackData = [
  {
    id: 1,
    patientName: "Priya Sharma",
    rating: 5,
    comment:
      "Excellent treatment! The Abhyanga massage was incredibly relaxing and helped with my stress levels significantly.",
    date: "2025-01-25",
    treatment: "Abhyanga Massage",
    avatar: "PS",
  },
  {
    id: 2,
    patientName: "Rajesh Kumar",
    rating: 4,
    comment:
      "Very good session. The Shirodhara therapy has helped reduce my headaches. Looking forward to the next session.",
    date: "2025-01-24",
    treatment: "Shirodhara Therapy",
    avatar: "RK",
  },
  {
    id: 3,
    patientName: "Meera Patel",
    rating: 5,
    comment:
      "Dr. has been amazing throughout my stress management program. Highly recommend!",
    date: "2025-01-23",
    treatment: "Stress Management",
    avatar: "MP",
  },
  {
    id: 4,
    patientName: "Kavya Nair",
    rating: 5,
    comment:
      "The skin health program exceeded my expectations. My skin feels amazing and the natural approach works wonderfully.",
    date: "2025-01-22",
    treatment: "Skin Health Program",
    avatar: "KN",
  },
];

export default function DoctorDashboard() {
  const [activeView, setActiveView] = useState("today");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  // ✅ Updated handleLogout function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/"); // Redirect to the homepage after successful logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "upcoming":
        return "bg-blue-500";
      case "in-progress":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTodaysStats = () => {
    const todayTotal = todaysAppointments.length;
    const completed = todaysAppointments.filter(
      (apt) => apt.status === "completed"
    ).length;
    const upcoming = todaysAppointments.filter(
      (apt) => apt.status === "upcoming"
    ).length;
    const totalSessions =
      pastPatients.reduce((sum, patient) => sum + patient.totalSessions, 0) +
      completed;
    return { todayTotal, completed, upcoming, totalSessions };
  };

  const stats = getTodaysStats();

  const navigationItems = [
    {
      id: "today",
      label: "Today's Schedule",
      icon: Calendar,
      count: stats.todayTotal,
    },
    {
      id: "patients",
      label: "Past Patients",
      icon: Users,
      count: pastPatients.length,
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: MessageSquare,
      count: feedbackData.length,
    },
  ];

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-emerald-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-emerald-800 font-semibold">Dashboard</h2>
            <p className="text-sm text-emerald-600">Practitioner Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  if (mobile) setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  activeView === item.id
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <Badge
                  className={`${
                    activeView === item.id
                      ? "bg-emerald-400 text-emerald-900"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {item.count}
                </Badge>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-emerald-200">
        <div className="space-y-2">
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
          <Button
            variant="outline"
            className="w-full border-emerald-200 hover:bg-emerald-50"
            size="sm"
          >
            <User className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-emerald-200">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          size="sm"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-emerald-200 lg:bg-white/95 lg:backdrop-blur-sm">
          <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent
            side="left"
            className="w-72 p-0 bg-white/95 backdrop-blur-sm"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Practitioner dashboard navigation and statistics
            </SheetDescription>
            <SidebarContent mobile />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <header className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-emerald-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-emerald-200"
                    >
                      <Menu className="h-5 w-5 text-emerald-700" />
                    </Button>
                  </SheetTrigger>
                </Sheet>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
                    <Leaf className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg text-emerald-800 font-semibold">
                      Dashboard
                    </h1>
                    <Badge className="bg-emerald-500 text-white text-xs">
                      Practitioner
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Desktop Header */}
          <header className="hidden lg:block bg-white/95 backdrop-blur-sm border-b border-emerald-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-emerald-800 font-semibold">
                  {navigationItems.find((item) => item.id === activeView)?.label}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-emerald-500 text-white">
                    Practitioner
                  </Badge>
                  <span className="text-sm text-emerald-600">
                    {new Date().toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Desktop Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white px-4 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    <div>
                      <p className="text-xs opacity-90">Total Sessions</p>
                      <p className="text-xl font-bold">{stats.totalSessions}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <div>
                      <p className="text-xs opacity-90">Today's Total</p>
                      <p className="text-xl font-bold">{stats.todayTotal}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <div>
                      <p className="text-xs opacity-90">Completed</p>
                      <p className="text-xl font-bold">{stats.completed}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <div>
                      <p className="text-xs opacity-90">Upcoming</p>
                      <p className="text-xl font-bold">{stats.upcoming}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto">
            <div className="p-4 lg:p-6">
              {/* Mobile Quick Stats */}
              <div className="lg:hidden grid grid-cols-2 gap-3 mb-6">
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-xs">
                          Total Sessions
                        </p>
                        <p className="text-lg font-bold">
                          {stats.totalSessions}
                        </p>
                      </div>
                      <Activity className="h-6 w-6 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-xs">Today's Total</p>
                        <p className="text-lg font-bold">{stats.todayTotal}</p>
                      </div>
                      <Calendar className="h-6 w-6 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-xs">Completed</p>
                        <p className="text-lg font-bold">{stats.completed}</p>
                      </div>
                      <CheckCircle className="h-6 w-6 text-green-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-xs">Upcoming</p>
                        <p className="text-lg font-bold">{stats.upcoming}</p>
                      </div>
                      <Clock className="h-6 w-6 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content based on active view */}
              {activeView === "today" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <Calendar className="h-5 w-5" />
                      <h2 className="text-lg font-semibold">
                        Today's Appointments
                      </h2>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {todaysAppointments.length} appointments
                    </Badge>
                  </div>

                  <div className="grid gap-6">
                    {todaysAppointments.map((apt) => (
                      <Card
                        key={apt.id}
                        className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12 ring-2 ring-emerald-100">
                                <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-green-500 text-white font-semibold">
                                  {apt.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-emerald-800">
                                  {apt.patientName}
                                </h3>
                                <p className="text-sm text-emerald-600">
                                  {apt.patientAge} yrs • {apt.patientGender}
                                </p>
                                <p className="text-sm text-emerald-600 flex items-center gap-1 mt-1">
                                  <Phone className="h-3 w-3" /> {apt.phone}
                                </p>
                              </div>
                            </div>
                            <Badge
                              className={`${
                                apt.status === "completed"
                                  ? "bg-gradient-to-r from-green-500 to-green-600"
                                  : apt.status === "upcoming"
                                  ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                  : "bg-gradient-to-r from-yellow-500 to-yellow-600"
                              } text-white shadow-lg`}
                            >
                              {apt.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span className="text-xs text-blue-600 font-medium">
                                  Schedule
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-blue-800">
                                {apt.time}
                              </p>
                              <p className="text-xs text-blue-600">
                                {apt.duration}
                              </p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                              <div className="flex items-center gap-2 mb-1">
                                <Activity className="h-4 w-4 text-purple-600" />
                                <span className="text-xs text-purple-600 font-medium">
                                  Treatment
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-purple-800">
                                {apt.treatment}
                              </p>
                            </div>
                          </div>

                          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                            <p className="text-xs text-emerald-600 font-medium mb-1">
                              Notes
                            </p>
                            <p className="text-sm text-emerald-700 italic">
                              "{apt.notes}"
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeView === "patients" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <Users className="h-5 w-5" />
                      <h2 className="text-lg font-semibold">Past Patients</h2>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {pastPatients.length} patients
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {pastPatients.map((patient) => (
                      <Card
                        key={patient.id}
                        className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-12 w-12 ring-2 ring-emerald-100">
                              <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-green-500 text-white font-semibold">
                                {patient.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-emerald-800">
                                {patient.name}
                              </h3>
                              <p className="text-sm text-emerald-600">
                                {patient.age} years old
                              </p>
                            </div>
                            <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200">
                              {patient.improvement}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                              <p className="text-sm text-emerald-700 font-medium mb-1">
                                Treatment Program
                              </p>
                              <p className="text-sm text-emerald-600">
                                {patient.treatment}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <div className="flex items-center gap-2 mb-1">
                                  <Activity className="h-4 w-4 text-blue-600" />
                                  <span className="text-xs text-blue-600 font-medium">
                                    Sessions
                                  </span>
                                </div>
                                <p className="text-sm font-semibold text-blue-800">
                                  {patient.totalSessions}
                                </p>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                <div className="flex items-center gap-2 mb-1">
                                  <Calendar className="h-4 w-4 text-purple-600" />
                                  <span className="text-xs text-purple-600 font-medium">
                                    Last Visit
                                  </span>
                                </div>
                                <p className="text-xs font-semibold text-purple-800">
                                  {new Date(
                                    patient.lastVisit
                                  ).toLocaleDateString("en-IN", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-emerald-100">
                              <div className="flex items-center gap-2 text-emerald-600">
                                <Phone className="h-3 w-3" />
                                <span className="text-xs">{patient.phone}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeView === "feedback" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <MessageSquare className="h-5 w-5" />
                      <h2 className="text-lg font-semibold">
                        Patient Feedback
                      </h2>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {feedbackData.length} reviews
                    </Badge>
                  </div>

                  <div className="grid gap-6">
                    {feedbackData.map((feedback) => (
                      <Card
                        key={feedback.id}
                        className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12 ring-2 ring-emerald-100">
                                <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-green-500 text-white font-semibold">
                                  {feedback.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-emerald-800">
                                  {feedback.patientName}
                                </h3>
                                <p className="text-sm text-emerald-600">
                                  {feedback.treatment}
                                </p>
                                <p className="text-xs text-emerald-500 mt-1">
                                  {new Date(feedback.date).toLocaleDateString(
                                    "en-IN",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-lg border border-yellow-200">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < feedback.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-yellow-700 mt-1 text-center font-medium">
                                {feedback.rating}/5
                              </p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-100">
                            <p className="text-sm text-emerald-700 italic leading-relaxed">
                              "{feedback.comment}"
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}