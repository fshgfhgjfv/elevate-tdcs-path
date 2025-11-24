import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Linkedin, Quote } from "lucide-react";

interface Testimonial {
  posterImg: string;
  quoteTitle: string;
  quoteText: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  linkedinUrl: string;
}

const testimonials: Testimonial[] = [
  {
    posterImg: "https://blogger.googleusercontent.com/img/a/AVvXsEiR5vzDDaHMOfP1b-GEtK6ei7hJEusnJCXBjSvIGljLZn3JO2xjGRmXp0yLkyNLPIcfdSGJ3rvwzJQrxswByoWFdnt2NLHhfR9MGYE2Mw8_MuljtoWurnjNQZgLSt-_JDJDa13sA1OEVCLQrMRrYWaRgce8pSOYBVu-5L5vB3bXczlNFDNaGyyYJCYUy1fV",
    quoteTitle: "Exceptional Talent Pipeline",
    quoteText: "We hired rockstar developers from TDCS! The candidates are enjoying high ownership - having sound fundamentals and first principal thinking. The best part is they require minimal on-job training.",
    authorName: "Dibyajit Ghosh",
    authorTitle: "Co-founder & CTO",
    authorAvatar: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhQ9heh07dWNTxnm6dhyphenhyphen2rzfxjmA_xS3UXPh3sBCY_B2ywNCfyr8QXWKLsur3PJKzLo-pUsoGmIfTmGl8m7cGmUezdk_RvStMnzxjIstX1S-V6gc2PrG8WkudchJv_c0LuVu0xbO7mUnWh5mWZHMe9THz3dwqCLTN0-2bAoI0k_rynUr6vk2xDdSKi0bM-/s539/WhatsApp_Image_2025-10-26_at_15.56.54_d2e7dc94-removebg-preview.png",
    linkedinUrl: "#"
  },
  {
    posterImg: "https://blogger.googleusercontent.com/img/a/AVvXsEhwxU1wn396TPzXrwwuUFYAptHStVwiAXDoYSEo8_sZM7j5UQ-hpzvTh8XxeVE1eNBctGmFARw_jqnaC4dwuD2L1LFKHMUeWpH1xYZvg-iqtGuEQU4wtgYk7RQ096RFBuD6jQ3d7e2xoA_niTtJhFwDX149xzITVsi0tSbBcb0s0EoosdTTrWC5RfQKdNk8",
    quoteTitle: "Best Off-Campus Partner",
    quoteText: "TDCS has become our exclusive off-campus partner for hiring entry-level developers. Their assessment to selection ratio is unbelievable. The students are all-rounders and require little on-job training.",
    authorName: "Shivam Shing",
    authorTitle: "Sr. Director Engineering",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    linkedinUrl: "#"
  },
  {
    posterImg: "https://blogger.googleusercontent.com/img/a/AVvXsEiTNGkqkHJOS8z5tcDq-Qz8r4-HCfioKGpdCb4iEVLHGIRtaJkT1a6ByD6wbz1rZIsQkOTIFKaWxaF5cNAl9RNldk_X9ISz1ZVYEn39690Yq3fRQYFfhoVZO0ps0HJrAQ4tVDx8h_Ji4jD1vlkZw0WBXJ1Peiq9HdI15X5bRfgrKdxCNPGlOYV1hFD9ty8c",
    quoteTitle: "Unparalleled Value Addition",
    quoteText: "PayGlocal today has the best engineers on board because of TDCS. The value they add to a student's career and the company's hiring needs is unparalleled. It's become a ritual for us to ping TDCS for new openings.",
    authorName: "Yogesh Lokhande",
    authorTitle: "Co-founder & CTO",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    linkedinUrl: "#"
  }
];

export const RecruiterTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!isPaused && !prefersReducedMotion) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear what recruiters and hiring managers say about TDCS graduates
          </p>
        </motion.div>

        <Card 
          className="max-w-7xl mx-auto overflow-hidden shadow-glow-lg border-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Recruiter testimonials"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Poster Image */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-muted/20">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={currentTestimonial.posterImg}
                  alt={`${currentTestimonial.authorName} company`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                />
              </AnimatePresence>
              
              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={goToPrevious}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={goToNext}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Right: Testimonial Card */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-background to-muted/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Quote className="w-12 h-12 text-primary opacity-50" />
                  
                  <blockquote>
                    <h3 className="text-2xl font-bold mb-4 gradient-text">
                      {currentTestimonial.quoteTitle}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      "{currentTestimonial.quoteText}"
                    </p>
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <img
                      src={currentTestimonial.authorAvatar}
                      alt={currentTestimonial.authorName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/50"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <cite className="not-italic">
                        <p className="font-bold text-lg">{currentTestimonial.authorName}</p>
                        <p className="text-sm text-muted-foreground">{currentTestimonial.authorTitle}</p>
                      </cite>
                    </div>
                    <a
                      href={currentTestimonial.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={`${currentTestimonial.authorName}'s LinkedIn profile`}
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Pagination Dots */}
              <div className="flex gap-2 mt-8 justify-center" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    role="tab"
                    aria-selected={index === currentIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
