import { motion } from "framer-motion";

interface TestimonialMarqueeProps {
  children: React.ReactNode;
  /**
   * Animation duration in seconds
   * @default 40
   */
  duration?: number;
  /**
   * Animation direction
   * @default "left"
   */
  direction?: "left" | "right";
  /**
   * Tailwind classes to apply spacing between children
   * @example "gap-4"
   */
  className?: string;
}

export const TestimonialMarquee = ({
  children,
  duration = 40,
  direction = "left",
  className = "",
}: TestimonialMarqueeProps) => {
  // Determine animation variants based on direction
  const marqueeVariants = {
    animate: {
      x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className={`flex ${className}`} // Apply flex and spacing
        variants={marqueeVariants}
        animate="animate"
      >
        {/* Render children twice for the seamless loop */}
        <span className={`flex ${className}`}>{children}</span>
        <span className={`flex ${className}`}>{children}</span>
      </motion.div>
    </div>
  );
};