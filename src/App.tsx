import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

// --- ✅ 1. Import your new AuthProvider ---
import { AuthProvider } from "./contexts/AuthContext";

// --- Pages ---
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseContent from "./pages/CourseContent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyProfile from "./pages/MyProfile";
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

// ✅ NEW: Import Hardware Services page
import HardwareServices from "./pages/HardwareServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* --- ✅ 2. Wrap your app with the provider --- */}
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Courses */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/:id/content" element={<CourseContent />} />

            {/* Auth & Profile */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-profile" element={<MyProfile />} />

            {/* Certificates */}
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            <Route
              path="/certificate-download"
              element={<CertificateDownload />}
            />

            {/* Services */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/software" element={<Services />} />

            {/* ✅ Updated Hardware route */}
            <Route path="/services/hardware" element={<HardwareServices />} />

            {/* ✅ Legal / Advocate route */}
            <Route path="/services/legal" element={<AdvocateConstruction />} />

            <Route path="/services/:serviceId" element={<ServiceDetail />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;