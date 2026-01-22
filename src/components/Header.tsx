import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "./CartDrawer";

const LOGO_URL =
  "https://blogger.googleusercontent.com/img/a/AVvXsEh6t9BjBO7igeafdAkeEQW1JNA1TAfi2lIR0Nr857ozJmsC-qPIm9m2BbQi8JkDD3TmGVuyKAyxnIc88lETBh18Xia9FqGTkGdtzD7215GLuqRBIhm9UCh7F4FDB9BsKHg78TKGkSUfCtTHefuZ5LwuXqdGLzO50ulgxWj2b-6gGAZJHE15AEKDUnwStMAm";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // --- UPDATED Theme State ---
  // Initializes from localStorage or defaults to "dark"
  const [theme, setTheme] = useState(
    localStorage.getItem("tdcs_theme") || "dark"
  );
  // --- End Updated Theme State ---

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("tdcs_user");
    if (userData) setUser(JSON.parse(userData));
  }, [location]);

  // --- Theme Effect ---
  // Applies the 'dark' class to <html> and saves to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("tdcs_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  // --- End Theme Effect ---

  const handleLogout = () => {
    localStorage.removeItem("tdcs_user");
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("tdcs_purchased_")) localStorage.removeItem(key);
    });
    setUser(null);
    navigate("/");
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
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-glow"
          : "bg-background/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={LOGO_URL}
              alt="TDCS Logo"
              className="h-10 md:h-12 w-auto"
            />
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
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
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
                    <Link
                      to="/services/website-development"
                      className="block px-4 py-2 rounded-md hover:bg-accent"
                    >
                      Website Development
                    </Link>
                    <a
                      href="https://www.tdcs.in/intelligence"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 rounded-md hover:bg-accent text-primary font-semibold"
                    >
                      🔍 Intelligence
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Cart */}
            <CartDrawer />

            {/* Theme Toggle Button (Desktop) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 block dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </Button>

            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="gap-2">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" className="gradient-primary">
                    Sign Up
                  </Button>
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
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Services for mobile */}
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-foreground">Services</p>
                <Link
                  to="/services/software"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full text-left">
                    Software
                  </Button>
                </Link>
                <Link
                  to="/services/hardware"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full text-left">
                    Hardware
                  </Button>
                </Link>
                <Link
                  to="/services/legal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full text-left">
                    Legal Advice
                  </Button>
                </Link>
                <Link
                  to="/services/website-development"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full text-left">
                    Website Development
                  </Button>
                </Link>
                <a
                  href="https://www.tdcs.in/intelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full text-left text-primary font-semibold">
                    🔍 Intelligence
                  </Button>
                </a>
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t">
                {/* Theme Toggle Button (Mobile) */}
                <Button
                  variant="outline"
                  className="w-full gap-2 justify-start"
                  onClick={toggleTheme}
                >
                  <Sun className="w-4 h-4 block dark:hidden" />
                  <Moon className="w-4 h-4 hidden dark:block" />
                  <span>{theme === "light" ? "Dark" : "Light"} Mode</span>
                </Button>
                {/* End Theme Toggle Button */}

                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <User className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      className="w-full gap-2"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button
                        variant="default"
                        className="w-full gradient-primary"
                      >
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