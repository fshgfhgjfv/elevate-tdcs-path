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
const googleClientId =
  "736905272101-bfolp8smrdkl2eg59ss9n5oihcb5ph9n.apps.googleusercontent.com";

// --- Define Floating Tools & Animations ---
const tools = [
  // ... (tools array is unchanged)
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
  // ... (GoogleIcon SVG is unchanged)
);
// --- End Google Icon ---

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false); // <<< 1. ADD EXIT STATE
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

  // --- 2. CREATE A FUNCTION TO HANDLE EXIT ANIMATION & NAVIGATION ---
  const exitToDashboard = () => {
    setIsExiting(true); // Trigger exit animations
    setTimeout(() => {
      navigate("/dashboard");
    }, 500); // Wait 500ms for animations to finish
  };

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
    // ... (other validations are unchanged)
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
      exitToDashboard(); // <<< 3. USE THE NEW FUNCTION
    }, 1000);
  };

  // --- 3. GOOGLE SIGNUP HANDLERS ---
  const handleGoogleSuccess = async (tokenResponse: any) => {
    setIsLoading(true);
    try {
      // ... (fetch user info logic is unchanged)
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );
      // ... (error handling is unchanged)
      const userInfo = await userInfoResponse.json();
      const { email, name, sub: googleId } = userInfo;
      // ... (email check is unchanged)

      const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
      let user = users.find((u: any) => u.email === email);
      let isNewUser = false;

      if (!user) {
        // ... (new user creation logic is unchanged)
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

      // Log the user in
      const { password: _, ...userToLogin } = user;
      localStorage.setItem("tdcs_user", JSON.stringify(userToLogin));

      toast.success(
        isNewUser ? "Account created successfully!" : "Logged in successfully!"
      );
      setIsLoading(false);
      exitToDashboard(); // <<< 3. USE THE NEW FUNCTION
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    // ... (unchanged)
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  const handleGitHubSignup = (provider: string) => {
    // ... (unchanged)
  };

  // --- 3D Card Tilt Animation ---
  // ... (all card tilt logic is unchanged)
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
    if (!cardRef.current || isExiting) return; // <<< Disable tilt on exit
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
  // ... (formVariants and itemVariants are unchanged)
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
            // --- 4. MAKE ANIMATE PROP CONDITIONAL ---
            animate={
              isExiting
                ? { // Exit Animation
                    opacity: 0,
                    x: tool.side === "left" ? -150 : 150,
                    scale: 0.3,
                    transition: { duration: 0.4, ease: "easeIn" },
                  }
                : { // Original "Coming" Animation
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
                  }
            }
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
          initial={{ opacity: 0, y: 20, scale: 1 }} // Add scale: 1
          // --- 5. MAKE ANIMATE & TRANSITION PROPS CONDITIONAL ---
          animate={
            isExiting
              ? { opacity: 0, y: -20, scale: 0.95 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={
            isExiting
              ? { duration: 0.4, ease: "easeIn" }
              : { duration: 0.5 }
          }
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
              {/* ... (CardHeader content is unchanged) ... */}
            </CardHeader>
            <CardContent>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                {/* --- (All form fields are unchanged) --- */}
                
                {/* --- 4. SOCIAL LOGINS --- */}
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
                  {/* ... (divider unchanged) ... */}
                </motion.div>

                {/* --- Form Fields --- */}
                <motion.div variants={itemVariants}>
                  {/* ... (name field unchanged) ... */}
                </motion.div>
                
                {/* ... (other fields unchanged) ... */}
                
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
                {/* ... (login link unchanged) ... */}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

// --- 5. WRAP COMPONENT IN PROVIDER ---
// ... (This part is unchanged)
const SignupWithGoogleAuth = () => (
  <GoogleOAuthProvider clientId={googleClientId}>
    <Signup />
  </GoogleOAuthProvider>
);

export default SignupWithGoogleAuth;