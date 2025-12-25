import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingCart, Zap, Filter, Cpu, GraduationCap, Box, ChevronRight, AlertTriangle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { hardwareProducts } from "@/data/hardwareProducts";

const HardwareServices = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // States for Filtering and Sorting
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOrder, setSortOrder] = useState("default");

  // Memoized Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return hardwareProducts
      .filter((p) => {
        const catMatch = activeCategory === "All" || p.category === activeCategory;
        const priceMatch = p.salePrice >= priceRange[0] && p.salePrice <= priceRange[1];
        return catMatch && priceMatch;
      })
      .sort((a, b) => {
        if (sortOrder === "low-to-high") return a.salePrice - b.salePrice;
        if (sortOrder === "high-to-low") return b.salePrice - a.salePrice;
        return 0;
      });
  }, [activeCategory, priceRange, sortOrder]);

  const categories = [
    { name: "All", icon: <Zap className="w-3 h-3" /> },
    { name: "Hardware", icon: <Cpu className="w-3 h-3" /> },
    { name: "Courses", icon: <GraduationCap className="w-3 h-3" /> },
    { name: "Combo", icon: <Box className="w-3 h-3" /> },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 pt-24 pb-16">
      <div className="container mx-auto px-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[10px] font-black text-zinc-400 mb-10 uppercase tracking-widest">
          <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-900">Hardware Arsenal</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-72 space-y-10">
            <div>
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6">Classification</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                      activeCategory === cat.name 
                        ? "bg-zinc-900 text-white shadow-lg" 
                        : "bg-zinc-50 border-zinc-100 text-zinc-500 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${activeCategory === cat.name ? "bg-white/20" : "bg-white border"}`}>
                        {cat.icon}
                      </div>
                      <span className="text-xs font-bold uppercase">{cat.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === cat.name ? "rotate-90" : "opacity-20"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2.5rem]">
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-8 text-center">Financial Ceiling</h3>
              <Slider 
                value={priceRange} 
                min={0} 
                max={10000} 
                step={100}
                onValueChange={setPriceRange} 
                className="mb-8 cursor-pointer" 
              />
              <div className="flex justify-between items-center gap-2">
                <div className="bg-white border border-zinc-100 px-3 py-2 rounded-xl flex-1 text-center">
                  <span className="text-[9px] text-zinc-400 block font-bold">MIN</span>
                  <span className="text-xs font-bold">₹{priceRange[0]}</span>
                </div>
                <div className="bg-white border border-zinc-100 px-3 py-2 rounded-xl flex-1 text-center">
                  <span className="text-[9px] text-zinc-400 block font-bold">MAX</span>
                  <span className="text-xs font-bold">₹{priceRange[1]}</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => {setActiveCategory("All"); setPriceRange([0, 10000]);}}
                className="w-full mt-6 text-[10px] text-zinc-400 hover:text-zinc-900 uppercase font-black"
              >
                Reset Arsenal
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
              <p className="text-xs font-medium text-zinc-400 italic">
                Scanning Arsenal: <span className="text-zinc-900 font-black">{filteredProducts.length}</span> active modules
              </p>
              <Select onValueChange={setSortOrder}>
                <SelectTrigger className="w-[200px] bg-zinc-50 border-zinc-100 rounded-full h-11 text-xs font-bold">
                  <SelectValue placeholder="Sort Parameters" />
                </SelectTrigger>
                <SelectContent className="bg-white border-zinc-100">
                  <SelectItem value="default">Default Scan</SelectItem>
                  <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                  <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card 
                      className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden cursor-pointer hover:shadow-2xl transition-all shadow-sm group"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className="aspect-square bg-zinc-50 p-8 flex items-center justify-center relative overflow-hidden">
                        <img 
                          src={product.image} 
                          className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                          alt={product.name}
                        />
                        <div className="absolute top-6 right-6 bg-zinc-900 text-white text-[9px] font-black px-3 py-1.5 rounded-full shadow-lg">
                          -{Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}%
                        </div>
                      </div>
                      <CardContent className="p-8">
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{product.category}</span>
                        <h3 className="text-sm font-bold text-zinc-900 mb-4 h-10 line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                        <div className="flex items-end justify-between border-t border-zinc-50 pt-6">
                          <div>
                            <p className="text-zinc-300 text-[10px] line-through mb-1 font-bold">₹{product.originalPrice.toLocaleString()}</p>
                            <p className="text-xl font-black text-zinc-900 tracking-tighter">₹{product.salePrice.toLocaleString()}</p>
                          </div>
                          <Button 
                            size="icon" 
                            className="bg-zinc-900 hover:bg-black text-white rounded-2xl h-12 w-12 transition-all shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-40 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-100">
                <AlertTriangle className="mx-auto h-12 w-12 text-zinc-200 mb-4" />
                <p className="text-zinc-400 uppercase font-black tracking-widest text-xs">No matching hardware found.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default HardwareServices;