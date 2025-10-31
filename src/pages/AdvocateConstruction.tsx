"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Scale, Gavel, Users, FileText, Calendar } from "lucide-react";
import { useState } from "react";

const AdvocateConstruction = () => {
  const [showCalendly, setShowCalendly] = useState(false);

  const practiceAreas = [
    { icon: Scale, title: "Civil Law", description: "Comprehensive civil litigation and property disputes." },
    { icon: Gavel, title: "Criminal Law", description: "Strategic and ethical criminal defense representation." },
    { icon: Users, title: "Legal Consultation", description: "Expert legal advice tailored to client needs." },
    { icon: FileText, title: "Arbitration", description: "Alternative dispute resolution and mediation services." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 pt-24 pb-16 relative">
      {/* Floating CTA */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-14">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Advocate Sarbari Majumder
            </h1>
            <h2 className="text-2xl text-muted-foreground mb-4">
              Legal Counsel | High Court of Calcutta
            </h2>
            <p className="text-xl italic text-foreground/90 mb-6">
              "Dedicated to Justice. Committed to Clients."
            </p>
            <Button
              onClick={() => setShowCalendly(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
            >
              Book a Consultation
            </Button>
          </div>

          {/* About Section */}
          <div className="space-y-6 mb-14">
            <Card className="shadow-glow">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  Advocate Sarbari Majumder is a distinguished legal practitioner with a focused career in civil and criminal litigation at the Hon'ble High Court of Calcutta. Renowned for her integrity, strategic thinking, and client-focused advocacy, she delivers exceptional legal representation grounded in ethics, precision, and professionalism.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-glow">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  With a thorough understanding of both statutory and procedural law, Advocate Majumder combines legal intellect with practical courtroom experience, making her a trusted name in the legal fraternity of West Bengal.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Practice Areas */}
          <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10">
            Practice Areas
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="shadow-glow hover:shadow-lg hover:translate-y-[-4px] transition-all">
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

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative">
            <button
              onClick={() => setShowCalendly(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvocateConstruction;
