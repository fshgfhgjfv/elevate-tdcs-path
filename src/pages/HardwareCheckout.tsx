import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Truck, 
  CreditCard, 
  CheckCircle, 
  Loader2,
  Package,
  Copy,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Config
const UPI_ID = "tdcsorganization@sbi";
const QR_CODE_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEiYxV2ayi-nLo4GdGqaDDKDg9OpUiRjbmyav9HoiZp_qm2Zt1-x8jQ7Y4S5gMQSeKrIuZKolSVxZ0c817cdvXKG5IbRLWEngQOEBC8Gah6Edi2snbD0vbr6y-0nJSq8rdvCR4HJIcRJhRDlSTYA9EeYdGj-U6QaRM365bjvdR85QjaR3s4rm1oYOTYTl8gU";

export default function HardwareCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safe destructuring with fallback
  const state = location.state || {};
  const productName = state.productName;
  const price = state.price;
  const image = state.image;
  
  const SHIPPING_COST = 150; 
  const productPrice = Number(price) || 0;
  const TOTAL_PRICE = productPrice + SHIPPING_COST;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    transactionId: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect if accessed directly without data
  useEffect(() => {
    if (!productName || !price) {
      // Small delay to prevent redirect loops or strict mode double-invocations
      const timer = setTimeout(() => navigate("/services/hardware"), 100);
      return () => clearTimeout(timer);
    }
  }, [productName, price, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate Order Processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  // --- Success View ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-green-500 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-green-500/30 bg-gray-900">
            <CardHeader className="text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl text-white">Deployment Authorized</CardTitle>
                <CardDescription className="text-gray-400">
                   Order ID: <span className="font-mono text-green-400">#{Math.floor(Math.random() * 90000) + 10000}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-gray-800 p-4 rounded text-sm text-gray-300">
                   <p><strong>Item:</strong> {productName}</p>
                   <p><strong>Shipping to:</strong> {formData.city}, {formData.pincode}</p>
                </div>
                <div className="text-center text-sm text-gray-500">
                    We are verifying your payment. You will receive tracking details via WhatsApp/Email within 24 hours.
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-500 text-black font-bold" onClick={() => navigate("/")}>
                    Return to Base
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  // --- Main View ---
  return (
    <div className="min-h-screen bg-black text-gray-100 pt-24 pb-12 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button variant="ghost" className="mb-6 pl-0 text-green-500 hover:text-green-400 hover:bg-transparent" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Cancel Deployment
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: SHIPPING FORM */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Truck className="w-8 h-8 text-green-500" /> 
              Secure Checkout
            </h1>

            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5 text-green-500" /> Shipping Destination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-400">Full Name</Label>
                      <Input name="name" required value={formData.name} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-400">Mobile Number</Label>
                      <Input name="phone" required value={formData.phone} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="space-y-2">
                    <Label className="text-gray-400">Street Address</Label>
                    <Input name="address" placeholder="House No, Building, Street Area" required value={formData.address} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                       <Label className="text-gray-400">City</Label>
                       <Input name="city" required value={formData.city} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-gray-400">State</Label>
                       <Input name="state" required value={formData.state} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    <div className="space-y-2 col-span-2 md:col-span-1">
                       <Label className="text-gray-400">Pincode</Label>
                       <Input name="pincode" required value={formData.pincode} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                  </div>

                  <Separator className="bg-gray-800 my-6" />

                  {/* Payment Input */}
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                         <Label className="text-white font-bold flex items-center gap-2">
                             <CreditCard className="w-4 h-4 text-green-500" /> Payment Confirmation
                         </Label>
                         <span className="text-xs text-gray-500">Scan QR Code -> Pay -> Enter UTR</span>
                     </div>
                     <Input 
                        name="transactionId" 
                        placeholder="ENTER 12-DIGIT UTR / TRANSACTION ID" 
                        required 
                        value={formData.transactionId} 
                        onChange={handleInputChange} 
                        className="bg-gray-800 border-green-500/30 text-white placeholder:text-gray-600 uppercase tracking-widest" 
                     />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Button 
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-500 text-black shadow-lg shadow-green-900/20"
            >
                {isSubmitting ? <><Loader2 className="mr-2 animate-spin"/> Processing Order...</> : "CONFIRM ORDER & PAY"}
            </Button>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-gray-800 bg-gray-900 sticky top-24">
              <CardHeader className="border-b border-gray-800 pb-4">
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Product Snippet */}
                <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                        {image && <img src={image} alt="Product" className="w-full h-full object-cover" />}
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">{productName}</h3>
                        <div className="flex items-center gap-2 text-sm text-green-400">
                            <Package className="w-4 h-4" /> Physical Delivery
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                        <span>Item Price</span>
                        <span>₹{productPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Shipping & Handling</span>
                        <span>₹{SHIPPING_COST}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Taxes (18% GST)</span>
                        <span className="text-green-500">Included</span>
                    </div>
                    <Separator className="bg-gray-800 my-2" />
                    <div className="flex justify-between text-white text-xl font-bold">
                        <span>Total Payable</span>
                        <span className="text-green-400">₹{TOTAL_PRICE.toLocaleString()}</span>
                    </div>
                </div>

                {/* QR Code */}
                <div className="bg-white p-4 rounded-lg flex flex-col items-center">
                    <img src={QR_CODE_URL} alt="Payment QR" className="w-48 h-48 mix-blend-multiply" />
                    <div className="mt-4 flex items-center gap-2 bg-gray-100 px-3 py-1 rounded text-xs text-black font-mono">
                        {UPI_ID}
                        <Copy 
                            className="w-3 h-3 cursor-pointer hover:text-green-600" 
                            onClick={() => {
                                navigator.clipboard.writeText(UPI_ID);
                                toast({ title: "UPI ID Copied" });
                            }}
                        />
                    </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4" /> Secure 256-bit SSL Encrypted Payment
                </div>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}