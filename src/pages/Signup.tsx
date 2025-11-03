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
} from "framer-motion";
import { toast } from "sonner";
import { Loader2, Github } from "lucide-react";

const tools = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg",
    alt: "Kali Linux",
    side: "left" as const,
    delay: 0.2,
    y: 150,
  },
  {
    src: "https://i0.wp.com/davidjmcclelland.com/wp-content/uploads/2021/11/burpSuiteLogo.png?resize=220%2C220&ssl=1",
    alt: "Burp Suite",
    side: "left" as const,
    delay: 0.4,
    y: 350,
  },
  {
    src: "https://github.com/fshgfhgjfv/elevate-tdcs-path/blob/main/png-transparent-wireshark-packet-analyzer-computer-software-protocol-analyzer-leopard-shark-thumbnail.png?raw=true",
    alt: "Wireshark",
    side: "right" as const,
    delay: 0.3,
    y: 120,
  },
  {
    src: "https://assets.tryhackme.com/img/modules/metasploit.png",
    alt: "Nmap",
    side: "right" as const,
    delay: 0.5,
    y: 320,
  },
  {
    src: "https://assets.tryhackme.com/img/modules/metasploit.png",
    alt: "Metasploit",
    side: "left" as const,
    delay: 0.6,
    y: 500,
  },
];

const iconVariants = {
  hidden: (side: "left" | "right") => ({
    opacity: 0,
    x: side === "left" ? -100 : 100,
    scale: 0.5,
  }),
};

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.659,4.696-6.142,8-11.303,8c-6.627,0-12-5.373-12-12
      c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
      C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20
      c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819
      C14.655,15.108,18.961,12,24,12
      c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
      C34.046,6.053,29.268,4,24,4
      C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192
      l-6.19-5.238C29.211,35.091,26.715,36,24,36
      c-5.16,0-9.658-3.302-11.303-7.918l-6.522,5.023
      C9.505,41.246,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303
      c-0.792,2.237-2.231,4.166-4.087,5.571
      l6.19,5.238C41.383,34.463,44,29.625,44,24
      C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("tdcs_user");
    if (user) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submit clicked ✅", formData);

    let users: any[] = [];
    try {
      users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
    } catch {
      localStorage.removeItem("tdcs_users");
      users = [];
    }

    const { name, email, number, password, confirmPassword } = formData;

    // --- Validation ---
    if (!name || !email || !number || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return setIsLoading(false);
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return setIsLoading(false);
    }
    if (!/^[0-9]{10}$/.test(number)) {
      toast.error("Please enter a valid 10-digit phone number");
      return setIsLoading(false);
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return setIsLoading(false);
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return setIsLoading(false);
    }
    if (users.find((u: any) => u.email === email)) {
      toast.error("User with this email already exists");
      return setIsLoading(false);
    }

    // --- Simulate delay ---
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        number: `+91${number}`,
        password,
      };
      users.push(newUser);
      localStorage.setItem("tdcs_users", JSON.stringify(users));
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem("tdcs_user", JSON.stringify(userWithoutPassword));

      toast.success("Account created successfully!");
      setIsLoading(false);
      navigate("/dashboard");
    }, 800);
  };

  const handleSocialSignup = (provider: string) => {
    toast.info(`Sign up with ${provider} is not implemented in this demo.`);
  };

  // --- 3D Card Motion ---
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Floating background tools */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {tools.map((tool) => (
          <motion.img
            key={tool.alt}
            src={tool.src}
            alt={tool.alt}
            className="absolute h-16 w-16 md:h-24 md:w-24"
            style={{
              top: tool.y,
              ...(tool.side === "left" ? { left: "10%" } : { right: "10%" }),
            }}
            variants={iconVariants}
            initial="hidden"
            custom={tool.side}
            animate={{
              opacity: 0.1,
              x: 0,
              scale: 1,
              y: [tool.y, tool.y + 20, tool.y],
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: tool.delay,
                y: {
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              },
            }}
          />
        ))}
      </div>

      {/* Signup Card */}
      <div className="container mx-auto px-4">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card
            className="shadow-glow-lg"
            style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
          >
            <CardHeader>
              <CardTitle className="text-3xl gradient-text">Create Account</CardTitle>
              <CardDescription>Sign up to start your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Social logins */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialSignup("Google")}
                    type="button"
                  >
                    <GoogleIcon className="mr-2 h-4 w-4" />
                    Sign up with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialSignup("GitHub")}
                    type="button"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Sign up with GitHub
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or sign up with email</span>
                  </div>
                </motion.div>

                {/* Form fields */}
                {["name", "email", "number", "password", "confirmPassword"].map((field) => (
                  <motion.div key={field} variants={itemVariants}>
                    <Label htmlFor={field}>
                      {field === "confirmPassword"
                        ? "Confirm Password"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </Label>
                    <Input
                      id={field}
                      type={field.includes("password") ? "password" : "text"}
                      placeholder={
                        field === "number"
                          ? "10-digit number"
                          : field === "email"
                          ? "your@email.com"
                          : "John Doe"
                      }
                      value={(formData as any)[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      required
                    />
                  </motion.div>
                ))}

                {/* Submit button */}
                <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </motion.div>
              </motion.form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-semibold">
                    Login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
