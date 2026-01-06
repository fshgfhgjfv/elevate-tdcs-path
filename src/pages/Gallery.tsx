import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, ArrowLeft, ArrowRight, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import images (Assuming these paths are correct in your project)
import swag1 from "@/assets/gallery/swag1.jpg";
import swag2 from "@/assets/gallery/swag2.jpg";
import swag3 from "@/assets/gallery/swag3.jpg";
import swag4 from "@/assets/gallery/swag4.jpg";
import swag5 from "@/assets/gallery/swag5.jpg";
import swag6 from "@/assets/gallery/swag6.jpg";
import swag7 from "@/assets/gallery/swag7.jpg";
import swag8 from "@/assets/gallery/swag8.jpg";
import team1 from "@/assets/gallery/team1.jpg";
import office1 from "@/assets/gallery/office1.jpg";
import office2 from "@/assets/gallery/office2.jpg";
import office3 from "@/assets/gallery/office3.jpg";
import office4 from "@/assets/gallery/office4.jpg";
import office5 from "@/assets/gallery/office5.jpg";
import idcard1 from "@/assets/gallery/idcard1.jpg";
import tools1 from "@/assets/gallery/tools1.jpg";
import tools2 from "@/assets/gallery/tools2.jpg";
import tusharImg from "@/assets/founders/tushar-bhakta.jpg";
import shivamImg from "@/assets/founders/shivam-shing.jpg";
import dibyajitImg from "@/assets/founders/dibyajit-ghosh.jpg";

const categories = [
  "All",
  "SWAGS BOXES",
  "TOOLS",
  "Student ID Card",
  "TDCS Office Setup",
  "Team",
  "Offline Center"
];

const galleryItems = [
  { id: 1, image: swag1, category: "SWAGS BOXES", title: "Student Swag Box 1" },
  { id: 2, image: swag2, category: "SWAGS BOXES", title: "Student Swag Box 2" },
  { id: 3, image: swag3, category: "SWAGS BOXES", title: "Student Swag Box 3" },
  { id: 4, image: swag4, category: "SWAGS BOXES", title: "Course Materials Box" },
  { id: 5, image: swag5, category: "SWAGS BOXES", title: "Welcome Kit" },
  { id: 6, image: swag6, category: "SWAGS BOXES", title: "Training Materials" },
  { id: 7, image: swag7, category: "SWAGS BOXES", title: "Student Resources Pack" },
  { id: 8, image: swag8, category: "SWAGS BOXES", title: "Learning Essentials" },
  { id: 9, image: tools1, category: "TOOLS", title: "Development Tools & Equipment" },
  { id: 10, image: tools2, category: "TOOLS", title: "Lab Equipment" },
  { id: 11, image: idcard1, category: "Student ID Card", title: "Official Student ID Card" },
  { id: 12, image: office1, category: "TDCS Office Setup", title: "Main Office Area" },
  { id: 13, image: office2, category: "TDCS Office Setup", title: "Training Room" },
  { id: 14, image: office3, category: "TDCS Office Setup", title: "Workspace 1" },
  { id: 15, image: office4, category: "TDCS Office Setup", title: "Workspace 2" },
  { id: 16, image: office5, category: "TDCS Office Setup", title: "Conference Room" },
  { id: 17, image: team1, category: "Team", title: "TDCS Team" },
  { id: 18, image: tusharImg, category: "Team", title: "Tushar Bhakta - CMO" },
  { id: 19, image: shivamImg, category: "Team", title: "Shivam Shing - COO" },
  { id: 20, image: dibyajitImg, category: "Team", title: "Dibyajit Ghosh - Founder & CEO" },
];

// Helper to generate deterministic random rotation based on ID
const getRotation = (id: number) => {
  // Returns a number between -6 and 6 degrees
  const seed = id * 37; 
  return (seed % 13) - 6;
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory), 
  [selectedCategory]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex !== null) {
      if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev! + 1) % filteredItems.length);
      if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
      if (e.key === "Escape") setSelectedIndex(null);
    }
  }, [selectedIndex, filteredItems.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f8f9fa] overflow-hidden relative">
      {/* Background Decor - Dot Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
             <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-slate-800 relative z-10">
                The Gallery
             </h1>
             {/* Underline highlighter effect */}
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-2 left-0 h-4 bg-yellow-300/60 -z-0 -rotate-1"
             />
          </div>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            A visual journey through our student experiences, culture, and workspaces.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-6 py-2 rounded-full font-semibold text-sm border-2 transition-all duration-300
                ${selectedCategory === cat 
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"}
              `}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Sticky Note Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 px-4 md:px-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
               const rotation = getRotation(item.id);
               
               return (
                <motion.div
                  key={item.id}
                  layoutId={`card-${item.id}`}
                  initial={{ opacity: 0, scale: 0.8, rotate: rotation + 10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: rotation,
                    transition: { type: "spring", bounce: 0.4, duration: 0.8 } 
                  }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 0, 
                    zIndex: 50,
                    transition: { duration: 0.2 } 
                  }}
                  onClick={() => setSelectedIndex(index)}
                  className="group relative cursor-pointer"
                >
                  {/* The Card */}
                  <div className="bg-white p-3 pb-12 shadow-md hover:shadow-2xl transition-shadow duration-300 rounded-sm border border-slate-100">
                    
                    {/* "Tape" Visual Effect at top center */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-100/80 backdrop-blur-sm rotate-1 shadow-sm z-20 border-l border-r border-white/50 opacity-90" />
                    
                    {/* Image Container */}
                    <div className="aspect-[4/5] overflow-hidden bg-slate-100 relative mb-3">
                       <motion.img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover filter contrast-[1.05] grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                      />
                      {/* Dark Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>

                    {/* Handwriting Style Caption */}
                    <div className="absolute bottom-3 left-0 right-0 px-4 text-center">
                      <p className="font-handwriting text-slate-800 font-bold text-sm truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                        {item.category}
                      </p>
                    </div>

                    {/* Decorative Paperclip (Randomly applied to some) */}
                    {item.id % 3 === 0 && (
                      <Paperclip className="absolute -right-2 top-10 w-6 h-6 text-slate-400 rotate-45" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Improved Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4"
              onClick={() => setSelectedIndex(null)}
            >
              {/* Controls */}
              <div className="absolute top-6 right-6 flex gap-4 z-50">
                <Button 
                   variant="outline" 
                   size="icon" 
                   className="rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                   onClick={() => setSelectedIndex(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation Arrows */}
              <button
                className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length); }}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev! + 1) % filteredItems.length); }}
              >
                <ArrowRight className="w-6 h-6" />
              </button>

              {/* Main Lightbox Content */}
              <motion.div
                layoutId={`card-${filteredItems[selectedIndex].id}`} 
                className="relative max-w-5xl w-full max-h-[85vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Section */}
                <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
                   <motion.img
                    key={filteredItems[selectedIndex].id}
                    src={filteredItems[selectedIndex].image}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full max-h-[60vh] md:max-h-[85vh] object-contain"
                  />
                </div>

                {/* Sidebar Info Section */}
                <div className="w-full md:w-80 bg-white p-8 flex flex-col justify-between border-l border-slate-100">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold mb-4 tracking-wider">
                       {filteredItems[selectedIndex].category}
                    </span>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2 leading-tight">
                      {filteredItems[selectedIndex].title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                       Captured at TDCS Technologies. Part of our journey in building the next generation of cybersecurity experts.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3">
                     <Button 
                        className="w-full" 
                        onClick={() => {
                           const link = document.createElement("a");
                           link.href = filteredItems[selectedIndex].image;
                           link.download = filteredItems[selectedIndex].title;
                           link.click();
                        }}
                     >
                        <Download className="mr-2 w-4 h-4" /> Download Original
                     </Button>
                     <Button variant="outline" className="w-full" onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                     }}>
                        <Share2 className="mr-2 w-4 h-4" /> Share Image
                     </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}