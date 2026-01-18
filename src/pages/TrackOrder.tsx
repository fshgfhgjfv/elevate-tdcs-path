import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Truck, CheckCircle, Clock, MapPin, Phone, ExternalLink, AlertCircle, Box, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface OrderData {
  id: string;
  order_number: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: any[];
  total: number;
  shiprocket_tracking_id: string | null;
  shiprocket_awb: string | null;
  order_status: string;
  created_at: string;
}

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const [trackingInput, setTrackingInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [error, setError] = useState('');

  // Auto-fill from URL params
  useEffect(() => {
    const orderParam = searchParams.get('order');
    if (orderParam) {
      setTrackingInput(orderParam);
      // Auto-search if order param exists
      handleTrackOrderWithId(orderParam);
    }
  }, [searchParams]);

  const handleTrackOrderWithId = async (orderId: string) => {
    const trimmedInput = orderId.trim();
    if (!trimmedInput) return;

    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const { data, error: queryError } = await supabase
        .from('hardware_orders')
        .select('*')
        .or(`order_number.eq.${trimmedInput},shiprocket_awb.eq.${trimmedInput}`)
        .single();

      if (queryError || !data) {
        setError('No order found with this tracking ID. Please check and try again.');
        return;
      }

      setOrderData(data as OrderData);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleTrackOrderWithId(trackingInput);
  };

  const openShiprocketTracking = () => {
    if (orderData?.shiprocket_awb) {
      window.open(`https://www.shiprocket.in/shipment-tracking/?awb=${orderData.shiprocket_awb}`, '_blank');
    } else if (orderData?.shiprocket_tracking_id) {
      window.open(`https://www.shiprocket.in/shipment-tracking/?order_id=${orderData.shiprocket_tracking_id}`, '_blank');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'shipped': case 'in_transit': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      case 'processing': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'cancelled': return 'text-red-400 bg-red-500/20 border-red-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      case 'shipped': case 'in_transit': return <Truck className="w-5 h-5" />;
      case 'processing': return <Clock className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <Truck className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Track Your Order</h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Enter your order number or AWB tracking ID to get real-time shipment updates
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 rounded-2xl border border-gray-800 p-8 mb-8"
        >
          <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Enter Order Number or AWB Tracking ID"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="w-full pl-12 pr-4 py-6 bg-gray-800 border-gray-700 text-white text-lg rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-500 text-black font-bold px-8 py-6 rounded-xl text-lg transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Tracking...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Track Order <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Order Details */}
        {orderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Status Card */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Number</p>
                  <p className="text-xl font-mono font-bold text-white">{orderData.order_number}</p>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(orderData.order_status)}`}>
                  {getStatusIcon(orderData.order_status)}
                  <span className="font-semibold capitalize">{orderData.order_status.replace('_', ' ')}</span>
                </div>
              </div>

              {/* AWB & Shiprocket Tracking */}
              {(orderData.shiprocket_awb || orderData.shiprocket_tracking_id) ? (
                <div className="bg-gray-800/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Shiprocket AWB Number</p>
                    <p className="font-mono text-green-400 text-lg">{orderData.shiprocket_awb || orderData.shiprocket_tracking_id}</p>
                  </div>
                  <Button
                    onClick={openShiprocketTracking}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg"
                  >
                    <span className="flex items-center gap-2">
                      Track on Shiprocket <ExternalLink className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <p className="text-yellow-400 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Tracking ID will be available once your order is shipped
                  </p>
                </div>
              )}
            </div>

            {/* Order Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-green-400" /> Shipping Address
                </h3>
                <div className="space-y-2 text-gray-300">
                  <p className="font-semibold text-white">{orderData.full_name}</p>
                  <p>{orderData.address}</p>
                  <p>{orderData.city}, {orderData.state} - {orderData.pincode}</p>
                  <p className="flex items-center gap-2 text-gray-400 mt-3">
                    <Phone className="w-4 h-4" /> {orderData.phone}
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                  <Box className="w-5 h-5 text-green-400" /> Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-400">
                    <span>Order Date</span>
                    <span className="text-white">{formatDate(orderData.created_at)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Items</span>
                    <span className="text-white">{orderData.items?.length || 0} item(s)</span>
                  </div>
                  <div className="flex justify-between text-gray-400 pt-3 border-t border-gray-700">
                    <span>Total Amount</span>
                    <span className="text-xl font-bold text-green-400">₹{Number(orderData.total).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-green-400" /> Order Items
              </h3>
              <div className="space-y-4">
                {orderData.items?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-xl">
                    <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image || 'https://via.placeholder.com/100'} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-green-400">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 mb-2">Need help with your order?</p>
          <a 
            href="/contact-us" 
            className="text-green-400 hover:text-green-300 font-medium transition-colors"
          >
            Contact Support →
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackOrder;
