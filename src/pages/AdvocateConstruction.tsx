"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { Scale, Gavel, Users, FileText, Calendar } from "lucide-react";
import { useState } from "react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

const practiceAreas = [
  { icon: Scale, title: "Civil Law", description: "Comprehensive civil litigation and property disputes." },
  { icon: Gavel, title: "Criminal Law", description: "Strategic and ethical criminal defense representation." },
  { icon: Users, title: "Legal Consultation", description: "Expert legal advice tailored to client needs." },
  { icon: FileText, title: "Arbitration", description: "Alternative dispute resolution and mediation services." },
];
// --------------------------

const AdvocateProfilePage = () => { // Renamed component
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 pt-24 pb-16 relative overflow-hidden">
      {/* Floating CTA */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 1.5 }} // Delayed to appear last
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40" // z-40 so it's below modal backdrop
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
              className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3"
            >
              Advocate Sarbari Majumder
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-2xl text-muted-foreground mb-4"
            >
              Legal Counsel | High Court of Calcutta
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl italic text-foreground/90 mb-6"
            >
              "Dedicated to Justice. Committed to Clients."
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
          <motion.div variants={itemVariants} className="space-y-6 mb-14">
            <Card className="shadow-glow">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  Advocate Sarbari Majumder is a distinguished legal practitioner...
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-glow">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  With a thorough understanding of both statutory and procedural law...
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
          <div className="grid md:grid-cols-2 gap-6">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                whileHover={{ scale: 1.04, y: -6 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="shadow-glow hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <area.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-2">{area.title}</h4>
                    <p className="text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Calendly Modal with AnimatePresence */}
      <AnimatePresence>
        {showCalendly && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
                src="https://calendly.com/rudranarayanswain/30min" // Remember to change this link!
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