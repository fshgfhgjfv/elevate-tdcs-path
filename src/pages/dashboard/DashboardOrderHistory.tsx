import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ExternalLink, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  order_number: string;
  items: OrderItem[];
  total: number;
  order_status: string;
  shiprocket_awb: string | null;
  shiprocket_tracking_id: string | null;
  created_at: string;
  city: string;
  state: string;
}

const DashboardOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('hardware_orders')
        .select('id, order_number, items, total, order_status, shiprocket_awb, shiprocket_tracking_id, created_at, city, state')
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        // Parse items JSON for each order
        const parsedOrders = (data || []).map(order => ({
          ...order,
          items: (typeof order.items === 'string' ? JSON.parse(order.items) : order.items) as unknown as OrderItem[]
        }));
        setOrders(parsedOrders);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'shipped': case 'in_transit': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      case 'processing': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'cancelled': return 'text-red-400 bg-red-500/20 border-red-500/50';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': case 'in_transit': return <Truck className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">No Orders Yet</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          You haven't placed any hardware orders yet. Explore our hardware store to get started!
        </p>
        <Link to="/services/hardware">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Browse Hardware Store
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Order History</h2>
        <p className="text-sm text-muted-foreground">{orders.length} order(s)</p>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-mono font-bold text-foreground">{order.order_number}</p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusColor(order.order_status)}`}>
                    {getStatusIcon(order.order_status)}
                    <span className="capitalize">{order.order_status.replace('_', ' ')}</span>
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>{formatDate(order.created_at)}</span>
                  <span>•</span>
                  <span>{(order.items as OrderItem[])?.length || 0} item(s)</span>
                  <span>•</span>
                  <span>{order.city}, {order.state}</span>
                </div>

                {/* Items Preview */}
                <div className="flex items-center gap-2 mt-3">
                  {(order.items as OrderItem[])?.slice(0, 3).map((item, idx) => (
                    <div 
                      key={idx} 
                      className="w-10 h-10 bg-muted rounded-lg overflow-hidden border border-border"
                      title={item.name}
                    >
                      <img 
                        src={item.image || 'https://via.placeholder.com/40'} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {(order.items as OrderItem[])?.length > 3 && (
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-xs font-medium text-muted-foreground border border-border">
                      +{(order.items as OrderItem[]).length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3">
                <p className="text-xl font-bold text-primary">₹{Number(order.total).toLocaleString()}</p>
                
                <div className="flex items-center gap-2">
                  <Link to={`/track-order?order=${order.order_number}`}>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Truck className="w-4 h-4" />
                      Track
                    </Button>
                  </Link>
                  
                  {(order.shiprocket_awb || order.shiprocket_tracking_id) && (
                    <a
                      href={`https://www.shiprocket.in/shipment-tracking/?awb=${order.shiprocket_awb || order.shiprocket_tracking_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary" size="sm" className="gap-1.5">
                        Shiprocket <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOrderHistory;
