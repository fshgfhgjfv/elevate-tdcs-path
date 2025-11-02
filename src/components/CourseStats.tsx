import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

// --- Enhanced StatsCounter with animation ---
const StatsCounter = ({ end, label, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ count: end });
    }
  }, [isInView, controls, end]);

  return (
    <div ref={ref} className="flex flex-col items-center space-y-2">
      <motion.span
        className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          animate={controls}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        >
          {Math.floor(end)}
        </motion.span>
        {suffix}
      </motion.span>
      <span className="text-sm md:text-base text-muted-foreground font-medium tracking-wide">
        {label.toUpperCase()}
      </span>
    </div>
  );
};

// --- Main CourseStats section ---
export const CourseStats = () => {
  const statsData = [
    { end: 5000, label: "Students Placed", suffix: "+" },
    { end: 25, label: "Highest Salary", suffix: " LPA" },
    { end: 50, label: "Partner Companies", suffix: "+" },
    { end: 5, label: "Average Salary", suffix: " LPA" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
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

  return (
    <section className="relative py-20 bg-gradient-to-br from-muted/30 via-muted/10 to-muted/30 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-primary/20 blur-3xl rounded-full top-20 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-secondary/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center"
        >
          {statsData.map((stat) => (
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
                label={stat.label}
                suffix={stat.suffix}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
