import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShoppingBag, Upload, CheckCircle, Copy, QrCode } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { toast } from "@/hooks/use-toast";

const QR_CODE_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEiELxVBDoZN5m4QVTDA_-qHj52le4N0SaPoO5hnEojupSercg3NAJLi-lnG7GcOdq5Zn7y2yOE67iP4zuOFAXaFZaKD7kxAdRea90YhQyFTBGwgVekp28gzWGGp8Y5zPETfsXCXWG03L9BTrmFCMBujeTd-wc3JceKLMDcN54dwVVxVwoCc7Usr9kXy5VjH";
const UPI_ID = "tdcsorganization@sbi";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    transactionId: "",
    amountPaid: "",
    screenshot: null as File | null,
  });

  const shipping = totalPrice > 1000 ? 0 : (currency === 'INR' ? 99 : 5);
  const taxRate = currency === 'INR' ? 0.18 : 0.08;
  const tax = Math.round(totalPrice * taxRate);
  const grandTotal = totalPrice + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
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

    if (!formData.fullName || !formData.phone || !formData.transactionId || !formData.amountPaid) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Payment Submitted Successfully! 🎉",
      description: "Our team will verify your payment and confirm your order within 24 hours.",
    });

    setIsSubmitted(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (items.length === 0 && !isSubmitted) {
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Submitted!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. Our team will verify your payment and send a confirmation email within 24 hours.
          </p>
          <Button onClick={() => navigate('/')} variant="gradient">
            Return to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <h1 className="text-3xl font-bold mb-2 text-center">Complete Your Payment</h1>
        <p className="text-muted-foreground text-center mb-8">
          Scan the QR code or use UPI ID to make payment, then submit your details
        </p>

        {/* Order Summary - Mobile */}
        <div className="lg:hidden mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Total: {formatPrice(grandTotal)}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {items.length} item(s) • Tax: {formatPrice(tax)} • Shipping: {shipping === 0 ? 'Free' : formatPrice(shipping)}
            </CardContent>
          </Card>
        </div>

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
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                    />
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
                      placeholder={grandTotal.toString()}
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

          {/* Right Column - QR Code & Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* QR Code Card */}
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

                <p className="text-sm text-muted-foreground">
                  Amount to pay: <span className="font-bold text-foreground">{formatPrice(grandTotal)}</span>
                </p>
              </CardContent>
            </Card>

            {/* Order Summary - Desktop */}
            <Card className="hidden lg:block">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax ({currency === 'INR' ? '18%' : '8%'})</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
