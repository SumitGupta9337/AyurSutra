import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../components/ui/sheet";
import {
  Shield,
  LogOut,
  Calendar,
  User,
  Star,
  Activity,
  CheckCircle,
  TrendingUp,
  Users,
  Menu,
  Plus,
  DollarSign,
  BarChart3,
  Settings,
  UserPlus,
  Stethoscope,
  AlertTriangle,
  Eye,
  IndianRupee
} from "lucide-react";

// Mock data for admin dashboard
const clinicStats = {
  totalPatients: 847,
  activePractitioners: 12,
  todayAppointments: 45,
  monthlyRevenue: 125000,
  patientSatisfaction: 4.8,
  completionRate: 92
};

const practitioners = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialization: "Panchakarma Specialist",
    patients: 145,
    rating: 4.9,
    experience: "8 years",
    status: "active",
    todaySchedule: 8,
    avatar: "PS"
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialization: "Ayurvedic Physician",
    patients: 98,
    rating: 4.7,
    experience: "5 years",
    status: "active",
    todaySchedule: 6,
    avatar: "RK"
  },
  {
    id: 3,
    name: "Dr. Anita Desai",
    specialization: "Herbal Medicine",
    patients: 67,
    rating: 4.8,
    experience: "3 years",
    status: "active",
    todaySchedule: 4,
    avatar: "AD"
  },
  {
    id: 4,
    name: "Dr. Vikram Singh",
    specialization: "Yoga Therapy",
    patients: 89,
    rating: 4.6,
    experience: "6 years",
    status: "on-leave",
    todaySchedule: 0,
    avatar: "VS"
  }
];

const recentPatients = [
  {
    id: 1,
    name: "Meera Patel",
    age: 35,
    practitioner: "Dr. Priya Sharma",
    lastVisit: "2025-01-29",
    status: "active",
    treatment: "Stress Management",
    phone: "+91 98765 12345",
    avatar: "MP"
  },
  {
    id: 2,
    name: "Arjun Reddy",
    age: 42,
    practitioner: "Dr. Rajesh Kumar",
    lastVisit: "2025-01-28",
    status: "completed",
    treatment: "Joint Pain Relief",
    phone: "+91 87654 23456",
    avatar: "AR"
  },
  {
    id: 3,
    name: "Kavya Nair",
    age: 29,
    practitioner: "Dr. Anita Desai",
    lastVisit: "2025-01-27",
    status: "active",
    treatment: "Skin Health Program",
    phone: "+91 76543 34567",
    avatar: "KN"
  }
];

const revenueData = [
  { month: "Jan", revenue: 125000, patients: 180 },
  { month: "Dec", revenue: 118000, patients: 165 },
  { month: "Nov", revenue: 132000, patients: 195 },
  { month: "Oct", revenue: 128000, patients: 178 }
];

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Staff Schedule Conflict",
    message: "Dr. Vikram Singh has overlapping appointments on Friday",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "info",
    title: "New Patient Registration",
    message: "15 new patients registered this week",
    time: "4 hours ago"
  },
  {
    id: 3,
    type: "success",
    title: "Monthly Target Achieved",
    message: "Revenue target for January completed",
    time: "1 day ago"
  }
];


export default function AdminDashboard({ onSwitchRole, onLogout }) {
  const [activeView, setActiveView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3, count: null },
    { id: "practitioners", label: "Practitioners", icon: Stethoscope, count: practitioners.length },
    { id: "patients", label: "All Patients", icon: Users, count: clinicStats.totalPatients },
    { id: "revenue", label: "Revenue", icon: IndianRupee, count: null },
    { id: "alerts", label: "Alerts", icon: AlertTriangle, count: alerts.length },
    { id: "settings", label: "Settings", icon: Settings, count: null }
  ];

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-emerald-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-emerald-800 font-semibold">Admin Panel</h2>
            <p className="text-sm text-emerald-600">Clinic Management</p>
          </div>
        </div>
      </div>
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
                {item.count && (
                  <Badge className={`${activeView === item.id ? "bg-emerald-400 text-emerald-900" : "bg-emerald-100 text-emerald-700"}`}>
                    {item.count}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-emerald-200">
        <Button onClick={() => onSwitchRole("practitioner")} variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50" size="sm">
          <User className="h-4 w-4 mr-2" />
          Switch to Practitioner
        </Button>
      </div>
      <div className="p-4 border-t border-emerald-200">
        <Button onClick={onLogout} variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300" size="sm">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="flex h-screen">
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-emerald-200 lg:bg-white/95 lg:backdrop-blur-sm">
          <SidebarContent />
        </div>
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-72 p-0 bg-white/95 backdrop-blur-sm">
            <SheetTitle className="sr-only">Admin Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Admin dashboard navigation and clinic statistics</SheetDescription>
            <SidebarContent mobile />
          </SheetContent>
        </Sheet>
        <div className="flex-1 flex flex-col min-w-0">
          <header className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-emerald-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="border-emerald-200">
                      <Menu className="h-5 w-5 text-emerald-700" />
                    </Button>
                  </SheetTrigger>
                </Sheet>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg text-emerald-800 font-semibold">Admin Panel</h1>
                    <Badge className="bg-emerald-500 text-white text-xs">Administrator</Badge>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <header className="hidden lg:block bg-white/95 backdrop-blur-sm border-b border-emerald-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-emerald-800 font-semibold">{navigationItems.find(item => item.id === activeView)?.label}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-emerald-500 text-white">Administrator</Badge>
                  <span className="text-sm text-emerald-600">
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <div>
                      <p className="text-xs opacity-90">Patients</p>
                      <p className="text-xl font-bold">{clinicStats.totalPatients}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    <div>
                      <p className="text-xs opacity-90">Practitioners</p>
                      <p className="text-xl font-bold">{clinicStats.activePractitioners}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white px-4 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
                    <div>
                      <p className="text-xs opacity-90">Revenue</p>
                      <p className="text-xl font-bold">₹{(clinicStats.monthlyRevenue / 1000).toFixed(0)}k</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-lime-500 to-lime-600 text-white px-4 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    <div>
                      <p className="text-xs opacity-90">Rating</p>
                      <p className="text-xl font-bold">{clinicStats.patientSatisfaction}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="p-4 lg:p-6">
              {activeView === "overview" && (
                // Overview Content
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-emerald-600 mb-1">Today's Appointments</p><p className="text-2xl font-bold text-emerald-800">{clinicStats.todayAppointments}</p><p className="text-xs text-green-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" />+12% from yesterday</p></div><Calendar className="h-8 w-8 text-emerald-500" /></div></CardContent></Card>
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-green-600 mb-1">Completion Rate</p><p className="text-2xl font-bold text-green-800">{clinicStats.completionRate}%</p><p className="text-xs text-green-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" />+3% this month</p></div><CheckCircle className="h-8 w-8 text-green-500" /></div></CardContent></Card>
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-teal-600 mb-1">Monthly Revenue</p><p className="text-2xl font-bold text-teal-800">₹{(clinicStats.monthlyRevenue / 1000).toFixed(0)}k</p><p className="text-xs text-green-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" />+8% from last month</p></div><IndianRupee className="h-8 w-8 text-teal-500" /></div></CardContent></Card>
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-lime-600 mb-1">Patient Satisfaction</p><p className="text-2xl font-bold text-lime-800">{clinicStats.patientSatisfaction}/5</p><p className="text-xs text-green-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" />+0.2 this month</p></div><Star className="h-8 w-8 text-lime-500" /></div></CardContent></Card>
                  </div>
                  {/* Recent Alerts */}
                  <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"><CardHeader><div className="flex items-center justify-between"><CardTitle className="text-emerald-800">Recent Alerts</CardTitle><Badge className="bg-emerald-100 text-emerald-700">{alerts.length} active</Badge></div></CardHeader><CardContent><div className="space-y-4">{alerts.map((alert) => (<div key={alert.id} className={`p-4 rounded-lg border ${alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : alert.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}><div className="flex items-start justify-between"><div className="flex items-start gap-3"><AlertTriangle className={`h-5 w-5 mt-0.5 ${alert.type === 'warning' ? 'text-yellow-600' : alert.type === 'success' ? 'text-green-600' : 'text-blue-600'}`} /><div><h4 className={`font-medium ${alert.type === 'warning' ? 'text-yellow-800' : alert.type === 'success' ? 'text-green-800' : 'text-blue-800'}`}>{alert.title}</h4><p className={`text-sm ${alert.type === 'warning' ? 'text-yellow-700' : alert.type === 'success' ? 'text-green-700' : 'text-blue-700'}`}>{alert.message}</p></div></div><span className="text-xs text-gray-500">{alert.time}</span></div></div>))}</div></CardContent></Card>
                </div>
              )}
              {activeView === "practitioners" && (
                // Practitioners Content
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800"><Stethoscope className="h-5 w-5" /><h2 className="text-lg font-semibold">Practitioners Management</h2></div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white"><UserPlus className="h-4 w-4 mr-2" />Add Practitioner</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{practitioners.map((practitioner) => (<Card key={practitioner.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"><CardContent className="p-6"><div className="flex items-start justify-between mb-4"><div className="flex items-start gap-4"><Avatar className="h-12 w-12 ring-2 ring-emerald-100"><AvatarFallback className="bg-gradient-to-br from-emerald-400 to-green-500 text-white font-semibold">{practitioner.avatar}</AvatarFallback></Avatar><div><h3 className="font-semibold text-emerald-800">{practitioner.name}</h3><p className="text-sm text-emerald-600">{practitioner.specialization}</p><p className="text-xs text-emerald-500 mt-1">{practitioner.experience} experience</p></div></div><Badge className={`${practitioner.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{practitioner.status}</Badge></div><div className="grid grid-cols-3 gap-4 mb-4"><div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-center"><p className="text-lg font-bold text-emerald-800">{practitioner.patients}</p><p className="text-xs text-emerald-600">Patients</p></div><div className="bg-green-50 p-3 rounded-lg border border-green-100 text-center"><p className="text-lg font-bold text-green-800">{practitioner.rating}</p><p className="text-xs text-green-600">Rating</p></div><div className="bg-teal-50 p-3 rounded-lg border border-teal-100 text-center"><p className="text-lg font-bold text-teal-800">{practitioner.todaySchedule}</p><p className="text-xs text-teal-600">Today</p></div></div><div className="flex gap-2"><Button variant="outline" size="sm" className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"><Eye className="h-4 w-4 mr-2" />View Details</Button><Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"><Settings className="h-4 w-4" /></Button></div></CardContent></Card>))}</div>
                </div>
              )}
              {activeView === "patients" && (
                // Patients Content
                 <div className="space-y-6">
                 <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-emerald-800"><Users className="h-5 w-5" /><h2 className="text-lg font-semibold">All Patients</h2></div><Badge className="bg-emerald-100 text-emerald-700">{clinicStats.totalPatients} total patients</Badge></div><div className="grid gap-6">{recentPatients.map((patient) => (<Card key={patient.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"><CardContent className="p-6"><div className="flex items-start justify-between mb-4"><div className="flex items-start gap-4"><Avatar className="h-12 w-12 ring-2 ring-emerald-100"><AvatarFallback className="bg-gradient-to-br from-emerald-400 to-green-500 text-white font-semibold">{patient.avatar}</AvatarFallback></Avatar><div><h3 className="font-semibold text-emerald-800">{patient.name}</h3><p className="text-sm text-emerald-600">{patient.age} years old</p></div></div><Badge className={`${patient.status === "active" ? "bg-green-100 text-green-700" : "bg-emerald-100 text-emerald-700"}`}>{patient.status}</Badge></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100"><div className="flex items-center gap-2 mb-1"><Stethoscope className="h-4 w-4 text-emerald-600" /><span className="text-xs text-emerald-600 font-medium">Practitioner</span></div><p className="text-sm font-semibold text-emerald-800">{patient.practitioner}</p></div><div className="bg-green-50 p-3 rounded-lg border border-green-100"><div className="flex items-center gap-2 mb-1"><Activity className="h-4 w-4 text-green-600" /><span className="text-xs text-green-600 font-medium">Treatment</span></div><p className="text-sm font-semibold text-green-800">{patient.treatment}</p></div></div></CardContent></Card>))}</div>
               </div>
              )}
              {activeView === "revenue" && (
                // Revenue Content
                <div className="space-y-6">
                <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-emerald-800"><IndianRupee className="h-5 w-5" /><h2 className="text-lg font-semibold">Revenue Analytics</h2></div></div><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">{revenueData.map((data, index) => (<Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"><CardContent className="p-6"><div className="text-center"><p className="text-sm text-emerald-600 mb-2">{data.month} 2025</p><p className="text-2xl font-bold text-emerald-800 mb-1">₹{(data.revenue / 1000).toFixed(0)}k</p><p className="text-xs text-emerald-500">{data.patients} patients</p><div className="mt-3 h-2 bg-emerald-100 rounded-full"><div className="h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" style={{ width: `${(data.revenue / 140000) * 100}%` }}></div></div></div></CardContent></Card>))}</div>
              </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}