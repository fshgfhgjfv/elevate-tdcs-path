import { useState, useEffect } from "react";
// --- 1. Import useNavigate, useAuth, and supabase ---
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext"; // Adjust path if needed
import { supabase } from "@/supabaseClient"; // Adjust path if needed

const LOGO_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEh6t9BjBO7igeafdAkeEQW1JNA1TAfi2lIR0Nr857ozJmsC-qPIm9m2BbQi8JkDD3TmGVuyKAyxnIc88lETBh18Xia9FqGTkGdtzD7215GLuqRBIhm9UCh7F4FDB9BsKHg78TKGkSUfCtTHefuZ5LwuXqdGLzO50ulgxWj2b-6gGAZJHE15AEKDUnwStMAm";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  // --- 2. Get the user from the AuthContext ---
  const { user } = useAuth();
  
  const location = useLocation();
  const navigate = useNavigate(); // --- 3. Add useNavigate for redirects ---

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 4. (REMOVED) The useEffect for localStorage is no longer needed! ---

  // --- 5. Update the logout function ---
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      navigate("/"); // Navigate to home page after logout
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact-us" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-glow" : "bg-background/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={LOGO_URL} alt="TDCS Logo" className="h-10 md:h-12 w-auto" />
            <span className="text-2xl md:text-3xl font-bold gradient-text animate-glow-pulse">
              TDCS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`link-underline font-medium transition-colors ${
                  location.pathname === link.path ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 font-medium ${
                  location.pathname.startsWith("/services")
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                Services <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 bg-background border shadow-lg rounded-xl p-3 w-56 z-50"
                  >
                    <Link
                      to="/services/software"
                      className="block px-4 py-2 rounded-md hover:bg-accent"
                    >
                      Software Services
                    </Link>
                    <Link
                      to="/services/hardware"
                      className="block px-4 py-2 rounded-md hover:bg-accent"
                    >
                      Hardware Services
                    </Link>
                    <Link
                      to="/services/legal"
                      className="block px-4 py-2 rounded-md hover:bg-accent"
                    >
                      Legal Advice
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* --- 6. The 'user' now comes from useAuth() --- */}
            {user ? (
              <>
                <Link to="/my-profile">
                  {/* --- 7. Update how the user's name is displayed --- */}
                  <Button variant="ghost">
                    {user.user_metadata?.full_name || user.email}
                  </Button>
                </Link>
                <Button variant="gradient" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="gradient">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium py-2 ${
                    location.pathname === link.path ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Services for mobile */}
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-foreground">Services</p>
                <Link to="/services/software" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-left">Software</Button>
                </Link>
                <Link to="/services/hardware" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-left">Hardware</Button>
                </Link>
                <Link to="/services/legal" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-left">Legal Advice</Button>
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t">
                {user ? (
                  <>
                    <Link to="/my-profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        {/* --- 7. Update display name here too --- */}
                        {user.user_metadata?.full_name || user.email}
                      </Button>
                    </Link>
                    <Button
                      variant="gradient"
                      className="w-full"
                      onClick={async () => {
                        // --- 8. Update mobile logout to be async ---
                        await handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="gradient" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};