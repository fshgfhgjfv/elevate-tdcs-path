import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  CheckCircle, 
  Loader2, 
  BookOpen, 
  Zap, 
  Lock, 
  GraduationCap, 
  Briefcase, 
  Copy, 
  Calculator, 
  CalendarClock, 
  ShieldCheck, 
  CreditCard, 
  Linkedin,
  TicketPercent,
  AlertCircle // Added for the error icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// --- Configuration ---
const UPI_ID = "tdcsorganization@sbi"; 
const STUDENT_DISCOUNT_PERCENT = 15; 
const TARGET_LITE_COURSE = "Cyber Master's Pro Black-Hat Lite"; 
const SPECIAL_COUPON_CODE = "NEWSTUDENTFRO70%"; 
const SPECIAL_DISCOUNT_PERCENT = 70; 

const QR_CODE_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEiYxV2ayi-nLo4GdGqaDDKDg9OpUiRjbmyav9HoiZp_qm2Zt1-x8jQ7Y4S5gMQSeKrIuZKolSVxZ0c817cdvXKG5IbRLWEngQOEBC8Gah6Edi2snbD0vbr6y-0nJSq8rdvCR4HJIcRJhRDlSTYA9EeYdGj-U6QaRM365bjvdR85QjaR3s4rm1oYOTYTl8gU";

const EMI_CONFIG = {
  student: { interest: 3.5, downPaymentPercent: 0 },
  regular: { interest: 5, downPaymentPercent: 30 }
};

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // --- FIXED DATA RETRIEVAL LOGIC START ---
  
  // 1. Helper to find data from Router State OR Session Storage
  const getInitialData = () => {
    // Priority 1: Fresh data passed via navigation
    if (location.state) return location.state;
    
    // Priority 2: Saved data from session storage (handles page refresh)
    const stored = sessionStorage.getItem("checkoutPending");
    return stored ? JSON.parse(stored) : null;
  };

  const checkoutData = getInitialData();

  // 2. Effect to Persist State (Removed the redirect logic here)
  useEffect(() => {
    if (location.state) {
      // If we have fresh state, save it so it survives a refresh
      sessionStorage.setItem("checkoutPending", JSON.stringify(location.state));
    }
  }, [location.state]);

  // 3. SHOW 404 ERROR IF NO DATA FOUND
  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-500/20 shadow-lg bg-background/95 backdrop-blur">
            <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-500" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">No Item Selected</CardTitle>
                <CardDescription className="text-base mt-2">
                   We couldn't find the item you are trying to purchase.
                   <br/>
                   <span className="text-red-500 font-medium">Please select a course or tool from our website first.</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
                <Button className="w-full h-12 text-base" onClick={() => navigate("/")}>
                    Return Home
                </Button>
                <Button variant="outline" className="w-full h-12 text-base" onClick={() => navigate("/courses")}>
                    Browse Courses
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  const { serviceName, courseName, price, courseId } = checkoutData;
  // --- FIXED DATA RETRIEVAL LOGIC END ---
  
  const isCourse = !!courseName; 
  const itemName = serviceName || courseName || "Unknown Item";
  const itemType = isCourse ? "Course Enrollment" : "Premium Tool";

  // Strict check for the Lite course
  const isLiteCourse = courseName === TARGET_LITE_COURSE;

  // --- PRICE PARSING ---
  const parsePrice = (inputPrice: any) => {
    if (typeof inputPrice === 'number') return inputPrice;
    if (typeof inputPrice === 'string') {
      const cleanString = inputPrice.replace(/[^0-9.]/g, '');
      return Number(cleanString) || 0;
    }
    return 0;
  };

  const basePrice = parsePrice(price); 

  const [userType, setUserType] = useState<"student" | "regular">("regular");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadharNumber: "", 
    linkedinProfile: "",
    transactionId: "",
    collegeName: "",
    parentPhone: ""
  });
  
  const [paymentMode, setPaymentMode] = useState<"full" | "emi">("full");
  const [emiMonths, setEmiMonths] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- COUPON STATE ---
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Force Full Payment if it is the Lite course
  useEffect(() => {
    if (isLiteCourse) {
      setPaymentMode("full");
    }
  }, [isLiteCourse]);

  // 3. Price Calculation
  const getEffectivePrice = () => {
    if (!isCourse) return basePrice;

    // Priority 1: Special Coupon for Lite Course (70% OFF)
    if (isLiteCourse && couponApplied) {
        return Math.floor(basePrice * (1 - SPECIAL_DISCOUNT_PERCENT / 100));
    }

    // Priority 2: Standard Student Discount (15% OFF)
    if (userType === 'student') {
      return Math.floor(basePrice * (1 - STUDENT_DISCOUNT_PERCENT / 100));
    }
    return basePrice;
  };

  const effectivePrice = getEffectivePrice();
  const discountAmount = basePrice - effectivePrice;

  // 4. EMI Calculation
  const calculateEMI = () => {
    const config = EMI_CONFIG[userType];
    const baseAmount = effectivePrice;
    
    const downPayment = Math.floor((baseAmount * config.downPaymentPercent) / 100);
    const principal = baseAmount - downPayment;
    const interestAmount = Math.floor((principal * config.interest) / 100);
    const totalLoanAmount = principal + interestAmount;
    const monthlyEMI = Math.ceil(totalLoanAmount / emiMonths);
    
    return {
      totalCost: downPayment + totalLoanAmount, 
      downPayment,        
      monthlyEMI,           
      interest: interestAmount,
      payNow: downPayment > 0 ? downPayment : monthlyEMI 
    };
  };

  const emiDetails = calculateEMI();
  
  const amountDueNow = (paymentMode === 'emi' && isCourse && !isLiteCourse)
    ? emiDetails.payNow 
    : effectivePrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = () => {
    setCouponError("");
    if (couponInput.trim() === "") return;

    if (couponInput.trim() === SPECIAL_COUPON_CODE) {
        setCouponApplied(true);
    } else {
        setCouponError("Invalid coupon code.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Clean up storage after successful purchase
      sessionStorage.removeItem("checkoutPending");
      if (isCourse && courseId) localStorage.setItem(`tdcs_purchased_${courseId}`, "true");
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-green-500/30 shadow-lg">
            <CardHeader className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-green-600 text-2xl">Order Placed Successfully</CardTitle>
                <CardDescription className="text-base mt-2">
                   Amount Paid: <strong className="text-foreground">₹{amountDueNow.toLocaleString()}</strong>
                   <br/>We are verifying your transaction ID. You will receive access details shortly.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full h-12 text-base" onClick={() => navigate("/")}>Return Home</Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 lg:pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button variant="ghost" className="mb-4 lg:mb-6 pl-0 hover:bg-transparent hover:text-primary" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: FORM */}
          <motion.div className="lg:col-span-7 space-y-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">Checkout</h1>
              <p className="text-muted-foreground text-sm lg:text-base">Completing purchase for <span className="text-primary font-semibold">{itemName}</span></p>
            </div>

            {/* Student Selector */}
            {isCourse && (
                <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="pt-6">
                        <Label className="text-base font-semibold mb-3 block">Who is enrolling?</Label>
                        <RadioGroup 
                            value={userType} 
                            onValueChange={(val: "student" | "regular") => setUserType(val)}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
                                            <Badge className="bg-green-500 hover:bg-green-600 text-[10px] h-5 px-1.5 ml-auto">15% OFF</Badge>
                                    </div>
                                    <div className="text-xs text-muted-foreground">Valid ID Required</div>
                                </Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>
            )}

            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-primary" /> Billing Details</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input name="name" required value={formData.name} onChange={handleInputChange} className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number (+91)</Label>
                      <Input name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} className="bg-muted/30" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="bg-muted/30" />
                  </div>

                  {/* Student Verification */}
                  {isCourse && userType === 'student' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-500/5 p-4 rounded-xl border border-green-500/20 animate-in fade-in slide-in-from-top-2">
                        <div className="col-span-1 md:col-span-2 pb-2 border-b border-green-500/10 mb-2">
                            <h4 className="text-sm font-semibold text-green-700 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4"/> Student Verification Required
                            </h4>
                            <p className="text-xs text-green-600/80 mt-1">Please provide details to verify your student status.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>College Name</Label>
                            <Input name="collegeName" required placeholder="e.g. IIT Bombay" value={formData.collegeName} onChange={handleInputChange} className="bg-white/50 border-green-500/20 focus:border-green-500"/>
                        </div>
                        <div className="space-y-2">
                            <Label>Parent's Phone No.</Label>
                            <Input name="parentPhone" type="tel" required placeholder="Parent's Mobile" value={formData.parentPhone} onChange={handleInputChange} className="bg-white/50 border-green-500/20 focus:border-green-500" />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-xs uppercase text-muted-foreground font-bold">
                                <CreditCard className="w-3 h-3"/> Aadhar Number
                            </Label>
                            <Input name="aadharNumber" required placeholder="XXXX XXXX XXXX" maxLength={12} value={formData.aadharNumber} onChange={handleInputChange} className="bg-white/50 border-green-500/20 focus:border-green-500 font-mono" />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-xs uppercase text-muted-foreground font-bold">
                                <Linkedin className="w-3 h-3"/> LinkedIn Profile
                            </Label>
                            <Input name="linkedinProfile" placeholder="linkedin.com/in/..." value={formData.linkedinProfile} onChange={handleInputChange} className="bg-white/50 border-green-500/20 focus:border-green-500" />
                        </div>
                      </div>
                  )}

                  {/* EMI OPTION - HIDDEN for Lite Course */}
                  {isCourse && !isLiteCourse && (
                    <div className="space-y-4 pt-4 border-t">
                        <Label className="text-base font-semibold flex items-center gap-2"><Calculator className="w-4 h-4 text-primary" /> Payment Plan</Label>
                        <RadioGroup value={paymentMode} onValueChange={(val: "full" | "emi") => setPaymentMode(val)} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className={`rounded-lg border p-4 cursor-pointer transition-colors ${paymentMode === 'full' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="full" id="full" />
                              <Label htmlFor="full" className="cursor-pointer font-semibold">One-Time Payment</Label>
                            </div>
                          </div>
                          <div className={`rounded-lg border p-4 cursor-pointer transition-colors ${paymentMode === 'emi' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="emi" id="emi" />
                              <Label htmlFor="emi" className="cursor-pointer font-semibold">Installments (EMI)</Label>
                            </div>
                          </div>
                        </RadioGroup>
                        
                        {paymentMode === 'emi' && (
                            <div className="p-4 bg-muted/50 rounded-lg">
                                <Label className="mb-2 block">Select Duration</Label>
                                <Select value={emiMonths.toString()} onValueChange={(v) => setEmiMonths(parseInt(v))}>
                                  <SelectTrigger className="w-full bg-background"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="3">3 Months</SelectItem>
                                    <SelectItem value="6">6 Months</SelectItem>
                                  </SelectContent>
                                </Select>
                            </div>
                        )}
                      </div>
                  )}

                  <Separator className="my-4" />

                  {/* Payment Info */}
                  <div className="space-y-4">
                      <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg text-sm">
                        Please pay <strong className="text-primary text-xl">₹{amountDueNow.toLocaleString()}</strong> using the QR Code.
                        <p className="text-xs text-muted-foreground mt-1">
                           Enter the Transaction ID below after payment.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Transaction ID (UTR)</Label>
                        <Input name="transactionId" placeholder="12 Digit UTR Number" required value={formData.transactionId} onChange={handleInputChange} className="uppercase font-mono" />
                      </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-6 h-12 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying</> : "Submit Payment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT COLUMN: SUMMARY */}
          <motion.div className="lg:col-span-5 space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="border-border/50 bg-muted/5 lg:sticky lg:top-24">
              <CardHeader className="bg-muted/20 pb-4"><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary shrink-0">{isCourse ? <BookOpen /> : <Zap />}</div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-lg truncate">{itemName}</h3>
                        <p className="text-sm text-muted-foreground">{itemType}</p>
                    </div>
                </div>

                {/* --- PROMO CODE SECTION: ONLY VISIBLE FOR LITE COURSE --- */}
                {isCourse && isLiteCourse && !couponApplied && (
                    <motion.div 
                        className="mb-6 p-2 rounded-lg"
                        animate={{
                            boxShadow: [
                                "0px 0px 0px rgba(168, 85, 247, 0)", 
                                "0px 0px 15px rgba(168, 85, 247, 0.5)", 
                                "0px 0px 0px rgba(168, 85, 247, 0)" 
                            ],
                            borderColor: [
                                "rgba(168, 85, 247, 0)",
                                "rgba(168, 85, 247, 0.8)",
                                "rgba(168, 85, 247, 0)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Label className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 block">
                            Promo Code <span className="text-primary animate-pulse ml-2">(Special Offer Available!)</span>
                        </Label>
                        <div className="flex gap-2">
                            <Input 
                                placeholder="Enter Coupon" 
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value)}
                                className="bg-background border-primary/50"
                            />
                            <Button variant="default" onClick={handleApplyCoupon}>
                                <TicketPercent className="w-4 h-4" />
                            </Button>
                        </div>
                        {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                    </motion.div>
                )}

                {couponApplied && (
                    <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex justify-between items-center">
                        <span className="text-sm text-green-700 font-medium flex items-center gap-2">
                            <CheckCircle className="w-4 h-4"/> Coupon Applied
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-red-500 hover:text-red-600 hover:bg-red-100" onClick={() => setCouponApplied(false)}>
                            Remove
                        </Button>
                    </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Price</span>
                    <span>₹{basePrice.toLocaleString()}</span>
                  </div>
                  
                  {isCourse && userType === 'student' && !couponApplied && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Student Discount (15%)</span>
                      <span>- ₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Special Coupon Discount - 70% OFF */}
                  {isCourse && couponApplied && (
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex justify-between text-sm text-purple-600 font-bold p-1 bg-purple-50 rounded"
                    >
                      <span>Special Offer (70%)</span>
                      <span>- ₹{discountAmount.toLocaleString()}</span>
                    </motion.div>
                  )}

                  {paymentMode === 'emi' && isCourse && !isLiteCourse && (
                      <div className="flex justify-between text-sm text-orange-500">
                          <span>EMI Interest ({userType === 'student' ? '3.5%' : '5%'})</span>
                          <span>+ ₹{emiDetails.interest.toLocaleString()}</span>
                      </div>
                  )}

                  <Separator className="my-2"/>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">Due Today</span>
                        {paymentMode === 'emi' && isCourse && (
                            <span className="text-xs text-muted-foreground">
                                {userType === 'student' ? '1st Month Installment' : 'Down Payment'}
                            </span>
                        )}
                    </div>
                    <span className="font-bold text-2xl lg:text-3xl text-primary">
                        ₹{amountDueNow.toLocaleString()}
                    </span>
                  </div>
                  
                  {paymentMode === 'emi' && isCourse && !isLiteCourse && (
                      <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-yellow-500/5 p-3 rounded border border-yellow-500/20">
                          <CalendarClock className="w-4 h-4 mt-0.5 text-yellow-600 shrink-0" />
                          <div>
                              <p className="font-semibold text-yellow-700">Future Schedule:</p>
                              {userType === 'student' ? (
                                  <p>{emiMonths - 1} more installments of <strong>₹{emiDetails.monthlyEMI.toLocaleString()}</strong></p>
                              ) : (
                                  <p>{emiMonths} installments of <strong>₹{emiDetails.monthlyEMI.toLocaleString()}</strong></p>
                              )}
                          </div>
                      </div>
                  )}
                </div>
              </CardContent>

              {/* QR Code */}
              <div className="p-6 bg-white border-t flex flex-col items-center">
                 <img src={QR_CODE_URL} alt="QR" className="w-40 h-40 object-contain mix-blend-multiply" />
                 <div className="flex items-center gap-2 mt-4 p-2 bg-gray-100 rounded-md text-xs max-w-full overflow-hidden">
                   <code className="truncate">{UPI_ID}</code>
                   <Copy className="w-3 h-3 cursor-pointer shrink-0" onClick={() => navigator.clipboard.writeText(UPI_ID)}/>
                 </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}