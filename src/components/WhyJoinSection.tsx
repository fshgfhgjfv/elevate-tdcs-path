"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Users, Briefcase, Target, Award } from "lucide-react";

const reasons = [
  {
    icon: BookOpen,
    title: "Learn from the Best",
    description: "Learn high demand skills taught by industry experts & experienced professionals.",
    rating: "4.7/5",
    badge: "Top rated, holistic learning experience",
  },
  {
    icon: Users,
    title: "Get Mentored & Clear Doubts",
    description: "Receive 1-on-1 mentorship & get your doubts resolved instantly for a smooth learning experience.",
    rating: "4.9/5",
    badge: "Master topics with extensive mentorship",
  },
  {
    icon: Briefcase,
    title: "Build Real-World Industry Projects",
    description: "Work on real-world, industry-level projects to strengthen your skills and portfolio.",
    rating: "10+",
    badge: "Build working projects for production",
  },
  {
    icon: Target,
    title: "Perfect Your Skills with Mock Sessions",
    description: "Sharpen your skills through extensive mock interviews & assessments to ensure you're job-ready.",
    rating: "12+",
    badge: "Simulate actual interviews",
  },
  {
    icon: Award,
    title: "Ace Placements & Land Your Dream Tech Job",
    description: "Become industry ready & secure your dream tech role with our comprehensive placement support.",
    rating: "50+",
    badge: "Companies hiring",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 20 },
  },
};

export const WhyJoinSection = () => {
  return (
    <section
      id="why-join"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10"
    >
      {/* Floating Glow Effect */}
      <motion.div
        className="absolute -top-24 left-0 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Why TDCS Technologies?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Experience personalized mentorship, real-world learning, and
            guaranteed placement guidance that sets you apart.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotateX: 3,
                rotateY: -3,
                boxShadow:
                  "0px 10px 25px rgba(147, 197, 253, 0.25), 0 0 30px rgba(59, 130, 246, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
            >
              <Card className="h-full border border-border/30 backdrop-blur-md bg-white/60 hover:bg-white/80 transition-all duration-500 group relative overflow-hidden">
                {/* Glow pulse background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <CardContent className="relative z-10 p-8">
                  {/* Icon Animation */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ rotate: 10, scale: 1.2 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5 mx-auto shadow-md"
                  >
                    <reason.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 text-center">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    {reason.description}
                  </p>

                  <div className="border-t border-border/30 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold gradient-text">
                        {reason.rating}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all"
                      >
                        Book Free Session
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{reason.badge}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
