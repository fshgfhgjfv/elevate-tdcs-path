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
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
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