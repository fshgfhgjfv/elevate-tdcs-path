import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

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
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of student experiences, swag boxes, tools, and office setup
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.div key={cat} whileTap={{ scale: 0.9 }}>
              <Button
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full px-5"
              >
                {cat}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layoutId={`img-${item.id}`}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -3 }}
                onClick={() => setSelectedIndex(index)}
                className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer bg-neutral-100"
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4"
                >
                  <div>
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-5 right-5 text-white hover:bg-white/20"
                onClick={() => setSelectedIndex(null)}
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-5 text-white hover:bg-white/20"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length); }}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-5 text-white hover:bg-white/20"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev! + 1) % filteredItems.length); }}
              >
                <ArrowRight className="h-6 w-6" />
              </Button>

              <motion.div
                layoutId={`img-${filteredItems[selectedIndex].id}`}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  src={filteredItems[selectedIndex].image}
                  alt={filteredItems[selectedIndex].title}
                  className="w-full h-auto rounded-lg shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="mt-6 text-center">
                  <h3 className="text-white text-2xl font-bold mb-2">{filteredItems[selectedIndex].title}</h3>
                  <p className="text-white/70 mb-4">{filteredItems[selectedIndex].category}</p>
                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = filteredItems[selectedIndex].image;
                        a.download = `${filteredItems[selectedIndex].title}.jpg`;
                        a.click();
                      }}
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white/20"
                      onClick={() => {
                        navigator.share?.({
                          title: filteredItems[selectedIndex].title,
                          url: filteredItems[selectedIndex].image,
                        });
                      }}
                    >
                      <Share2 className="mr-2 h-4 w-4" /> Share
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
