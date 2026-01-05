import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface CourseFAQProps {
  courseId?: string;
}

const defaultFaqs: FAQ[] = [
  {
    question: "What is the duration of the course?",
    answer:
      "For Full Stack Development course, the program spans 8 months at our TDCS skill centre.",
  },
  {
    question: "Are there any prerequisites for this course?",
    answer:
      "No prior coding experience is required. The course is designed for beginners and professionals looking to upskill.",
  },
  {
    question: "What kind of placement support do you provide?",
    answer:
      "We provide comprehensive placement support including resume preparation, mock interviews, aptitude training, and access to 60+ hiring drives monthly.",
  },
  {
    question: "Is EMI option available?",
    answer:
      "Yes, we offer 12-month zero-cost EMI options to make the course affordable for everyone.",
  },
  {
    question: "Will I get a certificate after completion?",
    answer:
      "Yes, you'll receive an industry-recognized certificate from NSDC upon successful completion of the course.",
  },
  {
    question: "Can I attend classes online?",
    answer:
      "This is a classroom program designed for hands-on, in-person learning at our skill centre.",
  },
];

const networkSecurityFaqs: FAQ[] = [
  {
    question: "What is the duration and fee for Network Security & Defense?",
    answer:
      "The Network Security & Defense program is a 5-month comprehensive course priced at ₹12,000. This includes 60+ hours of live online classes, hands-on lab access, and lifetime access to recordings.",
  },
  {
    question: "Are there any prerequisites for this course?",
    answer:
      "Basic understanding of computers and internet is helpful, but not mandatory. We start from network fundamentals and progressively build up to advanced topics. Fresher graduates and IT professionals can both join.",
  },
  {
    question: "What tools will I learn in this course?",
    answer:
      "You'll get hands-on experience with industry-standard tools including Wireshark, Snort, Suricata, pfSense, FortiGate, Splunk, ELK Stack, Nessus, and cloud security tools for AWS and Azure.",
  },
  {
    question: "What job roles can I apply for after completion?",
    answer:
      "Graduates can pursue roles like SOC Analyst, Network Security Engineer, Security Administrator, Incident Response Analyst, SIEM Engineer, and Network Administrator with security focus.",
  },
  {
    question: "Is there placement assistance?",
    answer:
      "Yes! We provide 100% placement assistance including resume building, mock interviews, aptitude training, and connections to our hiring partners in cybersecurity industry.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Yes, upon successful completion of the course and capstone project, you'll receive an industry-recognized certification from TDCS that validates your network security skills.",
  },
  {
    question: "Are the classes live or recorded?",
    answer:
      "All classes are conducted live online by industry experts. However, all sessions are recorded and you get lifetime access to the recordings for revision.",
  },
  {
    question: "What is the capstone project about?",
    answer:
      "In the capstone project, you'll build a complete enterprise SOC lab from scratch - including firewall, IDS/IPS, SIEM integration, and simulate real attack scenarios with detection & response.",
  },
  {
    question: "Is EMI option available?",
    answer:
      "Yes, we offer flexible EMI options to make the course affordable. Contact our counselors for available EMI plans.",
  },
  {
    question: "Can I get a demo class before enrolling?",
    answer:
      "Absolutely! We offer free demo sessions where you can experience our teaching methodology and ask questions. Click the 'Book a Demo' button to schedule yours.",
  },
];

const courseFaqMap: Record<string, FAQ[]> = {
  "network-security-defense": networkSecurityFaqs,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 50 },
  },
};

export const CourseFAQ = ({ courseId }: CourseFAQProps) => {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  
  const faqs = courseId && courseFaqMap[courseId] ? courseFaqMap[courseId] : defaultFaqs;

  return (
    <section className="relative py-24 overflow-hidden" id="faq">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Common Queries</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {courseId === "network-security-defense" 
              ? "Everything you need to know about the Network Security & Defense course"
              : "Everything you need to know about the course and how to get started."
            }
          </p>
        </motion.div>

        {/* Accordion Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            onValueChange={setOpenItem}
          >
            {faqs.map((faq, index) => {
              const value = `item-${index}`;
              const isOpen = openItem === value;

              return (
                <motion.div key={index} variants={itemVariants} layout>
                  <AccordionItem
                    value={value}
                    className={`
                      group border rounded-xl px-2 transition-all duration-300
                      ${
                        isOpen
                          ? "bg-primary/5 border-primary/20 shadow-lg shadow-primary/5"
                          : "bg-card hover:bg-accent/50 border-transparent hover:border-border"
                      }
                    `}
                  >
                    <AccordionTrigger className="px-4 hover:no-underline py-5 text-lg font-medium">
                      <span
                        className={`text-left transition-colors duration-300 ${
                          isOpen ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 text-muted-foreground text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </motion.div>

        {/* CTA Section - UPDATED WITH WHATSAPP LINK */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="p-6 rounded-2xl bg-muted/50 border border-border/50 inline-block backdrop-blur-sm">
            <p className="flex flex-col sm:flex-row items-center gap-4 text-muted-foreground">
              <span className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </span>
              <span>
                Can&apos;t find the answer you&apos;re looking for?{" "}
                <a
                  href="https://api.whatsapp.com/send/?phone=919564730432&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Chat to our friendly team
                </a>
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};