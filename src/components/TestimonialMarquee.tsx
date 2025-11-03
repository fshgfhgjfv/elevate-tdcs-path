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
  // Determine x values based on direction
  const xValues = direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"];

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className={`flex ${className}`}
        animate={{ x: xValues }}
        transition={{
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: duration,
          ease: "linear",
        }}
      >
        {/* Render children twice for the seamless loop */}
        <span className={`flex ${className}`}>{children}</span>
        <span className={`flex ${className}`}>{children}</span>
      </motion.div>
    </div>
  );
};