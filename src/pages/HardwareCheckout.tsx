import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, ShieldCheck, Trash2, Copy, Check, Phone, Mail, User, MapPin, Package, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TDCS-${timestamp}-${random}`;
};

const HardwareCheckout = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    transactionId: '',
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const upiId = 'tdcsorganization@sbi ';
  const qrCodeUrl = 'https://blogger.googleusercontent.com/img/a/AVvXsEiYxV2ayi-nLo4GdGqaDDKDg9OpUiRjbmyav9HoiZp_qm2Zt1-x8jQ7Y4S5gMQSeKrIuZKolSVxZ0c817cdvXKG5IbRLWEngQOEBC8Gah6Edi2snbD0vbr6y-0nJSq8rdvCR4HJIcRJhRDlSTYA9EeYdGj-U6QaRM365bjvdR85QjaR3s4rm1oYOTYTl8gU';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast({ title: 'UPI ID Copied!', description: upiId });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.transactionId.trim()) {
      toast({ title: 'Transaction ID Required', description: 'Please enter your payment transaction ID.', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      const newOrderNumber = generateOrderNumber();
      
      // Get current user if logged in
      const { data: { user } } = await supabase.auth.getUser();

      // Save order to database
      const { error } = await supabase.from('hardware_orders').insert({
        order_number: newOrderNumber,
        user_id: user?.id || null,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal,
        shipping,
        tax,
        total,
        transaction_id: formData.transactionId,
        order_status: 'pending'
      });

      if (error) throw error;

      setOrderNumber(newOrderNumber);
      setOrderSuccess(true);
      clearCart();
      toast({ title: 'Order Submitted!', description: `Order #${newOrderNumber} placed successfully.` });
    } catch (err: any) {
      console.error('Order submission error:', err);
      toast({ 
        title: 'Order Failed', 
        description: err.message || 'Something went wrong. Please try again.', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Order Success Screen
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 rounded-2xl border border-gray-800 p-8 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-400 mb-6">Thank you for your order. We'll verify payment and ship soon.</p>
          
          <div className="bg-gray-800 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Your Order Number</p>
            <p className="text-2xl font-mono font-bold text-green-400">{orderNumber}</p>
            <p className="text-xs text-gray-500 mt-2">Save this to track your order</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              to={`/track-order?order=${orderNumber}`}
              className="flex-1 bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" /> Track Order
            </Link>
            <Link 
              to="/services/hardware"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
          <p className="text-gray-400">Looks like you haven't added any hardware yet.</p>
          <Link to="/services/hardware" className="inline-block bg-green-600 text-black font-bold px-6 py-3 rounded-lg hover:bg-green-500 transition">
            Browse Hardware
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans pt-24 pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/services/hardware" className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Shop</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Hardware Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* LEFT COLUMN: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Order Summary */}
              <section className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-green-400">
                  <ShieldCheck /> Order Items
                </h2>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-800 last:border-0">
                      <div className="w-16 h-16 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-gray-400">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-semibold text-green-400">₹{(item.price * item.quantity).toLocaleString()}</span>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-gray-400"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                  <div className="flex justify-between text-gray-400"><span>GST (18%)</span><span>₹{tax.toLocaleString()}</span></div>
                  <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-gray-700"><span>Total</span><span className="text-green-400">₹{total.toLocaleString()}</span></div>
                </div>
              </section>

              {/* Shipping Information */}
              <section className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-green-400">
                  <Truck /> Shipping Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-1"><User size={14} /> Full Name</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} 
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-1"><Mail size={14} /> Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-1"><Phone size={14} /> Phone</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-1"><MapPin size={14} /> Address</label>
                    <input required type="text" name="address" value={formData.address} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="House/Flat no, Street, Locality" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">State</label>
                    <input required type="text" name="state" value={formData.state} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="State" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Pincode</label>
                    <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="XXXXXX" />
                  </div>
                </div>
              </section>

              {/* Transaction ID */}
              <section className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-bold mb-4 text-green-400">Payment Confirmation</h2>
                <p className="text-sm text-gray-400 mb-4">After completing payment via UPI, enter your Transaction ID below:</p>
                <input required type="text" name="transactionId" value={formData.transactionId} onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="Enter UPI Transaction ID" />
              </section>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Submit Order - ₹${total.toLocaleString()}`}
              </button>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: QR Code */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Pay via UPI</h2>
              <p className="text-gray-400 mb-6">Scan QR code or use UPI ID to pay</p>
              
              <div className="bg-white p-4 rounded-xl inline-block mb-6">
                <img src={qrCodeUrl} alt="Payment QR Code" className="w-64 h-64 object-contain" />
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">UPI ID</p>
                <div className="flex items-center justify-center gap-2 bg-gray-800 px-4 py-3 rounded-lg">
                  <span className="font-mono text-green-400 text-lg">{upiId}</span>
                  <button onClick={handleCopyUpi} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="text-left bg-gray-800/50 p-4 rounded-xl space-y-2 text-sm">
                <p className="font-bold text-white mb-3">Payment Instructions:</p>
                <p className="text-gray-300">1. Scan QR or copy UPI ID</p>
                <p className="text-gray-300">2. Pay exact amount: <span className="text-green-400 font-bold">₹{total.toLocaleString()}</span></p>
                <p className="text-gray-300">3. Copy the Transaction ID from payment app</p>
                <p className="text-gray-300">4. Paste Transaction ID in the form</p>
                <p className="text-gray-300">5. Submit order</p>
              </div>

              <div className="mt-6 p-4 bg-green-900/30 border border-green-700 rounded-xl">
                <p className="text-green-400 text-sm">
                  <ShieldCheck className="inline w-4 h-4 mr-1" />
                  Your payment is secure. We verify all transactions before shipping.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HardwareCheckout;