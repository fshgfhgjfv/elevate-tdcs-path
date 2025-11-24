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
import { Loader2, Github } from "lucide-react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

// --- CONFIGURATION ---
const googleClientId =
  "736905272101-bfolp8smrdkl2eg59ss9n5oihcb5ph9n.apps.googleusercontent.com";

// --- Floating Tools Data ---
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

// --- Google Icon Helper ---
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
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

  // --- Password Strength State ---
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const pass = formData.password;
    let score = 0;
    if (!pass) {
      setStrength(0);
      return;
    }

    // Calculation Logic
    if (pass.length > 5) score += 1;
    if (pass.length > 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    setStrength(score);
  }, [formData.password]);

  const getStrengthColor = (s: number) => {
    if (s === 0) return "bg-muted";
    if (s <= 2) return "bg-red-500";
    if (s === 3) return "bg-yellow-500";
    if (s >= 4) return "bg-green-500";
    return "bg-muted";
  };

  const getStrengthText = (s: number) => {
    if (s === 0) return "";
    if (s <= 2) return "Weak";
    if (s === 3) return "Medium";
    if (s >= 4) return "Strong";
    if (s === 5) return "Very Strong";
    return "";
  };

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

    // 1. Empty Fields Check
    if (!name || !email || !number || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // 2. Strict Gmail Validation
    // Only allows letters (a-z, A-Z), numbers (0-9), and dots (.) before @gmail.com
    const gmailRegex = /^[a-zA-Z0-9.]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      toast.error("Please use a valid Gmail address (e.g., user@gmail.com)");
      setIsLoading(false);
      return;
    }

    // 3. Phone Validation (Starts with 6, 7, 8, or 9)
    // regex explanation: ^[6-9] means starts with 6,7,8,9. \d{9} means followed by 9 digits.
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      toast.error("Invalid Phone Number. Must start with be 10 digits.");
      setIsLoading(false);
      return;
    }

    // 4. Password Match Check
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }

    // 5. Strict Password Strength Check
    // Strength 0, 1, 2 is Weak. We block signup.
    if (strength <= 2) {
      toast.error(
        "Password is too weak! Add symbols, numbers, and uppercase letters."
      );
      setIsLoading(false);
      return;
    }

    // 6. Duplicate Email Check
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

  // --- Google Sign In Logic (Unchanged) ---
  const handleGoogleSuccess = async (tokenResponse: any) => {
    setIsLoading(true);
    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      if (!userInfoResponse.ok)
        throw new Error("Failed to fetch user info from Google");
      const userInfo = await userInfoResponse.json();
      const { email, name, sub: googleId } = userInfo;

      if (!email) {
        toast.error("Google account must have a verified email.");
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
      let user = users.find((u: any) => u.email === email);
      let isNewUser = false;

      if (!user) {
        user = {
          id: googleId,
          name,
          email,
          number: "",
          isGoogleUser: true,
        };
        users.push(user);
        localStorage.setItem("tdcs_users", JSON.stringify(users));
        isNewUser = true;
      }

      const { password: _, ...userToLogin } = user;
      localStorage.setItem("tdcs_user", JSON.stringify(userToLogin));
      toast.success(
        isNewUser ? "Account created successfully!" : "Logged in successfully!"
      );
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In failed.");
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In failed.");
    setIsLoading(false);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  const handleGitHubSignup = (provider: string) => {
    toast.info(`Sign up with ${provider} is not implemented in this demo.`);
  };

  // --- 3D Card Animations ---
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
  const glareOpacitySpring = useSpring(glareOpacity, {
    stiffness: 400,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    glareOpacity.set(0.15);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Floating Tools */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
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
          style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card
            className="shadow-glow-lg dark border border-red-600/50 bg-black/80 backdrop-blur-sm"
            style={{
              transform: "translateZ(100px)",
              transformStyle: "preserve-3d",
              position: "relative",
            }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                opacity: glareOpacitySpring,
                background: useTransform(
                  [glareX, glareY],
                  ([latestX, latestY]) =>
                    `radial-gradient(800px circle at ${latestX} ${latestY}, rgba(255, 255, 255, 0.2), transparent 80%)`
                ),
                zIndex: 1,
              }}
            />

            <CardHeader style={{ position: "relative", zIndex: 2 }}>
              <CardTitle className="text-3xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Create Account
              </CardTitle>
              <CardDescription>
                Sign up to start your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent style={{ position: "relative", zIndex: 2 }}>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => googleLogin()}
                    type="button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <GoogleIcon className="mr-2 h-4 w-4" />
                    )}
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleGitHubSignup("GitHub")}
                    type="button"
                    disabled={isLoading}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-muted-foreground">
                      Or email
                    </span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    disabled={isLoading}
                    className="bg-gray-900/50"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Label htmlFor="email">Email (Gmail Only)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    disabled={isLoading}
                    className="bg-gray-900/50"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Label htmlFor="number">Phone Number</Label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-gray-900/50 rounded-l-md border border-r-0 border-input text-sm text-muted-foreground h-10 flex items-center">
                      +91
                    </span>
                    <Input
                      id="number"
                      type="text"
                      placeholder="10-digit-number"
                      value={formData.number}
                      onChange={(e) => {
                        // Input filtering: Only allow digits
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) {
                          setFormData({ ...formData, number: value });
                        }
                      }}
                      className="rounded-l-none bg-gray-900/50"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
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
                    className="bg-gray-900/50"
                  />
                  {/* Password Strength Meter */}
                  <AnimatePresence>
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-2"
                      >
                        <div className="flex gap-1 h-1.5">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className="h-full flex-1 rounded-full bg-gray-800 overflow-hidden"
                            >
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={{
                                  width: strength >= level ? "100%" : "0%",
                                  backgroundColor:
                                    strength >= level
                                      ? level === 1
                                        ? "rgb(239 68 68)"
                                        : level === 2 && strength <= 2
                                        ? "rgb(239 68 68)"
                                        : level <= 2 && strength >= 3
                                        ? "rgb(234 179 8)"
                                        : level === 3 && strength === 3
                                        ? "rgb(234 179 8)"
                                        : "rgb(34 197 94)"
                                      : "transparent",
                                }}
                                className={`h-full w-full ${getStrengthColor(
                                  strength
                                )}`}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span
                            className={`font-medium ${
                              strength <= 2
                                ? "text-red-500"
                                : strength === 3
                                ? "text-yellow-500"
                                : "text-green-500"
                            }`}
                          >
                            Strength: {getStrengthText(strength)}
                            {strength <= 2 && " (Too Weak to Signup)"}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={itemVariants}>
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
                    disabled={isLoading}
                    className="bg-gray-900/50"
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-0"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </motion.div>
              </motion.form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-red-500 hover:text-red-400 hover:underline font-semibold"
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

const SignupWithGoogleAuth = () => (
  <GoogleOAuthProvider clientId={googleClientId}>
    <Signup />
  </GoogleOAuthProvider>
);

export default SignupWithGoogleAuth;