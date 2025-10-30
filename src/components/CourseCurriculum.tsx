import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const cyberSecurityCurriculum = [
  {
    unit: "Module 1",
    title: "Cyber Security Fundamentals",
    topics: [
      "Ethical Hacking vs Malicious Hacking",
      "Network Basics & Security Layers",
      "Understanding Threats & Vulnerabilities",
      "Legal & Ethical Responsibilities",
      "Setting Up a Safe Testing Environment",
    ],
  },
  {
    unit: "Module 2",
    title: "Offensive Tools & Techniques (Black Hat Simulation)",
    topics: [
      "Kali Linux Overview",
      "WiFi Hacking & Network Sniffing (Legal Lab Use Only)",
      "Password Cracking, Keyloggers & Reconnaissance",
      "Social Engineering Awareness",
      "Ethical Simulation Projects",
    ],
  },
  {
    unit: "Module 3",
    title: "Defensive & Countermeasure Tools (White Hat)",
    topics: [
      "Firewall & IDS Configuration",
      "Network Monitoring Tools",
      "Secure Coding Practices",
      "Incident Response & Threat Mitigation",
      "Implementing Encryption & Authentication",
    ],
  },
  {
    unit: "Module 4",
    title: "Hands-on Projects & Case Studies",
    topics: [
      "Raspberry Pi as a Pen-Testing Tool",
      "Simulated Cyber Attack & Defense Challenge",
      "Secure Web App Implementation",
      "WiFi Security Hardening Lab",
      "Ethical Hacking Report & Presentation",
    ],
  },
];

export const CourseCurriculum = () => {
  const [selectedCyberUnit, setSelectedCyberUnit] = useState(0);

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
          <h2 className="text-4xl font-bold gradient-text mb-4">Cyber Security Curriculum</h2>
          <p className="text-lg text-muted-foreground">
            Learn Ethical Hacking, Network Defense, and Real-World Cyber Security with Hands-on Labs
          </p>
        </motion.div>

        {/* Curriculum Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Modules List */}
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
                  onClick={() => setSelectedCyberUnit(index)}
                >
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{unit.unit}</p>
                    <p className="font-semibold text-sm">{unit.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Topics Display */}
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
                  {cyberSecurityCurriculum[selectedCyberUnit].title}
                </h3>
                <div className="space-y-3">
                  {cyberSecurityCurriculum[selectedCyberUnit].topics.map((topic, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <ChevronRight className="text-primary flex-shrink-0" />
                      <span className="font-medium text-foreground">
                        {`Topic ${index + 1}: `}
                      </span>
                      <span className="text-muted-foreground">{topic}</span>
                    </motion.div>
                  ))}
                </div>

                <p className="mt-6 text-sm text-muted-foreground italic">
                  ⚠️ All tools and activities are for **ethical and educational** purposes only.  
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
