import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Award, CheckCircle, Clock, AlertCircle, Send, User, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

type Step = "confirm" | "form" | "success";

const CertificateRequestModal = ({ isOpen, onClose, courseName }: CertificateRequestModalProps) => {
  const [step, setStep] = useState<Step>("confirm");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleConfirmNo = () => {
    toast({
      title: "Complete the Course First",
      description: "Please complete all lessons and quizzes to be eligible for the certificate.",
      variant: "destructive",
    });
    onClose();
    resetModal();
  };

  const handleConfirmYes = () => {
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setStep("success");
  };

  const resetModal = () => {
    setStep("confirm");
    setFormData({ name: "", phone: "", email: "" });
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Step 1: Confirmation */}
          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <DialogHeader>
                <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <DialogTitle className="text-center text-2xl gradient-text">
                  Certificate Request
                </DialogTitle>
                <DialogDescription className="text-center text-lg">
                  Have you completed the <span className="font-semibold text-primary">{courseName}</span> course fully?
                </DialogDescription>
              </DialogHeader>
              
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Our team will verify your course completion before issuing the certificate. 
                    Please ensure you have completed all lessons and quizzes.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 text-lg border-destructive text-destructive hover:bg-destructive/10"
                  onClick={handleConfirmNo}
                >
                  No, Not Yet
                </Button>
                <Button 
                  className="flex-1 h-12 text-lg gradient-primary text-white"
                  onClick={handleConfirmYes}
                >
                  Yes, I Completed
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Form */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <DialogHeader>
                <DialogTitle className="text-center text-2xl gradient-text">
                  Your Details
                </DialogTitle>
                <DialogDescription className="text-center">
                  Enter your information to receive the certificate
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name (as on certificate)
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg gradient-primary text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6 text-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="mx-auto w-20 h-20 rounded-full bg-green-500 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>

              <div>
                <h3 className="text-2xl font-bold gradient-text mb-2">Request Submitted!</h3>
                <p className="text-muted-foreground">
                  Your certificate request has been received
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Clock className="w-6 h-6 text-primary" />
                  </motion.div>
                  <span className="font-semibold text-lg">Verification in Progress</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Our team will verify your course completion within <span className="font-bold text-primary">1 hour</span>
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Certificate will be sent to your email</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>SMS notification on your phone</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Certificate with your name: <span className="font-semibold text-primary">{formData.name}</span></span>
                  </div>
                </div>
              </motion.div>

              <div className="pt-2 space-y-3">
                <p className="text-xs text-muted-foreground">
                  If you have any questions, contact us at support@tdcs.in
                </p>
                <Button onClick={handleClose} variant="outline" className="w-full">
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateRequestModal;
