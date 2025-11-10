"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { testimonials } from "@/data/courses";
import { Quote } from "lucide-react";

interface CourseSpecificTestimonialsProps {
  courseId: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

export const CourseSpecificTestimonials = ({
  courseId,
}: CourseSpecificTestimonialsProps) => {
  const courseTestimonials = testimonials.filter((t) => t.courseId === courseId);

  if (courseTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-secondary/10">
      {/* Floating Glow Orbs */}
      <motion.div
        className="absolute -top-24 left-0 w-80 h-80 bg-primary/20 blur-3xl rounded-full opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 blur-3xl rounded-full opacity-25"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Success Stories from This Course
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear how learners transformed their careers with TDCS Technologies’ expert-led programs.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {courseTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotateX: 2,
                rotateY: -2,
                boxShadow:
                  "0px 8px 25px rgba(147, 197, 253, 0.25), 0 0 30px rgba(59, 130, 246, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="perspective-1000"
            >
              <Card className="h-full bg-white/60 backdrop-blur-md border border-border/30 hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
                {/* Floating Glow Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <CardContent className="relative z-10 p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    {/* Avatar Circle */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1.2 }}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-lg font-bold shadow-lg"
                    >
                      {testimonial.name.charAt(0)}
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.before} → {testimonial.after}
                      </p>
                      <p className="text-xs text-primary font-semibold mt-1">
                        {testimonial.company}
                      </p>
                    </div>

                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Quote className="w-6 h-6 text-primary/30" />
                    </motion.div>
                  </div>

                  {/* Quote Text */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-muted-foreground leading-relaxed text-sm md:text-base italic"
                  >
                    “{testimonial.testimonial}”
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
