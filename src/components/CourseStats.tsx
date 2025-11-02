import { StatsCounter } from "./StatsCounter";
import { motion } from "framer-motion";

const statsData = [
  { end: 5000, label: "Students Placed", suffix: "+", delay: 0 },
  { end: 25, label: "Highest Salary", suffix: " LPA", delay: 0.1 },
  { end: 50, label: "Partner Companies", suffix: "+", delay: 0.2 },
  { end: 5, label: "Average Salary", suffix: " LPA", delay: 0.3 },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const CourseStats = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-muted/30 via-muted/10 to-muted/30 overflow-hidden">
      {/* Subtle background blur effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-primary/20 blur-3xl rounded-full top-20 left-10 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-secondary/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              className="bg-background/60 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl border border-border/40"
            >
              <StatsCounter
                end={stat.end}
                label={stat.label.toUpperCase()}
                suffix={stat.suffix}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
