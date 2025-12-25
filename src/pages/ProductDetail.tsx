import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Zap, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ChevronLeft, 
  Cpu, 
  Lock, 
  Globe 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { hardwareProducts } from "@/data/hardwareProducts"; // Ensure your data is exported here

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Find product from your data file
  const product = hardwareProducts.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for the bottom gallery
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  if (!product) {
    return <div className="pt-32 text-center text-white">Product Not Found</div>;
  }

  // Magnifier Zoom Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-8 text-zinc-500 hover:text-red-500 transition-colors"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> BACK TO ARSENAL
        </Button>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: IMAGE SECTION WITH ZOOM */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div 
              className="relative aspect-square bg-[#111] border border-white/10 overflow-hidden cursor-crosshair rounded-sm"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-200 ${zoomPos.show ? 'scale-[2.5]' : 'scale-100'}`}
                style={zoomPos.show ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
              />
              {zoomPos.show && (
                <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded text-[10px] font-black tracking-widest animate-pulse">
                  ENHANCED VIEW ACTIVE
                </div>
              )}
            </div>

            {/* AUTO-SCROLLING THUMBNAILS */}
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto no-scrollbar py-2 border-t border-white/5"
            >
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <div key={i} className="min-w-[120px] h-[120px] border border-white/10 grayscale hover:grayscale-0 transition-all cursor-pointer">
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & CHECKOUT */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-red-600/10 text-red-500 border border-red-500/20 px-3 py-1 text-xs font-mono rounded-full uppercase tracking-tighter">
                Hardware Class: Tactical
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase leading-none">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-8 bg-zinc-900/30 p-4 border border-white/5">
              <div>
                <p className="text-zinc-500 text-xs font-mono line-through">MSRP: ₹{product.originalPrice}</p>
                <p className="text-4xl font-mono text-white">₹{product.salePrice}</p>
              </div>
              <div className="h-10 w-[1px] bg-zinc-800" />
              <div className="text-green-500 font-bold text-sm">
                IN STOCK <br /> 
                <span className="text-[10px] text-zinc-500 font-normal">Ready for immediate dispatch</span>
              </div>
            </div>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Professional-grade security hardware designed for field operations. 
              Equipped with custom firmware for rapid payload execution and stealth monitoring. 
              Fully air-gap compliant.
            </p>

            {/* TECHNICAL SPECS GRID */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">Processing</h4>
                  <p className="text-xs text-zinc-500">Quad-Core ARM Architecture</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">Encryption</h4>
                  <p className="text-xs text-zinc-500">AES-256 Hardware Level</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">Connectivity</h4>
                  <p className="text-xs text-zinc-500">Multi-Band 2.4/5GHz + BLE</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">Security</h4>
                  <p className="text-xs text-zinc-500">Tamper-Evident Enclosure</p>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-auto space-y-6">
              <div className="flex items-center gap-4 bg-zinc-900/50 w-fit p-1 rounded-sm border border-white/10">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-mono text-xl">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => addToCart({ ...product, quantity })}
                  className="flex-1 bg-white text-black hover:bg-zinc-200 h-16 rounded-none font-black text-xl tracking-tighter"
                >
                  <ShoppingCart className="mr-2 h-6 w-6" /> ADD TO CART
                </Button>
                <Button 
                  size="lg" 
                  className="flex-1 bg-red-600 text-white hover:bg-red-700 h-16 rounded-none font-black text-xl tracking-tighter"
                >
                  <Zap className="mr-2 h-6 w-6" /> DEPLOY NOW
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;