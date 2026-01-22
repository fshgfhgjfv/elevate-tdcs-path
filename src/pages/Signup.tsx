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
  CardFooter,
} from "@/components/ui/card";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Mail, Lock, User, Github } from "lucide-react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

// --- CONFIGURATION ---
const googleClientId = "736905272101-bfolp8smrdkl2eg59ss9n5oihcb5ph9n.apps.googleusercontent.com";

// --- Floating Icons Data ---
const tools = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg", delay: 0, x: "10%", y: "10%" },
  { src: "https://i0.wp.com/davidjmcclelland.com/wp-content/uploads/2021/11/burpSuiteLogo.png?resize=220%2C220&ssl=1", delay: 2, x: "80%", y: "20%" },
  { src: "https://assets.tryhackme.com/img/modules/metasploit.png", delay: 4, x: "15%", y: "70%" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png", delay: 1, x: "85%", y: "80%" },
];

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.659,4.696-6.142,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.16,0-9.658-3.302-11.303-7.918l-6.522,5.023C9.505,41.246,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C41.383,34.463,44,29.625,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // --- Form State ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [strength, setStrength] = useState(0);

  // --- Password Logic ---
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

  const getStrengthColor = (s: number) => {
    if (s <= 2) return "bg-red-500";
    if (s === 3) return "bg-yellow-500";
    return "bg-teal-500";
  };

  // --- Handlers ---
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      // Simulate Backend Verification
      setTimeout(() => {
        toast.success("Google Login Successful!");
        navigate("/dashboard");
      }, 1500);
    },
    onError: () => toast.error("Google Login Failed"),
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (strength < 3) {
      toast.error("Password is too weak");
      setIsLoading(false);
      return;
    }
    // Simulate Signup
    setTimeout(() => {
      toast.success("Account Created Successfully!");
      navigate("/dashboard");
    }, 1500);
  };

  // --- 3D Card Logic ---
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white selection:bg-teal-500/30">
      
      {/* --- Dynamic Background --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black -z-20" />
      <div className="absolute inset-0 -z-10 opacity-20" 
           style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(to right, #333 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      {/* Floating Tools */}
      {tools.map((tool, index) => (
        <motion.img
          key={index}
          src={tool.src}
          className="absolute w-16 h-16 md:w-24 md:h-24 opacity-10 blur-[1px]"
          style={{ top: tool.y, left: tool.x }}
          animate={{ y: ["0px", "-20px", "0px"], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* --- Main Card --- */}
      <div className="container mx-auto px-4 z-10 py-10">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[450px] mx-auto"
        >
          <Card
            className="relative border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-2xl overflow-hidden"
            style={{ transform: "translateZ(50px)" }}
          >
            {/* Top Glow Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500" />
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold text-white mb-2">Sign Up</CardTitle>
              <CardDescription className="text-zinc-400">
                Create an account to unlock exclusive labs.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              
              {/* --- Social Login Section --- */}
              <div className="grid gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => googleLogin()}
                  className="w-full h-12 bg-white text-black hover:bg-zinc-200 border-0 font-medium text-md transition-transform active:scale-95"
                >
                  <GoogleIcon />
                  Sign up with Google
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-12 bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white transition-transform active:scale-95"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Sign up with GitHub
                </Button>
              </div>

              {/*Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-950 px-2 text-zinc-500">Or continue with email</span>
                </div>
              </div>

              {/* --- Manual Form Section --- */}
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-teal-500 text-white placeholder:text-zinc-600"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-teal-500 text-white placeholder:text-zinc-600"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-zinc-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-teal-500 text-white placeholder:text-zinc-600"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                  
                  {/* Strength Meter */}
                  <div className="flex gap-1 h-1 mt-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        className={`h-full flex-1 rounded-full ${i <= strength ? getStrengthColor(strength) : "bg-zinc-800"}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-right text-zinc-500">
                    Strength: <span className={strength > 2 ? "text-teal-500" : "text-zinc-500"}>{strength > 3 ? "Strong" : strength > 1 ? "Medium" : "Weak"}</span>
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-black font-bold text-md shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="justify-center border-t border-white/5 pt-4">
              <p className="text-sm text-zinc-400">
                Already have an account?{" "}
                <Link to="/login" className="text-teal-400 hover:text-teal-300 font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

// Wrapper for OAuth Context
const SignupWithGoogleAuth = () => (
  <GoogleOAuthProvider clientId={googleClientId}>
    <Signup />
  </GoogleOAuthProvider>
);

export default SignupWithGoogleAuth;