import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShoppingCart, Zap, Plus, Minus, ShieldCheck, ChevronLeft, 
  Package, Star, MessageSquare, ArrowRight, Truck
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

  // Find the current product from data
  const product = hardwareProducts.find((p) => p.id === id) || hardwareProducts[0];
  
  // Filter related products (same category, excluding current)
  const relatedProducts = hardwareProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Scroll to top on ID change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/checkout");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mb-8 uppercase">
          <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/store" className="hover:text-red-500 transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-zinc-300">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* LEFT: Image Magnifier */}
          <div className="w-full lg:w-1/2">
            <div 
              className="relative aspect-square bg-zinc-900 border border-white/10 overflow-hidden cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className={`w-full h-full object-contain transition-transform duration-200 ${zoomPos.show ? 'scale-[2.5]' : 'scale-100'}`}
                style={zoomPos.show ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
              />
              <div className="absolute top-4 left-4 bg-red-600 text-[10px] font-black px-2 py-1 uppercase tracking-widest">
                Tactical Gear
              </div>
            </div>
            
            

            <div className="mt-6 grid grid-cols-4 gap-4">
              {[product.image, product.image].map((img, i) => (
                <div key={i} className="aspect-square border border-white/10 p-2 bg-zinc-900/50 opacity-50 hover:opacity-100 cursor-pointer">
                  <img src={img} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Checkout Panel */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-red-500 text-xs">
                {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-3 h-3" />)}
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">(2 Customer Reviews)</span>
            </div>

            <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase leading-none">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-mono text-white">₹{product.salePrice.toLocaleString()}.00</span>
              <span className="text-zinc-600 line-through text-lg">₹{product.originalPrice.toLocaleString()}.00</span>
              <span className="text-green-500 text-xs font-bold border border-green-500/20 px-2 py-1 bg-green-500/5">SALE ACTIVE</span>
            </div>

            <ul className="space-y-3 mb-10">
              {["New Pre-Installed Firmware", "Penetration 5Ghz WiFi Support", "Useful for Cyber Experts", "Embedded AES/SHA Hardware Engine"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-red-600" /> {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 py-8 border-y border-white/5">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-black border border-white/10 rounded">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-red-500 transition-colors"><Minus className="w-4 h-4"/></button>
                  <span className="w-12 text-center font-mono text-xl">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-red-500 transition-colors"><Plus className="w-4 h-4"/></button>
                </div>
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold italic">Only 9 Left in Stock</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  onClick={() => addToCart({ ...product, quantity })}
                  className="h-16 bg-white text-black hover:bg-zinc-200 rounded-none font-black uppercase text-lg"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" /> Add To Cart
                </Button>
                <Button 
                  onClick={handleBuyNow}
                  className="h-16 bg-red-600 text-white hover:bg-red-700 rounded-none font-black uppercase text-lg"
                >
                  <Zap className="mr-2 w-5 h-5" /> Buy It Now
                </Button>
              </div>
            </div>

            <div className="mt-8 flex gap-8">
               <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase font-bold">
                 <Truck className="w-4 h-4 text-red-500" /> Fast Delivery India
               </div>
               <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase font-bold">
                 <MessageSquare className="w-4 h-4 text-red-500" /> 24/7 Expert Support
               </div>
            </div>
          </div>
        </div>

        {/* TABS: Description & Reviews */}
        <div className="mb-20">
          <div className="flex gap-8 border-b border-white/5 mb-8">
            {["description", "reviews"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab ? "text-red-600 border-b-2 border-red-600" : "text-zinc-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-4xl">
            {activeTab === "description" ? (
              <div className="text-zinc-400 space-y-6 leading-relaxed">
                <p>{product.description}</p>
                <h4 className="text-white font-bold">Technical Specifications:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                  <div className="bg-zinc-900/50 p-3 border border-white/5">Frequency: 2400-2483.5MHz / 5180-5825MHz</div>
                  <div className="bg-zinc-900/50 p-3 border border-white/5">Power: 3.3V / Current &gt;450mA</div>
                  <div className="bg-zinc-900/50 p-3 border border-white/5">Bluetooth: BT5.0 Low Power</div>
                  <div className="bg-zinc-900/50 p-3 border border-white/5">Flash: Default 16Mbit (Expandable)</div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-zinc-900/30 p-6 border border-white/5">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold">S</div>
                    <div>
                      <h5 className="text-sm font-bold">Sagar K. <span className="text-[10px] text-zinc-600 font-normal ml-2">Verified Buyer</span></h5>
                      <div className="flex text-yellow-500 text-[10px]"><Star className="fill-current"/><Star className="fill-current"/><Star className="fill-current"/><Star className="fill-current"/><Star className="fill-current"/></div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400">The pre-installed firmware is a lifesaver. Connected to 5GHz instantly for testing. Antennas provided have great gain.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="border-t border-white/5 pt-16">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">You May Also Need</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <div className="bg-zinc-900/50 border border-white/10 p-4 aspect-square mb-4 overflow-hidden relative">
                   <img src={p.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute bottom-2 left-2 bg-red-600 text-[8px] font-bold px-2 py-1">SALE</div>
                </div>
                <h4 className="text-xs font-bold uppercase truncate">{p.name}</h4>
                <p className="text-red-500 font-mono text-sm">₹{p.salePrice.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;