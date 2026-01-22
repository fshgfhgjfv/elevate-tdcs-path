import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { Loader2, ShieldCheck, Terminal, Cpu, Globe } from "lucide-react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

// --- CONFIGURATION ---
const googleClientId =
  "736905272101-bfolp8smrdkl2eg59ss9n5oihcb5ph9n.apps.googleusercontent.com";

// --- Floating Icons Data ---
const tools = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg", delay: 0.2, x: "10%", y: "20%" },
  { src: "https://i0.wp.com/davidjmcclelland.com/wp-content/uploads/2021/11/burpSuiteLogo.png?resize=220%2C220&ssl=1", delay: 0.4, x: "80%", y: "15%" },
  { src: "https://assets.tryhackme.com/img/modules/metasploit.png", delay: 0.6, x: "15%", y: "70%" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png", delay: 0.8, x: "85%", y: "65%" },
];

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.659,4.696-6.142,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.16,0-9.658-3.302-11.303-7.918l-6.522,5.023C9.505,41.246,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C41.383,34.463,44,29.625,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // --- Google Login Handler ---
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      console.log("Google Token:", tokenResponse);

      // SIMULATION: In production, send tokenResponse.access_token to your PHP backend
      setTimeout(() => {
        // Mock User Data
        const mockUser = {
          name: "Google User",
          email: "user@gmail.com",
          photo: "https://lh3.googleusercontent.com/a/default-user",
        };
        localStorage.setItem("tdcs_user", JSON.stringify(mockUser));
        
        toast.success("Welcome to the Academy!");
        setIsLoading(false);
        navigate("/dashboard");
      }, 1500);
    },
    onError: () => {
      toast.error("Google Authentication Failed");
      setIsLoading(false);
    },
  });

  // --- 3D Tilt Logic ---
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(0.2); // Increased glare for impact
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white selection:bg-red-500/30">
      
      {/* --- Dynamic Background --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black -z-20" />
      <div className="absolute inset-0 -z-10 opacity-20" 
           style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(to right, #333 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      {/* Floating Hacker Tools */}
      {tools.map((tool, index) => (
        <motion.img
          key={index}
          src={tool.src}
          className="absolute w-20 h-20 md:w-32 md:h-32 opacity-20 blur-[1px]"
          style={{ top: tool.y, left: tool.x }}
          animate={{ 
            y: ["0px", "-20px", "0px"], 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* --- Main Card --- */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card
            className="relative border-0 bg-zinc-900/80 backdrop-blur-xl shadow-2xl overflow-hidden"
            style={{ transform: "translateZ(50px)" }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 p-[1px] bg-gradient-to-br from-red-500 via-transparent to-red-500 -z-10 rounded-xl" />
            
            {/* Dynamic Glare */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-50 rounded-xl"
              style={{
                opacity: glareOpacity,
                background: useTransform(
                  [glareX, glareY],
                  ([lx, ly]) => `radial-gradient(600px circle at ${lx} ${ly}, rgba(255, 255, 255, 0.4), transparent 60%)`
                ),
              }}
            />

            <CardHeader className="text-center pb-2">
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mx-auto bg-red-500/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4 border border-red-500/30"
              >
                <ShieldCheck className="w-10 h-10 text-red-500" />
              </motion.div>
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                Join the Elite
              </CardTitle>
              <CardDescription className="text-gray-400">
                Secure your spot in the TDCS Academy
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 pt-6">
              
              {/* Value Proposition List */}
              <div className="grid gap-4">
                {[
                  { icon: Terminal, text: "Access 50+ Virtual Hacking Labs" },
                  { icon: Cpu, text: "Industry Standard Certification" },
                  { icon: Globe, text: "Global Placement Network" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-gray-200">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* The Only Google Button */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <Button
                  onClick={() => googleLogin()}
                  disabled={isLoading}
                  className="relative w-full h-14 bg-white text-black hover:bg-gray-100 text-lg font-bold shadow-xl transition-all active:scale-[0.98]"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-black" />
                  ) : (
                    <>
                      <GoogleIcon />
                      Continue with Google
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground px-8">
                  By clicking continue, you agree to our{" "}
                  <Link to="/terms" className="underline hover:text-white">Terms of Service</Link> and{" "}
                  <Link to="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
                </p>
              </div>
            </CardContent>

            <CardFooter className="bg-black/20 border-t border-white/5 py-4 justify-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 hover:text-red-400 font-semibold transition-colors">
                  Sign In
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