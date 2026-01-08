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
  ShieldCheck
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
const QR_CODE_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEiYxV2ayi-nLo4GdGqaDDKDg9OpUiRjbmyav9HoiZp_qm2Zt1-x8jQ7Y4S5gMQSeKrIuZKolSVxZ0c817cdvXKG5IbRLWEngQOEBC8Gah6Edi2snbD0vbr6y-0nJSq8rdvCR4HJIcRJhRDlSTYA9EeYdGj-U6QaRM365bjvdR85QjaR3s4rm1oYOTYTl8gU";

// EMI Configuration
const EMI_CONFIG = {
  student: { interest: 3.5, downPaymentPercent: 0 },
  regular: { interest: 5, downPaymentPercent: 30 }
};

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Retrieve Data
  const { serviceName, courseName, price, courseId } = location.state || {};
  
  // Logic: If 'courseName' exists, it is a Course. Otherwise, it is Software.
  const isCourse = !!courseName; 
  const itemName = serviceName || courseName || "Unknown Item";
  const itemType = isCourse ? "Course Enrollment" : "Premium Tool";
  const basePrice = Number(price) || 0;

  // 2. State
  const [userType, setUserType] = useState<"student" | "regular">("regular");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    transactionId: "",
    collegeName: "",
    linkedinProfile: "",
    parentPhone: ""
  });
  
  const [paymentMode, setPaymentMode] = useState<"full" | "emi">("full");
  const [emiMonths, setEmiMonths] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 3. Price Calculation
  const getEffectivePrice = () => {
    // RULE 1: Software always uses base price
    if (!isCourse) return basePrice;
    
    // RULE 2: Students get discount only on courses
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
      // If student (0 down payment), they pay 1st month EMI now
      payNow: downPayment > 0 ? downPayment : monthlyEMI 
    };
  };

  const emiDetails = calculateEMI();
  
  // Determine "Amount Due Today"
  const amountDueNow = (paymentMode === 'emi' && isCourse)
    ? emiDetails.payNow 
    : effectivePrice;

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API verification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (isCourse && courseId) localStorage.setItem(`tdcs_purchased_${courseId}`, "true");
    }, 2000);
  };

  // 5. Success View
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-green-500/30">
            <CardHeader className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-green-600">Order Placed Successfully</CardTitle>
                <CardDescription>
                   Amount Paid: <strong>₹{amountDueNow.toLocaleString()}</strong>
                   <br/>We are verifying your transaction ID. You will receive access details shortly via email/WhatsApp.
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
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button variant="ghost" className="mb-6 pl-0" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: FORM */}
          <motion.div className="lg:col-span-7 space-y-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div>
              <h1 className="text-3xl font-bold mb-2">Checkout</h1>
              <p className="text-muted-foreground">Completing purchase for <span className="text-primary font-semibold">{itemName}</span></p>
            </div>

            {/* --- RULE: ONLY SHOW STUDENT SELECTOR IF IT IS A COURSE --- */}
            {isCourse && (
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
            )}

            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-primary" /> Billing Details</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input name="name" required value={formData.name} onChange={handleInputChange} className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number (+91)</Label>
                      <Input name="phone" required value={formData.phone} onChange={handleInputChange} className="bg-muted/30" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="bg-muted/30" />
                  </div>

                  {/* --- RULE: ONLY SHOW PROOF FIELDS IF COURSE & STUDENT --- */}
                  {isCourse && userType === 'student' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-500/5 p-4 rounded-xl border border-green-500/20 animate-in fade-in slide-in-from-top-2">
                        <div className="col-span-2 pb-2 border-b border-green-500/10 mb-2">
                            <h4 className="text-sm font-semibold text-green-700 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4"/> Student Verification Required
                            </h4>
                        </div>
                        <div className="space-y-2">
                            <Label>College Name</Label>
                            <Input name="collegeName" required placeholder="e.g. IIT Bombay" value={formData.collegeName} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>Parent's Phone No.</Label>
                            <Input name="parentPhone" required placeholder="Parent's Mobile" value={formData.parentPhone} onChange={handleInputChange} />
                        </div>
                     </div>
                  )}

                  {/* --- RULE: PAYMENT PLAN (EMI) ONLY FOR COURSES --- */}
                  {isCourse && (
                    <div className="space-y-4 pt-4 border-t">
                       <Label className="text-base font-semibold flex items-center gap-2"><Calculator className="w-4 h-4 text-primary" /> Payment Plan</Label>
                       <RadioGroup value={paymentMode} onValueChange={(val: "full" | "emi") => setPaymentMode(val)} className="grid grid-cols-2 gap-3">
                         <div className={`rounded-lg border p-4 cursor-pointer ${paymentMode === 'full' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                           <div className="flex items-center space-x-2">
                             <RadioGroupItem value="full" id="full" />
                             <Label htmlFor="full" className="cursor-pointer font-semibold">One-Time Payment</Label>
                           </div>
                         </div>
                         <div className={`rounded-lg border p-4 cursor-pointer ${paymentMode === 'emi' ? 'border-primary bg-primary/5' : 'border-border'}`}>
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
                                 <SelectTrigger><SelectValue /></SelectTrigger>
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
                       <Input name="transactionId" placeholder="12 Digit UTR Number" required value={formData.transactionId} onChange={handleInputChange} className="uppercase" />
                     </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-6" disabled={isSubmitting}>
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying</> : "Submit Payment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT COLUMN: SUMMARY */}
          <motion.div className="lg:col-span-5 space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="border-border/50 bg-muted/5 sticky top-24">
              <CardHeader className="bg-muted/20 pb-4"><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">{isCourse ? <BookOpen /> : <Zap />}</div>
                    <div>
                        <h3 className="font-bold text-lg">{itemName}</h3>
                        <p className="text-sm text-muted-foreground">{itemType}</p>
                    </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Price</span>
                    <span>₹{basePrice.toLocaleString()}</span>
                  </div>
                  
                  {/* Discount Row (Courses Only) */}
                  {isCourse && userType === 'student' && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Student Discount (15%)</span>
                      <span>- ₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  {/* EMI Interest Row (Courses Only) */}
                  {paymentMode === 'emi' && isCourse && (
                      <div className="flex justify-between text-sm text-orange-500">
                          <span>EMI Interest ({userType === 'student' ? '3.5%' : '5%'})</span>
                          <span>+ ₹{emiDetails.interest.toLocaleString()}</span>
                      </div>
                  )}

                  <Separator className="my-2"/>
                  
                  {/* FINAL PAYABLE DISPLAY */}
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">Due Today</span>
                        {paymentMode === 'emi' && isCourse && (
                            <span className="text-xs text-muted-foreground">
                                {userType === 'student' ? '1st Month Installment' : 'Down Payment'}
                            </span>
                        )}
                    </div>
                    <span className="font-bold text-3xl text-primary">
                        ₹{amountDueNow.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* FUTURE PAYMENTS INFO (EMI) */}
                  {paymentMode === 'emi' && isCourse && (
                      <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-yellow-500/5 p-3 rounded border border-yellow-500/20">
                          <CalendarClock className="w-4 h-4 mt-0.5 text-yellow-600" />
                          <div>
                              <p className="font-semibold text-yellow-700">Future Schedule:</p>
                              {userType === 'student' ? (
                                  // Student pays 1st EMI now, so remaining is months-1
                                  <p>{emiMonths - 1} more installments of <strong>₹{emiDetails.monthlyEMI.toLocaleString()}</strong></p>
                              ) : (
                                  // Regular paid down payment, so full months EMI remain
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
                 <div className="flex items-center gap-2 mt-4 p-2 bg-gray-100 rounded-md text-xs">
                    <code>{UPI_ID}</code>
                    <Copy className="w-3 h-3 cursor-pointer" onClick={() => navigator.clipboard.writeText(UPI_ID)}/>
                 </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}