import { useState, useRef } from "react";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiringPartners } from "@/components/HiringPartners";
import { RecruiterTestimonial } from "@/components/RecruiterTestimonial";
import { CourseFilters, FilterState } from "@/components/CourseFilters";
import { CourseComparison } from "@/components/CourseComparison";

// --- DATA ---
const coursePerks = [
  {
    title: "Exclusive Swag Pack",
    description:
      "Show off your skills with our exclusive kit, including a premium T-shirt, stickers, and other goodies delivered to your doorstep.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEil9mJhJ3oPSOFn9MIYAJAzPKo8VlwNHCOBOhBjvYN6jQR-46Os1F1T9lyEG4je_R4_8aSgkiZ4Hepms5n3GRha0j8gFFP9xuU8H6mB7ksYKwCLMcEy4-l97j2dPaaYQLa8wjHX3uQUodD_OccAtOwFLF7eW_1R7JarpbXPOnt3MqrU8pL3sKmTvx6HxVf0",
    layout: "text-left",
  },
  {
    title: "Pro Hacking Toolkit",
    description:
      "Gain access to a curated toolkit of premium cybersecurity software and platforms, the same tools used by professionals in the field.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEihWInHX5K1pjWjTQG3H8iSoOm2erlLdBg9LEoWawrosqZZwd3cCfUMA72w1vVc9EFanLGEx9zid-QhTq3cEKYJf0xmwjARaHYNhTUZEvBH0fgt0qeO1jb3dziSk9VUx0nCf_cSKxWFck-7R3Ox6PZQYtNHAfjoLKGRQUDOmBkAHx0rzWMmwtUgnop-Znh7",
    layout: "text-right",
  },
  {
    title: "Premium Certification",
    description:
      "Receive an industry-recognized certificate upon completion, validating your new skills and boosting your career prospects.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEgQBCknDQq2PSSJ5SzQS6ei73FcO8IbRNgjKW3b9r3DtAnmMR_9OClnJXyZn9MEci-jQazc0qSX6nRaRn638FkssY5npovgqEHVu6o2FfNjB1oXXSbuxV9OCu2dArjAC1HOMOJHrP3-TvNgbHqIxfeIEf9H6BeQa2VziRX7w3u4Tx1QigCeDINCHEHPIsnm",
    layout: "text-left",
  },
  {
    title: "HACKER'S PENDRIVE",
    description:
      "Get The Pendrive For Free With TDCS Courses. It comes pre-loaded with everything you need.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEjcQA7l6TaSYW4QYsDfMXN_HqfBECITrE7LktjD2-41QpgpTQ29RL5xPgNs4vDAzPW6k0EM9p-OSdaTR3chzl97ZxiGAFRvfV4O4Im8i6JJZXT4IDK-LM2OIBG8N8tsf4Wwn4wTJaUzqtQJd3sdza1yhMvhj2KRPivVJyCCMzKp2WpX24VksPf3ceiItGl1",
    layout: "text-right",
    glowing: true,
    features: [
      { text: "100+ Premium Tools", position: "top-[10%] right-[5%]" },
      { text: "WiFi Hacking Tool", position: "top-[33%] left-[5%]" },
      { text: "Ebooks & Guides", position: "top-[66%] right-[5%]" },
      { text: "Training Video", position: "bottom-[10%] left-[5%]" },
    ],
  },
];

const swagImages = [
  "https://raw.githubusercontent.com/fshgfhgjfv/IMG_TDCS/refs/heads/main/IMG-20251026-WA0019.jpg",
  "https://blogger.googleusercontent.com/img/a/AVvXsEil9mJhJ3oPSOFn9MIYAJAzPKo8VlwNHCOBOhBjvYN6jQR-46Os1F1T9lyEG4je_R4_8aSgkiZ4Hepms5n3GRha0j8gFFP9xuU8H6mB7ksYKwCLMcEy4-l97j2dPaaYQLa8wjHX3uQUodD_OccAtOwFLF7eW_1R7JarpbXPOnt3MqrU8pL3sKmTvx6HxVf0",
  "https://raw.githubusercontent.com/fshgfhgjfv/IMG_TDCS/23685c834910e11076a6c0fa7a4a1d7625d61f18/IMG-20251026-WA0022.jpg",
  "https://raw.githubusercontent.com/fshgfhgjfv/IMG_TDCS/23685c834910e11076a6c0fa7a4a1d7625d61f18/IMG-20251026-WA0029.jpg",
  "https://blogger.googleusercontent.com/img/a/AVvXsEgUsXyjOoRJO2etN49T47IEJzrCgbYoFgOYD-2U9zKLCZVzaRZlRjq7KjqEVTgCE7dWv2plBB-9WXuhMK40DD69K3NPavYbEOcJQgcKRZvREPUiavpcT3DItN9AAiitopPK11wq5U0FNhBP269HCi8lpQSvr9dD_pKjLiK5A-aOzKXtuT0pIT-ueixGgRdd",
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Live Courses");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    duration: [],
    specialization: [],
    placement: null,
  });
  const categories = ["Live Courses", "Recorded Courses", "Offline Courses"];

  // Filter logic
  const applyFilters = () => {
    let filtered = courses.filter((course) => course.category === "Live Online");

    // Price
    filtered = filtered.filter(
      (course) => course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1]
    );

    // Duration
    if (filters.duration.length > 0) {
      filtered = filtered.filter((course) => {
        if (filters.duration.includes("1-2 months") && course.duration.includes("2 months")) return true;
        if (filters.duration.includes("3 months") && course.duration.includes("3 months")) return true;
        if (filters.duration.includes("6+ months") && (course.duration.includes("4 months") || course.duration.includes("5 months") || course.duration.includes("6 months"))) return true;
        return false;
      });
    }

    // Placement
    if (filters.placement === true) {
      filtered = filtered.filter(
        (course) => course.id === "cyber-blackhat" || course.id === "cyber-lite"
      );
    }
    return filtered;
  };

  const filteredCourses = selectedCategory === "Live Courses" ? applyFilters() : [];

  // --- CYBER ANIMATION VARIANTS ---
  // Double data for infinite loop
  const duplicatedSwag = [...swagImages, ...swagImages];

  // Glitch shake effect
  const glitchHover = {
    rest: { x: 0, filter: "brightness(1) contrast(1)" },
    hover: {
      x: [0, -4, 4, -2, 2, 0],
      filter: ["brightness(1)", "brightness(1.5) contrast(1.2)", "brightness(1)"],
      transition: { 
        duration: 0.2, 
        repeat: Infinity,
        repeatType: "mirror" as const // Correct type casting
      },
    },
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
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
        <div className="flex flex-wrap justify-center gap-4 mb-8">
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

        {/* Course Filters */}
        {selectedCategory === "Live Courses" && (
          <CourseFilters onFilterChange={setFilters} />
        )}

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {selectedCategory === "Live Courses" &&
            filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
        </motion.div>

        {/* Coming Soon Fallbacks */}
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

        {selectedCategory === "Live Courses" && filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No live courses available right now.
            </p>
          </div>
        )}
      </div>

      {/* Course Comparison */}
      <div className="mt-24">
        <CourseComparison />
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
                      className={`absolute px-3 py-1 md:px-4 md:py-2 bg-red-600 text-white text-[10px] sm:text-xs md:text-base font-bold text-center rounded-full whitespace-nowrap ${feature.position}`}
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

      {/* --- NEW CYBER WAR SWAG SECTION --- */}
      <div className="mt-32 relative py-12 bg-black/90 border-y border-red-600/30 overflow-hidden">
        
        {/* Background Grid Effect */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="container mx-auto px-4 relative z-10 mb-8">
          <div className="flex flex-col items-center">
            <span className="text-red-500 font-mono text-sm tracking-[0.3em] mb-2 animate-pulse">
              // DEPLOYMENT_READY
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-500 text-center uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              Tactical Gear & Tools
            </h2>
          </div>
        </div>

        {/* Infinite Scroll Track */}
        <div className="flex w-full overflow-hidden relative">
          
          {/* Side Gradients for Fade Out */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-20 z-[20]"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-20 z-[20]"></div>

          <motion.div
            className="flex gap-6 pl-4"
            animate={{ x: ["0%", "-50%"] }} // Loops strictly
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20, // Adjust Speed
                ease: "linear",
              },
            }}
            style={{ width: "max-content" }}
          >
            {duplicatedSwag.map((src, index) => (
              <motion.div
                key={index}
                initial="rest"
                whileHover="hover"
                variants={glitchHover}
                className="relative group w-72 md:w-96 flex-shrink-0 bg-gray-900 border border-gray-700/50 p-2 overflow-hidden"
                style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }} // Cyber Corner Cut
              >
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-500 z-30 transition-all group-hover:w-full group-hover:h-full group-hover:border-green-400 opacity-80"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-500 z-30 transition-all group-hover:w-full group-hover:h-full group-hover:border-green-400 opacity-80"></div>

                {/* Overlay Text */}
                <div className="absolute top-2 right-2 z-30 text-[10px] text-green-500 font-mono bg-black/70 px-1 border border-green-500/30">
                  ASSET_0{index % 5}
                </div>

                {/* The Image */}
                <div className="relative overflow-hidden w-full h-56 md:h-64 bg-black">
                  {/* Scanline Overlay */}
                  <div className="absolute inset-0 z-10 opacity-20 pointer-events-none"
                    style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 3px)" }}
                  ></div>
                  
                  <img
                    src={src}
                    alt={`Swag ${index}`}
                    className="w-full h-full object-cover transition-all duration-300 grayscale-[30%] group-hover:grayscale-0"
                  />
                  
                  {/* Scanning Bar Animation */}
                  <motion.div 
                    className="absolute top-0 bottom-0 w-[2px] bg-green-400 shadow-[0_0_15px_#4ade80] z-20"
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                  />
                </div>

                {/* Bottom Tech Text */}
                <div className="mt-2 flex justify-between items-end font-mono text-[10px] text-gray-500">
                  <span className="group-hover:text-green-400 transition-colors">STATUS: UNLOCKED</span>
                  <span className="text-red-500/50 group-hover:text-red-500 animate-pulse">:: ENCRYPTED ::</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* --- END OF CYBER SWAG SECTION --- */}

      {/* Hiring Partners */}
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