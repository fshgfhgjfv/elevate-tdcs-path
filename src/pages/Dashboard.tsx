import { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Trophy, 
  Award, 
  Settings, 
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import DashboardMyCourses from "./dashboard/DashboardMyCourses";
import DashboardLeaderboard from "./dashboard/DashboardLeaderboard";
import DashboardCertificates from "./dashboard/DashboardCertificates";
import DashboardAccountSettings from "./dashboard/DashboardAccountSettings";
import DashboardSupport from "./dashboard/DashboardSupport";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("tdcs_user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const sidebarItems = [
    { icon: BookOpen, label: "My Courses", path: "/dashboard" },
    { icon: Trophy, label: "Student Leaderboard", path: "/dashboard/leaderboard" },
    { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
    { icon: Settings, label: "Account Settings", path: "/dashboard/settings" },
    { icon: HelpCircle, label: "Support / Help", path: "/dashboard/support" },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex relative">
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden fixed top-24 left-4 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 
            bg-card border-r z-40 transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold gradient-text mb-6">Dashboard</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      isActive(item.path) 
                        ? "gradient-primary text-white hover:opacity-90" 
                        : "hover:bg-primary/10"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<DashboardMyCourses user={user} />} />
            <Route path="/leaderboard" element={<DashboardLeaderboard />} />
            <Route path="/certificates" element={<DashboardCertificates />} />
            <Route path="/settings" element={<DashboardAccountSettings user={user} setUser={setUser} />} />
            <Route path="/support" element={<DashboardSupport />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
