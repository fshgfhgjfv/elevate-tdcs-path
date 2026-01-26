import { useState, lazy, Suspense } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Award, Settings, HelpCircle, Menu, X, Loader2 } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

// Lazy loaded pages
const DashboardMyCourses = lazy(() => import("./dashboard/DashboardMyCourses"));
const DashboardLeaderboard = lazy(() => import("./dashboard/DashboardLeaderboard"));
const DashboardCertificates = lazy(() => import("./dashboard/DashboardCertificates"));
const DashboardAccountSettings = lazy(() => import("./dashboard/DashboardAccountSettings"));
const DashboardSupport = lazy(() => import("./dashboard/DashboardSupport"));

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { state: { from: "/dashboard" } });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  // Get user display name from metadata or email
  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  const sidebarItems: SidebarItem[] = [
    { icon: BookOpen, label: "My Courses", path: "/dashboard" },
    { icon: Trophy, label: "Student Leaderboard", path: "/dashboard/leaderboard" },
    { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
    { icon: Settings, label: "Account Settings", path: "/dashboard/settings" },
    { icon: HelpCircle, label: "Support / Help", path: "/dashboard/support" },
  ];

  // Create a user object compatible with the dashboard components
  const dashboardUser = {
    name: userName,
    email: user.email || "",
    id: user.id,
  };

  const dashboardRoutes = [
    { path: "/", element: <DashboardMyCourses user={dashboardUser} /> },
    { path: "/leaderboard", element: <DashboardLeaderboard /> },
    { path: "/certificates", element: <DashboardCertificates /> },
    { path: "/settings", element: <DashboardAccountSettings user={dashboardUser} setUser={() => {}} /> },
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
          <h1 className="text-xl font-semibold mb-4">Welcome back, {userName} 👋</h1>
          <Suspense fallback={<div className="text-center py-20"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>}>
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
