"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, PlayCircle, ChevronDown, ShieldCheck, Server, Code } from "lucide-react";
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
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

const contentVariants = {
  collapsed: { opacity: 0, height: 0, marginBottom: 0 },
  open: { opacity: 1, height: "auto", marginBottom: "1rem" },
};

// --- Practice Areas Data (With Clean Images) ---
const practiceAreas = [
  {
    title: "Civil Law",
    image: "data:image/jpeg;base64,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",
    preview: "Comprehensive support for property disputes, contract breaches, and inheritance matters.",
    details: "Our full-service civil law practice provides comprehensive litigation support and advisory services. We are dedicated to protecting your rights and assets through meticulous case preparation and strong courtroom representation.",
  },
  {
    title: "Criminal Law",
    image: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&q=80&w=800",
    preview: "Strategic and ethical criminal defense for a wide range of cases, from bail to trial.",
    details: "We offer a robust defense for all criminal charges. Our approach is focused on ensuring a fair legal process, protecting your constitutional rights, and achieving the best possible outcome.",
  },
  {
    title: "Legal Consultation",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    preview: "Expert legal advice tailored to your specific situation to help you understand your options.",
    details: "Get expert legal advice tailored to your specific situation. We help you understand complex legal issues, explore your options, and make informed decisions via online or in-person sessions.",
  },
  {
    title: "Arbitration",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    preview: "A faster, more efficient alternative to traditional court proceedings for resolving disputes.",
    details: "As a faster alternative to traditional court proceedings, we offer expert arbitration and mediation services. We help resolve commercial and civil disputes efficiently, saving you time and money.",
  },
];

// --- Featured Videos Data ---
const featuredVideos = [
  { id: "YiYEtB3_Sv4", title: "Stages of a Civil Suit in India" },
  { id: "v9mR1DgEApE", title: "India's New Criminal Laws Explained" },
  { id: "YLgm_Lv-w1A", title: "The Arbitration Process in India" },
];

// --- FAQ Data (Updated with TDCS) ---
const faqs = [
  {
    icon: Calendar,
    q: "How do I book a consultation?",
    a: "Click the 'Book Appointment' button to instantly schedule a session via Calendly.",
  },
  {
    icon: ShieldCheck,
    q: "Which areas of law does Advocate Majumder specialize in?",
    a: "Civil, criminal, arbitration, and property disputes — with over 15 years of experience.",
  },
  {
    icon: Code,
    q: "Who powers the technology behind this platform?",
    a: "This digital legal platform is powered by **TDCS Technologies Pvt Ltd**, ensuring a seamless, fast, and secure user experience for all clients.",
  },
  {
    icon: Server,
    q: "Is my data secure with TDCS?",
    a: "Absolutely. **TDCS Technologies** employs industry-leading encryption and data protection standards to ensure your legal inquiries and personal details remain strictly confidential.",
  },
  {
    icon: Code,
    q: "How do I contact technical support?",
    a: "For any technical issues regarding the website or booking system, **TDCS Technologies** provides 24/7 support to ensure uninterrupted legal access.",
  },
];

// --- Testimonials Data ---
const testimonials = [
  { name: "Rahul Mehta", feedback: "Advocate Majumder was incredibly professional and guided me through a difficult civil case with clarity.", role: "Civil Litigation" },
  { name: "Priya Singh", feedback: "Her attention to detail and ethical practice truly stood out. I felt supported and informed throughout my case.", role: "Family Dispute" },
  { name: "Amit Verma", feedback: "Expert advice and a personal touch — she helped me resolve a long-standing legal issue smoothly.", role: "Property Law" },
  { name: "Sneha Reddy", feedback: "We needed swift arbitration for a corporate dispute, and her strategy was flawless. Highly recommended.", role: "Corporate Arbitration" },
  { name: "Vikram Malhotra", feedback: "She saved my ancestral land from illegal possession. Her knowledge of land laws in West Bengal is unmatched.", role: "Real Estate" },
  { name: "Dr. Anjali Gupta", feedback: "Compassionate yet fierce. She handled my custody case with the sensitivity it required.", role: "Family Law" },
  { name: "Michael D'Souza", feedback: "Review of our international contracts was spotless. She spotted risks we would have completely missed.", role: "Contract Law" },
  { name: "Rajesh K.", feedback: "I won my case against a big builder thanks to her. She doesn't back down from a fight.", role: "Consumer Court" },
];

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
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 relative overflow-hidden font-sans">
      
      {/* --- Animated Background Mesh --- */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl mix-blend-multiply filter"
          />
          <motion.div 
             animate={{ scale: [1, 1.1, 1], rotate: [0, -60, 0], y: [0, -50, 0] }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full blur-3xl mix-blend-multiply filter"
          />
      </div>

      {/* --- Floating CTA Button --- */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          onClick={() => setShowCalendly(true)}
          className="bg-slate-900 text-white hover:bg-slate-800 shadow-2xl shadow-slate-900/40 rounded-full px-6 py-6 h-auto border border-slate-700"
        >
          <Calendar className="mr-2 w-5 h-5" />
          Book Appointment
        </Button>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          
          {/* --- Hero Section --- */}
          <div className="text-center mb-24 mt-8">
            <motion.div 
              variants={itemVariants}
              className="w-36 h-36 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-slate-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400" 
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
              className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900 font-medium mb-6 uppercase tracking-widest"
            >
              High Court of Calcutta
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 italic mb-10 max-w-2xl mx-auto border-l-4 border-slate-900 pl-6 py-2 bg-white/50 backdrop-blur-sm rounded-r-lg"
            >
              “Dedicated to Justice. Committed to Clients. Powered by Innovation.”
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => setShowCalendly(true)}
                size="lg"
                className="bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-xl px-10 py-7 text-lg rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                Schedule Consultation
              </Button>
            </motion.div>
          </div>

          {/* --- About Section --- */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-32">
            <Card className="shadow-xl border-none bg-white/80 backdrop-blur-md hover:shadow-2xl transition-shadow duration-500">
              <CardContent className="p-10 flex flex-col justify-center h-full">
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Experience & Integrity</h3>
                <p className="text-lg leading-relaxed text-slate-600">
                  Advocate Sarbari Majumder is a distinguished legal practitioner with over 15 years of experience in
                  diverse legal domains including civil, criminal, and arbitration law. Practicing at the High Court of
                  Calcutta, she is known for her strategic thinking and relentless pursuit of justice.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-xl border-none bg-slate-900 text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              <CardContent className="p-10 flex flex-col justify-center h-full relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-slate-200">Client-First Approach</h3>
                <p className="text-lg leading-relaxed text-slate-300">
                  Her practice emphasizes ethical representation, transparent communication, and client-first service.
                  Advocate Majumder has successfully represented clients across India, providing clarity and confidence
                  in every legal process.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* --- Practice Areas (Interactive) --- */}
          <motion.h3 variants={itemVariants} className="text-4xl font-bold text-center text-slate-900 mb-20 font-serif">
            Practice Areas
          </motion.h3>
          
          <div className="space-y-24 mb-32">
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
                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl h-64 md:h-80 w-full transform transition-transform hover:scale-[1.02] duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img 
                        src={area.image} 
                        alt={area.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4 z-20 md:hidden">
                         <span className="text-white font-bold text-xl">{area.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`w-full md:w-1/2 ${isEven ? "md:order-2" : "md:order-1"}`}>
                    <div className="cursor-pointer group" onClick={() => toggleArea(index)}>
                      <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
                        <h4 className="text-3xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {area.title}
                        </h4>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-2 bg-slate-100 rounded-full group-hover:bg-blue-50"
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
                          className="overflow-hidden"
                        >
                          <p className="text-slate-700 text-lg leading-relaxed bg-slate-50 p-4 rounded-lg border-l-4 border-blue-600">
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

           {/* --- Videos Section --- */}
           <div className="bg-slate-900 -mx-4 md:-mx-20 px-4 md:px-20 py-24 mb-32 rounded-[3rem] shadow-2xl relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
            
            <motion.h3 variants={itemVariants} className="text-4xl font-bold text-center text-white mb-16 relative z-10">
              Legal Insights & Resources
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-10 relative z-10">
              {featuredVideos.map((video, i) => (
                <motion.div
                  key={video.id}
                  className="relative overflow-hidden rounded-2xl shadow-2xl bg-black aspect-video border border-slate-700 group hover:ring-4 hover:ring-slate-700 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
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
                    >
                      <img 
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 transform group-hover:scale-110"
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <PlayCircle className="w-20 h-20 text-white drop-shadow-xl transition-transform duration-300 group-hover:scale-125 mb-6" />
                        <span className="text-white font-semibold text-lg px-6 text-center drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                            {video.title}
                        </span>
                      </div>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- Marquee Testimonials --- */}
          <div className="mb-32 overflow-hidden w-full">
             <motion.h3 variants={itemVariants} className="text-4xl font-bold text-center text-slate-900 mb-16 font-serif">
              Client Testimonials
            </motion.h3>

            <div className="flex mb-8 relative max-w-[100vw] overflow-hidden mask-image-gradient">
                <motion.div
                  className="flex gap-8 min-w-full"
                  animate={{ x: "-50%" }} 
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  {[...firstRow, ...firstRow].map((t, i) => <TestimonialCard key={`r1-${i}`} testimonial={t} />)}
                </motion.div>
            </div>

            <div className="flex relative max-w-[100vw] overflow-hidden mask-image-gradient">
                <motion.div
                  className="flex gap-8 min-w-full"
                  initial={{ x: "-50%" }}
                  animate={{ x: "0%" }} 
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                   {[...secondRow, ...secondRow].map((t, i) => <TestimonialCard key={`r2-${i}`} testimonial={t} />)}
                </motion.div>
            </div>
          </div>

          {/* --- FAQ Section (ENHANCED WITH TDCS) --- */}
          <div className="max-w-4xl mx-auto mb-32">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="text-center mb-12"
             >
                <h3 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Frequently Asked Questions</h3>
                <p className="text-slate-500">Common questions about legal services and our technology partner.</p>
             </motion.div>

             <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="space-y-6"
             >
                <Accordion type="single" collapsible className="space-y-6">
                  {faqs.map((f, i) => (
                    <motion.div key={i} variants={itemVariants}>
                      <AccordionItem 
                        value={`faq-${i}`} 
                        className="border-none rounded-2xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                      >
                        <AccordionTrigger className="px-8 py-6 hover:no-underline group">
                          <div className="flex items-center gap-4 text-left">
                            <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                              <f.icon className="w-6 h-6" />
                            </div>
                            <span className="text-lg font-semibold text-slate-800 group-hover:text-slate-900">
                              {f.q}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-8 pb-6 pt-2">
                          <div className="pl-14 text-slate-600 text-lg leading-relaxed">
                            {/* Render with markdown-like bold support */}
                            {f.a.split("**").map((part, index) => 
                              index % 2 === 1 ? <span key={index} className="font-bold text-slate-900">{part}</span> : part
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
             </motion.div>
          </div>

        </motion.div>
      </div>

      {/* --- Calendly Modal --- */}
      <AnimatePresence>
        {showCalendly && (
          <motion.div
            className="fixed inset-0 bg-slate-900/90 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCalendly(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden h-[75vh]"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCalendly(false)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-full p-2 z-10 transition-colors"
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
  <div className="min-w-[350px] max-w-[350px] bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
    <div>
      <div className="flex mb-4 space-x-1">
          {[1,2,3,4,5].map(star => (
              <span key={star} className="text-yellow-400 text-xl">★</span>
          ))}
      </div>
      <p className="text-slate-600 italic mb-6 text-lg leading-relaxed">"{testimonial.feedback}"</p>
    </div>
    <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
        <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md">
            {testimonial.name.charAt(0)}
        </div>
        <div>
            <p className="font-bold text-slate-900 text-base">{testimonial.name}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{testimonial.role}</p>
        </div>
    </div>
  </div>
);

export default AdvocateProfilePage;