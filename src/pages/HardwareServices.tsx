import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Zap, 
  Filter, 
  Cpu, 
  GraduationCap, 
  Box, 
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

// Updated Product Data with provided links
const products = [
  {
    id: "pro-ducky-pi",
    name: "Pro Ducky Pi (Hardware Penetration)",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    category: "Hardware",
    rating: 5,
    originalPrice: 3499,
    salePrice: 2860,
    isOutOfStock: false,
  },
  {
    id: "tdcs-courses",
    name: "All TDCS Technologies Private Limited Courses",
    image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Combo",
    rating: 4.8,
    originalPrice: 5624,
    salePrice: 4499,
    isOutOfStock: false,
  },
  {
    id: "atoms3u",
    name: "AtomS3U (Rubber-Duck-Kit)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbselltZRTKqlWg620s_Rq_HE2tgyUSIj7Pg&s",
    category: "Hardware",
    rating: 4.5,
    originalPrice: 2999,
    salePrice: 2499,
    isOutOfStock: false,
  },
  {
    id: "bw16-kit",
    name: "BW16-5Ghz Kit (Pre-Installed Firmware)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkDg98A3ww8C_jg8f_KU91KY9kn2MRyqZoLQ&s",
    category: "Hardware",
    rating: 5.0,
    originalPrice: 1999,
    salePrice: 1499,
    isOutOfStock: false,
  },
  {
    id: "cyber-t-knife",
    name: "CYBER-T USB-ARMY-KNIFE",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzRhZ8FEcQAMMyx2ONJqm65DAUk8ufX-5WZw&s",
    category: "Hardware",
    rating: 5.0,
    originalPrice: 3499,
    salePrice: 2860,
    isOutOfStock: false,
  },
  {
    id: "cyd-esp32",
    name: "CYD-ESP32 (Marauder) Cyber Edition",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ALPJCxwCPh2-ApQTWan19yyVgLShdVxwXQ&s",
    category: "Hardware",
    rating: 5.0,
    originalPrice: 3999,
    salePrice: 2999,
    isOutOfStock: false,
  },
  {
    id: "esp32-2nrf",
    name: "ESP32/2NRF Kit (Bluetooth Penetration)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFn3vA9m383WW65WUV3J1gqkwxPLWzWz-tiFOTFYZkRvLRiNCVQNOSiAUPknvA-Fn-nE&usqp=CAU",
    category: "Hardware",
    rating: 4.5,
    originalPrice: 2499,
    salePrice: 1799,
    isOutOfStock: true,
  },
  {
    id: "evil-team",
    name: "EvilTeam (RedTeamer Choice)",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Courses",
    rating: 4.5,
    originalPrice: 2000,
    salePrice: 1099,
    isOutOfStock: false,
  },
  {
    id: "mr-hacker",
    name: "Mr.Hacker Bug Bounty Course",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFm8WCUAtuRQM-I8W83xWnLqxRaU2vfAMYZQ&s",
    category: "Courses",
    rating: 4.9,
    originalPrice: 1500,
    salePrice: 699,
    isOutOfStock: false,
  }
];

const HardwareServices = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- FILTER STATES ---
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOrder, setSortOrder] = useState("default");

  // --- FILTER LOGIC ---
  const filteredProducts = products
    .filter((product) => {
      const categoryMatch = activeCategory === "All" || product.category === activeCategory;
      const priceMatch = product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1];
      return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
      if (sortOrder === "price-low") return a.salePrice - b.salePrice;
      if (sortOrder === "price-high") return b.salePrice - a.salePrice;
      return 0;
    });

  const categories = [
    { name: "All", icon: <Zap className="w-3 h-3" /> },
    { name: "Hardware", icon: <Cpu className="w-3 h-3" /> },
    { name: "Courses", icon: <GraduationCap className="w-3 h-3" /> },
    { name: "Combo", icon: <Box className="w-3 h-3" /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        
        {/* Commercial Hero Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-12 border border-white/10 bg-gradient-to-br from-red-900/20 via-black to-black p-8 md:p-20 shadow-2xl">
          <div className="max-w-2xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 bg-red-600/20 text-red-500 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 tracking-widest border border-red-600/30"
            >
              <Zap className="h-3 w-3" />
              <span>OFFICIAL LINUXNDROID ARSENAL</span>
            </motion.div>
            <h1 className="text-6xl font-black mb-6 tracking-tighter leading-none">
              EQUIP YOUR <br />
              <span className="text-red-600 italic">MISSION.</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-md">
              High-performance cybersecurity hardware and tactical training courses. Built for the elite.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 h-14 px-10 rounded-full font-bold text-lg">
              View All Tools
            </Button>
          </div>
          <div className="absolute right-[-10%] top-[-10%] w-[60%] h-[120%] opacity-10 pointer-events-none">
            <ShieldCheck className="w-full h-full text-white" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR FILTERS - PROFESSIONAL REDESIGN */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="flex items-center gap-3 mb-2 pl-2">
              <Filter className="w-4 h-4 text-red-500" />
              <h2 className="text-sm font-black uppercase tracking-[0.2em] italic">Tactical Filters</h2>
            </div>

            {/* Categories - Tactical Rounded Pills */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Classification</p>
              <div className="flex flex-col gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center justify-between p-4 rounded-[1.25rem] border transition-all duration-300 ${
                      activeCategory === cat.name
                        ? "bg-red-600 border-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.2)]"
                        : "bg-zinc-900/40 border-white/5 text-zinc-400 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${activeCategory === cat.name ? "bg-white/20" : "bg-black/50"}`}>
                        {cat.icon}
                      </div>
                      <span className="text-xs font-black uppercase tracking-tight">{cat.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === cat.name ? "rotate-90" : "opacity-20"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range - Functional/Professional */}
            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-8">Financial Ceiling</h3>
              
              <Slider
                value={priceRange}
                min={0}
                max={10000}
                step={100}
                onValueChange={(val) => setPriceRange(val)}
                className="mb-8 cursor-pointer"
              />

              <div className="flex justify-between items-center">
                <div className="bg-black/60 border border-white/10 px-4 py-3 rounded-2xl flex-1 text-center">
                  <span className="text-[9px] text-zinc-500 block font-bold mb-1">MIN</span>
                  <span className="text-xs font-mono font-bold">₹{priceRange[0]}</span>
                </div>
                <div className="h-[1px] w-4 bg-zinc-800" />
                <div className="bg-black/60 border border-white/10 px-4 py-3 rounded-2xl flex-1 text-center">
                  <span className="text-[9px] text-zinc-500 block font-bold mb-1">MAX</span>
                  <span className="text-xs font-mono font-bold">₹{priceRange[1]}</span>
                </div>
              </div>

              <Button 
                variant="ghost" 
                onClick={() => {setActiveCategory("All"); setPriceRange([0, 10000]);}}
                className="w-full mt-8 text-[10px] text-zinc-600 hover:text-red-500 uppercase font-black tracking-widest transition-colors"
              >
                Reset Arsenal
              </Button>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-10 bg-zinc-900/20 p-5 rounded-[1.5rem] border border-white/5">
              <p className="text-xs text-zinc-500 font-mono italic">
                Scanning Arsenal: <span className="text-white font-bold">{filteredProducts.length}</span> active modules
              </p>
              <Select onValueChange={(val) => setSortOrder(val)}>
                <SelectTrigger className="w-[180px] bg-black border-white/10 rounded-full h-10 text-xs">
                  <SelectValue placeholder="Sort Parameters" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                  <SelectItem value="default">Default Scan</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card 
                      className="bg-zinc-900/30 border-white/10 overflow-hidden h-full flex flex-col group rounded-[2rem] transition-all hover:border-red-600/50 cursor-pointer shadow-xl"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className="relative h-56 overflow-hidden bg-black p-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute top-4 right-4 bg-red-600 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                          -{Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}%
                        </div>
                        {product.isOutOfStock && (
                          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center">
                            <span className="text-red-500 font-black tracking-[0.2em] text-xs border-2 border-red-600 px-6 py-3 rounded-full">SOLD OUT</span>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-7 flex-grow flex flex-col">
                        <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{product.category}</span>
                        <h3 className="text-white font-bold text-md mb-4 leading-tight group-hover:text-red-500 transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-1 mb-6">
                           {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.round(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-700'}`} />
                           ))}
                           <span className="text-[10px] text-zinc-500 ml-1">({product.rating})</span>
                        </div>

                        <div className="mt-auto flex items-end justify-between pt-4 border-t border-white/5">
                          <div>
                            <p className="text-zinc-600 text-xs line-through mb-1 font-mono">₹{product.originalPrice}</p>
                            <p className="text-2xl font-black text-white font-mono tracking-tighter">₹{product.salePrice}</p>
                          </div>
                          <Button 
                            size="icon" 
                            className="bg-white hover:bg-red-600 text-black hover:text-white rounded-2xl h-12 w-12 transition-all shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            disabled={product.isOutOfStock}
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-32 bg-zinc-900/10 rounded-[3rem] border-2 border-dashed border-white/5"
              >
                <AlertTriangle className="mx-auto h-16 w-16 text-zinc-800 mb-6" />
                <p className="text-zinc-600 uppercase font-black tracking-widest text-sm">No hardware identified within parameters.</p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default HardwareServices;