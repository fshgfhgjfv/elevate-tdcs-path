import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface TestimonialCardProps {
  before: string;
  after: string;
  company: string;
}

export const TestimonialCard = ({
  before,
  after,
  company,
}: TestimonialCardProps) => {
  const hardcodedImages = [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...", // trimmed for brevity
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFMv3xXUWQ_UymielHwEcjmvimnByuE_ohtw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK1p11fwTtISJt4xqyXCp3G2EJAMPH_Mmv5Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYIYZmxH6vEaReF9HAtGQ8IjQX1KM1s8yVQ&s",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hardcodedImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [hardcodedImages.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-glow hover:shadow-glow-lg transition-all duration-300">
        <CardContent className="p-6">
          {/* --- Single Smoothly Changing Image --- */}
          <div className="flex items-center justify-center mb-4 min-h-[64px] relative">
            <div className="relative w-16 h-16">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={hardcodedImages[currentIndex]}
                  alt={`TDCS STUDENTS avatar ${currentIndex + 1}`}
                  className="absolute w-16 h-16 rounded-full object-cover border-2 border-background"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://placehold.co/64x64/E2E8F0/64748B?text=Error";
                  }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* --- Only TDCS STUDENTS Text --- */}
          <h3 className="text-xl font-bold text-center mb-4 tracking-wide">
            TDCS STUDENTS
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-center">
                <div className="text-sm text-muted-foreground mb-1">Before</div>
                <div className="font-semibold text-sm">{before}</div>
              </div>

              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="text-primary" />
              </motion.div>

              <div className="flex-1 text-center">
                <div className="text-sm text-muted-foreground mb-1">After</div>
                <div className="font-semibold text-sm gradient-text">
                  {after}
                </div>
              </div>
            </div>

            <div className="text-center pt-3 border-t">
              <div className="text-sm font-semibold text-primary">
                {company}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
