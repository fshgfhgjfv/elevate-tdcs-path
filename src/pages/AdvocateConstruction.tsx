"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, PlayCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

// ---
// --- 1. SETTINGS & DATA ---
// ---
const CALENDLY_LINK = "https://calendly.com/advocate-majumder/30min"; 

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
const contentVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
  open: { opacity: 1, height: "auto", marginTop: "1rem" },
};

// --- Practice Areas Data ---
const practiceAreas = [
  {
    title: "Civil Law",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    preview: "Comprehensive support for property disputes, contract breaches, and inheritance matters.",
    details: "Our full-service civil law practice provides comprehensive litigation support and advisory services. We are dedicated to protecting your rights and assets through meticulous case preparation and strong courtroom representation in all matters of property, contracts, and inheritance.",
  },
  {
    title: "Criminal Law",
    image: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&q=80&w=800",
    preview: "Strategic and ethical criminal defense for a wide range of cases, from bail to trial.",
    details: "We offer a robust defense for all criminal charges. Our approach is focused on ensuring a fair legal process, protecting your constitutional rights, and achieving the best possible outcome, whether that's a favorable plea, a dismissal, or a not-guilty verdict at trial.",
  },
  {
    title: "Legal Consultation",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    preview: "Expert legal advice tailored to your specific situation to help you understand your options.",
    details: "Get expert legal advice tailored to your specific situation. We help you understand complex legal issues, explore your options, and make informed decisions. Our consultations cover all our practice areas and are available online or in-person.",
  },
  {
    title: "Arbitration",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    preview: "A faster, more efficient alternative to traditional court proceedings for resolving disputes.",
    details: "As a faster alternative to traditional court proceedings, we offer expert arbitration and mediation services. We help resolve commercial and civil disputes efficiently, saving you time and money while working towards an amicable, binding solution.",
  },
];

// --- Featured Videos Data ---
const featuredVideos = [
  { id: "YiYEtB3_Sv4", title: "Stages of a Civil Suit in India" },
  { id: "v9mR1DgEApE", title: "India's New Criminal Laws Explained" },
  { id: "YLgm_Lv-w1A", title: "The Arbitration Process in India" },
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

// --- Testimonials Data (Expanded) ---
const testimonials = [
  {
    name: "Rahul Mehta",
    feedback: "Advocate Majumder was incredibly professional and guided me through a difficult civil case with clarity.",
    role: "Civil Litigation",
  },
  {
    name: "Priya Singh",
    feedback: "Her attention to detail and ethical practice truly stood out. I felt supported and informed throughout my case.",
    role: "Family Dispute",
  },
  {
    name: "Amit Verma",
    feedback: "Expert advice and a personal touch — she helped me resolve a long-standing legal issue smoothly.",
    role: "Property Law",
  },
  {
    name: "Sneha Reddy",
    feedback: "We needed swift arbitration for a corporate dispute, and her strategy was flawless. Highly recommended.",
    role: "Corporate Arbitration",
  },
  {
    name: "Vikram Malhotra",
    feedback: "She saved my ancestral land from illegal possession. Her knowledge of land laws in West Bengal is unmatched.",
    role: "Real Estate",
  },
  {
    name: "Dr. Anjali Gupta",
    feedback: "Compassionate yet fierce. She handled my custody case with the sensitivity it required while being tough in court.",
    role: "Family Law",
  },
  {
    name: "Michael D'Souza",
    feedback: "Review of our international contracts was spotless. She spotted risks we would have completely missed.",
    role: "Contract Law",
  },
  {
    name: "Rajesh K.",
    feedback: "I won my case against a big builder thanks to her. She doesn't back down from a fight.",
    role: "Consumer Court",
  },
];

// Split testimonials into two rows for the marquee effect
const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

// ---
// --- 2. THE MAIN PAGE COMPONENT ---
// ---
const AdvocateProfilePage = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [openAreaIndex, setOpenAreaIndex] = useState<number | null>(null);
  const [loadVideoId, setLoadVideoId] = useState<string | null>(null);

  const toggleArea = (index: number) => {
    setOpenAreaIndex(openAreaIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-24 pb-16 relative overflow-hidden font-sans">
      
      {/* --- Floating CTA Button --- */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          size="lg"
          onClick={() => setShowCalendly(true)}
          className="bg-slate-900 text-white hover:bg-slate-800 shadow-xl rounded-full px-6 py-6 h-auto"
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
          className="max-w-6xl mx-auto"
        >
          
          {/* --- Hero Section --- */}
          <div className="text-center mb-20 mt-8">
            <motion.div 
              variants={itemVariants}
              className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-2xl"
            >
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRzy-W6Dil85l5oRi3d6FcljHxL3oOHwuOfZ3p9uqTO0KFDr9ierdwxIVh_iYAl1Au4k&usqp=CAU" 
                alt="Advocate Profile" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl font-serif font-bold text-slate-900 mb-4 tracking-tight"
            >
              Advocate Sarbari Majumder
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl text-slate-600 font-light mb-6 uppercase tracking-widest"
            >
              High Court of Calcutta
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 italic mb-8 max-w-2xl mx-auto border-l-4 border-slate-900 pl-4 py-1"
            >
              “Dedicated to Justice. Committed to Clients.”
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => setShowCalendly(true)}
                size="lg"
                className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-md"
              >
                Schedule Consultation
              </Button>
            </motion.div>
          </div>

          {/* --- About Section --- */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-24">
            <Card className="shadow-lg border-none bg-white">
              <CardContent className="p-10 flex flex-col justify-center h-full">
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Experience & Integrity</h3>
                <p className="text-lg leading-relaxed text-slate-600">
                  Advocate Sarbari Majumder is a distinguished legal practitioner with over 15 years of experience in
                  diverse legal domains including civil, criminal, and arbitration law. Practicing at the High Court of
                  Calcutta, she is known for her strategic thinking and relentless pursuit of justice.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-none bg-slate-900 text-white">
              <CardContent className="p-10 flex flex-col justify-center h-full">
                <h3 className="text-2xl font-bold mb-4 text-slate-200">Client-First Approach</h3>
                <p className="text-lg leading-relaxed text-slate-300">
                  Her practice emphasizes ethical representation, transparent communication, and client-first service.
                  Advocate Majumder has successfully represented clients across India, providing clarity and confidence
                  in every legal process.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* --- Practice Areas Section --- */}
          <motion.h3
            variants={itemVariants}
            className="text-4xl font-bold text-center text-slate-900 mb-16 font-serif"
          >
            Practice Areas
          </motion.h3>
          
          <div className="space-y-20 mb-32">
            {practiceAreas.map((area, index) => {
              const isEven = index % 2 === 0;
              const isOpen = openAreaIndex === index;

              return (
                <motion.div
                  key={area.title}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 50 }}
                >
                  <div className={`w-full md:w-1/2 ${isEven ? "md:order-1" : "md:order-2"}`}>
                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl h-64 md:h-80 w-full">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 z-10" />
                      <img 
                        src={area.image} 
                        alt={area.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className={`w-full md:w-1/2 ${isEven ? "md:order-2" : "md:order-1"}`}>
                    <div className="cursor-pointer group" onClick={() => toggleArea(index)}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-3xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                          {area.title}
                        </h4>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-2 bg-slate-100 rounded-full group-hover:bg-slate-200"
                        >
                          <ChevronDown className="w-6 h-6 text-slate-600" />
                        </motion.div>
                      </div>
                      <p className="text-xl text-slate-600 mb-4">{area.preview}</p>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          variants={contentVariants}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="h-[1px] w-full bg-slate-200 my-4" />
                          <p className="text-slate-700 text-lg leading-relaxed">{area.details}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* --- Featured Videos Section --- */}
          <div className="bg-slate-900 -mx-4 md:-mx-20 px-4 md:px-20 py-20 mb-24 rounded-3xl">
            <motion.h3 variants={itemVariants} className="text-3xl font-bold text-center text-white mb-12">
              Legal Insights & Resources
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredVideos.map((video, i) => (
                <motion.div
                  key={video.id}
                  className="relative overflow-hidden rounded-xl shadow-2xl bg-black aspect-video border border-slate-700"
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
                      className="w-full h-full flex flex-col items-center justify-center group relative"
                      aria-label={`Play video: ${video.title}`}
                    >
                      <img 
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <PlayCircle className="w-16 h-16 text-white drop-shadow-lg transition-transform group-hover:scale-110 mb-4" />
                        <span className="text-white font-semibold text-lg px-4 text-center drop-shadow-md">
                            {video.title}
                        </span>
                      </div>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- Infinite Testimonials Marquee --- */}
          <div className="mb-24 overflow-hidden w-full">
             <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-center text-slate-900 mb-12"
            >
              Client Testimonials
            </motion.h3>

            {/* Row 1: Scrolls Right to Left */}
            <div className="flex mb-6 relative max-w-[100vw] overflow-hidden">
                <motion.div
                  className="flex gap-6 min-w-full"
                  animate={{ x: "-50%" }} 
                  transition={{
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear",
                  }}
                >
                  {/* Duplicate content for seamless loop */}
                  {[...firstRow, ...firstRow].map((t, i) => (
                     <TestimonialCard key={`r1-${i}`} testimonial={t} />
                  ))}
                </motion.div>
            </div>

            {/* Row 2: Scrolls Left to Right */}
            <div className="flex relative max-w-[100vw] overflow-hidden">
                <motion.div
                  className="flex gap-6 min-w-full"
                  initial={{ x: "-50%" }}
                  animate={{ x: "0%" }} 
                  transition={{
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear",
                  }}
                >
                   {/* Duplicate content for seamless loop */}
                   {[...secondRow, ...secondRow].map((t, i) => (
                     <TestimonialCard key={`r2-${i}`} testimonial={t} />
                  ))}
                </motion.div>
            </div>
          </div>

          {/* --- FAQ Section --- */}
          <motion.h3 variants={itemVariants} className="text-3xl font-bold text-center text-slate-900 mb-10">
            Frequently Asked Questions
          </motion.h3>
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-24">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-200 rounded-lg bg-white px-4 shadow-sm">
                  <AccordionTrigger className="text-lg font-medium text-slate-800 hover:text-blue-700 hover:no-underline py-6">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-lg pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>

      {/* --- Calendly Modal --- */}
      <AnimatePresence>
        {showCalendly && (
          <motion.div
            className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCalendly(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden h-[70vh]"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCalendly(false)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full p-2 z-10 transition-colors"
                aria-label="Close booking modal"
              >
                <ChevronDown className="w-6 h-6 rotate-180" />
              </button>
              <iframe
                src={CALENDLY_LINK}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book Appointment"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Component for Testimonials
const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
  <div className="min-w-[350px] max-w-[350px] bg-white rounded-xl p-6 shadow-md border border-slate-100 flex flex-col justify-between">
    <div>
      <div className="flex mb-3">
          {[1,2,3,4,5].map(star => (
              <span key={star} className="text-yellow-400 text-lg">★</span>
          ))}
      </div>
      <p className="text-slate-600 italic mb-4 text-md leading-relaxed">"{testimonial.feedback}"</p>
    </div>
    <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center font-bold text-white text-sm">
            {testimonial.name.charAt(0)}
        </div>
        <div>
            <p className="font-bold text-slate-900 text-sm">{testimonial.name}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wide">{testimonial.role}</p>
        </div>
    </div>
  </div>
);

export default AdvocateProfilePage;