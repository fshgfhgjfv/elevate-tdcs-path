import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Github, Loader2 } from "lucide-react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

// --- CONFIGURATION ---
const googleClientId = "608143065275-uk0254ebnpmrepto7ssb2ee103odutgk.apps.googleusercontent.com";

// SVG for Google icon
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ emailOrNumber: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("tdcs_user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // --- GOOGLE LOGIN HANDLER ---
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      console.log("Google Token:", tokenResponse);
      
      // SIMULATION: In a real app, send tokenResponse.access_token to your backend
      setTimeout(() => {
        // Create a mock session for Google User
        const mockGoogleUser = {
          name: "Google User",
          email: "user@gmail.com",
          photo: "https://lh3.googleusercontent.com/a/default-user",
          method: "google"
        };
        localStorage.setItem("tdcs_user", JSON.stringify(mockGoogleUser));
        
        toast.success("Logged in with Google!");
        setIsLoading(false);
        const from = (location.state as any)?.from || "/dashboard";
        navigate(from);
      }, 1500);
    },
    onError: () => {
      toast.error("Google Login Failed");
      setIsLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { emailOrNumber, password } = formData;

    if (!emailOrNumber || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Simulate Network Request
    setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");

        // Detect if input is an email or a phone number
        let user;
        if (emailOrNumber.includes("@")) {
            user = users.find(
                (u: any) => u.email === emailOrNumber && u.password === password
            );
        } else {
            // For number, allow 10-digit input or +91XXXXXXXXXX format
            const normalizedNumber = emailOrNumber.replace(/\D/g, ""); // only digits
            if (normalizedNumber.length !== 10) {
                toast.error("Please enter a valid 10-digit number");
                setIsLoading(false);
                return;
            }
            const formattedNumber = `+91${normalizedNumber}`;
            user = users.find(
                (u: any) => u.number === formattedNumber && u.password === password
            );
        }

        if (user) {
            const { password: _, ...userWithoutPassword } = user;
            localStorage.setItem("tdcs_user", JSON.stringify(userWithoutPassword));
            toast.success("Login successful!");
            const from = (location.state as any)?.from || "/dashboard";
            navigate(from);
        } else {
            toast.error("Invalid credentials");
        }
        setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
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
          <Card className="shadow-xl backdrop-blur-lg bg-white/10 dark:bg-gray-900/50 border border-white/10">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="text-4xl text-center font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
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
                <div>
                  <Label htmlFor="emailOrNumber">Email or Phone Number</Label>
                  <div className="flex items-center">
                    {/* +91 Prefix — only visible if typing a number */}
                    {formData.emailOrNumber && !formData.emailOrNumber.includes("@") && (
                      <span className="px-3 py-2 bg-muted rounded-l-md border border-r-0 border-input text-sm text-muted-foreground">
                        +91
                      </span>
                    )}
                    <Input
                      id="emailOrNumber"
                      type="text"
                      placeholder="your@email.com or 10-digit number"
                      value={formData.emailOrNumber}
                      disabled={isLoading}
                      onChange={(e) => {
                        const value = e.target.value;
                        // If number, allow only digits up to 10
                        if (!value.includes("@")) {
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

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    disabled={isLoading}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    variant="gradient"
                    disabled={isLoading}
                    className="w-full text-lg py-6 font-semibold shadow-lg"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
                  </Button>
                </motion.div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isLoading}
                      className="w-full py-6"
                      onClick={() => googleLogin()}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
                      <span className="ml-2">Continue with Google</span>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
                <Link to="/forgot-password" className="block text-sm text-primary hover:underline">
                  Forgot your password?
                </Link>
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:underline font-semibold"
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

// Wrapper for OAuth Context
const LoginWithGoogleAuth = () => (
  <GoogleOAuthProvider clientId={googleClientId}>
    <Login />
  </GoogleOAuthProvider>
);

export default LoginWithGoogleAuth;