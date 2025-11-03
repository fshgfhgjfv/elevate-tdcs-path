import { useState, useRef } from "react"; // Added useRef
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { motion, useScroll, useTransform } from "framer-motion"; // Added useScroll and useTransform
import { HiringPartners } from "@/components/HiringPartners";
import { RecruiterTestimonial } from "@/components/RecruiterTestimonial";

// Data for the course perks sections
const coursePerks = [
  {
    title: "Exclusive Swag Pack",
    description:
      "Show off your skills with our exclusive kit, including a premium T-shirt, stickers, and other goodies delivered to your doorstep.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEhWb4nI8g2Sr24qhD0KUaLd44ByiPtXmBuWFkeJN0nZt4vt1EbaNwoYb_PzOVLbGlEz01uC6e78QdlhR5YQrhAimAX-N3u8SzZajBkIYcIQ3Umwsl1or2rHZJCWMVGlicpGlmncQnyEBS8-TwiVSxEf5q3B8yHex0CSa2fyyaz5IeCGD4HCJxVfXZB4QM75",
    layout: "text-left", // text-left, image-right
  },
  {
    title: "Pro Hacking Toolkit",
    description:
      "Gain access to a curated toolkit of premium cybersecurity software and platforms, the same tools used by professionals in the field.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEiF0pE9E9cI6SZ0_mC-JOYMKbn5qnp-puKFHtqzuqHA2r3pDTFpqgssYyjvyswgxFuqe1fCYyyXbuUq-i17TRx4ertGqicGG4do7acBIysjZqEZpS4_65C500s9x4iEOhBd0aEGTS2JspYxRORsHozbLPEiXpo-7b4Z9SCP8WOir8Wz9n13kNHP7dKUven9",
    layout: "text-right", // text-right, image-left
  },
  {
    title: "Premium Certification",
    description:
      "Receive an industry-recognized certificate upon completion, validating your new skills and boosting your career prospects.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEgQBCknDQq2PSSJ5SzQS6ei73FcO8IbRNgjKW3b9r3DtAnmMR_9OClnJXyZn9MEci-jQazc0qSX6nRaRn638FkssY5npovgqEHVu6o2FfNjB1oXXSbuxV9OCu2dArjAC1HOMOJHrP3-TvNgbHqIxfeIEf9H6BeQa2VziRX7w3u4Tx1QigCeDINCHEHPIsnm",
    layout: "text-left", // text-left, image-right
  },
  {
    title: "HACKER'S PENDRIVE",
    description:
      "Get The Pendrive For Free With TDCS Courses. It comes pre-loaded with everything you need.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEjcQA7l6TaSYW4QYsDfMXN_HqfBECITrE7LktjD2-41QpgpTQ29RL5xPgNs4vDAzPW6k0EM9p-OSdaTR3chzl97ZxiGAFRvfV4O4Im8i6JJZXT4IDK-LM2OIBG8N8tsf4Wwn4wTJaUzqtQJd3sdza1yhMvhj2KRPivVJyCCMzKp2WpX24VksPf3ceiItGl1",
    layout: "text-right", // text-right, image-left
    glowing: true, // Flag for the title
    features: [
      { text: "100+ Premium Tools", position: "top-[10%] right-[5%]" },
      { text: "WiFi Hacking Tool", position: "top-[33%] left-[5%]" },
      { text: "Ebooks & Guides", position: "top-[66%] right-[5%]" },
      { text: "Training Video", position: "bottom-[10%] left-[5%]" },
    ],
  },
];

// --- NEW DATA FOR SWAG SECTION ---
const swagImages = [
  "https://raw.githubusercontent.com/fshgfhgjfv/IMG_TDCS/refs/heads/main/IMG-20251026-WA0019.jpg",
  "https://blogger.googleusercontent.com/img/a/AVvXsEil9mJhJ3oPSOFn9MIYAJAzPKo8VlwNHCOBOhBjvYN6jQR-46Os1F1T9lyEG4je_R4_8aSgkiZ4Hepms5n3GRha0j8gFFP9xuU8H6mB7ksYKwCLMcEy4-l97j2dPaaYQLa8wjHX3uQUodD_OccAtOwFLF7eW_1R7JarpbXPOnt3MqrU8pL3sKmTvx6HxVf0",
  "https://raw.githubusercontent.com/fshgfhgjfv/IMG_TDCS/23685c834910e11076a6c0fa7a4a1d7625d61f18/IMG-20251026-WA0022.jpg",
  "https://raw.githubusercontent.com/fshgfhgjfv/IMG_TDCS/23685c834910e11076a6c0fa7a4a1d7625d61f18/IMG-20251026-WA0029.jpg",
  "https://blogger.googleusercontent.com/img/a/AVvXsEgUsXyjOoRJO2etN49T47IEJzrCgbYoFgOYD-2U9zKLCZVzaRZlRjq7KjqEVTgCE7dWv2plBB-9WXuhMK40DD69K3NPavYbEOcJQgcKRZvREPUiavpcT3DItN9AAiitopPK11wq5U0FNhBP269HCi8lpQSvr9dD_pKjLiK5A-aOzKXtuT0pIT-ueixGgRdd",
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Live Courses");
  const categories = ["Live Courses", "Recorded Courses", "Offline Courses"];

  // Filter live courses only — recorded/offline will show placeholders
  const filteredCourses =
    selectedCategory === "Live Courses"
      ? courses.filter((course) => course.category === "Live Online")
      : [];

  // --- HOOKS FOR HORIZONTAL SCROLL ---
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"], // Animate while section is in view
  });
  // This transform maps vertical scroll (0 to 1) to horizontal movement
  // Adjust "-80%" to control how much it scrolls. More negative = scrolls more.
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["5%", "-80%"]);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* ... (Page Title, Filters, Courses Grid, Coming Soon sections) ... */}
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Our Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our expertly curated cybersecurity training programs
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "gradient-primary text-white shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid or Coming Soon */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {selectedCategory === "Live Courses" &&
            filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
        </motion.div>

        {/* Coming Soon for Recorded/Offline */}
        {(selectedCategory === "Recorded Courses" ||
          selectedCategory === "Offline Courses") && (
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
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

        {/* No live courses fallback */}
        {selectedCategory === "Live Courses" && filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No live courses available right now.
            </p>
          </div>
        )}
      </div>

      {/* --- Course Perks Section --- */}
      <div className="container mx-auto px-4 mt-24 space-y-16">
        {coursePerks.map((perk, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
              perk.layout === "text-right" ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2
                className={`text-3xl md:text-4xl font-bold gradient-text ${
                  perk.glowing ? "animate-pulse" : ""
                }`}
              >
                {perk.title}
              </h2>
              <p
                className={`text-lg text-muted-foreground max-w-md ${
                  perk.layout === "text-right" ? "md:ml-auto" : "md:mr-auto"
                }`}
              >
                {perk.description}
              </p>
            </div>

            {/* Image Content */}
            <div className="flex-1 relative max-w-md mx-auto w-full">
              <img
                src={perk.imageUrl}
                alt={perk.title}
                className="rounded-lg shadow-xl w-full h-auto"
                loading="lazy"
                decoding="async"
              />

              {/* Conditional overlay for features */}
              {perk.features && (
                <div className="absolute inset-0 p-4">
                  {perk.features.map((feature, i) => (
                    <motion.span
                      key={i}
                      initial={{
                        opacity: 0.7,
                        scale: 0.98,
                        boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
                      }}
                      animate={{
                        opacity: [0.7, 1, 0.7],
                        scale: [0.98, 1.02, 0.98],
                        boxShadow: [
                          "0 0 10px rgba(239, 68, 68, 0.5)",
                          "0 0 20px rgba(239, 68, 68, 1)",
                          "0 0 10px rgba(239, 68, 68, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className={`
                        absolute 
                        px-3 py-1 md:px-4 md:py-2
                        bg-red-600 
                        text-white text-[10px] sm:text-xs md:text-base font-bold text-center 
                        rounded-full 
                        whitespace-nowrap
                        ${feature.position}
                      `}
                    >
                      {feature.text}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      {/* --- END OF Course Perks Section --- */}

      {/* --- NEW SWAG & TOOLS SECTION --- */}
      <div className="mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text text-center mb-12">
            Free Swags and Tools Get
          </h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="relative w-full overflow-x-hidden pb-16"
        >
          <motion.div
            className="flex w-max gap-6 sm:gap-8 px-4" // w-max forces it to be wide
            style={{ x }} // Apply the horizontal scroll transform
          >
            {swagImages.map((src, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-72 md:w-96 rounded-lg shadow-xl overflow-hidden"
                style={{ perspective: "1000px" }} // For 3D effect
                whileHover={{ scale: 1.05, translateZ: "20px" }} // 3D pop effect
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={src}
                  alt={`Swag item ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* --- END OF NEW SECTION --- */}

      {/* Hiring Partners Section */}
      <div className="mt-24">
        <HiringPartners />
      </div>

      {/* Recruiter Testimonial */}
      <div className="mt-16">
        <RecruiterTestimonial />
      </div>
    </div>
  );
};

export default Courses;