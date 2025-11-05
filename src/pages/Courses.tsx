import { useState, useRef, useEffect } from "react";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { HiringPartners } from "@/components/HiringPartners";
import { RecruiterTestimonial } from "@/components/RecruiterTestimonial";

// === Perks & Swag Data (same as your version) ===
// ... keep your existing coursePerks and swagImages arrays here ...

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Live Courses");
  const categories = ["Live Courses", "Recorded Courses", "Offline Courses"];

  const filteredCourses =
    selectedCategory === "Live Courses"
      ? courses.filter((course) => course.category === "Live Online")
      : [];

  // === Scroll Animations ===
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]); // page tilt
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]); // parallax bg move
  const scalePage = useTransform(scrollYProgress, [0, 1], [1, 0.97]); // subtle zoom out

  // Smooth spring effect
  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(scalePage, { stiffness: 100, damping: 20 });

  // === Scroll Progress Indicator ===
  const scrollIndicator = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // === Optional Fancy Cursor Trail ===
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        perspective: "1200px",
        rotateX: smoothRotateX,
        scale: smoothScale,
      }}
      className="relative overflow-hidden bg-gradient-to-b from-background to-muted"
    >
      {/* === Scroll Progress Bar === */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 z-50 rounded-r-full"
        style={{ scaleX: scrollIndicator, transformOrigin: "0%" }}
      />

      {/* === Fancy Cursor Glow === */}
      <motion.div
        className="fixed pointer-events-none z-50 w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-blue-500/20 blur-2xl"
        style={{ x: cursorX, y: cursorY }}
      />

      {/* === Hero / Courses Section === */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Our Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our expertly curated cybersecurity training programs
          </p>
        </motion.div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat
                  ? "gradient-primary text-white shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {selectedCategory === "Live Courses" &&
            filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ rotateY: 8, rotateX: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
        </motion.div>

        {/* Coming Soon Sections */}
        {(selectedCategory === "Recorded Courses" ||
          selectedCategory === "Offline Courses") && (
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold gradient-text">Coming Soon 🚀</h2>
              <p className="text-lg text-muted-foreground">
                {selectedCategory === "Recorded Courses"
                  ? "Our high-quality recorded sessions are being prepared."
                  : "Offline classroom batches will be launching soon."}
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {/* === Perks Section with Floating Motion === */}
      <div className="container mx-auto px-4 mt-24 space-y-16">
        {coursePerks.map((perk, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              perk.layout === "text-right" ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1 text-center md:text-left space-y-4">
              <h2
                className={`text-3xl md:text-4xl font-bold ${
                  perk.glowing ? "text-pink-500 drop-shadow-glow" : "gradient-text"
                }`}
              >
                {perk.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
                {perk.description}
              </p>
            </div>
            <motion.div
              whileHover={{ rotateY: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="flex-1 relative max-w-md mx-auto"
            >
              <img
                src={perk.imageUrl}
                alt={perk.title}
                className="rounded-lg shadow-2xl w-full"
                loading="lazy"
              />
              {perk.features && (
                <div className="absolute inset-0">
                  {perk.features.map((f, j) => (
                    <motion.span
                      key={j}
                      className={`absolute px-3 py-1 text-xs sm:text-sm font-semibold bg-pink-600 text-white rounded-full ${f.position}`}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [0.95, 1.05, 0.95],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: j * 0.3 }}
                    >
                      {f.text}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
