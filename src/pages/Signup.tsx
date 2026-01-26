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
} from "framer-motion";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

// Input validation schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  phone: z.string().length(10, "Phone number must be 10 digits"),
  email: z.string().email("Please enter a valid email address").max(255, "Email is too long"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// --- Floating Icons Data ---
const tools = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg", delay: 0, x: "5%", y: "5%" },
  { src: "https://i0.wp.com/davidjmcclelland.com/wp-content/uploads/2021/11/burpSuiteLogo.png?resize=220%2C220&ssl=1", delay: 2, x: "85%", y: "10%" },
  { src: "https://assets.tryhackme.com/img/modules/metasploit.png", delay: 4, x: "10%", y: "85%" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png", delay: 1, x: "80%", y: "80%" },
];

const Signup = () => {
  const navigate = useNavigate();
  const { user, loading, signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; password?: string }>({});
  
  // --- Form State ---
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

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

  const validateForm = () => {
    try {
      signupSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: typeof errors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof typeof errors;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (strength < 3) {
      toast.error("Password is too weak. Add uppercase letters, numbers, or special characters.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await signUp(
      formData.email,
      formData.password,
      formData.name,
      `+91${formData.phone}`
    );

    if (error) {
      if (error.message.includes("already registered")) {
        toast.error("This email is already registered. Please login instead.");
      } else {
        toast.error(error.message || "Signup failed");
      }
      setIsSubmitting(false);
      return;
    }

    toast.success("Account created successfully! Please check your email to confirm.");
    navigate("/login");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setFormData({ ...formData, phone: value });
    }
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white selection:bg-teal-500/30">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black -z-20" />
      <div className="absolute inset-0 -z-10 opacity-20" 
           style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(to right, #333 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      {tools.map((tool, index) => (
        <motion.img
          key={index}
          src={tool.src}
          className="absolute w-12 h-12 md:w-24 md:h-24 opacity-10 blur-[1px]"
          style={{ top: tool.y, left: tool.x }}
          animate={{ y: ["0px", "-20px", "0px"], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="container mx-auto px-4 z-10 py-6 md:py-10">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[450px] mx-auto w-full"
        >
          <Card
            className="relative border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-2xl overflow-hidden my-4 md:my-0"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500" />
            
            <CardHeader className="text-center pb-2 pt-6 md:pt-8">
              <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-2">Sign Up</CardTitle>
              <CardDescription className="text-zinc-400 text-sm md:text-base">
                Create an account to unlock exclusive labs.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 px-4 md:px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300 text-xs md:text-sm">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 md:top-3 h-4 w-4 text-zinc-500" />
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className={`pl-10 h-10 md:h-12 bg-zinc-900/50 border-zinc-800 focus:border-teal-500 text-white placeholder:text-zinc-600 text-sm md:text-base ${errors.name ? "border-red-500" : ""}`}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300 text-xs md:text-sm">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 md:top-3 h-4 w-4 text-zinc-500" />
                    <span className="absolute left-9 top-2.5 md:top-3 text-zinc-400 text-sm md:text-base font-medium select-none">
                      +91
                    </span>
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="98765 43210" 
                      className={`pl-16 h-10 md:h-12 bg-zinc-900/50 border-zinc-800 focus:border-teal-500 text-white placeholder:text-zinc-600 text-sm md:text-base ${errors.phone ? "border-red-500" : ""}`}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      disabled={isSubmitting}
                      required
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300 text-xs md:text-sm">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 md:top-3 h-4 w-4 text-zinc-500" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      className={`pl-10 h-10 md:h-12 bg-zinc-900/50 border-zinc-800 focus:border-teal-500 text-white placeholder:text-zinc-600 text-sm md:text-base ${errors.email ? "border-red-500" : ""}`}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-zinc-300 text-xs md:text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 md:top-3 h-4 w-4 text-zinc-500" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className={`pl-10 h-10 md:h-12 bg-zinc-900/50 border-zinc-800 focus:border-teal-500 text-white placeholder:text-zinc-600 text-sm md:text-base ${errors.password ? "border-red-500" : ""}`}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  
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
                  className="w-full h-10 md:h-12 bg-teal-500 hover:bg-teal-600 text-black font-bold text-sm md:text-md shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="justify-center border-t border-white/5 pt-4 pb-6">
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

export default Signup;
