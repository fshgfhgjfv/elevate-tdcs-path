"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Gavel, Users, FileText, Calendar, PlayCircle } from "lucide-react";
import { useState } from "react";

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

const practiceAreas = [
  { icon: Scale, title: "Civil Law", description: "Comprehensive civil litigation and property disputes." },
  { icon: Gavel, title: "Criminal Law", description: "Strategic and ethical criminal defense representation." },
  { icon: Users, title: "Legal Consultation", description: "Expert legal advice tailored to client needs." },
  { icon: FileText, title: "Arbitration", description: "Alternative dispute resolution and mediation services." },
];

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

const AdvocateProfilePage = () => {
  const [showCalendly, setShowCalendly] = useState(false);

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
          {/* Hero Section */}
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

          {/* About Section */}
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

          {/* Practice Areas */}
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10"
          >
            Practice Areas
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {practiceAreas.map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -6 }}
              >
                <Card className="shadow-glow hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <area.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-2">{area.title}</h4>
                    <p className="text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Embedded Videos */}
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-10"
          >
            Featured Videos
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {[1, 2, 3].map((v) => (
              <motion.div
                key={v}
                className="relative overflow-hidden rounded-2xl shadow-lg group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: v * 0.1 }}
              >
                <iframe
                  className="w-full h-64 rounded-2xl"
                  src="https://www.youtube.com/embed/1Hk7kyfpKjU"
                  title={`Video ${v}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <motion.div
                  className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                >
                  <PlayCircle className="w-16 h-16 text-white" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials Scroller */}
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
                <p className="font-semibold text-right">— {t.name}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setShowCalendly(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
              >
                ✕
              </button>
              <iframe
                src="https://calendly.com/rudranarayanswain/30min"
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
