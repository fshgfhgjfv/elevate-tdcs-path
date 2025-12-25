import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShoppingCart, Zap, Plus, Minus, ShieldCheck, ChevronLeft, 
  Package, Star, MessageSquare, ArrowRight, Truck, Info, Video,
  Globe, AlertTriangle, Facebook, Twitter, Instagram, Youtube
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
  const [currency, setCurrency] = useState("INR");
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });

  // Get current product
  const product = hardwareProducts.find((p) => p.id === id) || hardwareProducts[0];
  const relatedProducts = hardwareProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const exchangeRate = 83; // Example USD/INR
  const getPrice = (price: number) => currency === "INR" ? `₹${price.toLocaleString()}` : `$${(price / exchangeRate).toFixed(2)}`;

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top Currency Switcher Bar */}
      <div className="bg-[#111] border-b border-white/5 py-2 text-[10px] font-mono">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
             <span className="text-zinc-500">GSTIN: 08AAGCL2069R1ZT</span>
             <span className="hidden md:inline text-zinc-500">CIN: U85499RJ2025PTC101078</span>
          </div>
          <select 
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-black text-white border-none outline-none cursor-pointer"
          >
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - US Dollar</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-12 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] text-zinc-500 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-red-600">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          {/* IMAGE SECTION */}
          <div className="w-full lg:w-1/2">
            <div 
              className="relative aspect-square bg-[#0a0a0a] border border-white/10 overflow-hidden cursor-crosshair group"
              onMouseMove={(e) => {
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                setZoomPos({ x: ((e.pageX - left) / width) * 100, y: ((e.pageY - top) / height) * 100, show: true });
              }}
              onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
            >
              <img 
                src={product.image} 
                className={`w-full h-full object-contain transition-transform duration-300 ${zoomPos.show ? 'scale-[2.5]' : 'scale-100'}`}
                style={zoomPos.show ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-red-600 px-2 py-1 text-[10px] font-bold">SALE!</span>
                <span className="bg-black/80 px-2 py-1 text-[10px] font-bold border border-white/20">5Ghz KIT</span>
              </div>
            </div>
          </div>

          {/* CHECKOUT SECTION */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase leading-none">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6 text-yellow-500">
               <Star className="w-4 h-4 fill-current"/> <Star className="w-4 h-4 fill-current"/> 
               <Star className="w-4 h-4 fill-current"/> <Star className="w-4 h-4 fill-current"/> <Star className="w-4 h-4 fill-current"/>
               <span className="text-zinc-500 text-xs ml-2 font-mono">(2 Customer Reviews)</span>
            </div>

            <div className="space-y-1 mb-8">
              <p className="text-zinc-500 line-through text-sm">{getPrice(product.originalPrice)}</p>
              <p className="text-4xl font-mono text-red-600 font-bold">{getPrice(product.salePrice)}</p>
              <p className="text-green-500 text-[11px] font-bold uppercase">/ No Extra Fee</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mb-10 text-[13px] text-zinc-300 border-l-2 border-red-600 pl-4">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-red-600"/> New Pre Installed Firmware</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-red-600"/> External Antenna Support</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-red-600"/> Penetration 5Ghz WiFi</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-red-600"/> Embedded AES hardware engine</div>
              <div className="flex items-center gap-2 text-zinc-500 italic"><Info className="w-4 h-4"/> Only For India</div>
            </div>

            <div className="flex flex-col gap-6 py-8 border-y border-white/5">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-zinc-900 border border-white/10 px-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="p-3 text-zinc-500 hover:text-white"><Minus className="w-4 h-4"/></button>
                  <span className="w-12 text-center font-mono text-xl">{quantity}</span>
                  <button onClick={() => setQuantity(quantity+1)} className="p-3 text-zinc-500 hover:text-white"><Plus className="w-4 h-4"/></button>
                </div>
                <span className="text-xs text-red-500 font-bold uppercase animate-pulse italic">9 IN STOCK</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => addToCart({...product, quantity})} className="h-16 flex-1 bg-white text-black hover:bg-zinc-200 rounded-none font-black text-lg">ADD TO CART</Button>
                <Button onClick={handleBuyNow} className="h-16 flex-1 bg-red-600 text-white hover:bg-red-700 rounded-none font-black text-lg">BUY IT NOW</Button>
              </div>
            </div>

            <div className="mt-8">
               <div className="flex items-center gap-3 text-xs text-zinc-400 font-bold">
                  <div className="bg-red-600/10 p-2 rounded"><MessageSquare className="w-5 h-5 text-red-500" /></div>
                  NEED HELP? <span className="text-red-500 cursor-pointer border-b border-red-500">CHAT WITH US</span>
               </div>
            </div>
          </div>
        </div>

        {/* DETAILS TABS */}
        <div className="mb-24">
          <div className="flex gap-12 border-b border-white/5 mb-8 overflow-x-auto">
            {["Description", "Reviews (2)"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} className={`pb-4 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap ${activeTab.includes(tab.toLowerCase().split(' ')[0]) ? "text-red-600 border-b-2 border-red-600" : "text-zinc-600"}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-5xl">
            {activeTab.includes("description") ? (
              <div className="space-y-12">
                {/* Video Player Placeholder */}
                <div className="aspect-video bg-zinc-900 relative group cursor-pointer border border-white/10">
                   <img src="https://images.pexels.com/photos/1432675/pexels-photo-1432675.jpeg" className="w-full h-full object-cover opacity-40" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="bg-red-600 p-6 rounded-full group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                         <Video className="w-8 h-8 text-white fill-current" />
                      </div>
                      <span className="mt-4 font-mono text-xs uppercase tracking-widest">Tutorial: BW16 Config</span>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 text-sm text-zinc-400 leading-relaxed">
                  <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs border-l-2 border-red-600 pl-3">Specifications</h4>
                    <ul className="space-y-2 font-mono text-[11px]">
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Model</span> <span>BW16</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Frequency</span> <span>2.4GHz / 5GHz</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>BT Version</span> <span>BT 5.0 Low Power</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Supply Voltage</span> <span>3.0V ~ 3.6V</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Interfaces</span> <span>UART/GPIO/ADC/PWM</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs border-l-2 border-red-600 pl-3">Legal Compliance</h4>
                    <p className="mb-4">Linuxndroid courses and software are intended for legal and ethical use cases only. Users are responsible for ensuring compliance with all applicable laws.</p>
                    <div className="bg-red-600/5 p-4 border border-red-600/20 text-[11px]">
                       <p className="font-bold text-red-500 uppercase mb-2">Delivery Partners:</p>
                       <p>Bluedart Air, DTDC Air, Amazon Shipping, Indian Post.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 border border-white/5 bg-zinc-900/20">
                <p className="text-zinc-500 font-mono italic">No unauthorized access to reviews. User authentication required.</p>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <section className="pt-20 border-t border-white/5">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-10">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="group bg-zinc-900/30 border border-white/5 p-4 hover:border-red-600/50 transition-colors">
                <div className="aspect-square mb-4 overflow-hidden bg-black">
                  <img src={p.image} className="w-full h-full object-contain transition-transform group-hover:scale-105" />
                </div>
                <h3 className="text-sm font-bold truncate group-hover:text-red-500">{p.name}</h3>
                <p className="text-red-600 font-mono mt-2">{getPrice(p.salePrice)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER - GST/CIN INCLUDED */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <h3 className="text-2xl font-black text-red-600 mb-4 tracking-tighter uppercase italic">Linuxndroid</h3>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">Learn Cyber Security. With Linuxndroid. Professional grade penetration hardware & software for ethical use cases only. GSTIN: 08AAGCL2069R1ZT</p>
              <div className="flex gap-4 mt-6">
                <Facebook className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer" />
                <Youtube className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer" />
                <Instagram className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase mb-4">Quick Links</h4>
              <ul className="text-xs text-zinc-500 space-y-2">
                <li>Privacy Policy</li>
                <li>Shipping & Delivery</li>
                <li>Refund Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase mb-4">Account</h4>
              <ul className="text-xs text-zinc-500 space-y-2">
                <li>My Arsenal</li>
                <li>Track Order</li>
                <li>FOTA Updates</li>
                <li>Need Help?</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-[10px] text-zinc-700 border-t border-white/5 pt-8">
            Copyright 2025 © | Linuxndroid | Rajasthan, India
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;