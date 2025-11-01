import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Briefcase } from "lucide-react";

// The required custom gradient class for consistency
const GRADIENT_CLASS = "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";

const faqData = {
  courses: [
    {
      question: "What courses do you offer?",
      answer: "We offer comprehensive Full Stack Development courses in both Java and MERN stack, designed by industry experts with hands-on projects and placement assistance.",
    },
    {
      question: "What is the duration of the courses?",
      answer: "Our Full Stack Development courses span 8 months with intensive classroom training, practical assignments, and real-world projects.",
    },
    {
      question: "Do I need prior coding experience?",
      answer: "No prior coding experience is required. Our courses are designed for beginners and professionals looking to upskill, starting from fundamentals.",
    },
    {
      question: "What is the fee structure?",
      answer: "Course fees start from ₹85,000 with flexible EMI options starting at ₹5,833/month. Scholarships up to ₹15,000 are available for eligible candidates.",
    },
    {
      question: "Are the courses industry-recognized?",
      answer: "Yes, you'll receive NSDC-certified certificates upon completion, which are recognized by leading tech companies across India.",
    },
  ],
  learning: [
    {
      question: "What is the learning format?",
      answer: "We offer classroom-based learning with state-of-the-art facilities, interactive lectures, hands-on coding sessions, and peer-to-peer collaboration.",
    },
    {
      question: "How is doubt support provided?",
      answer: "We provide instant doubt support through dedicated mentors, 1-on-1 sessions, and peer study groups to ensure you never get stuck.",
    },
    {
      question: "What kind of projects will I build?",
      answer: "You'll work on 10+ real-world industry-level projects covering frontend, backend, databases, and deployment to build a strong portfolio.",
    },
    {
      question: "Who are the mentors?",
      answer: "Our mentors are experienced professionals from top tech companies like Microsoft, Google, Amazon, and Uber with 3-7+ years of industry experience.",
    },
    {
      question: "Is there any assessment during the course?",
      answer: "Yes, we conduct weekly challenge contests, regular assignments, and 12+ mock interview sessions to ensure you're job-ready.",
    },
  ],
  placements: [
    {
      question: "What is your placement record?",
      answer: "We have successfully placed 35,000+ students with an average salary of 8 LPA and highest salary of 30 LPA across 500+ partner companies.",
    },
    {
      question: "How many hiring drives do you conduct?",
      answer: "We conduct 60+ hiring drives monthly with companies actively recruiting for various tech roles including frontend, backend, and full stack developers.",
    },
    {
      question: "Is placement guaranteed?",
      answer: "While we provide comprehensive placement support including resume preparation, mock interviews, and access to hiring drives, placement depends on individual performance and market conditions.",
    },
    {
      question: "What companies hire from TDCS?",
      answer: "Our hiring partners include Walmart, MakeMyTrip, Thoughtworks, PayGlocal, Innovaccer, Gainsight, and 500+ other leading tech companies.",
    },
    {
      question: "What kind of placement support is provided?",
      answer: "We provide aptitude training, soft skills development, resume building, AI-powered mock interviews, access to placement portal with 300+ interview experiences, and offline placement drives.",
    },
  ],
};

type FAQCategory = keyof typeof faqData;

// Framer Motion Variants for Staggered List
const faqListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08, // Subtle stagger effect
    },
  },
};

// Enhanced spring animation for item entrance
const faqItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 18,
      stiffness: 120,
    },
  },
};

export const HomeFAQ = () => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("courses");

  const categories = [
    { key: "courses" as FAQCategory, label: "Courses", icon: BookOpen },
    { key: "learning" as FAQCategory, label: "Learning", icon: GraduationCap },
    { key: "placements" as FAQCategory, label: "Placements", icon: Briefcase },
  ];

  // Spring transition for the sidebar for a more advanced feel
  const sidebarTransition = {
    type: "spring" as const,
    damping: 15,
    stiffness: 100,
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className={GRADIENT_CLASS}>Frequently Asked Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto dark:text-gray-400">
            Get answers to common questions about our programs, learning experience, and placement success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[250px_1fr] gap-8 max-w-6xl mx-auto">
          
          {/* Category Sidebar - Updated transition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={sidebarTransition}
            className="space-y-4 p-2 rounded-xl bg-white dark:bg-gray-800 shadow-xl md:shadow-none"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.key;

              return (
                <motion.div 
                    key={category.key}
                    // Adjusted hover effect for a stronger visual push
                    whileHover={{ scale: 1.03, x: 7, boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg overflow-hidden transition-all duration-300"
                >
                    <Button
                      variant={isActive ? "gradient" : "outline"}
                      className={`w-full justify-start text-left h-auto py-4 px-6 transition-all duration-300 ${
                        isActive ? 'text-white shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                      onClick={() => setActiveCategory(category.key)}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`faq-panel-${category.key}`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      <span className="font-semibold">{category.label}</span>
                    </Button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* FAQ Content Area with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="space-y-4"
              // Apply list staggering variants here
              variants={faqListVariants}
              initial="hidden"
              animate="visible"
              // Exit animation for when the category is switched
              exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
              id={`faq-panel-${activeCategory}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeCategory}`}
            >
              <Accordion type="single" collapsible className="w-full">
                {faqData[activeCategory].map((faq, index) => (
                  // Wrap AccordionItem inside motion.div for individual item animation
                  <motion.div
                    key={index}
                    variants={faqItemVariants}
                    whileHover={{ scale: 1.01, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" }}
                    className="border-none rounded-xl overflow-hidden shadow-md transition-shadow duration-300"
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="border-none rounded-xl bg-white dark:bg-gray-800"
                    >
                      {/* FIX: Removed the manual ChevronDown icon. The component handles it. */}
                      <AccordionTrigger className="text-left py-4 px-6 hover:no-underline text-lg font-medium [&[data-state=open]>svg]:rotate-180">
                        <span className="pr-4 dark:text-white">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 px-6 text-muted-foreground leading-relaxed dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
