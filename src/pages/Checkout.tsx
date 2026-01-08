import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  Briefcase,
  Building2,
  Linkedin,
  Users,
  Calculator,
  Phone,
  Percent
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// --- Configuration ---
const UPI_ID = "tdcsorganization@sbi"; 
const WHATSAPP_LINK = "https://chat.whatsapp.com/DjpjRfZl7dI0wVIX9tXuFZ";
const SUPPORT_WHATSAPP = "https://wa.me/918388959737";
const STUDENT_DISCOUNT_PERCENT = 15; // 15% Discount for students

// EMI Configuration
const EMI_CONFIG = {
  student: {
    interest: 3.5,
    downPaymentPercent: 0,
    label: "Student EMI",
    description: "Low interest, No down payment"
  },
  regular: {
    interest: 5,
    downPaymentPercent: 30,
    label: "Regular EMI", 
    description: "Standard commercial rate"
  }
};

const QR_CODE_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEiYxV2ayi-nLo4GdGqaDDKDg9OpUiRjbmyav9HoiZp_qm2Zt1-x8jQ7Y4S5gMQSeKrIuZKolSVxZ0c817cdvXKG5IbRLWEngQOEBC8Gah6Edi2snbD0vbr6y-0nJSq8rdvCR4HJIcRJhRDlSTYA9EeYdGj-U6QaRM365bjvdR85QjaR3s4rm1oYOTYTl8gU";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Retrieve State
  const { serviceName, courseName, price, courseId } = location.state || {};
  const itemName = serviceName || courseName;
  const isCourse = !!courseName;
  const itemType = isCourse ? "Course Enrollment" : "Premium Tool";

  // 2. State Management
  const [userType, setUserType] = useState<"student" | "regular">("regular");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    transactionId: "",
    // Student Specific Fields
    collegeName: "",
    linkedinProfile: "",
    parentPhone: ""
  });
  
  const [errors, setErrors] = useState({
    phone: "",
    parentPhone: "",
    transactionId: ""
  });
  
  // EMI State
  const [paymentMode, setPaymentMode] = useState<"full" | "emi">("full");
  const [emiMonths, setEmiMonths] = useState(3);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 3. Price Calculation Logic
  const getEffectivePrice = () => {
    if (!price || typeof price !== 'number') return 0;
    if (userType === 'student') {
      // Apply 15% discount
      return Math.floor(price * (1 - STUDENT_DISCOUNT_PERCENT / 100));
    }
    return price;
  };

  const effectivePrice = getEffectivePrice();
  const discountAmount = price - effectivePrice;

  // Calculate EMI based on Effective Price
  const calculateEMI = () => {
    const config = EMI_CONFIG[userType]; // Use userType to determine EMI config
    const baseAmount = effectivePrice;
    
    const downPayment = (baseAmount * config.downPaymentPercent) / 100;
    const principal = baseAmount - downPayment;
    const interestAmount = (principal * config.interest) / 100;
    const totalWithInterest = principal + interestAmount;
    const monthlyEMI = Math.ceil(totalWithInterest / emiMonths);
    
    return {
      total: baseAmount + interestAmount,
      downPayment,
      monthlyEMI,
      interest: interestAmount,
      principal: totalWithInterest
    };
  };

  const emiDetails = calculateEMI();
  

  // 4. Redirect if accessed directly
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

  // 5. Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "parentPhone") {
        const cleanValue = value.replace(/\D/g, '').slice(0, 10);
        setFormData({ ...formData, [name]: cleanValue });
        
        const errorKey = name as keyof typeof errors;
        if (cleanValue.length === 10 && !/^[6-9]/.test(cleanValue)) {
            setErrors(prev => ({ ...prev, [errorKey]: "Must start with 6-9" }));
        } else {
            setErrors(prev => ({ ...prev, [errorKey]: "" }));
        }
    } else if (name === "transactionId") {
        setFormData({ ...formData, [name]: value.toUpperCase() });
        setErrors(prev => ({ ...prev, transactionId: value.length > 0 && value.length < 12 ? "Invlid UTR length" : "" }));
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
    
    // Validations
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
        toast({ variant: "destructive", title: "Invalid Phone", description: "Check your mobile number." });
        return;
    }
    
    if (userType === 'student') {
        if (!formData.collegeName || !formData.linkedinProfile || !formData.parentPhone) {
            toast({ variant: "destructive", title: "Missing Proof", description: "Students must provide college & parent details." });
            return;
        }
        if (!phoneRegex.test(formData.parentPhone)) {
             toast({ variant: "destructive", title: "Invalid Parent Phone", description: "Check parent's mobile number." });
             return;
        }
    }

    if (formData.transactionId.length < 12) {
        toast({ variant: "destructive", title: "Invalid UTR", description: "Enter valid 12-digit Transaction ID." });
        return;
    }
    
    setIsSubmitting(true);
    // Simulate Backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (isCourse && courseId) localStorage.setItem(`tdcs_purchased_${courseId}`, "true");
    }, 2000);
  };

  if (!itemName) return null; 

  // --- SUCCESS VIEW (Same as before, simplified for this snippet) ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-green-500/30">
            <CardHeader className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-green-600">Verification Pending</CardTitle>
                <CardDescription>
                    We have received your payment of <strong>₹{paymentMode === 'emi' ? emiDetails.downPayment || emiDetails.monthlyEMI : effectivePrice}</strong>.
                    <br/>Our team will verify your {userType === 'student' ? 'student documents' : 'details'} and approve access within 2 hours.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full" onClick={() => navigate("/")}>Return Home</Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12 relative">
      {/* Background blobs... */}
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <Button variant="ghost" className="mb-6 pl-0" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: FORM */}
          <motion.div className="lg:col-span-7 space-y-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div>
              <h1 className="text-3xl font-bold mb-2">Checkout</h1>
              <p className="text-muted-foreground">Complete your enrollment for <span className="text-primary font-semibold">{itemName}</span></p>
            </div>

            {/* --- STEP 1: USER TYPE SELECTION --- */}
            <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                    <Label className="text-base font-semibold mb-3 block">Who is enrolling?</Label>
                    <RadioGroup 
                        value={userType} 
                        onValueChange={(val: "student" | "regular") => setUserType(val)}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className={`relative flex items-center space-x-2 rounded-xl border-2 p-4 cursor-pointer transition-all ${userType === 'regular' ? 'border-primary bg-background' : 'border-transparent hover:bg-background/50'}`}>
                            <RadioGroupItem value="regular" id="r-regular" />
                            <Label htmlFor="r-regular" className="cursor-pointer flex-1">
                                <div className="flex items-center gap-2 font-bold"><Briefcase className="w-4 h-4"/> Professional</div>
                                <div className="text-xs text-muted-foreground">Standard Pricing</div>
                            </Label>
                        </div>
                        
                        <div className={`relative flex items-center space-x-2 rounded-xl border-2 p-4 cursor-pointer transition-all ${userType === 'student' ? 'border-green-500 bg-background' : 'border-transparent hover:bg-background/50'}`}>
                            <RadioGroupItem value="student" id="r-student" />
                            <Label htmlFor="r-student" className="cursor-pointer flex-1">
                                <div className="flex items-center gap-2 font-bold text-green-600">
                                    <GraduationCap className="w-4 h-4"/> Student
                                    <Badge className="bg-green-500 hover:bg-green-600 text-[10px] h-5 px-1.5">15% OFF</Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">Valid ID Required</div>
                            </Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>

            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-primary" /> Billing Details</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input name="name" placeholder="Enter Full Name" required value={formData.name} onChange={handleInputChange} className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number (+91)</Label>
                      <Input name="phone" maxLength={10} placeholder="98765XXXXX" required value={formData.phone} onChange={handleInputChange} className="bg-muted/30" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Email Address {userType === 'student' && <span className="text-xs text-muted-foreground">(Use College Email if available)</span>}</Label>
                    <Input name="email" type="email" placeholder="john@example.com" required value={formData.email} onChange={handleInputChange} className="bg-muted/30" />
                  </div>

                  {/* --- CONDITIONAL STUDENT PROOF FIELDS --- */}
                  <AnimatePresence>
                    {userType === 'student' && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden space-y-4 rounded-xl bg-green-500/5 border border-green-500/20 p-4"
                        >
                            <h4 className="text-sm font-semibold text-green-700 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4"/> Student Verification
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>College / University Name</Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input name="collegeName" className="pl-9 bg-background" placeholder="e.g. IIT Bombay" required value={formData.collegeName} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Parent's Phone Number</Label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input name="parentPhone" maxLength={10} className="pl-9 bg-background" placeholder="Parent's Mobile" required value={formData.parentPhone} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>LinkedIn Profile URL</Label>
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input name="linkedinProfile" className="pl-9 bg-background" placeholder="https://linkedin.com/in/yourprofile" required value={formData.linkedinProfile} onChange={handleInputChange} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                  </AnimatePresence>

                  <Separator className="my-4" />

                  {/* Payment Mode Selection */}
                  {isCourse && (
                    <div className="space-y-4">
                       <Label className="text-base font-semibold flex items-center gap-2"><Calculator className="w-4 h-4 text-primary" /> Payment Plan</Label>
                       <RadioGroup value={paymentMode} onValueChange={(val: "full" | "emi") => setPaymentMode(val)} className="grid grid-cols-2 gap-3">
                         <div className={`relative flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${paymentMode === 'full' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                           <RadioGroupItem value="full" id="full" />
                           <Label htmlFor="full" className="cursor-pointer flex-1 font-semibold">One-Time Payment</Label>
                         </div>
                         <div className={`relative flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${paymentMode === 'emi' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                           <RadioGroupItem value="emi" id="emi" />
                           <Label htmlFor="emi" className="cursor-pointer flex-1">
                             <div className="font-semibold">Installments (EMI)</div>
                             {userType === 'student' && <div className="text-xs text-green-600 font-medium">Low Interest for Students</div>}
                           </Label>
                         </div>
                       </RadioGroup>

                       {paymentMode === 'emi' && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2">
                           <Label className="text-sm font-medium">Duration</Label>
                           <Select value={emiMonths.toString()} onValueChange={(v) => setEmiMonths(parseInt(v))}>
                             <SelectTrigger><SelectValue /></SelectTrigger>
                             <SelectContent>
                               <SelectItem value="3">3 Months</SelectItem>
                               <SelectItem value="6">6 Months</SelectItem>
                               <SelectItem value="9">9 Months</SelectItem>
                             </SelectContent>
                           </Select>
                           
                           {/* Dynamic EMI Info Box */}
                           <div className={`rounded-lg p-4 space-y-2 border ${userType === 'student' ? 'bg-green-500/10 border-green-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                              <div className="flex justify-between text-sm">
                                  <span>Interest Rate</span>
                                  <span className="font-bold">{userType === 'student' ? '3.5%' : '5%'}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                  <span>Down Payment</span>
                                  <span className="font-bold">{userType === 'student' ? '₹0 (Waived)' : '30%'}</span>
                              </div>
                              <Separator className="bg-border/20"/>
                              <div className="flex justify-between font-bold text-base">
                                  <span>Monthly Pay</span>
                                  <span>₹{emiDetails.monthlyEMI.toLocaleString()}</span>
                              </div>
                           </div>
                         </motion.div>
                       )}
                    </div>
                  )}

                  <Separator className="my-4" />

                  {/* Transaction ID */}
                  <div className="space-y-4">
                     <div className="bg-muted p-4 rounded-lg text-sm">
                        Please pay <strong>₹{paymentMode === 'emi' ? (emiDetails.downPayment > 0 ? emiDetails.downPayment : emiDetails.monthlyEMI).toLocaleString() : effectivePrice.toLocaleString()}</strong> using the QR Code, then enter the UTR below.
                     </div>
                     <div className="space-y-2">
                       <Label>Transaction ID (UTR)</Label>
                       <Input name="transactionId" placeholder="12 Digit UTR Number" maxLength={20} required value={formData.transactionId} onChange={handleInputChange} className="uppercase" />
                     </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-6 text-lg font-semibold shadow-glow" disabled={isSubmitting}>
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</> : "Submit Payment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT COLUMN: SUMMARY */}
          <motion.div className="lg:col-span-5 space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-border/50 bg-muted/5 backdrop-blur-sm overflow-hidden sticky top-24">
              <CardHeader className="bg-muted/20 pb-4"><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex gap-3">
                     <div className="mt-1 p-2 bg-primary/10 rounded-lg text-primary">{isCourse ? <BookOpen /> : <Zap />}</div>
                     <div>
                       <h3 className="font-bold text-lg leading-tight">{itemName}</h3>
                       <p className="text-sm text-muted-foreground">{itemType}</p>
                     </div>
                   </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Base Price</span>
                    <span>₹{price?.toLocaleString()}</span>
                  </div>
                  
                  {/* STUDENT DISCOUNT ROW */}
                  {userType === 'student' && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span className="flex items-center gap-1"><Percent className="w-3 h-3"/> Student Discount (15%)</span>
                      <span>- ₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  {paymentMode === 'emi' && (
                      <div className="flex justify-between text-sm text-orange-500">
                          <span>EMI Interest ({userType === 'student' ? '3.5%' : '5%'})</span>
                          <span>+ ₹{Math.ceil(emiDetails.interest).toLocaleString()}</span>
                      </div>
                  )}

                  <Separator className="my-2"/>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold">Total Payable</span>
                    <div className="text-right">
                        {userType === 'student' && <span className="block text-xs text-muted-foreground line-through decoration-red-500">₹{price?.toLocaleString()}</span>}
                        <span className="font-bold text-2xl text-primary">
                            ₹{paymentMode === 'emi' ? emiDetails.total.toLocaleString() : effectivePrice.toLocaleString()}
                        </span>
                    </div>
                  </div>
                  
                  {paymentMode === 'emi' && (
                      <div className="mt-4 bg-primary/5 p-3 rounded-lg border border-primary/10 text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Due Now</p>
                          <p className="text-xl font-bold text-primary">
                              ₹{(emiDetails.downPayment > 0 ? emiDetails.downPayment : emiDetails.monthlyEMI).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                              {emiDetails.downPayment > 0 ? `(Down Payment)` : `(1st Installment)`}
                          </p>
                      </div>
                  )}
                </div>
              </CardContent>

              {/* QR Code Section */}
              <div className="p-6 bg-white border-t flex flex-col items-center">
                 <p className="text-sm text-muted-foreground mb-4 font-medium">Scan to Pay via UPI</p>
                 <div className="relative group">
                    <img src={QR_CODE_URL} alt="QR" className="w-40 h-40 object-contain mix-blend-multiply" />
                 </div>
                 <div className="flex items-center gap-2 mt-4 p-2 bg-gray-100 rounded-md text-xs w-full justify-center">
                    <code className="text-black">{UPI_ID}</code>
                    <Copy className="w-3 h-3 cursor-pointer hover:text-primary" onClick={copyUpiToClipboard}/>
                 </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}