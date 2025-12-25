import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Zap, Plus, Minus, ShieldCheck, ChevronLeft, 
  MessageSquare, Star, Truck, CreditCard, ChevronRight, Video
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
  const scrollRef = useRef<HTMLDivElement>(null);

  // DYNAMIC DATA FETCHING: Find the specific product based on the URL ID
  const product = hardwareProducts.find((p) => p.id === id);

  // Auto-scroll logic for images
  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [id]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-500 font-mono">PRODUCT_NOT_FOUND</div>;
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100">
      
      {/* Top Professional Bar */}
      <div className="bg-zinc-50 border-b border-zinc-100 py-3 text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <p>TDCS Technologies Private Limited</p>
          <div className="flex gap-6">
            <span>GSTIN: 08AAGCL2069R1ZT</span>
            <span className="hidden sm:inline">CIN: U85499RJ2025PTC101078</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12 pb-24">
        
        {/* REQUESTED BREADCRUMB: Home / Service / Category / Product */}
        <nav className="flex items-center gap-2 text-[11px] font-bold text-zinc-400 mb-12 uppercase tracking-tighter">
          <Link to="/" className="hover:text-zinc-900">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/services" className="hover:text-zinc-900">Service Page</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-400">{product.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          
          {/* LEFT: DYNAMIC IMAGE & AUTO-SCROLL GALLERY */}
          <div className="space-y-6">
            <div 
              className="relative aspect-square bg-zinc-50 rounded-[2.5rem] overflow-hidden cursor-crosshair group border border-zinc-100"
              onMouseMove={(e) => {
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                setZoomPos({ x: ((e.pageX - left) / width) * 100, y: ((e.pageY - top) / height) * 100, show: true });
              }}
              onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
            >
              <img 
                src={product.image} 
                className={`w-full h-full object-contain p-12 transition-transform duration-300 ${zoomPos.show ? 'scale-[2]' : 'scale-100'}`}
                style={zoomPos.show ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
              />
              <div className="absolute top-8 left-8 bg-white px-3 py-1 rounded-full text-[9px] font-black text-zinc-900 shadow-sm border border-zinc-100 tracking-widest uppercase">
                TDCS Verified
              </div>
            </div>
            
            {/* Auto-Scrolling Gallery */}
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
            >
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <div key={i} className="min-w-[140px] h-[140px] bg-zinc-50 rounded-2xl border border-zinc-100 p-4">
                  <img src={img} className="w-full h-full object-contain mix-blend-multiply opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DYNAMIC PRODUCT DATA */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 mb-6 leading-[1.05]">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex text-zinc-900">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">2 Field Reports</span>
            </div>

            <div className="flex items-baseline gap-4 mb-12">
              <span className="text-4xl font-light text-zinc-900">₹{product.salePrice.toLocaleString()}</span>
              <span className="text-lg text-zinc-300 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-green-600 uppercase ml-2 tracking-widest">/ No Extra Fee</span>
            </div>

            {/* Advanced Simple Checkout Box */}
            <div className="p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center bg-white rounded-full border border-zinc-200 p-1.5 shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="p-2 hover:bg-zinc-50 rounded-full transition-colors"><Minus className="w-4 h-4"/></button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity+1)} className="p-2 hover:bg-zinc-50 rounded-full transition-colors"><Plus className="w-4 h-4"/></button>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Availability</p>
                  <p className="text-sm font-bold text-zinc-900 italic">9 In Stock</p>
                </div>
              </div>

              <div className="grid gap-4">
                <Button 
                  onClick={() => addToCart({...product, quantity})}
                  className="w-full h-16 bg-zinc-900 text-white hover:bg-black rounded-2xl font-bold text-lg"
                >
                  Add to Cart
                </Button>
                <Button 
                  onClick={() => { addToCart({...product, quantity}); navigate('/checkout'); }}
                  variant="outline"
                  className="w-full h-16 border-zinc-200 text-zinc-900 hover:bg-white rounded-2xl font-bold text-lg"
                >
                  Buy It Now
                </Button>
              </div>
            </div>
            
            <div className="mt-10 flex justify-center gap-12 text-zinc-400 font-bold text-[10px] tracking-widest uppercase">
               <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-zinc-900" /> Fast Delivery</div>
               <div className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-zinc-900" /> Secure SSL</div>
            </div>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center gap-16 border-b border-zinc-100 mb-16">
            {["Description", "Technical Info", "Reviews"].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])} 
                className={`pb-6 text-xs font-black tracking-[0.2em] uppercase transition-all relative ${activeTab.includes(tab.toLowerCase().split(' ')[0]) ? "text-zinc-900" : "text-zinc-300"}`}
              >
                {tab}
                {activeTab.includes(tab.toLowerCase().split(' ')[0]) && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />}
              </button>
            ))}
          </div>

          <div className="text-zinc-600 leading-relaxed">
            {activeTab === "description" ? (
              <div className="space-y-12">
                <p className="text-xl text-center font-light leading-relaxed text-zinc-500 max-w-3xl mx-auto italic">
                   Professional-grade equipment designed for the TDCS Security Ecosystem. 
                   Fully compatible with pre-installed tactical firmware.
                </p>
                <div className="aspect-video bg-zinc-50 rounded-[3rem] border border-zinc-100 flex flex-col items-center justify-center group cursor-pointer overflow-hidden relative">
                   <img src={product.image} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale" />
                   <div className="bg-white p-6 rounded-full shadow-xl relative z-10 group-hover:scale-110 transition-transform">
                      <Video className="w-8 h-8 text-zinc-900 fill-current" />
                   </div>
                   <span className="mt-6 font-bold text-xs uppercase tracking-[0.3em] relative z-10">Watch Setup Tutorial</span>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-50 rounded-[3rem] p-12 border border-zinc-100 text-center">
                 <p className="text-zinc-400 font-medium italic">Data strictly for authorized TDCS researchers.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER - TDCS BRANDING */}
      <footer className="bg-zinc-50 pt-32 pb-16 border-t border-zinc-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-zinc-900 mb-10 tracking-tighter uppercase italic">TDCS TECHNOLOGIES</h2>
          <div className="flex justify-center gap-12 mb-16 text-zinc-400 font-bold text-[10px] tracking-widest">
            <span>PRIVACY</span>
            <span>SHIPPING</span>
            <span>LEGAL</span>
            <span>CONTACT</span>
          </div>
          <p className="text-xs text-zinc-400 mb-2 italic">Official TDCS Professional Hardware Store.</p>
          <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-bold">© 2025 TDCS PRIVATE LIMITED • U85499RJ2025PTC101078</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;