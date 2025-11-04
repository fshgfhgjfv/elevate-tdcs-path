import { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
// Assuming Button is a pre-styled component from shadcn/ui
// If not, basic styles will apply, but for the "gradient" effect,
// you would need the corresponding CSS variables and classes.
// We'll mock a simple Button component if it's not available.

// Mock Button component if not imported from a UI library
// In a real project, you'd import this:
// import { Button } from "@/components/ui/button";
const Button = ({ variant, size, className, children, ...props }) => {
  // Base styles
  let baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  // Variant styles
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
  };

  // Size styles
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  const variantStyle = variants[variant] || variants.default;
  const sizeStyle = sizes[size] || sizes.default;

  return (
    <button className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};


import { 
  BookOpen, 
  Trophy, 
  Award, 
  Settings, 
  HelpCircle,
  Menu,
  X,
  LogOut // Added for the new logout button
} from "lucide-react";

// Mock Dashboard Page Components
// In a real app, these would be imported from their own files.
const DashboardMyCourses = ({ user }) => (
  <div className="bg-card shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold mb-4">Welcome back, {user.name}!</h1>
    <p className="text-lg text-muted-foreground mb-6">Your Courses</p>
    <div className="grid md:grid-cols-2 gap-6">
      {/* Mock Course Card */}
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="font-semibold text-xl mb-2">React for Beginners</h3>
        <p className="text-sm text-muted-foreground mb-4">Get started with the fundamentals of React.</p>
        <div className="w-full bg-muted rounded-full h-2.5 mb-2">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "45%" }}></div>
        </div>
        <p className="text-sm text-muted-foreground">45% Complete</p>
      </div>
      {/* Mock Course Card */}
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="font-semibold text-xl mb-2">Advanced Tailwind CSS</h3>
        <p className="text-sm text-muted-foreground mb-4">Master responsive design and utility-first styling.</p>
        <div className="w-full bg-muted rounded-full h-2.5 mb-2">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: "10%" }}></div>
        </div>
        <p className="text-sm text-muted-foreground">10% Complete</p>
      </div>
    </div>
  </div>
);

const DashboardLeaderboard = () => (
  <div className="bg-card shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold mb-6">Student Leaderboard</h1>
    <ul className="space-y-4">
      <li className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <span className="font-semibold">1. Alice Johnson</span>
        <span className="text-primary font-bold">1500 XP</span>
      </li>
      <li className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <span className="font-semibold">2. Bob Smith</span>
        <span className="text-primary font-bold">1350 XP</span>
      </li>
      <li className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <span className="font-semibold">3. Charlie Brown</span>
        <span className="text-primary font-bold">1200 XP</span>
      </li>
    </ul>
  </div>
);

const DashboardCertificates = () => (
  <div className="bg-card shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold mb-6">Your Certificates</h1>
    <p className="text-muted-foreground">You don't have any certificates yet. Complete a course to earn one!</p>
  </div>
);

const DashboardAccountSettings = ({ user, setUser }) => (
  <div className="bg-card shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
        <input type="text" defaultValue={user.name} className="w-full p-2 border rounded-md bg-background" />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
        <input type="email" defaultValue={user.email} className="w-full p-2 border rounded-md bg-background" />
      </div>
      <Button className="gradient-primary text-white">Save Changes</Button>
    </form>
  </div>
);

const DashboardSupport = () => (
  <div className="bg-card shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold mb-6">Support / Help</h1>
    <p className="text-muted-foreground mb-4">Have questions? We're here to help.</p>
    <Button className="gradient-primary text-white">Contact Support</Button>
  </div>
);


// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Mock user data if not in localStorage for demo purposes
    if (!localStorage.getItem("tdcs_user")) {
        const mockUser = { name: "Alex Johnson", email: "alex.johnson@example.com" };
        localStorage.setItem("tdcs_user", JSON.stringify(mockUser));
    }

    const userData = localStorage.getItem("tdcs_user");
    if (!userData) {
      navigate("/login"); // Assuming /login is your login route
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  // New logout function
  const handleLogout = () => {
    localStorage.removeItem("tdcs_user");
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  const sidebarItems = [
    { icon: BookOpen, label: "My Courses", path: "/dashboard" },
    { icon: Trophy, label: "Student Leaderboard", path: "/dashboard/leaderboard" },
    { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
    { icon: Settings, label: "Account Settings", path: "/dashboard/settings" },
    { icon: HelpCircle, label: "Support / Help", path: "/dashboard/support" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard" || location.pathname === "/dashboard/";
    }
    return location.pathname.startsWith(path);
  };

  // Helper for CSS Keyframes for page transitions
  const PageTransitionStyles = () => (
    <style>{`
      @keyframes fadeIn {
        from { 
          opacity: 0; 
          transform: translateY(10px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      
      .page-fade-in {
        animation: fadeIn 0.4s ease-out forwards;
      }

      /* Mock gradient text and primary button styles */
      .gradient-text {
        background: linear-gradient(to right, #6366f1, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .gradient-primary {
        background: linear-gradient(to right, #6366f1, #a855f7);
        border: 0;
      }

      /* Mock Theme Variables (replace with your actual theme) */
      :root {
        --background: #ffffff;
        --foreground: #020817;
        --card: #ffffff;
        --card-foreground: #020817;
        --popover: #ffffff;
        --popover-foreground: #020817;
        --primary: #6366f1;
        --primary-foreground: #fafafa;
        --secondary: #f1f5f9;
        --secondary-foreground: #0f172a;
        --muted: #f1f5f9;
        --muted-foreground: #64748b;
        --accent: #f1f5f9;
        --accent-foreground: #0f172a;
        --destructive: #ef4444;
        --destructive-foreground: #fafafa;
        --border: #e2e8f0;
        --input: #e2e8f0;
        --ring: #94a3b8;
      }

      /* Add dark mode support if your app has it */
      .dark {
        --background: #020817;
        --foreground: #fafafa;
        --card: #020817;
        --card-foreground: #fafafa;
        --popover: #020817;
        --popover-foreground: #fafafa;
        --primary: #6366f1;
        --primary-foreground: #fafafa;
        --secondary: #1e293b;
        --secondary-foreground: #fafafa;
        --muted: #1e293b;
        --muted-foreground: #94a3b8;
        --accent: #1e293b;
        --accent-foreground: #fafafa;
        --destructive: #7f1d1d;
        --destructive-foreground: #fafafa;
        --border: #1e293b;
        --input: #1e293b;
        --ring: #1e293b;
      }
      
      body {
        background-color: var(--background);
        color: var(--foreground);
      }
    `}</style>
  );

  // Show a loading spinner or skeleton while user data is loading
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-background via-background to-primary/5">
      <PageTransitionStyles /> {/* Inject animation styles */}
      
      <div className="flex relative">
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden fixed top-24 left-4 z-50 rounded-full shadow-lg" // Made it rounded
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {/* Animated Icon Swap */}
          <span className="relative w-5 h-5">
            <Menu
              className={`w-5 h-5 absolute transition-all duration-300 ${
                sidebarOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ${
                sidebarOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              }`}
            />
          </span>
        </Button>

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 
            bg-card border-r z-40 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Made sidebar content scrollable if it overflows */}
          <div className="p-6 flex flex-col h-full overflow-y-auto">
            {/* --- NEW User Profile Section --- */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center gradient-text font-bold text-xl flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold gradient-text mb-6">Dashboard</h2>
            
            {/* Navigation links */}
            <nav className="space-y-2 flex-grow">
              {sidebarItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 transition-all duration-200 ease-in-out ${
                      isActive(item.path) 
                        ? "gradient-primary text-white hover:opacity-90 shadow-md" // Added shadow to active item
                        : "hover:bg-primary/10 hover:translate-x-1" // Added hover animation
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
            
            {/* --- NEW Logout Button Section --- */}
            <div className="mt-6 pt-6 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:translate-x-1 transition-all duration-200"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                Log Out
              </Button>
            </div>
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
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden"> {/* Added overflow-x-hidden */}
          {/* Centered layout container */}
          <div className="max-w-7xl mx-auto">
            {/* --- NEW Page Transition Wrapper ---
              The `key={location.pathname}` is crucial. 
              It tells React to treat each page as a new component,
              allowing the CSS animation to re-trigger on every route change.
            */}
            <div key={location.pathname} className="page-fade-in">
              <Routes>
                <Route path="/" element={<DashboardMyCourses user={user} />} />
                <Route path="/leaderboard" element={<DashboardLeaderboard />} />
                <Route path="/certificates" element={<DashboardCertificates />} />
                <Route path="/settings" element={<DashboardAccountSettings user={user} setUser={setUser} />} />
                <Route path="/support" element={<DashboardSupport />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// This is the main export for a single-file React component.
// In a real CRA or Vite app, you'd have an index.js to render this.
export default Dashboard;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

// A mock login page for redirect example
const Login = () => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-3xl">Login Page</h1>
    <p className="text-lg text-muted-foreground p-4">
      (In this demo, user data is mocked. Refresh to be "logged in" and redirected to /dashboard)
    </p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
