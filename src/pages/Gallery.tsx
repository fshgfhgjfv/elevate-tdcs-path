import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import swag1 from "@/assets/gallery/swag1.jpg";
import swag2 from "@/assets/gallery/swag2.jpg";
// ... (omitted image imports for brevity, assume they are still here)
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
  // ... (omitted gallery items for brevity, assume they are still here)
  { id: 20, image: dibyajitImg, category: "Team", title: "Dibyajit Ghosh - Founder & CEO" },
];

// 🎨 HIGH-LEVEL ANIMATION VARIANTS

// 1. Container for staggered grid animations
const containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2, // Delay before the first child starts animating
      staggerChildren: 0.1, // Stagger delay between each child item
    }
  }
};

// 2. Individual item animations
const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  },
  // Animation for when an item is filtered out (optional but good practice)
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};


export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleImageClick = (item: typeof galleryItems[0]) => {
    setSelectedImage(item);
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'gallery_item_view', {
        item_id: item.id,
        item_category: item.category
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of student experiences, swag boxes, tools, and office setup
          </p>
        </motion.div>

        {/* Category Filters (kept existing animation) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid - New Staggered Animation Applied Here */}
        <motion.div
          layout
          variants={containerVariants} // Apply container variants
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants} // Apply item variants
                initial="hidden"
                animate="visible"
                exit="exit"
                // Removed redundant initial/animate/exit props, as variants handle them
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => handleImageClick(item)}
                style={{ perspective: "1200px" }}
              >
                {/* Image and overlay content remain the same */}
                <div className="relative overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-white/80 text-sm">{item.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">No items found in this category</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox (kept existing animation) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-white/80">{selectedImage.category}</p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = selectedImage.image;
                    link.download = `${selectedImage.title}.jpg`;
                    link.click();
                  }}
                >
                  Download
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}