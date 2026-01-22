import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle, XCircle, Clock, Mail, Phone, User, Shield } from "lucide-react";

type Step = "confirm" | "form" | "success";

const CertificateDownload = () => {
  const [step, setStep] = useState<Step>("confirm");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep("success");
    }
  };

  const handleNo = () => {
    window.location.href = "/courses";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Award className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              TDCS Certificate Request
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Request your official TDCS Technologies certificate after completing your course
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <AnimatePresence mode="wait">
                {/* Step 1: Confirmation */}
                {step === "confirm" && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Course Completion Verification
                    </h2>
                    
                    <p className="text-muted-foreground mb-8 text-lg">
                      Have you completed your course fully?
                    </p>
                    
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={() => setStep("form")}
                        className="gap-2 px-8 py-6 text-lg gradient-primary"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Yes, I completed
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleNo}
                        className="gap-2 px-8 py-6 text-lg border-destructive text-destructive hover:bg-destructive/10"
                      >
                        <XCircle className="w-5 h-5" />
                        No
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-6">
                      Please ensure you have completed all course modules before requesting your certificate
                    </p>
                  </motion.div>
                )}

                {/* Step 2: Form */}
                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Enter Your Details
                      </h2>
                      <p className="text-muted-foreground">
                        We'll send your certificate to your email and phone
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name (as it appears on certificate)
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-destructive text-sm">{errors.name}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          placeholder="Enter your 10-digit phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-destructive text-sm">{errors.phone}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-destructive text-sm">{errors.email}</p>
                        )}
                      </div>
                      
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep("confirm")}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 gradient-primary"
                        >
                          Submit Request
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Step 3: Success */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
                    >
                      <Clock className="w-10 h-10 text-green-500" />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Verification in Progress
                    </h2>
                    
                    <div className="bg-primary/5 rounded-xl p-6 mb-6">
                      <p className="text-foreground mb-4">
                        Thank you, <span className="font-semibold text-primary">{formData.name}</span>!
                      </p>
                      <p className="text-muted-foreground">
                        Our team will verify your course completion within <span className="font-bold text-primary">1 hour</span>.
                      </p>
                    </div>
                    
                    <div className="space-y-4 text-left bg-muted/50 rounded-xl p-6">
                      <h3 className="font-semibold text-foreground text-center mb-4">
                        Certificate Delivery Details
                      </h3>
                      
                      <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium text-foreground">{formData.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                        <Phone className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium text-foreground">{formData.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Name on Certificate</p>
                          <p className="font-medium text-foreground">{formData.name}</p>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 p-4 border border-primary/20 rounded-xl bg-primary/5"
                    >
                      <p className="text-sm text-muted-foreground">
                        Once verified, you will receive your <span className="font-semibold text-primary">TDCS Technologies</span> official certificate on both your email and phone number.
                      </p>
                    </motion.div>
                    
                    <Button
                      onClick={() => window.location.href = "/courses"}
                      variant="outline"
                      className="mt-6"
                    >
                      Browse More Courses
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CertificateDownload;
