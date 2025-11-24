import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

// --- Pages ---
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseContent from "./pages/CourseContent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCertificate from "./pages/VerifyCertificate";
import CertificateDownload from "./pages/CertificateDownload";
import AdvocateConstruction from "./pages/AdvocateConstruction";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Gallery from "./pages/Gallery";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import HardwareServices from "./pages/HardwareServices";
import WebsiteDevelopment from "./pages/website-development";

// NEW Pages
import WebsiteSecurityDetails from "./pages/WebsiteSecurityDetails";
import SimpleAdminPanel from "./pages/admin/SimpleAdminPanel";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ⭐ NEW COMPONENT → Redirect to Home on Refresh
export const RefreshRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    }
  }, []);

  return null;
};

const queryClient = new QueryClient();

// ⭐ ADD THIS
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ⭐ GOOGLE LOGIN FIX WRAPPER ADDED */}
      <GoogleOAuthProvider clientId="736905272101-bfolp8smrdkl2eg59ss9n5oihcb5ph9n.apps.googleusercontent.com">

        <BrowserRouter>
          {/* ⭐ Added here */}
          <RefreshRedirect />

          <ScrollToTop />
          <Header />

          <Routes>
            {/* 🌐 Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* 🎓 Courses */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/:id/content" element={<CourseContent />} />

            {/* 👤 Auth & Profile */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/my-profile" element={<MyProfile />} />

            {/* 🪪 Certificates */}
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            <Route path="/certificate-download" element={<CertificateDownload />} />

            {/* 🧰 Services */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/software" element={<Services />} />
            <Route path="/services/hardware" element={<HardwareServices />} />
            <Route path="/services/legal" element={<AdvocateConstruction />} />
            <Route path="/services/website-development" element={<WebsiteDevelopment />} />
            <Route path="/services/website-security" element={<WebsiteSecurityDetails />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />

            {/* 🛠️ Admin Panel */}
            <Route path="/admin" element={<SimpleAdminPanel />} />

            {/* 🚫 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </BrowserRouter>

      </GoogleOAuthProvider>
      {/* ⭐ END GOOGLE WRAPPER */}

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
