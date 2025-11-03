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
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

// --- Floating Tool Icons ---
const tools = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg",
    alt: "Kali Linux",
    side: "left" as "left" | "right",
    delay: 0.2,
    y: 150,
  },
  {
    src: "https://i0.wp.com/davidjmcclelland.com/wp-content/uploads/2021/11/burpSuiteLogo.png?resize=220%2C220&ssl=1",
    alt: "Burp Suite",
    side: "left" as "left" | "right",
    delay: 0.4,
    y: 350,
  },
  {
    src: "https://github.com/fshgfhgjfv/elevate-tdcs-path/blob/main/png-transparent-wireshark-packet-analyzer-computer-software-protocol-analyzer-leopard-shark-thumbnail.png?raw=true",
    alt: "Wireshark",
    side: "right" as "left" | "right",
    delay: 0.3,
    y: 120,
  },
  {
    src: "https://assets.tryhackme.com/img/modules/metasploit.png",
    alt: "Nmap",
    side: "right" as "left" | "right",
    delay: 0.5,
    y: 320,
  },
  {
    src: "https://assets.tryhackme.com/img/modules/metasploit.png",
    alt: "Metasploit",
    side: "left" as "left" | "right",
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
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
    const { name, email, number, password, confirmPassword } = formData;

    if (!name || !email || !number || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      setIsLoading(false);
      return;
    }
    if (!/^[0-9]{10}$/.test(number)) {
      toast.error("Please enter a valid 10-digit phone number");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }
    if (users.find((u: any) => u.email === email)) {
      toast.error("User with this email already exists");
      setIsLoading(false);
      return;
    }

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
    }, 1000);
  };

  // 3D card motion
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
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Floating icons */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {tools.map((tool) => (
          <motion.img
            key={tool.alt}
            src={tool.src}
            alt={tool.alt}
            className="absolute h-16 w-16 md:h-24 md:w-24 opacity-10"
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
                  duration: 2 + Math.random() * 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              },
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="shadow-glow-lg">
            <CardHeader>
              <CardTitle className="text-3xl gradient-text">
                Create Account
              </CardTitle>
              <CardDescription>
                Sign up to start your learning journey
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Google Sign up */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const token = credentialResponse.credential;
                    if (token) {
                      const decoded: any = jwtDecode(token);
                      const user = {
                        name: decoded.name,
                        email: decoded.email,
                        picture: decoded.picture,
                      };
                      localStorage.setItem(
                        "tdcs_user",
                        JSON.stringify(user)
                      );
                      toast.success(`Welcome ${user.name}!`);
                      navigate("/dashboard");
                    }
                  }}
                  onError={() => {
                    toast.error("Google Sign Up Failed");
                  }}
                />

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    toast.info("GitHub sign up not implemented yet.")
                  }
                >
                  <Github className="mr-2 h-4 w-4" /> Sign up with GitHub
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="number">Phone Number</Label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-muted rounded-l-md border border-r-0 border-input text-sm text-muted-foreground">
                      +91
                    </span>
                    <Input
                      id="number"
                      type="text"
                      placeholder="10-digit number"
                      value={formData.number}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) {
                          setFormData({ ...formData, number: value });
                        }
                      }}
                      className="rounded-l-none"
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
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:underline font-semibold"
                  >
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
