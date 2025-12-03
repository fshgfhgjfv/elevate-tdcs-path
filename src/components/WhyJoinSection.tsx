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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export const WhyJoinSection = () => {
  return (
    <section id="why-join" className="relative py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Why TDCS Technologies?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experience personalized mentorship, real-world learning, and
            guaranteed placement guidance.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
            >
              <Card className="h-full border-0 bg-card shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <span className="text-2xl font-bold gradient-text">
                        {reason.rating}
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {reason.badge}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10 font-medium"
                    >
                      Book Session
                    </Button>
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
