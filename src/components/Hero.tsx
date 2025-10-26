import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { DownloadBrochureModal } from "./DownloadBrochureModal";

const heroTexts = [
  "Happy TDCS student learning coding",
  "Happy TDCS student learning full stack development",
  "Happy TDCS student learning data analytics",
  "Happy TDCS student learning software engineering",
];

interface HeroProps {
  showOnInnerPages?: boolean;
}

export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  if (!showOnInnerPages) {
    return null;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <motion.h1
          key={currentTextIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-center px-4"
        >
          {heroTexts[currentTextIndex]}
        </motion.h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text mb-2">
              35k+ Happy Students
            </h1>
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-semibold mb-6">
            The Training and Placement platform for your career
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get job-ready with expert-led courses or participate in our free hiring drives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/courses">
              <Button variant="gradient" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                View Courses
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 w-full sm:w-auto border-2"
              onClick={() => setIsBrochureModalOpen(true)}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Brochure
            </Button>
          </div>

          {/* Recognition Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 items-center"
          >
            <div className="text-sm text-muted-foreground">Recognized by:</div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="px-6 py-3 bg-card rounded-lg shadow-glow border"
              >
                <span className="font-semibold gradient-text">AccioJob Partner {i}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Download Brochure Modal */}
      <DownloadBrochureModal 
        isOpen={isBrochureModalOpen} 
        onClose={() => setIsBrochureModalOpen(false)} 
      />
    </section>
  );
};
