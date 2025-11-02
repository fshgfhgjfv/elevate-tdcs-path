import { useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import { HiringPartners } from "@/components/HiringPartners";
import { RecruiterTestimonial } from "@/components/RecruiterTestimonial";

// Extra "Coming Soon" courses (Red/Blue Teaming)
const comingSoonCourses = [
  {
    id: "red-teaming",
    title: "Red Teaming",
    description:
      "Advanced offensive security and adversary emulation — push your hacking skills to the next level.",
    price: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437b8?auto=format&fit=crop&w=800&q=80",
    category: "Offensive Security",
    comingSoon: true,
  },
  {
    id: "blue-teaming",
    title: "Blue Teaming",
    description:
      "Master defensive operations, incident response, and threat hunting in enterprise environments.",
    price: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1605902712828-2a1e32bfa9e7?auto=format&fit=crop&w=800&q=80",
    category: "Defensive Security",
    comingSoon: true,
  },
];

// Data for course perks
const coursePerks = [
  {
    title: "Exclusive Swag Pack",
    description:
      "Show off your skills with our exclusive kit, including a premium T-shirt, stickers, and other goodies delivered to your doorstep.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEhWb4nI8g2Sr24qhD0KUaLd44ByiPtXmBuWFkeJN0nZt4vt1EbaNwoYb_PzOVLbGlEz01uC6e78QdlhR5YQrhAimAX-N3u8SzZajBkIYcIQ3Umwsl1or2rHZJCWMVGlicpGlmncQnyEBS8-TwiVSxEf5q3B8yHex0CSa2fyyaz5IeCGD4HCJxVfXZB4QM75",
    layout: "text-left",
  },
  {
    title: "Pro Hacking Toolkit",
    description:
      "Gain access to a curated toolkit of premium cybersecurity software and platforms used by professionals in the field.",
    imageUrl:
      "https://blogger.googleusercontent.com/img/a/AVvXsEiF0pE9E9cI6SZ0_mC-JOYMKbn5qnp-puKFHtqzuqHA2r3pDTFpqgssYyjvyswgxFuqe1fCYyyXbuUq-i17TRx4ertGqicGG4do7acBIysjZqEZpS4_65C500s9x4iEOhBd0aEGTS2JspYxRORsHozbLPEiXpo-7b4Z9SCP8WOir8Wz9n13kNHP7dKUven9",
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
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Live Courses");
  const categories = ["Live Courses", "Recorded Courses", "Offline Courses"];

  // Filter live courses
  const liveCourses = courses.filter((course) => course.category === "Live Online");

  // Merge live + coming soon
  const filteredCourses =
    selectedCategory === "Live Courses" ? [...liveCourses, ...comingSoonCourses] : [];

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

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {selectedCategory === "Live Courses" &&
            filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full max-w-sm ${
                  course.comingSoon ? "opacity-70 blur-[1px]" : ""
                }`}
              >
                <CourseCard {...course} />
                {course.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl">
                    <span className="text-white text-lg font-semibold animate-pulse">
                      Coming Soon 🚀
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
        </motion.div>

        {/* Coming Soon placeholder for other categories */}
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
      </div>

      {/* --- NEW SECTION: Course Perks --- */}
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
            {/* Text */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                {perk.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
                {perk.description}
              </p>
            </div>

            {/* Image */}
            <div className="flex-1">
              <img
                src={perk.imageUrl}
                alt={perk.title}
                className="rounded-lg shadow-xl w-full h-auto max-w-md mx-auto"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </div>
      {/* --- END --- */}

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
