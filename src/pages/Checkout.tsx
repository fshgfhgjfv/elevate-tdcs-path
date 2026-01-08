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
  MessageCircle,
  Lock,
  GraduationCap,
  User,
  Calculator,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Configuration ---
const UPI_ID = "tdcsorganization@sbi"; 
const MERCHANT_NAME = "TDCS Technologies";
const WHATSAPP_LINK = "https://chat.whatsapp.com/DjpjRfZl7dI0wVIX9tXuFZ";
const SUPPORT_WHATSAPP = "https://wa.me/918388959737";

// EMI Configuration
const EMI_CONFIG = {
  student: {
    interest: 3.5,
    downPaymentPercent: 0,
    label: "Student EMI",
    description: "Special rate for students"
  },
  regular: {
    interest: 5,
    downPaymentPercent: 30,
    label: "Regular EMI", 
    description: "30% down payment required"
  }
};

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
  
  const [errors, setErrors] = useState({
    phone: "",
    transactionId: ""
  });
  
  // EMI State
  const [paymentMode, setPaymentMode] = useState<"full" | "emi">("full");
  const [emiType, setEmiType] = useState<"student" | "regular">("student");
  const [emiMonths, setEmiMonths] = useState(3);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Calculate EMI amounts
  const calculateEMI = () => {
    if (!price || typeof price !== 'number') return { total: 0, downPayment: 0, monthlyEMI: 0, interest: 0 };
    
    const config = EMI_CONFIG[emiType];
    const downPayment = (price * config.downPaymentPercent) / 100;
    const principal = price - downPayment;
    const interestAmount = (principal * config.interest) / 100;
    const totalWithInterest = principal + interestAmount;
    const monthlyEMI = Math.ceil(totalWithInterest / emiMonths);
    
    return {
      total: price + interestAmount,
      downPayment,
      monthlyEMI,
      interest: interestAmount,
      principal: totalWithInterest
    };
  };

  const emiDetails = calculateEMI();
  

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
    const { name, value } = e.target;

    // Specific validation logic for phone number
    if (name === "phone") {
        // Only allow digits
        const cleanValue = value.replace(/\D/g, '').slice(0, 10);
        setFormData({ ...formData, [name]: cleanValue });
        
        // Validation check
        if (cleanValue.length === 10 && !/^[6-9]/.test(cleanValue)) {
            setErrors(prev => ({ ...prev, phone: "Mobile number must start with 6, 7, 8, or 9" }));
        } else {
            setErrors(prev => ({ ...prev, phone: "" }));
        }
    } else if (name === "transactionId") {
        setFormData({ ...formData, [name]: value.toUpperCase() }); // Auto-uppercase UTR
        if (value.length > 0 && value.length < 12) {
             setErrors(prev => ({ ...prev, transactionId: "UTR is typically 12 digits" }));
        } else {
             setErrors(prev => ({ ...prev, transactionId: "" }));
        }
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const copyUpiToClipboard = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast({ title: "Copied!", description: "UPI ID copied to clipboard." });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- SECURITY VALIDATION ---
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
        toast({ variant: "destructive", title: "Invalid Phone Number", description: "Please enter a valid 10-digit Indian mobile number." });
        setErrors(prev => ({ ...prev, phone: "Enter a valid 10-digit number" }));
        return;
    }

    if (formData.transactionId.length < 12) {
        toast({ variant: "destructive", title: "Invalid Transaction ID", description: "Please enter a valid 12-digit UTR/Reference number." });
        return;
    }
    
    if (!formData.name || !formData.email) {
      toast({ variant: "destructive", title: "Missing Fields", description: "Please fill in all details." });
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
        {/* Placeholder for optional diagram if needed */}
        {/*  */}
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
                  <Lock className="w-5 h-5 text-primary" /> 
                  Secure Billing
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
                      <Label htmlFor="phone">Phone Number (+91)</Label>
                      <Input 
                        id="phone" name="phone" 
                        type="tel"
                        maxLength={10}
                        placeholder="Enter Your Phone Number" 
                        required 
                        value={formData.phone} onChange={handleInputChange}
                        className={`bg-muted/30 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
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

                  {/* EMI Options Section */}
                  {isCourse && (
                    <div className="space-y-4">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-primary" />
                        Payment Option
                      </Label>
                      
                      <RadioGroup 
                        value={paymentMode} 
                        onValueChange={(value: "full" | "emi") => setPaymentMode(value)}
                        className="grid grid-cols-2 gap-3"
                      >
                        <div className={`relative flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-all ${paymentMode === 'full' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                          <RadioGroupItem value="full" id="full" />
                          <Label htmlFor="full" className="cursor-pointer flex-1">
                            <div className="font-semibold">Full Payment</div>
                            <div className="text-xs text-muted-foreground">Pay complete amount</div>
                          </Label>
                        </div>
                        <div className={`relative flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-all ${paymentMode === 'emi' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                          <RadioGroupItem value="emi" id="emi" />
                          <Label htmlFor="emi" className="cursor-pointer flex-1">
                            <div className="font-semibold">EMI Option</div>
                            <div className="text-xs text-muted-foreground">Pay in installments</div>
                          </Label>
                        </div>
                      </RadioGroup>

                      {paymentMode === 'emi' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 pt-2"
                        >
                          {/* EMI Type Selection */}
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Select EMI Type</Label>
                            <RadioGroup 
                              value={emiType} 
                              onValueChange={(value: "student" | "regular") => setEmiType(value)}
                              className="space-y-2"
                            >
                              <div className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${emiType === 'student' ? 'border-green-500 bg-green-500/5' : 'border-border hover:border-green-500/50'}`}>
                                <RadioGroupItem value="student" id="student" />
                                <GraduationCap className={`w-5 h-5 ${emiType === 'student' ? 'text-green-500' : 'text-muted-foreground'}`} />
                                <Label htmlFor="student" className="cursor-pointer flex-1">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-semibold">Student EMI</div>
                                      <div className="text-xs text-muted-foreground">Special rate for students</div>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-green-500 font-bold">3.5%</span>
                                      <div className="text-xs text-muted-foreground">interest</div>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                              
                              <div className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${emiType === 'regular' ? 'border-blue-500 bg-blue-500/5' : 'border-border hover:border-blue-500/50'}`}>
                                <RadioGroupItem value="regular" id="regular" />
                                <User className={`w-5 h-5 ${emiType === 'regular' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                                <Label htmlFor="regular" className="cursor-pointer flex-1">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-semibold">Regular EMI</div>
                                      <div className="text-xs text-muted-foreground">30% down payment required</div>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-blue-500 font-bold">5%</span>
                                      <div className="text-xs text-muted-foreground">interest</div>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {/* EMI Duration */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">EMI Duration</Label>
                            <Select value={emiMonths.toString()} onValueChange={(value) => setEmiMonths(parseInt(value))}>
                              <SelectTrigger className="bg-muted/30">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">3 Months</SelectItem>
                                <SelectItem value="6">6 Months</SelectItem>
                                <SelectItem value="9">9 Months</SelectItem>
                                <SelectItem value="12">12 Months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* EMI Breakdown */}
                          <div className="bg-muted/30 rounded-lg p-4 space-y-3 border border-border/50">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <Calculator className="w-4 h-4 text-primary" />
                              EMI Breakdown
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Course Price</span>
                                <span>₹{price?.toLocaleString()}</span>
                              </div>
                              {emiType === 'regular' && emiDetails.downPayment > 0 && (
                                <div className="flex justify-between text-blue-500">
                                  <span>Down Payment (30%)</span>
                                  <span>₹{emiDetails.downPayment.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-orange-500">
                                <span>Interest ({emiType === 'student' ? '3.5%' : '5%'})</span>
                                <span>+ ₹{Math.ceil(emiDetails.interest).toLocaleString()}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-bold">
                                <span>Total Amount</span>
                                <span>₹{Math.ceil(emiDetails.total).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-primary font-bold text-base pt-2 border-t">
                                <span>Monthly EMI</span>
                                <span>₹{emiDetails.monthlyEMI.toLocaleString()}/month</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                for {emiMonths} months
                                {emiType === 'regular' && ' (after 30% down payment)'}
                              </p>
                            </div>
                          </div>

                          {/* Discount Contact */}
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <Phone className="w-5 h-5 text-green-500 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                                  Want More Discount?
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Connect with our team for special offers
                                </p>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-2 border-green-500/30 text-green-600 hover:bg-green-500/10"
                                  onClick={() => window.open(SUPPORT_WHATSAPP, "_blank")}
                                  type="button"
                                >
                                  <MessageCircle className="w-4 h-4 mr-2" />
                                  +91 83889 59737
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Payment Verification</Label>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-sm text-yellow-600 dark:text-yellow-400">
                      {paymentMode === 'emi' && emiType === 'regular' ? (
                        <>
                          Please scan the QR code to pay <strong>Down Payment: ₹{emiDetails.downPayment.toLocaleString()}</strong>.
                          <br/>
                          Remaining amount will be collected in {emiMonths} monthly installments of <strong>₹{emiDetails.monthlyEMI.toLocaleString()}</strong>.
                        </>
                      ) : paymentMode === 'emi' && emiType === 'student' ? (
                        <>
                          Please scan the QR code to pay <strong>First EMI: ₹{emiDetails.monthlyEMI.toLocaleString()}</strong>.
                          <br/>
                          Total {emiMonths} installments of <strong>₹{emiDetails.monthlyEMI.toLocaleString()}</strong>/month.
                        </>
                      ) : (
                        <>
                          Please scan the QR code on the right to pay <strong>{typeof price === 'number' ? `₹${price.toLocaleString()}` : price}</strong>. 
                        </>
                      )}
                      <br/>
                      After payment, enter the <strong>UTR / Transaction ID</strong> below to activate instantly.
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transactionId">Transaction ID / UTR Number</Label>
                      <Input 
                        id="transactionId" name="transactionId" 
                        placeholder="e.g. 403819XXXXXX" 
                        required 
                        maxLength={20}
                        value={formData.transactionId} onChange={handleInputChange}
                        className="border-primary/30 focus-visible:ring-primary bg-muted/30 uppercase placeholder:normal-case"
                      />
                      {errors.transactionId && <p className="text-xs text-orange-500">{errors.transactionId}</p>}
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
                      {paymentMode === 'emi' && isCourse && (
                        <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {emiType === 'student' ? 'Student EMI' : 'Regular EMI'} • {emiMonths} months
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">{typeof price === 'number' ? `₹${price?.toLocaleString()}` : price}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Course Price</span>
                    <span>{typeof price === 'number' ? `₹${price?.toLocaleString()}` : price}</span>
                  </div>
                  
                  {paymentMode === 'emi' && isCourse && (
                    <>
                      <div className="flex justify-between text-sm text-orange-500">
                        <span>Interest ({emiType === 'student' ? '3.5%' : '5%'})</span>
                        <span>+ ₹{Math.ceil(emiDetails.interest).toLocaleString()}</span>
                      </div>
                      {emiType === 'regular' && emiDetails.downPayment > 0 && (
                        <div className="flex justify-between text-sm text-blue-500">
                          <span>Down Payment (30%)</span>
                          <span>₹{emiDetails.downPayment.toLocaleString()}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>GST (18%)</span>
                    <span className="text-green-500 text-xs">Included</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-border/50">
                    <span className="font-bold">
                      {paymentMode === 'emi' ? 'Pay Now' : 'Total Payable'}
                    </span>
                    <span className="font-bold text-2xl text-primary">
                      {paymentMode === 'emi' && isCourse ? (
                        emiType === 'regular' ? 
                          `₹${emiDetails.downPayment.toLocaleString()}` : 
                          `₹${emiDetails.monthlyEMI.toLocaleString()}`
                      ) : (
                        typeof price === 'number' ? `₹${price?.toLocaleString()}` : price
                      )}
                    </span>
                  </div>
                  
                  {paymentMode === 'emi' && isCourse && (
                    <p className="text-xs text-muted-foreground text-right">
                      {emiType === 'regular' ? 
                        `Then ₹${emiDetails.monthlyEMI.toLocaleString()}/month × ${emiMonths} months` :
                        `₹${emiDetails.monthlyEMI.toLocaleString()}/month × ${emiMonths} months`
                      }
                    </p>
                  )}
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