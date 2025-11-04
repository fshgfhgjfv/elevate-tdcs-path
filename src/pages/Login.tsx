import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner"; // Assuming sonner for toasts
import { Github } from "lucide-react";

// --- Mock shadcn/ui components ---
// Since these are imported from "@/components/ui/...",
// here are simple mocks to make this file runnable.
// In your real app, you'd remove these and use your actual component library.

const Button = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`px-4 py-2 rounded-md border ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`px-3 py-2 rounded-md border border-gray-300 ${className}`}
    {...props}
  />
);

const Label = ({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={`block text-sm font-medium ${className}`} {...props} />
);

const Card = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`border rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardHeader = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardTitle = ({
  className,
  children,
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
);

const CardDescription = ({
  className,
  children,
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

const CardContent = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// --- End of Mock Components ---

// SVG for Google icon
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// --- Your Login Component ---
// (No changes needed, it now exists inside the Provider's context)
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ emailOrNumber: "", password: "" });

  useEffect(() => {
    const user = localStorage.getItem("tdcs_user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { emailOrNumber, password } = formData;

    if (!emailOrNumber || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");

    // Detect if input is an email or a phone number
    let user;
    if (emailOrNumber.includes("@")) {
      user = users.find(
        (u: any) => u.email === emailOrNumber && u.password === password
      );
    } else {
      // For number, allow 10-digit input
      const normalizedNumber = emailOrNumber.replace(/\D/g, ""); // only digits
      if (normalizedNumber.length !== 10) {
        toast.error("Please enter a valid 10-digit number");
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
  };

  // Google Sign-In Handler
  const handleGoogleLoginSuccess = async (tokenResponse: any) => {
    try {
      // Fetch user profile from Google
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info from Google");
      }

      const userInfo = await userInfoResponse.json();
      const { email, name, sub: googleId } = userInfo;

      if (!email) {
        toast.error("Google account does not have an email associated.");
        return;
      }

      // Check if user already exists in your local storage
      const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
      let user = users.find((u: any) => u.email === email);

      if (!user) {
        // If user doesn't exist, create a new one
        const newUser = {
          id: crypto.randomUUID(), // Or use googleId
          email,
          name,
          googleId,
          // No password field for Google-signed-up users
        };
        users.push(newUser);
        localStorage.setItem("tdcs_users", JSON.stringify(users));
        user = newUser;
      }

      // Log the user in by setting the 'tdcs_user' item
      const { password: _, ...userToSave } = user;
      localStorage.setItem("tdcs_user", JSON.stringify(userToSave));

      toast.success(`Welcome, ${name}!`);
      const from = (location.state as any)?.from || "/dashboard";
      navigate(from);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  // Initialize the Google Login hook
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: (error) => {
      console.error("Google Login Failed:", error);
      toast.error("Google login failed");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
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
                    {formData.emailOrNumber &&
                      !formData.emailOrNumber.includes("@") && (
                        <span className="px-3 py-2 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 text-sm text-gray-500">
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
                        if (!value.includes("@")) {
                          const digitsOnly = value.replace(/\D/g, "");
                          if (digitsOnly.length <= 10) {
                            setFormData({
                              ...formData,
                              emailOrNumber: digitsOnly,
                            });
                          }
                        } else {
                          setFormData({ ...formData, emailOrNumber: value });
                        }
                      }}
                      className={
                        formData.emailOrNumber &&
                        !formData.emailOrNumber.includes("@")
                          ? "rounded-l-none"
                          : "w-full"
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
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full"
                    required
                  />
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full text-lg py-6 font-semibold shadow-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Login
                  </Button>
                </motion.div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500 dark:bg-gray-900">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-6 bg-white dark:bg-gray-800"
                      onClick={() => googleLogin()}
                    >
                      <GoogleIcon />
                      <span className="ml-2">Continue with Google</span>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-6 bg-white dark:bg-gray-800"
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
                <Link
                  to="/forgot-password"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  Forgot your password?
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline font-semibold"
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

// --- Placeholder Dashboard Component ---
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("tdcs_user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("tdcs_user");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to your Dashboard</CardTitle>
          <CardDescription>You are logged in.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Hello, {user.name || user.email}!</p>
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// --- Main App Component ---
// This is the "main code" that wraps everything in the providers.
function App() {
  const googleClientId =
    "736905272101-bfolp8smrdkl2eg59ss9n5oihcb5ph9n.apps.googleusercontent.com";

  return (
    // The Provider now wraps your entire application
    <GoogleOAuthProvider clientId={googleClientId}>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Redirect to login by default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
