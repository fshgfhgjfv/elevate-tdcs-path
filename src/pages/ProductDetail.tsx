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
  Wifi, 
  Cpu, 
  Radio, 
  Activity, 
  Lock,
  Package,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

// Detailed product data based on your specific BW16 requirements
const productsData = {
  "bw16-5ghz-kit": {
    id: "bw16-5ghz-kit",
    name: "BW16-5Ghz Kit (Pre-Installed Firmware)",
    category: "Hardware",
    rating: 5.0,
    reviews: 2,
    originalPrice: 1999,
    salePrice: 1499,
    stock: 9,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkDg98A3ww8C_jg8f_KU91KY9kn2MRyqZoLQ&s",
    shortFeatures: [
      "New Pre-Installed Firmware",
      "External Antenna Support",
      "Penetration 5Ghz WiFi Capabilities",
      "Useful for Cyber Experts",
      "Support 802.11a/b/g/n 1x1",
      "Embedded AES/DES/SHA Engine"
    ],
    description: "BW16 is a dual-frequency Wi-Fi Bluetooth SoC module based on RTL8720DN. It supports dual-frequency (2.4ghz or 5ghz) WLAN and low-power Bluetooth 5.0. It integrates ARM V8 (Cortex-M4F compatible) high-performance MCU and ARM V8M (Cortex-M0 compatible) low-power MCU.",
    specs: {
      "Model": "BW16",
      "Antenna": "PCB or IPEX antenna",
      "Frequency Range": "2400-2483.5MHz or 5180-5825MHz",
      "Bluetooth": "BT5.0",
      "Voltage": "3.0V ~ 3.6V (Typ: 3.3V)",
      "Interface": "UART/GPIO/ADC/PWM/IIC/SPI/SWD",
      "Flash": "Default 16Mbit",
      "Current": ">450mA"
    },
    includes: [
      "1x Pre-installed Firmware BW16-Kit WiFi Development Board",
      "1x Dual Band High Gain Antenna"
    ],
    legal: "Users are responsible for ensuring use complies with all applicable laws. Linuxndroid disclaims any liability for misuse."
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get current product or fallback
  const product = productsData[id as keyof typeof productsData] || productsData["bw16-5ghz-kit"];

  // Magnifier Logic
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
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap">
          <span className="cursor-pointer hover:text-white" onClick={() => navigate('/')}>HOME</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-white uppercase">{product.category}</span>
          <span>/</span>
          <span className="text-red-500">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: Image System */}
          <div className="w-full lg:w-1/2">
            <div 
              className="relative aspect-square bg-zinc-900 border border-white/10 rounded-sm overflow-hidden cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
            >
              <img 
                src={product.image} 
                className={`w-full h-full object-contain transition-transform duration-200 ${zoomPos.show ? 'scale-[2.5]' : 'scale-100'}`}
                style={zoomPos.show ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
              />
              {zoomPos.show && (
                <div className="absolute bottom-4 right-4 bg-red-600 px-2 py-1 text-[10px] font-bold animate-pulse">
                  HIGH-RES MAGNIFICATION
                </div>
              )}
            </div>
            
            {/* Package Includes Info */}
            <div className="mt-6 p-4 bg-zinc-900/50 border border-white/5">
              <h4 className="text-xs font-bold text-red-500 mb-3 flex items-center gap-2">
                <Package className="h-3 w-3" /> PACKAGE INCLUDES
              </h4>
              <ul className="text-xs text-zinc-400 space-y-2">
                {product.includes.map((item, i) => (
                  <li key={i} className="flex gap-2"><span>•</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Content System */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 uppercase italic">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <span className="text-xs text-zinc-500 font-mono">({product.reviews} customer reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <p className="text-3xl font-mono text-white">₹{product.salePrice.toLocaleString('en-IN')}.00</p>
              <p className="text-zinc-500 line-through text-lg">₹{product.originalPrice.toLocaleString('en-IN')}.00</p>
              <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-1 border border-green-500/20 font-bold">
                NO EXTRA FEE
              </span>
            </div>

            {/* Quick Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {product.shortFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-zinc-300">
                  <ShieldCheck className="h-4 w-4 text-red-600" /> {feat}
                </div>
              ))}
            </div>

            {/* Product Overview Tabs/Sections */}
            <div className="space-y-8">
              <section>
                <h3 className="text-sm font-bold border-b border-red-600 w-fit mb-4 pb-1 uppercase tracking-widest">Description</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{product.description}</p>
              </section>

              <section>
                <h3 className="text-sm font-bold border-b border-red-600 w-fit mb-4 pb-1 uppercase tracking-widest">Specifications</h3>
                <div className="grid grid-cols-2 border border-white/5">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="border-b border-r border-white/5 p-3">
                      <p className="text-[10px] text-zinc-500 uppercase">{key}</p>
                      <p className="text-xs font-mono text-zinc-200">{val}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Legal Note */}
              <div className="bg-red-900/10 p-4 border-l-2 border-red-600">
                <p className="text-[11px] text-zinc-400 leading-tight">
                  <span className="text-red-500 font-bold uppercase">Legal Compliance:</span> {product.legal}
                </p>
              </div>

              {/* Purchase Actions */}
              <div className="flex flex-col gap-4 py-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-zinc-900 border border-white/10">
                    <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="p-3 hover:text-red-500"><Minus className="h-4 w-4"/></button>
                    <span className="w-12 text-center font-mono">{quantity}</span>
                    <button onClick={() => setQuantity(quantity+1)} className="p-3 hover:text-red-500"><Plus className="h-4 w-4"/></button>
                  </div>
                  <p className="text-xs text-zinc-500 font-mono italic">{product.stock} in stock</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => addToCart({...product, quantity})}
                    className="h-14 bg-white text-black hover:bg-zinc-200 font-black uppercase text-lg rounded-none"
                  >
                    Add to Cart
                  </Button>
                  <Button className="h-14 bg-red-600 text-white hover:bg-red-700 font-black uppercase text-lg rounded-none">
                    Buy It Now
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;