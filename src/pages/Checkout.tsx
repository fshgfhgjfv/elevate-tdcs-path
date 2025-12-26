import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Wallet, Building, ArrowLeft, ShoppingBag, Lock, Shield, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: currency === 'INR' ? 'India' : 'United States',
    notes: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const shipping = totalPrice > 1000 ? 0 : (currency === 'INR' ? 99 : 5);
  const taxRate = currency === 'INR' ? 0.18 : 0.08;
  const tax = Math.round(totalPrice * taxRate);
  const grandTotal = totalPrice + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const validateStep1 = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const missing = required.filter(field => !formData[field as keyof typeof formData]);
    if (missing.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Order Placed Successfully! 🎉",
      description: "Your order has been confirmed. You will receive a confirmation email shortly.",
    });
    
    clearCart();
    navigate('/');
    setIsProcessing(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-4">Add some items to proceed to checkout</p>
          <Button onClick={() => navigate('/services/hardware')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6" onClick={() => step === 1 ? navigate(-1) : setStep(1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {step === 1 ? 'Back' : 'Back to Shipping'}
        </Button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
            </div>
            <span className="ml-2 mr-4 font-medium">Shipping</span>
          </div>
          <div className="w-16 h-0.5 bg-muted" />
          <div className="flex items-center ml-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Payment</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center">
          {step === 1 ? 'Shipping Information' : 'Payment'}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe"
                            required 
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={currency === 'INR' ? '+91 98765 43210' : '+1 555 123 4567'}
                          required 
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Input 
                          id="address" 
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Main Street, Apartment 4B"
                          required 
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input 
                            id="city" 
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder={currency === 'INR' ? 'Mumbai' : 'New York'}
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input 
                            id="state" 
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder={currency === 'INR' ? 'Maharashtra' : 'NY'}
                            required 
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="pincode">{currency === 'INR' ? 'PIN Code' : 'ZIP Code'} *</Label>
                          <Input 
                            id="pincode" 
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder={currency === 'INR' ? '400001' : '10001'}
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input 
                            id="country" 
                            value={formData.country}
                            onChange={handleInputChange}
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="notes">Order Notes (Optional)</Label>
                        <Textarea 
                          id="notes" 
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Any special instructions for delivery..."
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Button type="submit" size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Select Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                        <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}>
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Credit / Debit Card</p>
                              <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                            </div>
                          </Label>
                        </div>
                        {currency === 'INR' && (
                          <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}>
                            <RadioGroupItem value="upi" id="upi" />
                            <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                              <Wallet className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">UPI</p>
                                <p className="text-sm text-muted-foreground">GPay, PhonePe, Paytm</p>
                              </div>
                            </Label>
                          </div>
                        )}
                        <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}>
                          <RadioGroupItem value="netbanking" id="netbanking" />
                          <Label htmlFor="netbanking" className="flex items-center gap-3 cursor-pointer flex-1">
                            <Building className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Net Banking</p>
                              <p className="text-sm text-muted-foreground">All major banks supported</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>

                      {paymentMethod === "card" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-6 space-y-4 p-4 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input 
                              id="cardNumber" 
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456" 
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input 
                                id="expiry" 
                                value={formData.expiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY" 
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input 
                                id="cvv" 
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123" 
                                type="password"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {paymentMethod === "upi" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-6 space-y-4 p-4 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <Label htmlFor="upiId">UPI ID</Label>
                            <Input 
                              id="upiId" 
                              value={formData.upiId}
                              onChange={handleInputChange}
                              placeholder="yourname@upi" 
                            />
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Pay {formatPrice(grandTotal)}
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax ({currency === 'INR' ? '18% GST' : '8% Tax'})</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(grandTotal)}</span>
                </div>

                {shipping === 0 && (
                  <div className="text-center text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                    🎉 You qualify for free shipping!
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
