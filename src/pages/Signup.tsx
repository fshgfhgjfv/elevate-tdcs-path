import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { toast } from "sonner";
import { Loader2, Github, CheckCircle2, ShieldCheck } from "lucide-react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

// --- CONFIGURATION ---
const googleClientId = "736905272101-bfolp8smrdkl2eg59ss9n5oihcb5ph9n.apps.googleusercontent.com";

// ⚠️ CHANGE THIS to the actual path of your PHP file
// Example: "http://localhost/my-project/auth.php"
const API_URL = "http://localhost/auth.php"; 

// --- Floating Tools Data (Visuals) ---
const tools = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg", alt: "Kali Linux", side: "left" as const, delay: 0.2, y: 150 },
  { src: "https://i0.wp.com/davidjmcclelland.com/wp-content/uploads/2021/11/burpSuiteLogo.png?resize=220%2C220&ssl=1", alt: "Burp Suite", side: "left" as const, delay: 0.4, y: 350 },
  { src: "https://github.com/fshgfhgjfv/elevate-tdcs-path/blob/main/png-transparent-wireshark-packet-analyzer-computer-software-protocol-analyzer-leopard-shark-thumbnail.png?raw=true", alt: "Wireshark", side: "right" as const, delay: 0.3, y: 120 },
  { src: "https://assets.tryhackme.com/img/modules/metasploit.png", alt: "Nmap", side: "right" as const, delay: 0.5, y: 320 },
  { src: "https://assets.tryhackme.com/img/modules/metasploit.png", alt: "Metasploit", side: "left" as const, delay: 0.6, y: 500 },
];

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.659,4.696-6.142,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.16,0-9.658-3.302-11.303-7.918l-6.522,5.023C9.505,41.246,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C41.383,34.463,44,29.625,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // State for Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  // State for Verification
  const [verification, setVerification] = useState({
    email: { isVerifying: false, isVerified: false, otp: "" },
  });

  // Regex for validation
  const gmailRegex = /^[a-zA-Z0-9.]+@gmail\.com$/;

  // Password Strength Logic
  const [strength, setStrength] = useState(0);
  useEffect(() => {
    const pass = formData.password;
    let score = 0;
    if (!pass) { setStrength(0); return; }
    if (pass.length > 5) score += 1;
    if (pass.length > 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    setStrength(score);
  }, [formData.password]);

  const getStrengthText = (s: number) => {
    if (s === 0) return "";
    if (s <= 2) return "Weak";
    if (s === 3) return "Medium";
    if (s >= 4) return "Strong";
    if (s === 5) return "Very Strong";
    return "";
  };

  // ------------------------------------------
  // 1. SEND OTP FUNCTION
  // ------------------------------------------
  const startEmailVerify = async () => {
    if (!formData.email) return toast.error("Please enter email first");

    setIsLoading(true);
    
    // Create Form Data for PHP
    const data = new FormData();
    data.append("action", "sendotp");
    data.append("email", formData.email);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
        credentials: "include", // IMPORTANT: Keeps PHP Session alive
      });
      
      const text = await response.text();
      
      if (response.ok && text.includes("OTP Sent Successfully")) {
        toast.success("OTP Sent! Check your email.");
        setVerification((prev) => ({
          ...prev,
          email: { ...prev.email, isVerifying: true },
        }));
      } else {
        toast.error(text || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Server Error: Could not connect to PHP backend.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------
  // 2. VERIFY OTP FUNCTION
  // ------------------------------------------
  const confirmEmailOtp = async () => {
    if (verification.email.otp.length !== 6) {
      return toast.error("Please enter a 6-digit OTP");
    }

    setIsLoading(true);

    const data = new FormData();
    data.append("action", "verifyotp");
    data.append("otp", verification.email.otp);
    data.append("otp_email", formData.email); // PHP checks this against session

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
        credentials: "include", // IMPORTANT
      });

      const text = await response.text();

      if (text.includes("OTP Verified")) {
        toast.success("Email Verified Successfully!");
        setVerification((prev) => ({
          ...prev,
          email: { ...prev.email, isVerifying: false, isVerified: true },
        }));
      } else {
        toast.error(text || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Verification failed due to network error");
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------
  // 3. FINAL REGISTRATION FUNCTION
  // ------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, email, number, password, confirmPassword } = formData;

    // Basic Validation
    if (!name || !email || !number || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    if (!verification.email.isVerified) {
      toast.error("Please verify your Gmail first.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }

    // Prepare data for PHP "registration" action
    const data = new FormData();
    data.append("action", "registration");
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    // Note: PHP 'registration' action CHECKS OTP AGAIN.
    // We must send the OTP user entered so PHP can validate it one last time.
    data.append("otp", verification.email.otp); 

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
        credentials: "include", // Keep session for final check
      });

      const text = await response.text();

      if (text.includes("reg_success")) {
        toast.success("Account created successfully!");
        // Optional: Save non-sensitive data to localStorage if needed for dashboard
        localStorage.setItem("tdcs_user", JSON.stringify({ name, email }));
        
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(text || "Registration failed");
      }
    } catch (error) {
      toast.error("Registration error");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // You would usually send this token to your backend to verify
      toast.success("Google Login Simulated");
      navigate("/dashboard");
    },
    onError: () => toast.error("Google Login Failed"),
  });

  const handleGitHubSignup = () => toast.info("GitHub Not Implemented");

  // --- Animation Refs (Visuals Only) ---
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useMotionValue(0);
  const glareOpacitySpring = useSpring(glareOpacity, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(0.15);
  };
  const handleMouseLeave = () => {
    x.set(0); y.set(0); glareOpacity.set(0);
  };

  const formVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Background Tools */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {tools.map((tool) => (
          <motion.img
            key={tool.alt}
            src={tool.src}
            className="absolute h-16 w-16 md:h-24 md:w-24 opacity-10"
            style={{ top: tool.y, ...(tool.side === "left" ? { left: "10%" } : { right: "10%" }) }}
            animate={{ y: [tool.y, tool.y + 20, tool.y] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: tool.delay }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <Card className="shadow-glow-lg dark border border-red-600/50 bg-black/80 backdrop-blur-sm" style={{ transform: "translateZ(100px)", transformStyle: "preserve-3d" }}>
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                opacity: glareOpacitySpring,
                background: useTransform([glareX, glareY], ([lx, ly]) => `radial-gradient(800px circle at ${lx} ${ly}, rgba(255, 255, 255, 0.2), transparent 80%)`),
                zIndex: 1,
              }}
            />

            <CardHeader style={{ position: "relative", zIndex: 2 }}>
              <CardTitle className="text-3xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Create Account</CardTitle>
              <CardDescription>Sign up to start your learning journey</CardDescription>
            </CardHeader>

            <CardContent style={{ position: "relative", zIndex: 2 }}>
              <motion.form onSubmit={handleSubmit} className="space-y-4" variants={formVariants} initial="hidden" animate="visible">
                
                {/* Social Login */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="w-full" onClick={() => googleLogin()} type="button" disabled={isLoading}>
                    <GoogleIcon className="mr-2 h-4 w-4" /> Google
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => handleGitHubSignup()} type="button" disabled={isLoading}>
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-700" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-2 text-muted-foreground">Or email</span></div>
                </motion.div>

                {/* Name */}
                <motion.div variants={itemVariants}>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required disabled={isLoading} className="bg-gray-900/50" />
                </motion.div>

                {/* Email with PHP OTP Logic */}
                <motion.div variants={itemVariants}>
                  <Label htmlFor="email">Email (Gmail Only)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isLoading || verification.email.isVerified}
                      className={`bg-gray-900/50 ${verification.email.isVerified ? "border-green-500 text-green-500" : ""}`}
                    />
                    {verification.email.isVerified ? (
                      <div className="flex items-center justify-center px-3 bg-green-500/10 border border-green-500 rounded-md">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    ) : (
                      <AnimatePresence>
                        {gmailRegex.test(formData.email) && !verification.email.isVerifying && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button type="button" variant="outline" onClick={startEmailVerify} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white" disabled={isLoading}>
                              {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : "Verify"}
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                  
                  {/* OTP Input - Shown only when Verifying */}
                  <AnimatePresence>
                    {verification.email.isVerifying && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-2 p-3 border border-dashed border-gray-700 rounded-md bg-gray-900/30">
                          <Label className="text-xs text-muted-foreground mb-1 block">Enter 6-digit OTP sent to email</Label>
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              placeholder="Enter Your OTP"
                              maxLength={6}
                              className="text-center tracking-widest bg-gray-900/50"
                              value={verification.email.otp}
                              onChange={(e) => setVerification((prev) => ({ ...prev, email: { ...prev.email, otp: e.target.value.replace(/\D/g, "") } }))}
                            />
                            <Button type="button" size="sm" onClick={confirmEmailOtp} className="bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                              Confirm
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Phone (No OTP) */}
                <motion.div variants={itemVariants}>
                  <Label htmlFor="number">Phone Number</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center flex-1">
                      <span className="px-3 py-2 bg-gray-900/50 rounded-l-md border border-r-0 border-input text-sm text-muted-foreground h-10 flex items-center">+91</span>
                      <Input
                        id="number"
                        type="text"
                        placeholder="Enter Mobile Number"
                        value={formData.number}
                        onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); if (val.length <= 10) setFormData({ ...formData, number: val }); }}
                        disabled={isLoading}
                        className="rounded-l-none bg-gray-900/50"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants}>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required disabled={isLoading} className="bg-gray-900/50" />
                  <AnimatePresence>
                    {formData.password && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 space-y-2">
                        <div className="flex gap-1 h-1.5">
                          {[1, 2, 3, 4].map((l) => (
                            <div key={l} className="h-full flex-1 rounded-full bg-gray-800 overflow-hidden">
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: strength >= l ? "100%" : "0%", backgroundColor: strength >= l ? (l === 1 ? "rgb(239 68 68)" : l === 2 && strength <= 2 ? "rgb(239 68 68)" : l <= 2 && strength >= 3 ? "rgb(234 179 8)" : l === 3 && strength === 3 ? "rgb(234 179 8)" : "rgb(34 197 94)") : "transparent" }}
                                className="h-full w-full"
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className={`font-medium ${strength <= 2 ? "text-red-500" : strength === 3 ? "text-yellow-500" : "text-green-500"}`}>
                            Strength: {getStrengthText(strength)} {strength <= 2 && " (Too Weak)"}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required disabled={isLoading} className="bg-gray-900/50" />
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-0" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>
                </motion.div>
              </motion.form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-red-500 hover:text-red-400 hover:underline font-semibold">Login</Link></p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const SignupWithGoogleAuth = () => (
  <GoogleOAuthProvider clientId={googleClientId}>
    <Signup />
  </GoogleOAuthProvider>
);

export default SignupWithGoogleAuth;