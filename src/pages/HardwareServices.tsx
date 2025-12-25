import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingCart, Zap, Filter, Cpu, GraduationCap, Box, ChevronRight, Link as LinkIcon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { hardwareProducts } from "@/data/hardwareProducts";

const HardwareServices = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const filteredProducts = hardwareProducts.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const priceMatch = p.salePrice >= priceRange[0] && p.salePrice <= priceRange[1];
    return catMatch && priceMatch;
  });

  const categories = [
    { name: "All", icon: <Zap className="w-3 h-3" /> },
    { name: "Hardware", icon: <Cpu className="w-3 h-3" /> },
    { name: "Courses", icon: <GraduationCap className="w-3 h-3" /> },
    { name: "Combo", icon: <Box className="w-3 h-3" /> },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <nav className="flex items-center gap-2 text-[10px] font-black text-zinc-400 mb-10 uppercase tracking-widest">
          <Link to="/" className="hover:text-zinc-900">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-900">Hardware Arsenal</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="lg:w-72 space-y-10">
            <div>
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6">Classification</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      activeCategory === cat.name ? "bg-zinc-900 text-white" : "bg-zinc-50 border-zinc-100 text-zinc-500 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-white/10">{cat.icon}</div>
                      <span className="text-xs font-bold uppercase">{cat.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2.5rem]">
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-8 text-center">Financial Ceiling</h3>
              <Slider value={priceRange} min={0} max={10000} onValueChange={setPriceRange} className="mb-8" />
              <div className="flex justify-between text-xs font-bold font-mono">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredProducts.map((product) => (
                <motion.div key={product.id} layout onClick={() => navigate(`/product/${product.id}`)}>
                  <Card className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden cursor-pointer hover:shadow-2xl transition-all shadow-sm">
                    <div className="aspect-square bg-zinc-50 p-8 flex items-center justify-center relative">
                      <img src={product.image} className="max-h-full object-contain" />
                      <div className="absolute top-4 right-4 bg-zinc-900 text-white text-[9px] font-black px-3 py-1 rounded-full">-{Math.round(((product.originalPrice-product.salePrice)/product.originalPrice)*100)}%</div>
                    </div>
                    <CardContent className="p-8">
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{product.category}</span>
                      <h3 className="text-sm font-bold text-zinc-900 mb-4 h-10 line-clamp-2">{product.name}</h3>
                      <div className="flex items-end justify-between border-t border-zinc-50 pt-6">
                        <p className="text-xl font-black">₹{product.salePrice.toLocaleString()}</p>
                        <Button size="icon" className="bg-zinc-900 text-white rounded-xl"><ShoppingCart className="w-4 h-4" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default HardwareServices;