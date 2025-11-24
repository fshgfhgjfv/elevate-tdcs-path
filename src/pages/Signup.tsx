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

const GoogleIcon = (props) => (
  <svg {...props} viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303..."
    />
  </svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // FORM DATA
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  // PASSWORD STRENGTH
  const [passwordStrength, setPasswordStrength] = useState({
    text: "",
    color: "",
  });

  // AUTO LOGIN IF USER EXISTS
  useEffect(() => {
    const user = localStorage.getItem("tdcs_user");
    if (user) navigate("/dashboard");
  }, [navigate]);

  // ---- PASSWORD STRENGTH CHECKER ----
  const evaluatePassword = (password) => {
    if (!password) return setPasswordStrength({ text: "", color: "" });

    if (password.length < 6)
      return setPasswordStrength({ text: "Weak", color: "red" });

    const hasLetters = /[A-Za-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);

    if (hasLetters && hasNumbers && hasSpecial && password.length >= 10) {
      return setPasswordStrength({ text: "Strong", color: "green" });
    }

    if (hasLetters && hasNumbers) {
      return setPasswordStrength({ text: "Medium", color: "orange" });
    }

    return setPasswordStrength({ text: "Weak", color: "red" });
  };

  // ON PASSWORD CHANGE
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    evaluatePassword(value);
  };

  // ---------------- EMAIL SIGNUP ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, email, number, password, confirmPassword } = formData;

    const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");

    if (!name || !email || !number || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return setIsLoading(false);
    }
    if (!email.includes("@")) {
      toast.error("Invalid email");
      return setIsLoading(false);
    }
    if (!/^[0-9]{10}$/.test(number)) {
      toast.error("Invalid phone number");
      return setIsLoading(false);
    }
    if (passwordStrength.color === "red") {
      toast.error("Password is too weak");
      return setIsLoading(false);
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return setIsLoading(false);
    }
    if (users.find((u) => u.email === email)) {
      toast.error("User already exists");
      return setIsLoading(false);
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      number: `+91${number}`,
      password,
    };

    localStorage.setItem("tdcs_users", JSON.stringify([...users, newUser]));

    const { password: _, ...safeUser } = newUser;
    localStorage.setItem("tdcs_user", JSON.stringify(safeUser));

    toast.success("Account created!");
    navigate("/dashboard");
    setIsLoading(false);
  };

  // ---------------- GOOGLE SIGN-IN ----------------
  const handleGoogleSuccess = async (tokenResponse) => {
    setIsLoading(true);

    try {
      const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      }).then((res) => res.json());

      const users = JSON.parse(localStorage.getItem("tdcs_users") || "[]");

      let user = users.find((u) => u.email === userInfo.email);
      let isNew = false;

      if (!user) {
        user = {
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          isGoogleUser: true,
        };
        users.push(user);
        localStorage.setItem("tdcs_users", JSON.stringify(users));
        isNew = true;
      }

      localStorage.setItem("tdcs_user", JSON.stringify(user));
      toast.success(isNew ? "Account created!" : "Logged in!");
      navigate("/dashboard");
    } catch {
      toast.error("Google sign-in failed");
    }

    setIsLoading(false);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => toast.error("Google login error"),
    flow: "implicit",
  });

  // ------------ UI + ANIMATIONS ------------
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">

      <Card className="shadow-lg border border-red-600 max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Create Account</CardTitle>
          <CardDescription>Sign up to begin your journey</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Google Login */}
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

            {/* Divider */}
            <div className="relative">
              <span className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </span>
              <span className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or use email
                </span>
              </span>
            </div>

            {/* Full Name */}
            <div>
              <Label>Full Name</Label>
              <Input
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            {/* Phone */}
            <div>
              <Label>Phone Number</Label>
              <div className="flex">
                <span className="px-3 py-2 bg-muted rounded-l-md border border-r-0 text-sm text-muted-foreground">
                  +91
                </span>
                <Input
                  type="text"
                  placeholder="10-digit number"
                  value={formData.number}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10)
                      setFormData({ ...formData, number: value });
                  }}
                  className="rounded-l-none"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handlePasswordChange}
                disabled={isLoading}
              />

              {/* Password Strength Indicator */}
              {passwordStrength.text && (
                <p
                  className="text-sm mt-1 font-semibold"
                  style={{ color: passwordStrength.color }}
                >
                  {passwordStrength.text} Password
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                disabled={isLoading}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>

          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>

    </div>
  );
};

export default Signup;
