import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Eye, EyeOff, Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";

// --- Mock UI Components (to make the code self-contained and runnable) ---

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

  useEffect(() => {
    const user = localStorage.getItem("tdcs_user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // --- Google Sign-In Integration ---
  useEffect(() => {
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
                auto_select: false // Disable auto-select to prevent automatic logins without interaction
            });

            // 3. Render the Google Button into the div
            window.google.accounts.id.renderButton(
                document.getElementById("googleSignInDiv"),
                { 
                    theme: "outline", 
                    size: "large", 
                    width: "350", // Approximate width to match other buttons
                    text: "continue_with"
                } 
            );
        }
    };
    document.body.appendChild(script);

    return () => {
        // Cleanup if component unmounts
        try {
            document.body.removeChild(script);
        } catch(e) {}
    };
  }, []);

  const handleGoogleCallback = (response) => {
      if (response.credential) {
          const userPayload = decodeJwt(response.credential);
          if (userPayload) {
              // Create a user object structure matching your app
              const user = {
                  name: userPayload.name,
                  email: userPayload.email,
                  picture: userPayload.picture,
                  googleId: userPayload.sub,
                  loginMethod: 'google'
              };

              // Save to local storage (simulating login)
              localStorage.setItem("tdcs_user", JSON.stringify(user));
              
              toast.success(`Welcome back, ${user.name}!`);
              const from = location.state?.from || "/dashboard";
              navigate(from);
          } else {
              toast.error("Failed to process Google Sign-In");
          }
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
        const { emailOrNumber, password } = formData;

        if (!emailOrNumber || !password) {
          toast.error("Please fill in all fields");
          setLoading(false);
          return;
        }
    
        const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
    
        // Detect if input is an email or a phone number
        let user;
        if (emailOrNumber.includes("@")) {
          user = users.find(
            (u) => u.email === emailOrNumber && u.password === password
          );
        } else {
          // For number, allow 10-digit input or +91XXXXXXXXXX format
          const normalizedNumber = emailOrNumber.replace(/\D/g, ""); // only digits
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
          localStorage.setItem("tdcs_user", JSON.stringify(userWithoutPassword));
          toast.success("Login successful!");
          const from = location.state?.from || "/dashboard";
          navigate(from);
        } else {
          toast.error("Invalid credentials (try demo/demo)");
        }
        setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-16 bg-slate-50 dark:bg-slate-950">
      {/* Animated gradient background */}
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
                    {/* +91 Prefix — only visible if typing a number */}
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
                        // If number, allow only digits up to 10
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
                  {/* GOOGLE SIGN IN CONTAINER */}
                  <div className="flex justify-center w-full">
                     <div id="googleSignInDiv" className="w-full flex justify-center"></div>
                  </div>

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
                <Button onClick={handleLogout} variant="destructive">Logout</Button>
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