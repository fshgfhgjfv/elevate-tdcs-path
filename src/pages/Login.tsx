import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Eye, EyeOff, Loader2, AlertCircle, Zap, ShieldAlert } from "lucide-react";
import { Toaster, toast } from "sonner";

// --- Mock UI Components ---

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    gradient: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600",
    warning: "bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300",
  };
  return (
    <button
      className={cn(baseStyles, variants[variant || "default"], "h-10 px-4 py-2", className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));
Label.displayName = "Label";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// --- Helper for Google JWT Decoding ---
const decodeJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Failed to decode JWT", e);
        return null;
    }
};

// --- Main Login Component ---

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ emailOrNumber: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("tdcs_user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // --- Google Sign-In Integration ---
  useEffect(() => {
    // Set origin for debug display
    if (typeof window !== 'undefined') {
        setCurrentOrigin(window.location.origin);
    }

    // 1. Load the Google Script
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
        // 2. Initialize Google Identity Services
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: "307173285004-8071uag4bomdbomqv4o63i2ksif3ouvq.apps.googleusercontent.com",
                callback: handleGoogleCallback,
                auto_select: false,
                ux_mode: "popup" // Explicitly requesting popup to minimize redirect URI issues
            });

            // 3. Render the Google Button
            try {
                const buttonDiv = document.getElementById("googleSignInDiv");
                if (buttonDiv) {
                    window.google.accounts.id.renderButton(
                        buttonDiv,
                        { 
                            theme: "outline", 
                            size: "large", 
                            width: "350", 
                            text: "continue_with"
                        } 
                    );
                }
            } catch (error) {
                console.error("Google button render error:", error);
            }
        }
    };
    document.body.appendChild(script);

    return () => {
        try {
            document.body.removeChild(script);
        } catch(e) {}
    };
  }, []);

  const handleGoogleCallback = (response) => {
      if (response.credential) {
          const userPayload = decodeJwt(response.credential);
          if (userPayload) {
              const user = {
                  name: userPayload.name,
                  email: userPayload.email,
                  picture: userPayload.picture,
                  googleId: userPayload.sub,
                  loginMethod: 'google'
              };
              loginUser(user);
          } else {
              toast.error("Failed to process Google Sign-In");
          }
      }
  };

  // --- Bypass for Development ---
  const handleDevBypass = () => {
      const mockUser = {
          name: "Dev User",
          email: "dev@example.com",
          picture: null,
          googleId: "mock-google-id-123",
          loginMethod: 'google-bypass'
      };
      toast.info("Logging in with Dev Bypass...");
      setTimeout(() => loginUser(mockUser), 800);
  };

  const loginUser = (user) => {
      localStorage.setItem("tdcs_user", JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
      const from = location.state?.from || "/dashboard";
      navigate(from);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
        const { emailOrNumber, password } = formData;

        if (!emailOrNumber || !password) {
          toast.error("Please fill in all fields");
          setLoading(false);
          return;
        }
    
        const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
    
        let user;
        if (emailOrNumber.includes("@")) {
          user = users.find(
            (u) => u.email === emailOrNumber && u.password === password
          );
        } else {
          const normalizedNumber = emailOrNumber.replace(/\D/g, "");
          if (normalizedNumber.length !== 10) {
            toast.error("Please enter a valid 10-digit number");
            setLoading(false);
            return;
          }
          const formattedNumber = `+91${normalizedNumber}`;
          user = users.find(
            (u) => u.number === formattedNumber && u.password === password
          );
        }
    
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          loginUser(userWithoutPassword);
        } else {
          toast.error("Invalid credentials (try demo/demo)");
        }
        setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-16 bg-slate-50 dark:bg-slate-950">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10 blur-3xl"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md mx-auto"
        >
          <Card className="shadow-xl backdrop-blur-lg bg-white/80 dark:bg-gray-900/50 border border-white/20">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="text-4xl text-center font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center mt-2 text-gray-500 dark:text-gray-400">
                  Login to your TDCS account
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="emailOrNumber">Email or Phone Number</Label>
                  <div className="flex items-center">
                    {formData.emailOrNumber && !formData.emailOrNumber.includes("@") && (
                      <span className="flex items-center justify-center px-3 h-10 bg-muted rounded-l-md border border-r-0 border-input text-sm text-muted-foreground">
                        +91
                      </span>
                    )}
                    <Input
                      id="emailOrNumber"
                      type="text"
                      placeholder="your@email.com or 10-digit number"
                      value={formData.emailOrNumber}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value.includes("@") && value.length > 0) {
                          const digitsOnly = value.replace(/\D/g, "");
                          if (digitsOnly.length <= 10) {
                            setFormData({ ...formData, emailOrNumber: digitsOnly });
                          }
                        } else {
                          setFormData({ ...formData, emailOrNumber: value });
                        }
                      }}
                      className={
                        formData.emailOrNumber && !formData.emailOrNumber.includes("@")
                          ? "rounded-l-none"
                          : ""
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full text-lg py-6 font-semibold shadow-lg"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
                  </Button>
                </motion.div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground bg-white dark:bg-gray-900">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-4">
                  {/* Google Button Container */}
                  <div className="flex justify-center w-full min-h-[44px]">
                     <div id="googleSignInDiv" className="w-full flex justify-center"></div>
                  </div>

                  {/* DEV BYPASS BUTTON - HIGHLIGHTED */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="warning"
                      className="w-full py-3 font-semibold shadow-sm"
                      onClick={handleDevBypass}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      ⚡ Dev: Simulate Google Login (Bypass Error)
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-6"
                      onClick={() => toast.info("GitHub sign-in coming soon!")}
                    >
                      <Github className="h-5 w-5" />
                      <span className="ml-2">Continue with GitHub</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.form>
              
              {/* DEBUG INFO FOR ORIGIN/URI MISMATCH */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg text-xs"
              >
                <div className="flex items-start gap-2 text-red-800 dark:text-red-200">
                   <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />
                   <div className="space-y-2">
                      <p className="font-bold">Error 400: redirect_uri_mismatch?</p>
                      <p>
                        This preview environment generates a random URL (<span className="font-mono bg-red-100 px-1 rounded">...webcontainer-api.io</span>).
                        Google blocks login attempts from URLs it doesn't recognize.
                      </p>
                      <p className="font-semibold text-red-700 dark:text-red-300">
                        Recommendation: Use the yellow "Dev: Simulate Google Login" button above to bypass this restriction during development.
                      </p>
                      
                      <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800 opacity-75">
                          <p className="mb-1">Your current dynamic Origin (blocked by Google):</p>
                          <div className="relative group">
                              <code className="block p-2 bg-white dark:bg-black/20 border border-red-200 dark:border-red-800 rounded font-mono break-all select-all">
                                {currentOrigin}
                              </code>
                          </div>
                      </div>
                   </div>
                </div>
              </motion.div>

              <motion.div
                className="mt-6 text-center space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/forgot-password" className="block text-sm text-primary hover:underline text-indigo-600">
                  Forgot your password?
                </Link>
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:underline font-semibold text-indigo-600"
                  >
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

// --- Dashboard Component (Destination) ---
const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("tdcs_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("tdcs_user");
        navigate("/");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <Card className="max-w-md w-full p-8 text-center space-y-4">
                <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto flex items-center justify-center text-3xl">
                    {user.picture ? (
                        <img src={user.picture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        "👤"
                    )}
                </div>
                <h1 className="text-2xl font-bold">Welcome, {user.name || "User"}!</h1>
                <p className="text-gray-500">{user.email}</p>
                {user.loginMethod === 'google-bypass' && (
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium border border-amber-200">
                        ⚡ Dev Mode: Login Bypassed
                    </div>
                )}
                <div className="pt-4">
                    <Button onClick={handleLogout} variant="destructive">Logout</Button>
                </div>
            </Card>
        </div>
    );
};

// --- App Wrapper ---
const App = () => {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<div className="p-10 text-center">Signup Page (Mock) <Link to="/" className="text-blue-500 underline">Back</Link></div>} />
        <Route path="/forgot-password" element={<div className="p-10 text-center">Forgot Password Page (Mock) <Link to="/" className="text-blue-500 underline">Back</Link></div>} />
      </Routes>
    </Router>
  );
};

export default App;