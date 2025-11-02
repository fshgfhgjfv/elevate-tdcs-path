import { useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import { HiringPartners } from "@/components/HiringPartners";
import { RecruiterTestimonial } from "@/components/RecruiterTestimonial";

// Data for the new feature/perks sections
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
  // --- MODIFIED PERK SECTION ---
  {
    title: "HACKER'S PENDRIVE",
    description:
      "Get The Pendrive For Free With TDCS Courses. It comes pre-loaded with everything you need.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEjcQA7l6TaSYW4QYsDfMXN_HqfBECITrE7LktjD2-41QpgpTQ29RL5xPgNs4vDAzPW6k0EM9p-OSdaTR3chzl97ZxiGAFRvfV4O4Im8i6JJZXT4IDK-LM2OIBG8N8tsf4Wwn4wTJaUzqtQJd3sdza1yhMvhj2KRPivVJyCCMzKp2WpX24VksPf3ceiItGl1",
    layout: "text-right", // text-right, image-left
    glowing: true, // Flag for the title
    // --- UPDATED FEATURES to include positioning ---
    features: [
      { text: "125+ Premium Softwares", position: "top-4 right-4" },
      { text: "Scripts & Payloads", position:, "top-1/3 left-4" },
      { text: "Ebooks & Guides", position: "top-2/3 right-4" },
      { text: "Training Video", position: "bottom-4 left-4" },
    ],
  },
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Live Courses");
  const categories = ["Live Courses", "Recorded Courses", "Offline Courses"];

  // Filter live courses only — recorded/offline will show placeholders
  const filteredCourses =
    selectedCategory === "Live Courses"
      ? courses.filter((course) => course.category === "Live Online")
      : [];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
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
      <div className="container mx-auto px-4 mt-24 space-y-20">
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

            {/* --- MODIFIED Image Content --- */}
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
                // This div is the container for the absolute positioned text
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg p-4">
                  {perk.features.map((feature, i) => (
                    <motion.span
                      key={i}
                      // Animation for blinking/glowing/zooming text
                      initial={{ opacity: 0.7, scale: 0.98 }}
                      animate={{ opacity: [0.7, 1, 0.7], scale: [0.98, 1.02, 0.98] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2, // Stagger the animation
                      }}
                      // --- APPLIED POSITIONING AND GLOW ---
                      className={`
                        absolute p-2 
                        text-white text-lg md:text-xl font-bold text-center 
                        drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] 
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
      {/* --- END OF SECTION --- */}

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