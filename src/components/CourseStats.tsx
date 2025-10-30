import { StatsCounter } from "./StatsCounter";
import { motion } from "framer-motion";

export const CourseStats = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          <StatsCounter end={5000} label="STUDENTS PLACED" suffix="+" />
          <StatsCounter end={18} label="HIGHEST SALARY" suffix=" LPA" />
          <StatsCounter end={50} label="PARTNER COMPANIES" suffix="+" />
          <StatsCounter end={6.5} label="AVERAGE SALARY" suffix=" LPA" />
        </motion.div>
      </div>
    </section>
  );
};
