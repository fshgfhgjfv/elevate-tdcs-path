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
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes - NO Header/Footer */}
            <Route path="/abcadmin" element={<AdminLogin />} />
            <Route path="/abcadmin/dashboard" element={<AdminDashboard />} />

            {/* Regular Routes - WITH Header/Footer */}
            <Route path="/*" element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:id" element={<CourseDetail />} />
                  <Route path="/courses/:id/content" element={<CourseContent />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/dashboard/*" element={<Dashboard />} />
                  <Route path="/my-profile" element={<MyProfile />} />
                  <Route path="/verify-certificate" element={<VerifyCertificate />} />
                  <Route path="/certificate-download" element={<CertificateDownload />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/software" element={<Services />} />
                  <Route path="/services/hardware" element={<HardwareServices />} />
                  <Route path="/services/legal" element={<AdvocateConstruction />} />
                  <Route path="/services/:serviceId" element={<ServiceDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
