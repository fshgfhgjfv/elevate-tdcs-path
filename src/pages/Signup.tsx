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
import { useGoogleLogin } from "@react-oauth/google";

/* ===========================
   Floating tools & animations
   =========================== */
const tools = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg",
    alt: "Kali Linux",
    side: "left",
    delay: 0.2,
    y: 150,
  },
  {
    src: "https://i0.wp.com/davidjmcclelland.com/wp-content/uploads/2021/11/burpSuiteLogo.png?resize=220%2C220&ssl=1",
    alt: "Burp Suite",
    side: "left",
    delay: 0.4,
    y: 350,
  },
  {
    src: "https://github.com/fshgfhgjfv/elevate-tdcs-path/blob/main/png-transparent-wireshark-packet-analyzer-computer-software-protocol-analyzer-leopard-shark-thumbnail.png?raw=true",
    alt: "Wireshark",
    side: "right",
    delay: 0.3,
    y: 120,
  },
  {
    src: "https://assets.tryhackme.com/img/modules/metasploit.png",
    alt: "Metasploit",
    side: "right",
    delay: 0.5,
    y: 320,
  },
];

const iconVariants = {
  hidden: (side) => ({
    opacity: 0,
    x: side === "left" ? -100 : 100,
    scale: 0.5,
  }),
};

/* ===========================
   Small Google SVG
   =========================== */
const GoogleIcon = (props) => (
  <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#FFC107"
      d="M43.6 20.1H42v-.1H24v8h11.3c-1.7 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12 0-6.6 5.4-12 12-12 3.1 0 5.8 1.2 8 3L43.6 8C39 4 32.8 2 24 2 12.9 2 4 10.9 4 22c0 11.1 8.9 20 20 20 11.1 0 20-8.9 20-20 0-1.3-.1-2.6-.4-3.9z"
    />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3.1 0 5.8 1.2 8 3L43.6 8C39 4 32.8 2 24 2 16.3 2 9.7 6.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 41.2 16.3 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42v-.1H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41.4 34.5 44 29.6 44 24c0-1.3-.1-2.6-.4-3.9z" />
  </svg>
);

/* ===========================
   Password strength utils
   =========================== */
const getPasswordStrength = (password) => {
  // returns object { score: 0..4, label, color }
  let score = 0;
  if (!password || password.length === 0) return { score: 0, label: "", color: "" };

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "red" };
  if (score === 2) return { score, label: "Fair", color: "orange" };
  if (score === 3) return { score: "3", label: "Good", color: "yellowgreen" };
  return { score: 4, label: "Strong", color: "green" };
};

/* ===========================
   Email & phone validators
   =========================== */
const emailIsValid = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const phoneIsValid = (phone) => /^[0-9]{10}$/.test(phone);

/* ===========================
   Main Component
   =========================== */
const Signup = () => {
  const navigate = useNavigate();

  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  // UI & validation state
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: "", color: "" });

  // animation: 3D card
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useMotionValue(0);
  const glareOpacitySpring = useSpring(glareOpacity, { stiffness: 400, damping: 30 });

  useEffect(() => {
    // redirect if a user is already stored
    const u = localStorage.getItem("tdcs_user");
    if (u) navigate("/dashboard");
  }, [navigate]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
    glareOpacity.set(0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  /* -------------------------
     GOOGLE LOGIN (POPUP)
     ------------------------- */
  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const r = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        if (!r.ok) throw new Error("Failed to fetch Google user info");

        const info = await r.json();
        if (!info.email) {
          toast.error("Google account does not provide an email");
          setIsLoading(false);
          return;
        }

        const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
        let user = users.find((u) => u.email === info.email);

        if (!user) {
          user = {
            id: info.sub,
            name: info.name || "",
            email: info.email,
            number: "",
            isGoogleUser: true,
          };
          users.push(user);
          localStorage.setItem("tdcs_users", JSON.stringify(users));
        }

        localStorage.setItem("tdcs_user", JSON.stringify(user));
        toast.success("Logged in with Google!");
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        toast.error("Google Sign-In failed.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Google Sign-In failed.");
    },
  });

  /* -------------------------
     FORM VALIDATION & SUBMIT
     ------------------------- */
  const validateForm = () => {
    const errors = {};

    // name
    if (!formData.name.trim()) errors.name = "Please enter your full name";
    else if (formData.name.trim().length < 3) errors.name = "Name must be at least 3 characters";

    // email
    if (!formData.email) errors.email = "Please enter your email";
    else if (!emailIsValid(formData.email)) errors.email = "Enter a valid email address";

    // phone
    if (!formData.number) errors.number = "Please enter your 10-digit phone number";
    else if (!phoneIsValid(formData.number)) errors.number = "Phone number must be 10 digits";

    // password
    if (!formData.password) errors.password = "Please create a password";
    else {
      const strength = getPasswordStrength(formData.password);
      if (strength.score < 2) errors.password = "Password is too weak (use 8+ chars, upper, number, symbol)";
    }

    // confirm
    if (!formData.confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      toast.error("Please fix the highlighted errors");
      setIsLoading(false);
      return;
    }

    // check existing users
    const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
    if (users.find((u) => u.email === formData.email)) {
      toast.error("An account with this email already exists");
      setFieldErrors({ email: "Email already registered" });
      setIsLoading(false);
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      number: `+91${formData.number}`,
      password: formData.password, // demo only: never store plaintext passwords in production
    };

    users.push(newUser);
    localStorage.setItem("tdcs_users", JSON.stringify(users));
    const { password, ...safe } = newUser;
    localStorage.setItem("tdcs_user", JSON.stringify(safe));

    toast.success("Account created successfully!");
    setIsLoading(false);
    navigate("/dashboard");
  };

  /* -------------------------
     password input change handler (live strength)
     ------------------------- */
  const handlePasswordChange = (value) => {
    setFormData((s) => ({ ...s, password: value }));
    const strength = getPasswordStrength(value);
    setPasswordStrength(strength);
  };

  /* -------------------------
     helper for rendering strength bar
     ------------------------- */
  const renderStrengthBar = () => {
    const segments = 4;
    const active = Math.min(Number(passwordStrength.score) || 0, segments);
    const segs = [];

    for (let i = 1; i <= segments; i++) {
      const isActive = i <= active;
      let bg = "bg-gray-200";
      if (isActive) {
        // make color progressive
        if (active === 1) bg = "bg-red-500";
        else if (active === 2) bg = "bg-orange-400";
        else if (active === 3) bg = "bg-yellow-400";
        else bg = "bg-green-500";
      }
      segs.push(
        <div
          key={i}
          className={`${bg} h-1 rounded-sm transition-all duration-200`}
          style={{ flex: 1, marginRight: i === segments ? 0 : 6 }}
        />
      );
    }
    return <div className="flex gap-1 mt-2">{segs}</div>;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Floating icons (subtle) */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {tools.map((tool) => (
          <motion.img
            key={tool.alt}
            src={tool.src}
            alt={tool.alt}
            className="absolute h-16 w-16 md:h-24 md:w-24 opacity-10"
            style={{
              top: tool.y,
              ...(tool.side === "left" ? { left: "8%" } : { right: "8%" }),
            }}
            variants={iconVariants}
            initial="hidden"
            custom={tool.side}
            animate={{
              opacity: 0.12,
              x: 0,
              y: [tool.y, tool.y + 18, tool.y],
              transition: {
                type: "spring",
                stiffness: 80,
                damping: 12,
                delay: tool.delay,
                repeat: Infinity,
                repeatType: "reverse",
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-md mx-auto"
        >
          <Card
            className="shadow-lg border"
            style={{
              transform: "translateZ(60px)",
              transformStyle: "preserve-3d",
              position: "relative",
            }}
          >
            {/* Glare */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                opacity: glareOpacitySpring,
                background: useTransform(
                  [glareX, glareY],
                  ([gx, gy]) => `radial-gradient(800px circle at ${gx} ${gy}, rgba(255,255,255,0.18), transparent 70%)`
                ),
                zIndex: 1,
              }}
            />

            <CardHeader style={{ position: "relative", zIndex: 2 }}>
              <CardTitle className="text-3xl">Create Account</CardTitle>
              <CardDescription>Sign up to start your learning journey</CardDescription>
            </CardHeader>

            <CardContent style={{ position: "relative", zIndex: 2 }}>
              {/* Social buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => googleLogin()}
                  disabled={isLoading}
                  aria-label="Sign up with Google"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <GoogleIcon className="mr-2 h-4 w-4" />
                  )}
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => toast.info("GitHub sign-in not implemented in demo")}
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-4 text-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or sign up with email</span>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setFieldErrors({ ...fieldErrors, name: undefined });
                    }}
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="text-xs text-red-600 mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="number">Phone Number</Label>
                  <div className="flex">
                    <span className="px-3 py-2 bg-muted rounded-l-md border border-r-0 border-input text-sm text-muted-foreground">
                      +91
                    </span>
                    <Input
                      id="number"
                      type="text"
                      maxLength={10}
                      placeholder="Enter your 10-digit phone number"
                      value={formData.number}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        setFormData({ ...formData, number: onlyDigits });
                        setFieldErrors({ ...fieldErrors, number: undefined });
                      }}
                      className="rounded-l-none"
                      aria-invalid={!!fieldErrors.number}
                      aria-describedby={fieldErrors.number ? "number-error" : undefined}
                    />
                  </div>
                  {fieldErrors.number && (
                    <p id="number-error" className="text-xs text-red-600 mt-1">{fieldErrors.number}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password (8+ chars, include upper, number, symbol)"
                    value={formData.password}
                    onChange={(e) => {
                      handlePasswordChange(e.target.value);
                      setFieldErrors({ ...fieldErrors, password: undefined });
                    }}
                    aria-invalid={!!fieldErrors.password}
                    aria-describedby={fieldErrors.password ? "password-error" : undefined}
                  />
                  {/* strength bar and label */}
                  {passwordStrength.label && (
                    <div className="mt-2">
                      {renderStrengthBar()}
                      <p className="text-xs font-semibold mt-1" style={{ color: passwordStrength.color }}>
                        {passwordStrength.label} password
                      </p>
                    </div>
                  )}
                  {fieldErrors.password && (
                    <p id="password-error" className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      setFieldErrors({ ...fieldErrors, confirmPassword: undefined });
                    }}
                    aria-invalid={!!fieldErrors.confirmPassword}
                    aria-describedby={fieldErrors.confirmPassword ? "confirm-error" : undefined}
                  />
                  {fieldErrors.confirmPassword && (
                    <p id="confirm-error" className="text-xs text-red-600 mt-1">{fieldErrors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit */}
                <div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-semibold">Login</Link>
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
