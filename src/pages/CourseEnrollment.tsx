import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Copy, QrCode, Clock, BookOpen, Award, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { courses } from "@/data/courses";
import { WhatsAppJoinModal } from "@/components/WhatsAppJoinModal";
import { supabase } from "@/integrations/supabase/client";

const QR_CODE_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEiELxVBDoZN5m4QVTDA_-qHj52le4N0SaPoO5hnEojupSercg3NAJLi-lnG7GcOdq5Zn7y2yOE67iP4zuOFAXaFZaKD7kxAdRea90YhQyFTBGwgVekp28gzWGGp8Y5zPETfsXCXWG03L9BTrmFCMBujeTd-wc3JceKLMDcN54dwVVxVwoCc7Usr9kXy5VjH";
const UPI_ID = "tdcsorganization@sbi";

const CourseEnrollment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    transactionId: "",
    amountPaid: "",
    screenshot: null as File | null,
  });

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Please Login",
          description: "You need to login first to enroll in a course",
          variant: "destructive",
        });
        navigate("/login", { state: { from: `/courses/${id}/enroll` } });
        return;
      }
      setUser(session.user);
      setFormData(prev => ({
        ...prev,
        email: session.user.email || "",
      }));
    };
    checkUser();
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    // Phone validation - only allow 10 digits
    if (id === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, [id]: digitsOnly }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        screenshot: e.target.files![0]
      }));
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast({
      title: "UPI ID Copied!",
      description: UPI_ID,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast({ title: "Error", description: "Please enter your full name", variant: "destructive" });
      return;
    }
    
    if (formData.phone.length !== 10) {
      toast({ title: "Error", description: "Please enter a valid 10-digit phone number", variant: "destructive" });
      return;
    }
    
    if (!formData.transactionId.trim()) {
      toast({ title: "Error", description: "Please enter the transaction ID", variant: "destructive" });
      return;
    }
    
    if (!formData.amountPaid.trim()) {
      toast({ title: "Error", description: "Please enter the amount paid", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Supabase
      const { error } = await supabase.from("payment_submissions").insert({
        user_id: user.id,
        full_name: formData.fullName.trim(),
        email: formData.email,
        phone: formData.phone,
        course_name: course?.title || "",
        transaction_id: formData.transactionId.trim(),
        amount_paid: parseFloat(formData.amountPaid),
        status: "pending",
      });

      if (error) throw error;

      // Mark as enrolled locally (pending verification)
      localStorage.setItem(`tdcs_purchased_${id}`, "pending");

      // Show WhatsApp modal
      setShowWhatsAppModal(true);
      
    } catch (error: any) {
      console.error("Payment submission error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowWhatsAppModal(false);
    navigate(`/courses/${id}/content`);
  };

  if (!course) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses">
            <Button variant="gradient">Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course
        </Button>

        {/* Course Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto mb-8"
        >
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-3 gap-0">
              <div className="md:col-span-1">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-2 p-6">
                <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Modules</p>
                      <p className="font-semibold">{course.modules.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate</p>
                      <p className="font-semibold">Included</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-semibold text-primary">₹{course.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <h2 className="text-3xl font-bold mb-2 text-center">Complete Your Payment</h2>
        <p className="text-muted-foreground text-center mb-8">
          Scan the QR code or use UPI ID to make payment, then submit your details
        </p>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Column - Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (10 digits) *</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-muted-foreground">
                        +91
                      </span>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="rounded-l-none"
                        required
                      />
                    </div>
                    {formData.phone && formData.phone.length !== 10 && (
                      <p className="text-xs text-destructive">Please enter exactly 10 digits</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID / UTR Number *</Label>
                    <Input
                      id="transactionId"
                      value={formData.transactionId}
                      onChange={handleInputChange}
                      placeholder="Enter UPI transaction ID"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amountPaid">Amount Paid (₹) *</Label>
                    <Input
                      id="amountPaid"
                      type="number"
                      value={formData.amountPaid}
                      onChange={handleInputChange}
                      placeholder={course.price.toString()}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="screenshot">Upload Screenshot (Optional)</Label>
                    <div className="relative">
                      <Input
                        id="screenshot"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => document.getElementById('screenshot')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {formData.screenshot ? formData.screenshot.name : 'Choose file...'}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload a screenshot of your payment confirmation
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    variant="gradient"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Payment Details"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - QR Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Scan to Pay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                  <img
                    src={QR_CODE_URL}
                    alt="Payment QR Code"
                    className="w-56 h-56 object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Or pay using UPI ID</p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="px-4 py-2 bg-muted rounded-lg font-mono text-lg">
                      {UPI_ID}
                    </code>
                    <Button variant="outline" size="icon" onClick={copyUpiId}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Amount to pay:</p>
                  <p className="text-3xl font-bold text-primary">
                    ₹{course.price.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Course Modules Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.modules.slice(0, 5).map((module, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{module}</span>
                    </li>
                  ))}
                  {course.modules.length > 5 && (
                    <li className="text-sm text-primary font-medium pl-7">
                      + {course.modules.length - 5} more modules
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp Join Modal */}
      <WhatsAppJoinModal
        isOpen={showWhatsAppModal}
        onClose={handleModalClose}
        courseName={course.title}
      />
    </div>
  );
};

export default CourseEnrollment;
