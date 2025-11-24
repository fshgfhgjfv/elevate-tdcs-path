import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

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
import WebsiteSecurityDetails from "./pages/WebsiteSecurityDetails";
import SimpleAdminPanel from "./pages/admin/SimpleAdminPanel";

import { RefreshRedirect } from "./components/RefreshRedirect";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <RefreshRedirect />
          <ScrollToTop />
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            {/* ...other routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
