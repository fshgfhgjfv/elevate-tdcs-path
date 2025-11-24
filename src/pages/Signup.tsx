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

// ✅ Only these are needed
import { useGoogleLogin } from "@react-oauth/google";

const googleClientId =
  "736905272101-bfolp8smrdkl2eg59ss9n5oihcb5ph9n.apps.googleusercontent.com";

// Floating icons (unchanged)
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

// Google Logo SVG
const GoogleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.659,4.696-6.142,8-11.303,8c-6.627,0-12-5.373-12-12
      c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
      c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655..."></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409..."></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303..."></path>
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

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("tdcs_user")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ---------------- GOOGLE SIGNIN ---------------- //
  const googleLogin = useGoogleLogin({
    onSuccess: async (token) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );

        const info = await res.json();

        const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");

        let user = users.find((u) => u.email === info.email);

        if (!user) {
          user = {
            id: info.sub,
            name: info.name,
            email: info.email,
            isGoogleUser: true,
          };
          users.push(user);
          localStorage.setItem("tdcs_users", JSON.stringify(users));
        }

        localStorage.setItem("tdcs_user", JSON.stringify(user));

        toast.success("Logged in with Google!");
        navigate("/dashboard");
      } catch (err) {
        toast.error("Google Sign-In failed");
      }
    },
    onError: () => toast.error("Google Sign-In failed"),
  });

  // ---------------- EMAIL SIGNUP ---------------- //
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");
    const { name, email, number, password, confirmPassword } = formData;

    if (!name || !email || !number || !password || !confirmPassword) {
      toast.error("All fields required");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (users.find((u) => u.email === email)) {
      toast.error("Email already exists");
      setIsLoading(false);
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      number: "+91" + number,
      password,
    };

    users.push(newUser);
    localStorage.setItem("tdcs_users", JSON.stringify(users));
    localStorage.setItem("tdcs_user", JSON.stringify(newUser));

    toast.success("Account created!");
    navigate("/dashboard");
  };

  // ---------------- 3D CARD ANIMATION ---------------- //
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useMotionValue(0);
  const glareOpacitySpring = useSpring(glareOpacity);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
    glareOpacity.set(0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* floating icons */}
      <div className="absolute inset-0 -z-10">
        {tools.map((tool) => (
          <motion.img
            key={tool.alt}
            src={tool.src}
            alt={tool.alt}
            className="absolute h-20 w-20 opacity-10"
            style={{
              top: tool.y,
              ...(tool.side === "left" ? { left: "10%" } : { right: "10%" }),
            }}
            initial="hidden"
            variants={iconVariants}
            custom={tool.side}
            animate={{
              opacity: 0.2,
              x: 0,
              y: [tool.y, tool.y + 20, tool.y],
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 3,
              },
            }}
          />
        ))}
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="max-w-md w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <Card
          className="shadow-xl border border-red-600 relative"
          style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        >
          {/* glare */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              opacity: glareOpacitySpring,
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.3), transparent 70%)`
              ),
              zIndex: 1,
            }}
          />

          <CardHeader style={{ position: "relative", zIndex: 2 }}>
            <CardTitle className="text-3xl">Create Account</CardTitle>
            <CardDescription>Start your learning journey</CardDescription>
          </CardHeader>

          <CardContent style={{ position: "relative", zIndex: 2 }}>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => googleLogin()}
              >
                <GoogleIcon className="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => toast.info("GitHub coming soon")}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>

            <div className="relative my-4 text-center text-sm text-muted-foreground">
              <span className="bg-card px-2">Or sign up with email</span>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Phone Number</Label>
                <div className="flex">
                  <span className="px-3 py-2 border rounded-l-md bg-muted">
                    +91
                  </span>
                  <Input
                    type="text"
                    className="rounded-l-none"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        number: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <Button className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
