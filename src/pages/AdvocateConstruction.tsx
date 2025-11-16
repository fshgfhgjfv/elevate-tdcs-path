"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Gavel, Users, FileText, Calendar, PlayCircle, ChevronDown } from "lucide-react"; // --- UPDATED: Added ChevronDown
import { useState } from "react";

// --- UPDATED: Easy to change links ---
const CALENDLY_LINK = "https://calendly.com/advocate-majumder/30min"; // <-- Change this to the correct link

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};
// --- NEW: Variants for collapsible content ---
const contentVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
  open: { opacity: 1, height: "auto", marginTop: "1rem" },
};

// --- UPDATED: Practice Areas with more detail ---
const practiceAreas = [
  {
    icon: Scale,
    title: "Civil Law",
    description: "Our civil law practice provides comprehensive litigation support and advisory services for property disputes, contract breaches, and inheritance matters. We are dedicated to protecting your rights and assets through meticulous case preparation and strong courtroom representation.",
  },
  {
    icon: Gavel,
    title: "Criminal Law",
    description: "We offer strategic and ethical criminal defense for a wide range of cases. From bail applications to trial representation, our approach is focused on ensuring a fair legal process, protecting your rights, and achieving the best possible outcome.",
  },
  {
    icon: Users,
    title: "Legal Consultation",
    description: "Get expert legal advice tailored to your specific situation. We help you understand complex legal issues, explore your options, and make informed decisions. Our consultations cover all our practice areas and are available online or in-person.",
  },
  {
    icon: FileText,
    title: "Arbitration",
    description: "As a faster alternative to traditional court proceedings, we offer expert arbitration and mediation services. We help resolve commercial and civil disputes efficiently, saving you time and money while working towards an amicable, binding solution.",
  },
];

// --- UPDATED: Data for Featured Videos ---
const featuredVideos = [
  { id: "1Hk7kyfpKjU", title: "Understanding Civil Law" },
  { id: "v4-pSgB7i2U", title: "Your Rights in Criminal Cases" },
  { id: "V0Xp-1X41sY", title: "The Process of Arbitration" },
];

const faqs = [
  {
    q: "How do I book a consultation?",
    a: "Click the 'Book Appointment' button to instantly schedule a session via Calendly.",
  },
  // ... (other faqs)
];

// --- Testimonials Data ---
const testimonials = [
  {
    name: "Rahul Mehta",
    feedback: "Advocate Majumder was incredibly professional...",
  },
  // ... (other testimonials)
];

const AdvocateProfilePage = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  
  // --- NEW: State for Practice Areas ---
  const [openAreaIndex, setOpenAreaIndex] = useState<number | null>(null);
  
  // --- NEW: State for Video Lazy-Loading ---
  const [loadVideoId, setLoadVideoId] = useState<string | null>(null);

  // --- NEW: Toggle function for Practice Areas ---
  const toggleArea = (index: number) => {
    setOpenAreaIndex(openAreaIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 pt-24 pb-16 relative overflow-hidden">
      {/* Floating CTA */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 1.5 }}
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          size="lg"
          onClick={() => setShowCalendly(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl"
        >
          <Calendar className="mr-2 w-5 h-5" />
          Book Appointment
        </Button>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Hero Section (Unchanged) */}
          <div className="text-center mb-14">
            {/* ... (hero content) ... */}
          </div>

          {/* About Section (Unchanged) */}
          <motion.div variants={itemVariants} className="space-y-6 mb-16">
            {/* ... (about content) ... */}
          </motion.div>

          {/* --- 
            --- UPDATED: Practice Areas Section ---
            --- (Replaced grid with interactive zigzag) ---
          --- */}
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-16"
          >
            Practice Areas
          </motion.h3>
          <div className="space-y-16 mb-20">
            {practiceAreas.map((area, index) => {
              const isEven = index % 2 === 0;
              const isOpen = openAreaIndex === index;

              return (
                <motion.div
                  key={area.title}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {/* Icon/Image Part */}
                  <div
                    className={`w-full md:w-2/5 ${
                      isEven ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 flex justify-center items-center shadow-lg">
                      <area.icon className="w-24 h-24 text-blue-600" />
                    </div>
                  </div>

                  {/* Text/Content Part */}
                  <div
                    className={`w-full md:w-3/5 ${
                      isEven ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    {/* Clickable Header */}
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleArea(index)}
                    >
                      <h4 className="text-3xl font-bold text-gray-800">
                        {area.title}
                      </h4>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-7 h-7 text-gray-500" />
                      </motion.div>
                    </div>

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          variants={contentVariants}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          <p className="text-muted-foreground text-lg leading-relaxed">
                            {area.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* --- END OF UPDATED Practice Areas --- */}


          {/* --- 
            --- UPDATED: Embedded Videos Section ---
            --- (Added lazy-loading facade) ---
          --- */}
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-10"
          >
            Featured Videos
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {featuredVideos.map((video, i) => (
              <motion.div
                key={video.id}
                className="relative overflow-hidden rounded-2xl shadow-lg group aspect-video" // aspect-video is useful
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {loadVideoId === video.id ? (
                  // 2. If ID matches, load the iframe
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  // 1. Show a "facade" (a button that looks like a player)
                  <button
                    onClick={() => setLoadVideoId(video.id)}
                    className="w-full h-full flex items-center justify-center bg-black rounded-2xl cursor-pointer"
                    aria-label={`Play video: ${video.title}`}
                  >
                    {/* You could add a thumbnail image here */}
                    <PlayCircle className="w-16 h-16 text-white transition-transform group-hover:scale-110" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
          {/* --- END OF UPDATED Videos Section --- */}


          {/* Testimonials Scroller (Unchanged) */}
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10"
          >
            Client Testimonials
          </motion.h3>
          <motion.div
            className="flex overflow-x-auto space-x-6 pb-6 mb-24 scrollbar-hide"
            // ... (rest of testimonials)
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="min-w-[300px] md:min-w-[400px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <p className="text-muted-foreground italic mb-4">“{t.feedback}”</p>
                <p className="font-semibold text-right">— {t.name}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section (Unchanged) */}
          <motion.h3
            variants={itemVariants}
            // ... (rest of FAQ)
          >
            Frequently Asked Questions
          </motion.h3>
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-24 border border-border/40 rounded-2xl p-6 bg-white/60 backdrop-blur"
          >
            {/* ... (accordion content) ... */}
          </motion.div>
        </motion.div>
      </div>

      {/* Calendly Modal */}
      <AnimatePresence>
        {showCalendly && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative"
              // ... (modal animations)
            >
              <button
                onClick={() => setShowCalendly(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
                // --- UPDATED: Accessibility ---
                aria-label="Close booking modal"
              >
                ✕
              </button>
              <iframe
                // --- UPDATED: Using constant ---
                src={CALENDLY_LINK}
                width="100%"
                height="600"
                frameBorder="0"
                className="rounded-2xl"
                title="Book Appointment"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvocateProfilePage;