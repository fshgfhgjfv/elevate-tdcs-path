import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, Lock, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// 1. Import your Cart Context
import { useCart } from '../contexts/CartContext'; 
// If your context uses a different hook name (e.g. useContext(CartContext)), update this.

const HardwareCheckout = () => {
  const navigate = useNavigate();
  
  // 2. Get real data from Context
  // Adjust these variable names to match your CartContext exactly
  const { cart, removeFromCart, clearCart } = useCart(); 
  // Assuming 'cart' is an array of items. If it's 'cartItems', change it here.

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // 3. Dynamic Calculation
  const subtotal = cart?.reduce((acc: number, item: any) => {
    const price = Number(item.price) || 0; // Ensure price is a number
    const qty = Number(item.quantity) || 1;
    return acc + (price * qty);
  }, 0) || 0;

  const shipping = subtotal > 5000 ? 0 : 150; // Example: Free shipping over 5000
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call / Order Processing
    setTimeout(() => {
      setLoading(false);
      
      // Clear cart after successful order (Optional)
      if (clearCart) clearCart();
      
      alert(`Order placed successfully! Total: ₹${total.toLocaleString()}`);
      navigate('/dashboard/orders'); // Redirect to order history
    }, 2000);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
          <p className="text-gray-500">Looks like you haven't added any hardware yet.</p>
          <Link to="/services/hardware" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Browse Hardware
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pt-24 pb-12">
      {/* Header handled by App.tsx, but we add a wrapper for spacing if needed */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
            <Link to="/services/hardware" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Shop</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Forms */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
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
                    <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <CreditCard className="text-blue-600" /> Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['upi', 'card'].map((method) => (
                    <label 
                      key={method}
                      className={`cursor-pointer border-2 rounded-xl p-4 flex items-center gap-4 transition-all ${paymentMethod === method ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                      onClick={() => setPaymentMethod(method)}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method ? 'border-blue-600' : 'border-gray-400'}`}>
                        {paymentMethod === method && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                      </div>
                      <span className="font-semibold uppercase">{method}</span>
                    </label>
                  ))}
                </div>
              </section>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      {/* Handle missing images gracefully */}
                      <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 line-clamp-2">{item.title || item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-semibold text-gray-900">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                      {removeFromCart && (
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                <div className="flex justify-between text-gray-600"><span>Tax (18%)</span><span>₹{tax.toLocaleString()}</span></div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              </div>

              <button
                form="checkout-form"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HardwareCheckout;