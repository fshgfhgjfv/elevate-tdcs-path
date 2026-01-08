import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Mock Cart Data (Replace with your actual Cart Context/State)
const MOCK_CART = [
  {
    id: 1,
    name: "WiFi Pineapple Mark VII",
    price: 11999,
    image: "https://images.unsplash.com/photo-1558389186-438424b00a32?auto=format&fit=crop&q=80&w=200",
    quantity: 1,
  },
  {
    id: 2,
    name: "Raspberry Pi 5 (8GB)",
    price: 8499,
    image: "https://images.unsplash.com/photo-1629739884942-887f213205df?auto=format&fit=crop&q=80&w=200",
    quantity: 2,
  },
];

const HardwareCheckout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Calculate Totals
  const subtotal = MOCK_CART.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 150; // Flat rate
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to success page or handle payment gateway logic here
      alert("Order placed successfully! (Redirecting to payment gateway...)");
      navigate('/order-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navbar Placeholder */}
      <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/hardware" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Continue Shopping</span>
          </Link>
          <div className="flex items-center gap-2 text-green-600">
            <Lock size={16} />
            <span className="text-sm font-semibold">Secure Checkout</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Shipping & Payment Forms */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-8"
          >
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Shipping Information */}
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <Truck className="text-blue-600" /> Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input required type="text" placeholder="123 Cyber Lane" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input required type="text" placeholder="Bengaluru" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input required type="text" placeholder="560001" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input required type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <CreditCard className="text-blue-600" /> Payment Method
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label 
                    className={`cursor-pointer border-2 rounded-xl p-4 flex items-center gap-4 transition-all ${paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-blue-600' : 'border-gray-400'}`}>
                      {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                    </div>
                    <div>
                      <span className="font-semibold block">UPI / QR Code</span>
                      <span className="text-xs text-gray-500">GPay, PhonePe, Paytm</span>
                    </div>
                  </label>

                  <label 
                    className={`cursor-pointer border-2 rounded-xl p-4 flex items-center gap-4 transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-400'}`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                    </div>
                    <div>
                      <span className="font-semibold block">Credit / Debit Card</span>
                      <span className="text-xs text-gray-500">Visa, Mastercard, RuPay</span>
                    </div>
                  </label>
                </div>
              </section>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {MOCK_CART.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg mb-6">
                <ShieldCheck size={16} className="text-green-600" />
                <span>Your data is encrypted and secure</span>
              </div>

              {/* Submit Button */}
              <button
                form="checkout-form"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order <span className="font-normal opacity-80">(₹{total.toLocaleString()})</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HardwareCheckout;