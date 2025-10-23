import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is the duration of the course?",
    answer: "For Full Stack Development course, the program spans 8 months at our TDCS skill centre.",
  },
  {
    question: "Are there any prerequisites for this course?",
    answer: "No prior coding experience is required. The course is designed for beginners and professionals looking to upskill.",
  },
  {
    question: "What kind of placement support do you provide?",
    answer: "We provide comprehensive placement support including resume preparation, mock interviews, aptitude training, and access to 60+ hiring drives monthly.",
  },
  {
    question: "Is EMI option available?",
    answer: "Yes, we offer 12-month zero-cost EMI options to make the course affordable for everyone.",
  },
  {
    question: "Will I get a certificate after completion?",
    answer: "Yes, you'll receive an industry-recognized certificate from NSDC upon successful completion of the course.",
  },
  {
    question: "Can I attend classes online?",
    answer: "This is a classroom program designed for hands-on, in-person learning at our skill centre.",
  },
];

export const CourseFAQ = () => {
  return (
    <section className="py-16" id="faq">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
        </motion.div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
