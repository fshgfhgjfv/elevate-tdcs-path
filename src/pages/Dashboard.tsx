import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Award, Settings, HelpCircle, Menu, X } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { User } from "./types";

// Lazy loaded pages
const DashboardMyCourses = lazy(() => import("./dashboard/DashboardMyCourses"));
const DashboardLeaderboard = lazy(() => import("./dashboard/DashboardLeaderboard"));
const DashboardCertificates = lazy(() => import("./dashboard/DashboardCertificates"));
const DashboardAccountSettings = lazy(() => import("./dashboard/DashboardAccountSettings"));
const DashboardSupport = lazy(() => import("./dashboard/DashboardSupport"));

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("tdcs_user");
      if (!userData) {
        navigate("/login");
        return;
      }
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Failed to parse user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  const sidebarItems: SidebarItem[] = [
    { icon: BookOpen, label: "My Courses", path: "/dashboard" },
    { icon: Trophy, label: "Student Leaderboard", path: "/dashboard/leaderboard" },
    { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
    { icon: Settings, label: "Account Settings", path: "/dashboard/settings" },
    { icon: HelpCircle, label: "Support / Help", path: "/dashboard/support" },
  ];

  const dashboardRoutes = [
    { path: "/", element: <DashboardMyCourses user={user} /> },
    { path: "/leaderboard", element: <DashboardLeaderboard /> },
    { path: "/certificates", element: <DashboardCertificates /> },
    { path: "/settings", element: <DashboardAccountSettings user={user} setUser={setUser} /> },
    { path: "/support", element: <DashboardSupport /> },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex relative">
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden fixed top-24 left-4 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Sidebar */}
        <Sidebar items={sidebarItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Overlay for mobile */}
        <div
          className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-30 transition-opacity ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } lg:hidden`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <h1 className="text-xl font-semibold mb-4">Welcome back, {user.name} 👋</h1>
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <Routes>
              {dashboardRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
