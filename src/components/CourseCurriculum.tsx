import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, ShieldCheck, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cyberSecurityCurriculum = [
  {
    unit: "Module 1",
    title: "Cyber Security Fundamentals",
    topics: [
      {
        title: "Ethical Hacking vs Malicious Hacking",
        details:
          "Learn the difference between ethical (white hat) and malicious (black hat) hacking. Understand how ethical hackers use similar tools but with authorization to secure systems.",
      },
      {
        title: "Network Basics & Security Layers",
        details:
          "Understand how computer networks function, the OSI model, and the role of each layer in maintaining secure communication.",
      },
      {
        title: "Understanding Threats & Vulnerabilities",
        details:
          "Explore common attack vectors, vulnerabilities in software, and strategies for identifying and mitigating risks.",
      },
      {
        title: "Legal & Ethical Responsibilities",
        details:
          "Review international laws, cybersecurity regulations, and professional ethics for information security specialists.",
      },
      {
        title: "Setting Up a Safe Testing Environment",
        details:
          "Learn how to build isolated lab environments using VMs and sandboxes for ethical hacking and malware analysis.",
      },
    ],
  },
  {
    unit: "Module 2",
    title: "Offensive Tools & Techniques (Black Hat Simulation)",
    topics: [
      {
        title: "Kali Linux Overview",
        details:
          "Get hands-on with Kali Linux — the most popular ethical hacking OS, preloaded with penetration testing tools.",
      },
      {
        title: "WiFi Hacking & Network Sniffing",
        details:
          "Simulate WiFi cracking and packet sniffing in a safe lab environment to understand real-world wireless vulnerabilities.",
      },
      {
        title: "Password Cracking, Keyloggers & Reconnaissance",
        details:
          "Learn reconnaissance, brute force, and dictionary attack techniques (for legal lab use only).",
      },
      {
        title: "Social Engineering Awareness",
        details:
          "Understand phishing, baiting, and social manipulation tactics — and how to build awareness against them.",
      },
      {
        title: "Ethical Simulation Projects",
        details:
          "Perform end-to-end ethical hacking simulations on virtual systems to analyze attack patterns and prevention methods.",
      },
    ],
  },
];

export const CourseCurriculum = () => {
  const [selectedCyberUnit, setSelectedCyberUnit] = useState(0);
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  const handleTopicClick = (index: number) => {
    setExpandedTopic(expandedTopic === index ? null : index);
  };

  const currentModule = cyberSecurityCurriculum[selectedCyberUnit];

  return (
    <section className="py-16" id="curriculum">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <ShieldCheck className="w-14 h-14 text-primary" />
          </motion.div>
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Cyber Security Curriculum
          </h2>
          <p className="text-lg text-muted-foreground">
            Learn Ethical Hacking, Network Defense, and Real-World Cyber Security with Hands-on Labs
          </p>
        </motion.div>

        {/* Curriculum Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Module List */}
          <div className="space-y-2">
            {cyberSecurityCurriculum.map((unit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedCyberUnit === index
                      ? "shadow-glow border-primary bg-primary/5"
                      : "hover:shadow-glow"
                  }`}
                  onClick={() => {
                    setSelectedCyberUnit(index);
                    setExpandedTopic(null);
                  }}
                >
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{unit.unit}</p>
                    <p className="font-semibold text-sm">{unit.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Topics List */}
          <motion.div
            key={selectedCyberUnit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-3"
          >
            <Card className="shadow-glow-lg">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold gradient-text mb-6">
                  {currentModule.title}
                </h3>

                {/* Expandable Topics */}
                <div className="space-y-3">
                  {currentModule.topics.map((topic, index) => (
                    <motion.div key={index} layout className="border-b pb-2">
                      <div
                        className="flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleTopicClick(index)}
                      >
                        <div className="flex items-center gap-3">
                          <ChevronRight
                            className={`text-primary transition-transform ${
                              expandedTopic === index ? "rotate-90" : ""
                            }`}
                          />
                          <span className="font-medium">{`Topic ${index + 1}: ${topic.title}`}</span>
                        </div>
                        <ChevronDown
                          className={`transition-transform ${
                            expandedTopic === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      <AnimatePresence>
                        {expandedTopic === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-10 pr-4 pb-3 text-muted-foreground text-sm"
                          >
                            {topic.details}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                <p className="mt-6 text-sm text-muted-foreground italic">
                  
                  Unauthorized use of these techniques is illegal and punishable by law.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Button variant="gradient" size="lg" className="shadow-glow">
            <Download className="mr-2" />
            Download Cyber Security Curriculum
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
