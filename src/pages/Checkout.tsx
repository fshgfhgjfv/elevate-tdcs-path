import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  Smartphone, 
  Copy, 
  CheckCircle, 
  Loader2,
  BookOpen,
  Zap,
  AlertTriangle,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// --- Configuration ---
const UPI_ID = "tdcsorganization@sbi"; 
const MERCHANT_NAME = "TDCS Technologies";
const WHATSAPP_LINK = "https://chat.whatsapp.com/DjpjRfZl7dI0wVIX9tXuFZ";

// --- Hosted QR Code Link ---
const QR_CODE_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEiYxV2ayi-nLo4GdGqaDDKDg9OpUiRjbmyav9HoiZp_qm2Zt1-x8jQ7Y4S5gMQSeKrIuZKolSVxZ0c817cdvXKG5IbRLWEngQOEBC8Gah6Edi2snbD0vbr6y-0nJSq8rdvCR4HJIcRJhRDlSTYA9EeYdGj-U6QaRM365bjvdR85QjaR3s4rm1oYOTYTl8gU";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Retrieve State (Handle both Software & Courses)
  const { serviceName, courseName, price, courseId } = location.state || {};

  // Determine what we are buying
  const itemName = serviceName || courseName;
  const isCourse = !!courseName;
  const itemType = isCourse ? "Course Enrollment" : "Premium Tool";

  // 2. Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    transactionId: "" 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 3. Redirect if accessed directly without data
  useEffect(() => {
    if (!itemName || !price) {
      toast({
        variant: "destructive",
        title: "No Item Selected",
        description: "Please select a course or service first.",
      });
      navigate(isCourse ? "/courses" : "/services");
    }
  }, [itemName, price, navigate, isCourse]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyUpiToClipboard = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast({ title: "Copied!", description: "UPI ID copied to clipboard." });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.transactionId) {
      toast({ variant: "destructive", title: "Missing Fields", description: "Please fill in all details including Transaction ID." });
      return;
    }

    setIsSubmitting(true);

    // Simulate API Call / Backend Verification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Store purchase in local storage for immediate access (if it's a course)
      if (isCourse && courseId) {
        localStorage.setItem(`tdcs_purchased_${courseId}`, "true");
      }
    }, 2000);
  };

  if (!itemName) return null; 

  // --- Success / Verification View ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-xl w-full"
        >
          <Card className="border-green-500/30 shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)]">
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <CheckCircle className="w-10 h-10" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-400">Payment Submitted</CardTitle>
              <CardDescription>
                Transaction <strong>#{formData.transactionId}</strong> has been recorded.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Verification Info */}
              <div className="bg-muted/30 p-4 rounded-xl border border-border/50 space-y-3">
                 <h3 className="font-semibold flex items-center gap-2">
                   <ShieldCheck className="w-5 h-5 text-primary" /> Verification Process
                 </h3>
                 <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                    <li>Our team will verify your payment within <strong>2 hours</strong>.</li>
                    <li>Once verified, all access details will be shared via email/WhatsApp.</li>
                    <li><strong>Genuine payments will receive a confirmation call.</strong></li>
                 </ul>
              </div>

              {/* Warning Section */}
              <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl">
                 <h4 className="text-red-600 dark:text-red-400 font-bold flex items-center gap-2 mb-2 text-sm uppercase tracking-wide">
                   <AlertTriangle className="w-4 h-4" /> Important Notice
                 </h4>
                 <p className="text-xs text-muted-foreground leading-relaxed">
                   <span className="font-semibold text-red-600/80 dark:text-red-400/80">Fake, fraudulent, or illegal payments</span> may result in immediate legal action. 
                   If the amount is debited but verification fails, a refund will be processed automatically after review.
                 </p>
              </div>

              {/* WhatsApp & Actions */}
              <div className="space-y-3 pt-2">
                <Button 
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold"
                  onClick={() => window.open(WHATSAPP_LINK, "_blank")}
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> Join WhatsApp Group
                </Button>
                
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => navigate("/")}>
                    Go Home
                  </Button>
                  {isCourse && (
                     <Button variant="secondary" className="flex-1" onClick={() => navigate(`/courses/${courseId}/content`)}>
                       Access Content
                     </Button>
                  )}
                </div>
              </div>

            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // --- Main Checkout View ---
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12 relative selection:bg-primary/20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <Button 
          variant="ghost" 
          className="mb-8 pl-0 hover:bg-transparent hover:text-primary" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: User Details Form */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Checkout</h1>
              <p className="text-muted-foreground">
                You are purchasing <span className="text-primary font-semibold">{itemName}</span>
              </p>
            </div>

            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" /> 
                  Billing Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" name="name" 
                        placeholder="Enter Your Full Name" 
                        required 
                        value={formData.name} onChange={handleInputChange}
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" name="phone" 
                        placeholder="Give your Phone number" 
                        required 
                        value={formData.phone} onChange={handleInputChange}
                        className="bg-muted/30"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" name="email" type="email" 
                      placeholder="valid@gmail.com" 
                      required 
                      value={formData.email} onChange={handleInputChange}
                      className="bg-muted/30"
                    />
                    <p className="text-xs text-muted-foreground">
                      {isCourse ? "Course access link will be sent here." : "License keys will be sent here."}
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Payment Verification</Label>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-sm text-yellow-600 dark:text-yellow-400">
                      Please scan the QR code on the right to pay <strong>{typeof price === 'number' ? `₹${price}` : price}</strong>. 
                      <br/>
                      After payment, enter the <strong>UTR / Transaction ID</strong> below to activate instantly.
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transactionId">Transaction ID / UTR Number</Label>
                      <Input 
                        id="transactionId" name="transactionId" 
                        placeholder="e.g. 403819XXXXXX" 
                        required 
                        value={formData.transactionId} onChange={handleInputChange}
                        className="border-primary/30 focus-visible:ring-primary bg-muted/30"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full mt-6 text-lg font-semibold shadow-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying Payment...
                      </>
                    ) : (
                      `Confirm & ${isCourse ? "Enroll" : "Buy Now"}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: Order Summary & Payment QR */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Order Summary Card */}
            <Card className="border-border/50 bg-muted/5 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-muted/20 pb-4">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg text-primary">
                       {isCourse ? <BookOpen className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{itemName}</h3>
                      <p className="text-sm text-muted-foreground">{itemType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">{typeof price === 'number' ? `₹${price}` : price}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{typeof price === 'number' ? `₹${price}` : price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>GST (18%)</span>
                    <span className="text-green-500 text-xs">Included</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-border/50">
                    <span className="font-bold">Total Payable</span>
                    <span className="font-bold text-2xl text-primary">{typeof price === 'number' ? `₹${price}` : price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pay via UPI Card */}
            <Card className="border-primary/20 bg-gradient-to-b from-background to-primary/5 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <QrCode className="w-5 h-5" />
                  Scan to Pay
                </CardTitle>
                <CardDescription>
                  Supported by GPay, PhonePe, Paytm, BHIM
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-xl shadow-inner mb-6 relative group border-4 border-white">
                  
                  {/* --- STATIC IMPORTED IMAGE --- */}
                  <img 
                    src={QR_CODE_URL} 
                    alt="TDCS Payment QR" 
                    className="w-48 h-48 object-contain"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none">
                    <span className="text-xs font-bold bg-white/90 px-2 py-1 rounded text-black shadow-sm">Scan Now</span>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                    <Smartphone className="w-4 h-4" />
                    <span>UPI ID</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border/50 group hover:border-primary/30 transition-colors">
                    <code className="flex-1 text-center font-mono text-sm select-all">{UPI_ID}</code>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 hover:text-primary"
                      onClick={copyUpiToClipboard}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-6 flex gap-4 text-muted-foreground opacity-50 justify-center">
                   <CreditCard className="w-6 h-6" />
                   <div className="text-xs max-w-[150px] text-center leading-tight">
                     Secure 256-bit Encrypted Payment via UPI
                   </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}