import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, CheckCircle, QrCode, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

// Fixed courses data
const coursesData = [
  {
    id: "cyber-lite",
    name: "Cyber Master's Pro Lite",
    price: 499,
    description: "Foundational ethical hacking & network security program for beginners.",
  },
  {
    id: "cyber-blackhat",
    name: "Cyber Master's Pro Black Hat",
    price: 19999,
    description: "Advanced penetration testing & red team operations mastery program.",
  },
  {
    id: "bug-hunting",
    name: "Bug Hunting & Penetration Testing",
    price: 6999,
    description: "Professional bug bounty hunting & vulnerability assessment training.",
  },
];

const CourseEnroll = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const course = coursesData.find((c) => c.id === courseId);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    transactionId: "",
    screenshotUrl: "",
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        toast.error("Please login to enroll");
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        fullName: user.user_metadata?.full_name || "",
        phone: user.user_metadata?.phone || "",
      }));
    }
  }, [user]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground">Course not found</p>
            <Button onClick={() => navigate("/courses")} className="mt-4">
              View All Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { fullName, email, phone, transactionId } = formData;

    if (!fullName || !email || !phone || !transactionId) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (!user) {
      toast.error("Please login to continue");
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase.from("payment_submissions").insert({
        user_id: user.id,
        full_name: fullName,
        email: email,
        phone: phone,
        course_name: course.name,
        amount_paid: course.price,
        transaction_id: transactionId,
        screenshot_url: formData.screenshotUrl || null,
        status: "pending",
      });

      if (error) {
        console.error("Submission error:", error);
        toast.error("Failed to submit payment. Please try again.");
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
      toast.success("Payment submitted! Our team will verify it shortly.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <Card className="shadow-xl">
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Payment Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Your payment for <strong>{course.name}</strong> has been submitted for verification.
                Our team will verify it within 24 hours.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg mb-6">
                <p className="text-sm mb-2">Join our WhatsApp group for updates:</p>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <a href="https://chat.whatsapp.com/your-group-link" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Join WhatsApp Group
                  </a>
                </Button>
              </div>
              
              <Button variant="outline" onClick={() => navigate("/student-dashboard")}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Course Info */}
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">{course.name}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₹{course.price.toLocaleString()}</div>
            </CardContent>
          </Card>

          {/* QR Code Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Scan QR Code to Pay
              </CardTitle>
              <CardDescription>
                Scan the QR code using any UPI app (Google Pay, PhonePe, Paytm, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {/* Placeholder QR - Replace with actual QR image */}
              <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30 mb-4">
                <div className="text-center p-4">
                  <QrCode className="h-32 w-32 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">UPI QR Code</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                UPI ID: <strong>tdcs@upi</strong>
              </p>
              <p className="text-lg font-semibold mt-2">
                Amount: ₹{course.price.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Fill in your details after completing the payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-muted rounded-l-md border border-r-0 border-input text-sm text-muted-foreground">
                      +91
                    </span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setFormData({ ...formData, phone: value });
                      }}
                      required
                      disabled={isLoading}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input
                      id="courseName"
                      type="text"
                      value={course.name}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="text"
                      value={course.price.toLocaleString()}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="transactionId">Transaction ID / UTR Number *</Label>
                  <Input
                    id="transactionId"
                    type="text"
                    placeholder="Enter your UPI transaction ID"
                    value={formData.transactionId}
                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="screenshotUrl">Payment Screenshot URL (Optional)</Label>
                  <Input
                    id="screenshotUrl"
                    type="url"
                    placeholder="https://..."
                    value={formData.screenshotUrl}
                    onChange={(e) => setFormData({ ...formData, screenshotUrl: e.target.value })}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload your screenshot to any image hosting service and paste the link
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Payment"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseEnroll;
