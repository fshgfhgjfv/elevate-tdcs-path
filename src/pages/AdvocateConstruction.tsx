"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Gavel, Users, FileText, Calendar, PlayCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

// ---
// --- 1. SETTINGS & DATA ---
// ---
const CALENDLY_LINK = "https://calendly.com/advocate-majumder/30min"; // <-- UPDATE THIS LINK

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
// --- Variants for collapsible content ---
const contentVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
  open: { opacity: 1, height: "auto", marginTop: "1rem" },
};

// --- Practice Areas Data ---
const practiceAreas = [
  {
    icon: Scale,
    title: "Civil Law",
    preview: "Comprehensive support for property disputes, contract breaches, and inheritance matters.",
    details: "Our full-service civil law practice provides comprehensive litigation support and advisory services. We are dedicated to protecting your rights and assets through meticulous case preparation and strong courtroom representation in all matters of property, contracts, and inheritance.",
  },
  {
    icon: Gavel,
    title: "Criminal Law",
    preview: "Strategic and ethical criminal defense for a wide range of cases, from bail to trial.",
    details: "We offer a robust defense for all criminal charges. Our approach is focused on ensuring a fair legal process, protecting your constitutional rights, and achieving the best possible outcome, whether that's a favorable plea, a dismissal, or a not-guilty verdict at trial.",
  },
  {
    icon: Users,
    title: "Legal Consultation",
    preview: "Expert legal advice tailored to your specific situation to help you understand your options.",
    details: "Get expert legal advice tailored to your specific situation. We help you understand complex legal issues, explore your options, and make informed decisions. Our consultations cover all our practice areas and are available online or in-person.",
  },
  {
    icon: FileText,
    title: "Arbitration",
    preview: "A faster, more efficient alternative to traditional court proceedings for resolving disputes.",
    details: "As a faster alternative to traditional court proceedings, we offer expert arbitration and mediation services. We help resolve commercial and civil disputes efficiently, saving you time and money while working towards an amicable, binding solution.",
  },
];

// --- Featured Videos Data ---
const featuredVideos = [
  { id: "1Hk7kyfpKjU", title: "Understanding Civil Law" },
  { id: "v4-pSgB7i2U", title: "Your Rights in Criminal Cases" },
  { id: "V0Xp-1X41sY", title: "The Process of Arbitration" },
];

// --- FAQ Data ---
const faqs = [
  {
    q: "How do I book a consultation?",
    a: "Click the 'Book Appointment' button to instantly schedule a session via Calendly.",
  },
  {
    q: "Which areas of law does Advocate Majumder specialize in?",
    a: "Civil, criminal, arbitration, and property disputes — with over 15 years of experience.",
  },
  {
    q: "Do you handle online consultations?",
    a: "Yes, we offer online consultations via Google Meet and Zoom for clients worldwide.",
  },
];

// --- Testimonials Data ---
const testimonials = [
  {
    name: "Rahul Mehta",
    feedback:
      "Advocate Majumder was incredibly professional and guided me through a difficult civil case with clarity and confidence. Highly recommended!",
  },
  {
    name: "Priya Singh",
    feedback:
      "Her attention to detail and ethical practice truly stood out. I felt supported and informed throughout my case.",
  },
  {
    name: "Amit Verma",
    feedback:
      "Expert advice and a personal touch — she helped me resolve a long-standing legal issue smoothly.",
  },
];

// ---
// --- 2. THE MAIN PAGE COMPONENT ---
// ---
const AdvocateProfilePage = () => {
  // State for the modal
  const [showCalendly, setShowCalendly] = useState(false);
  // State for the interactive practice areas
  const [openAreaIndex, setOpenAreaIndex] = useState<number | null>(null);
  // State for the lazy-loading videos
  const [loadVideoId, setLoadVideoId] = useState<string | null>(null);

  // Toggle function for practice areas
  const toggleArea = (index: number) => {
    setOpenAreaIndex(openAreaIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 pt-24 pb-16 relative overflow-hidden">
      
      {/* --- Floating CTA Button --- */}
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
          
          {/* --- Hero Section --- */}
          <div className="text-center mb-14">
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3"
            >
              Advocate Sarbari Majumder
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl text-muted-foreground mb-4"
            >
              Legal Counsel | High Court of Calcutta
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg italic text-foreground/90 mb-6 max-w-2xl mx-auto"
            >
              “Dedicated to Justice. Committed to Clients.”
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => setShowCalendly(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
              >
                Book a Consultation
              </Button>
            </motion.div>
          </div>

          {/* --- About Section --- */}
          <motion.div variants={itemVariants} className="space-y-6 mb-16">
            <Card className="shadow-glow backdrop-blur-xl border-primary/20">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  Advocate Sarbari Majumder is a distinguished legal practitioner with over 15 years of experience in
                  diverse legal domains including civil, criminal, and arbitration law. Practicing at the High Court of
                  Calcutta, she is known for her strategic thinking, compassionate counsel, and relentless pursuit of
                  justice.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-glow backdrop-blur-xl border-secondary/20">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  Her practice emphasizes ethical representation, transparent communication, and client-first service.
                  Advocate Majumder has successfully represented clients across India, providing clarity and confidence
                  in every legal process.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* --- Practice Areas Section (Interactive) --- */}
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

                    {/* Preview Text (Always visible) */}
                    <p className="text-lg text-muted-foreground mt-2">
                      {area.preview}
                    </p>

                    {/* Collapsible Details */}
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
                          <p className="text-foreground text-lg leading-relaxed">
                            {area.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* --- Embedded Videos Section (Lazy-Loaded) --- */}
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
                className="relative overflow-hidden rounded-2xl shadow-lg group aspect-video"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {loadVideoId === video.id ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <button
                    onClick={() => setLoadVideoId(video.id)}
                    className="w-full h-full flex items-center justify-center bg-black rounded-2xl cursor-pointer"
                    aria-label={`Play video: ${video.title}`}
                  >
                    <PlayCircle className="w-16 h-16 text-white transition-transform group-hover:scale-110" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* --- Testimonials Scroller --- */}
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10"
          >
            Client Testimonials
          </motion.h3>
          <motion.div
            className="flex overflow-x-auto space-x-6 pb-6 mb-24 scrollbar-hide"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="min-w-[300px] md:min-w-[400px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <p className="text-muted-foreground italic mb-4">“{t.feedback}”</p>
                <p className="font-semibold text-right text-gray-800">— {t.name}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* --- FAQ Section --- */}
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-10"
          >
            Frequently Asked Questions
          </motion.h3>
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-24 border border-border/40 rounded-2xl p-6 bg-white/60 backdrop-blur"
          >
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>

      {/* --- Calendly Modal (Book a Meeting) --- */}
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setShowCalendly(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
                aria-label="Close booking modal"
              >
                ✕
              </button>
              <iframe
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