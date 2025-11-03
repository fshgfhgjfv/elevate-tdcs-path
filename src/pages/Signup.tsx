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

// --- Firebase Imports ---
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// --- Firebase Config ---
// These global variables are provided by the environment.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
let firebaseConfig;
try {
  firebaseConfig = JSON.parse(__firebase_config);
} catch (e) {
  console.error("Firebase config is not valid JSON:", __firebase_config);
  firebaseConfig = {}; // Set empty config to avoid crash
}
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : undefined;

// --- Initialize Firebase ---
let app, auth, db;
if (firebaseConfig && firebaseConfig.apiKey) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (e) {
    console.error("Error initializing Firebase:", e);
    toast.error("Firebase initialization failed. Please check console.");
  }
} else {
  console.warn("Firebase config not found. Using mocks or app will fail.");
}

// --- Google Icon Helper ---
const GoogleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48"
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

// --- Social Providers ---
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  // --- Firebase Auth Effect ---
  useEffect(() => {
    if (!auth) {
      if (firebaseConfig && firebaseConfig.apiKey) {
        toast.error("Firebase initialized but auth is not. Please refresh.");
      } else {
        toast.error("Firebase config is missing. App cannot authenticate.");
      }
      setIsFirebaseReady(false);
      return;
    }

    const signIn = async () => {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Anonymous sign-in failed:", error);
        toast.error("Authentication failed. Please refresh.");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        if (!user.isAnonymous) {
          // If they are not anonymous, they are logged in. Redirect them.
          navigate("/dashboard");
        } else {
          // User is signed in anonymously, allow them to see the signup page
        }
      } else {
        // User is not signed in.
        // Attempt to sign in anonymously.
        signIn();
      }
      setIsFirebaseReady(true);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // --- Helper to save user data to Firestore ---
  const saveUserProfile = async (user, additionalData = {}) => {
    if (!db) {
      console.error("Firestore (db) is not initialized.");
      return;
    }
    const userId = user.uid;
    // Private user data path
    const userDocRef = doc(db, "artifacts", appId, "users", userId, "profile", "data");
    
    const profileData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || additionalData.name,
      number: additionalData.number || "", // Save number if provided
      provider: user.providerData[0]?.providerId || "email",
      createdAt: new Date().toISOString(),
    };

    try {
      // Use setDoc to create or overwrite the user's profile
      await setDoc(userDocRef, profileData, { merge: true });
    } catch (error) {
      console.error("Error saving user profile:", error);
      toast.error("Error saving profile. Please try again.");
    }
  };

  // --- Email/Password Signup Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth) {
      toast.error("Firebase is not ready. Please refresh.");
      return;
    }

    setIsLoading(true);
    const { name, email, number, password, confirmPassword } = formData;

    // Client-side validation
    if (!name || !email || !number || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
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

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional user info to Firestore
      await saveUserProfile(user, { name, number: `+91${number}` });

      toast.success("Account created successfully!");
      setIsLoading(false);
      navigate("/dashboard"); // Redirect on success
    } catch (error) {
      console.error("Firebase signup error:", error.code, error.message);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please login.");
      } else {
        toast.error(error.message);
      }
      setIsLoading(false);
    }
  };

  // --- Social Signup Handler ---
  const handleSocialSignup = async (provider) => {
    if (!auth) {
      toast.error("Firebase is not ready. Please refresh.");
      return;
    }

    const authProvider = provider === "google" ? googleProvider : githubProvider;
    
    try {
      const result = await signInWithPopup(auth, authProvider);
      const user = result.user;
      
      // Save their profile info to Firestore
      // `merge: true` ensures we don't overwrite data if they already exist
      await saveUserProfile(user); 

      toast.success(`Signed up with ${provider}!`);
      navigate("/dashboard"); // Redirect on success
    } catch (error) {
      console.error("Social signup error:", error.code, error.message);
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast.error("An account already exists with this email. Please login with the original method.");
      } else {
        toast.error(`Error with ${provider} sign up. Please try again.`);
      }
    }
  };

  // --- 3D Card Tilt Animation (Removed - Simpler version) ---
  // Using a simpler motion.div for consistency with Login page
  // const cardRef = useRef(null);
  // ... (tilt logic removed)

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

  // Disable form while Firebase is loading
  const isFormDisabled = isLoading || !isFirebaseReady;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
      
      {/* --- ADDED: Animated gradient background (from Login) --- */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10 blur-3xl -z-10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* --- REMOVED: Floating Tools --- */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          // Replaced 3D tilt with simpler fade-in from Login page
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md mx-auto"
        >
          {/* Using the same Card style as Login page */}
          <Card className="shadow-xl backdrop-blur-lg bg-white/10 dark:bg-gray-900/50 border border-white/10">
            <CardHeader>
              <CardTitle className="text-3xl gradient-text">
                Create Account
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
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
                {/* --- Social Logins --- */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialSignup("google")}
                    type="button"
                    disabled={isFormDisabled}
                  >
                    <GoogleIcon className="mr-2 h-4 w-4" />
                    Sign up with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialSignup("github")}
                    type="button"
                    disabled={isFormDisabled}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Sign up with GitHub
                  </Button>
                </motion.div>

                {/* --- Divider --- */}
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
                    disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
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
                      disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading
                      ? "Signing Up..."
                      : !isFirebaseReady
                      ? "Connecting..."
                      : "Sign Up"}
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

export default Signup;
