import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
// --- 1. Import Supabase, AuthContext, and icons ---
import { Loader2, Github } from "lucide-react";
import { supabase } from "@/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

// --- 2. Add GoogleIcon helper component ---
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.659,4.696-6.142,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.16,0-9.658-3.302-11.303-7.918l-6.522,5.023C9.505,41.246,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C41.383,34.463,44,29.625,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ emailOrNumber: "", password: "" });
  // --- 3. Add isLoading state and get user from context ---
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // --- 4. Update useEffect to use context ---
  useEffect(() => {
    // If user is already logged in, redirect them
    if (user) {
      const from = (location.state as any)?.from || "/";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  // --- 5. Add social login handler ---
  const handleSocialSignup = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
    // No need to setIsLoading(false) on success, user is redirected
  };

  // --- 6. Update handleSubmit to be async and use Supabase ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { emailOrNumber, password } = formData;

    if (!emailOrNumber || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // --- We keep your smart logic to check for email vs. phone ---
    let authData;
    if (emailOrNumber.includes("@")) {
      // It's an email
      authData = await supabase.auth.signInWithPassword({
        email: emailOrNumber,
        password: password,
      });
    } else {
      // It's a phone number
      const normalizedNumber = emailOrNumber.replace(/\D/g, "");
      if (normalizedNumber.length !== 10) {
        toast.error("Please enter a valid 10-digit number");
        setIsLoading(false);
        return;
      }
      const formattedNumber = `+91${normalizedNumber}`;
      
      authData = await supabase.auth.signInWithPassword({
        phone: formattedNumber,
        password: password,
      });
    }

    // --- Check the result from Supabase ---
    if (authData.error) {
      toast.error(authData.error.message || "Invalid credentials");
    } else {
      toast.success("Login successful!");
      const from = (location.state as any)?.from || "/";
      navigate(from, { replace: true });
    }

    setIsLoading(false);
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
              {/* --- 7. Add Social Login buttons --- */}
              <motion.div
                className="space-y-3 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialSignup("google")}
                  type="button"
                  disabled={isLoading}
                >
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialSignup("github")}
                  type="button"
                  disabled={isLoading}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Sign in with GitHub
                </Button>
              </motion.div>

              {/* --- 8. Add Divider --- */}
              <motion.div
                className="relative my-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or sign in with email/phone
                  </span>
                </div>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div>
                  <Label htmlFor="emailOrNumber">Email or Phone Number</Label>
                  <div className="flex items-center">
                    {/* Your smart +91 prefix logic - this is great! */}
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
                      onChange={(e) => {
                        const value = e.target.value;
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
                      disabled={isLoading}
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
                    required
                    disabled={isLoading}
                  />
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full text-lg py-6 font-semibold shadow-lg"
                    disabled={isLoading} // --- 9. Disable button on load ---
                  >
                    {/* --- 10. Show loader --- */}
                    {isLoading && (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    )}
                    {isLoading ? "Logging In..." : "Login"}
                  </Button>
                </motion.div>
              </motion.form>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-muted-foreground">
                  Don’t have an account?{" "}
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

export default Login;