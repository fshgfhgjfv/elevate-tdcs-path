import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Cpu, GraduationCap, Box, Zap, Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const SidebarFilters = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All", icon: <Zap className="w-3 h-3" /> },
    { name: "Hardware", icon: <Cpu className="w-3 h-3" /> },
    { name: "Courses", icon: <GraduationCap className="w-3 h-3" /> },
    { name: "Combo", icon: <Box className="w-3 h-3" /> },
  ];

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    // Logic to filter products would go here
  };

  return (
    <aside className="w-full lg:w-72 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-red-600/20 p-2 rounded-xl">
          <Filter className="w-4 h-4 text-red-500" />
        </div>
        <h2 className="text-lg font-black tracking-tighter uppercase italic">Arsenal Filters</h2>
      </div>

      {/* Category Selection - Tactical Rounded Pills */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Deploy Category</p>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.name}
              whileHover={{ x: 5 }}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 ${
                activeCategory === cat.name
                  ? "bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                  : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${activeCategory === cat.name ? "bg-white/20" : "bg-black"}`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-tight">{cat.name}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === cat.name ? "rotate-90" : ""}`} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Price Range - Functional and Professional */}
      <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-[2rem] backdrop-blur-md">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Price Range (INR)</p>
        
        <Slider
          defaultValue={[0, 10000]}
          max={15000}
          step={500}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mb-6"
        />

        <div className="flex justify-between items-center gap-2">
          <div className="flex-1 bg-black/50 border border-white/10 p-2 rounded-xl text-center">
            <span className="text-[10px] text-zinc-500 block uppercase">Min</span>
            <span className="text-xs font-mono">₹{priceRange[0]}</span>
          </div>
          <div className="h-[1px] w-4 bg-zinc-800" />
          <div className="flex-1 bg-black/50 border border-white/10 p-2 rounded-xl text-center">
            <span className="text-[10px] text-zinc-500 block uppercase">Max</span>
            <span className="text-xs font-mono">₹{priceRange[1]}</span>
          </div>
        </div>

        <Button className="w-full mt-6 bg-transparent border border-white/10 hover:bg-white hover:text-black rounded-xl text-[10px] font-bold uppercase">
          Apply Tactical Filter
        </Button>
      </div>

      {/* Trust Badge */}
      <div className="p-4 rounded-2xl border border-red-900/20 bg-gradient-to-br from-red-900/10 to-transparent">
        <p className="text-[10px] text-zinc-400 leading-relaxed italic">
          "All hardware pre-configured for instant deployment in legal penetration testing environments."
        </p>
      </div>
    </aside>
  );
};

export default SidebarFilters;