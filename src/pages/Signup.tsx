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
// --- 1. IMPORT GOOGLE OAUTH PROVIDER & HOOK ---
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

// --- 2. SET GOOGLE CLIENT ID ---
// IMPORTANT: The Client Secret MUST NOT be used in frontend code.
// It is for your backend server ONLY.
const googleClientId =
  "736905272101-bfolp8smrdkl2eg59ss9n5oihcb5ph9n.apps.googleusercontent.com";

// --- Define Floating Tools & Animations ---
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
    alt: "Nmap", // Alt text was incorrect, this is Metasploit logo
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

// Variants for the initial slide-in
const iconVariants = {
  hidden: (side: "left" | "right") => ({
    opacity: 0,
    x: side === "left" ? -100 : 100, // Come from off-screen
    scale: 0.5,
  }),
};
// --- End Floating Tools ---

// --- Google Icon Helper ---
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
// --- End Google Icon ---

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
    // Redirect if already logged in
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

    // Client-side validation
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

    // Simulate API delay for animation
    setTimeout(() => {
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        number: `+91${number}`,
        password, // Note: Storing plain text passwords is a security risk
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

  // --- 3. GOOGLE SIGNUP HANDLERS ---
  const handleGoogleSuccess = async (tokenResponse: any) => {
    setIsLoading(true);
    try {
      // Fetch user info from Google
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
        toast.error("Google account must have a verified email.");
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
      let user = users.find((u: any) => u.email === email);
      let isNewUser = false;

      if (!user) {
        // New user - register them
        user = {
          id: googleId, // Use Google ID as unique ID
          name,
          email,
          number: "", // Google doesn't provide this
          isGoogleUser: true, // Flag for Google login
        };
        users.push(user);
        localStorage.setItem("tdcs_users", JSON.stringify(users));
        isNewUser = true;
      }

      // Log the user in
      // Note: We don't have/need a password for Google users
      const { password: _, ...userToLogin } = user;
      localStorage.setItem("tdcs_user", JSON.stringify(userToLogin));

      toast.success(
        isNewUser ? "Account created successfully!" : "Logged in successfully!"
      );
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In Error");
    toast.error("Google Sign-In failed.");
    setIsLoading(false);
  };

  // Initialize the Google login hook
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  const handleGitHubSignup = (provider: string) => {
    toast.info(`Sign up with ${provider} is not implemented in this demo.`);
  };

  // --- 3D Card Tilt Animation ---
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10deg", "-10deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10deg", "10deg"]
  );
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
  // --- End 3D Card ---

  // --- Staggered Form Animation ---
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  // --- End Staggered ---

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* --- Floating Tools --- */}
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
              y: [tool.y, tool.y + 20, tool.y], // Bob up and down
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
      {/* --- End Floating Tools --- */}

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
          <Card
            className="shadow-glow-lg"
            style={{
              transform: "translateZ(75px)",
              transformStyle: "preserve-3d",
            }}
          >
            <CardHeader>
              <CardTitle className="text-3xl gradient-text">
                Create Account
              </CardTitle>
              <CardDescription>
                Sign up to start your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                {/* --- 4. SOCIAL LOGINS --- */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => googleLogin()} // <<< 4. CALL GOOGLE LOGIN HOOK
                    type="button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <GoogleIcon className="mr-2 h-4 w-4" />
                    )}
                    Sign up with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleGitHubSignup("GitHub")}
                    type="button"
                    disabled={isLoading}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Sign up with GitHub
                  </Button>
                </motion.div>

                {/* --- 5. DIVIDER --- */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or sign up with email
                    </span>
                  </div>
                </motion.div>

                {/* --- Form Fields --- */}
                <motion.div variants={itemVariants}>
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
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
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
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
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
                  />
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
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
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
                </motion.div>
              </motion.form>

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

// --- 5. WRAP COMPONENT IN PROVIDER ---
// This ensures the useGoogleLogin() hook has access to the client ID
const SignupWithGoogleAuth = () => (
  <GoogleOAuthProvider clientId={googleClientId}>
    <Signup />
  </GoogleOAuthProvider>
);

export default SignupWithGoogleAuth;
