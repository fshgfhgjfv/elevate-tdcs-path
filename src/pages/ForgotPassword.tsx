import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 3D card tilt setup
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPos = e.clientX - rect.left - rect.width / 2;
    const yPos = e.clientY - rect.top - rect.height / 2;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Reset link sent!",
      description: "Check your email for password reset instructions.",
    });
  };

  return (
    <div className="relative min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-background via-background to-primary/10 overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-10 left-20 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-24 w-40 h-40 rounded-full bg-secondary/10 blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-md mx-auto">
        <Link to="/login">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Button>
        </Link>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="transform-gpu"
        >
          <Card className="shadow-glow-lg bg-card/80 backdrop-blur-xl border border-white/10">
            <CardHeader className="space-y-1 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 360, 0] }}
                transition={{ duration: 1 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-bold">
                Forgot Password?
              </CardTitle>
              <CardDescription>
                {isSubmitted
                  ? "Check your email for reset instructions"
                  : "Enter your email to receive a password reset link"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {!isSubmitted ? (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="focus:ring-2 focus:ring-primary/70 transition-all"
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button type="submit" className="w-full gradient-primary">
                      Send Reset Link
                    </Button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  className="text-center space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="relative w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    <Sparkles className="absolute text-yellow-400 w-5 h-5 top-0 right-0 animate-ping" />
                  </motion.div>

                  <div className="space-y-2">
                    <p className="font-medium">Email Sent!</p>
                    <p className="text-sm text-muted-foreground">
                      We've sent a password reset link to <strong>{email}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Didn’t receive it?{" "}
                      <motion.button
                        onClick={() => setIsSubmitted(false)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-primary hover:underline"
                      >
                        Try again
                      </motion.button>
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 text-center text-sm">
                <Link to="/login" className="text-primary hover:underline">
                  Remember your password? Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
