import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Zap, Plus, Minus, ShieldCheck, ChevronLeft, 
  MessageSquare, Star, Truck, CreditCard, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { hardwareProducts } from "@/data/hardwareProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });

  const product = hardwareProducts.find((p) => p.id === id) || hardwareProducts[0];
  const relatedProducts = hardwareProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200">
      {/* Top Minimalist Info Bar */}
      <div className="bg-zinc-50 border-b border-zinc-100 py-2.5 text-[11px] font-medium text-zinc-500">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <p>Global Shipping • Secure Checkout</p>
          <div className="flex gap-6">
            <span>GSTIN: 08AAGCL2069R1ZT</span>
            <span className="hidden sm:inline">Rajasthan, India</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-16 pb-24">
        {/* Simple Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-12">
          <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-20 mb-32">
          {/* PRODUCT IMAGE - SIMPLE ZOOM */}
          <div className="space-y-6">
            <div 
              className="relative aspect-square bg-zinc-50 rounded-3xl overflow-hidden cursor-crosshair group border border-zinc-100"
              onMouseMove={(e) => {
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                setZoomPos({ x: ((e.pageX - left) / width) * 100, y: ((e.pageY - top) / height) * 100, show: true });
              }}
              onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
            >
              <img 
                src={product.image} 
                className={`w-full h-full object-contain p-12 transition-transform duration-300 ${zoomPos.show ? 'scale-[1.8]' : 'scale-100'}`}
                style={zoomPos.show ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
              />
              <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-zinc-900 shadow-sm border border-white/50">
                LATEST MODEL
              </div>
            </div>
            
            {/* Simple Image Architecture Diagram Placeholder */}
            <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 text-center">Device Architecture</h5>
              
            </div>
          </div>

          {/* PURCHASE PANEL - ADVANCED SIMPLICITY */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[11px] font-bold text-zinc-600 mb-6 w-fit">
              <ShieldCheck className="w-3 h-3" /> VERIFIED HARDWARE
            </div>

            <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 mb-4 leading-[1.1]">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm text-zinc-400">2 Verified Reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-4xl font-light text-zinc-900">₹{product.salePrice.toLocaleString()}</span>
              <span className="text-lg text-zinc-300 line-through">₹{product.originalPrice.toLocaleString()}</span>
            </div>

            <div className="space-y-4 mb-12">
              {product.shortFeatures?.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-600">
                  <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* ACTION CARD */}
            <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center bg-white rounded-full border border-zinc-200 p-1 shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="p-2 hover:bg-zinc-50 rounded-full transition-colors"><Minus className="w-4 h-4"/></button>
                  <span className="w-10 text-center font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity+1)} className="p-2 hover:bg-zinc-50 rounded-full transition-colors"><Plus className="w-4 h-4"/></button>
                </div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">9 Modules Available</p>
              </div>

              <div className="grid gap-4">
                <Button 
                  onClick={() => addToCart({...product, quantity})}
                  className="w-full h-14 bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl font-bold text-lg transition-all"
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline"
                  className="w-full h-14 border-zinc-200 text-zinc-900 hover:bg-white rounded-2xl font-bold text-lg"
                >
                  Express Checkout
                </Button>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center gap-12 text-zinc-400">
               <div className="flex items-center gap-2 text-[11px] font-bold uppercase"><Truck className="w-4 h-4" /> 2-Day Air</div>
               <div className="flex items-center gap-2 text-[11px] font-bold uppercase"><CreditCard className="w-4 h-4" /> SSL Secure</div>
            </div>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-16 border-b border-zinc-100 mb-16">
            {["Description", "Reviews"].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab.toLowerCase())} 
                className={`pb-6 text-sm font-bold tracking-widest uppercase transition-all relative ${activeTab.includes(tab.toLowerCase()) ? "text-zinc-900" : "text-zinc-300"}`}
              >
                {tab}
                {activeTab.includes(tab.toLowerCase()) && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-zinc-600 leading-relaxed"
            >
              {activeTab === "description" ? (
                <div className="space-y-16">
                  <p className="text-lg text-center font-medium leading-relaxed italic text-zinc-500">
                    "Designed for elite researchers. The BW16 offers unmatched 5GHz penetration capabilities in a palm-sized form factor."
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                      <h4 className="text-zinc-900 font-bold uppercase text-xs tracking-widest">Technical Logic</h4>
                      <ul className="space-y-4 text-sm">
                        <li className="flex justify-between border-b border-zinc-100 pb-3"><span>MCU Architecture</span> <span className="text-zinc-900 font-semibold italic">ARM V8 Dual-Core</span></li>
                        <li className="flex justify-between border-b border-zinc-100 pb-3"><span>Wireless Range</span> <span className="text-zinc-900 font-semibold italic">2.4GHz / 5.8GHz</span></li>
                        <li className="flex justify-between border-b border-zinc-100 pb-3"><span>Encryption Engine</span> <span className="text-zinc-900 font-semibold italic">SHA/AES Hardware</span></li>
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-zinc-900 font-bold uppercase text-xs tracking-widest">Operation Guide</h4>
                      <p className="text-sm">The module comes pre-flashed with Linuxndroid’s optimized firmware. Connect via UART to begin tactical assessment. Tutorial documentation is included in your account dashboard.</p>
                      <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                         <p className="text-[11px] font-bold text-zinc-400 mb-1 uppercase">Official Support</p>
                         <p className="text-xs text-zinc-600 underline cursor-pointer">Watch Setup Tutorial →</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 bg-zinc-50 rounded-[3rem] border border-dashed border-zinc-200">
                  <MessageSquare className="w-8 h-8 mx-auto text-zinc-200 mb-4" />
                  <p className="text-zinc-400 font-medium">Log in to view 2 verified field reports.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* REFINED FOOTER */}
      <footer className="bg-zinc-50 pt-32 pb-16 border-t border-zinc-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-8">Linuxndroid Arsenal</h2>
          <div className="flex justify-center gap-12 mb-16 text-zinc-400 font-bold text-[10px] tracking-widest">
            <span>ABOUT</span>
            <span>SHIPPING</span>
            <span>PRIVACY</span>
            <span>SUPPORT</span>
          </div>
          <p className="text-xs text-zinc-400 mb-2 italic">Legal Compliance: For ethical security research only.</p>
          <p className="text-[10px] text-zinc-300 uppercase tracking-tighter font-medium">© 2025 Linuxndroid • U85499RJ2025PTC101078</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;