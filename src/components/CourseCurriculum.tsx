import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download } from "lucide-react";
import { motion } from "framer-motion";

const fullStackCurriculum = [
  {
    unit: "Module 1",
    title: "Programming Foundations in Java",
    topics: [
      "Java Basics, Variables & Control Flow",
      "Functions & Patterns",
      "Data Structures & Strings",
      "Time & Space Complexity",
      "Intro to Object-Oriented Programming (OOP)",
    ],
  },
  {
    unit: "Module 2",
    title: "Core Data Structures & Algorithms (DSA)",
    topics: [
      "Recursion & Backtracking",
      "Linked Lists, Stacks & Queues",
      "Hashing & Trees",
      "Binary Search, Sliding Window, Prefix Sum",
      "Heaps, Bit Manipulation & Optimization",
    ],
  },
  {
    unit: "Module 3",
    title: "Advanced Java & Spring Boot",
    topics: [
      "Spring Core & MVC Fundamentals",
      "Building RESTful APIs",
      "Database Integration with Spring Data JPA",
      "DTOs, Exception Handling & Validation",
      "Deployment & Advanced API Development",
    ],
  },
  {
    unit: "Module 4",
    title: "Frontend Development (HTML, CSS, JavaScript)",
    topics: [
      "HTML5 & Semantic Elements",
      "CSS Styling, Flexbox & Animations",
      "JavaScript Essentials & DOM Manipulation",
      "Async JS, Fetch API & Storage",
      "Responsive Design & Version Control (Git)",
    ],
  },
  {
    unit: "Module 5",
    title: "React & Modern Frontend (MERN Focus)",
    topics: [
      "React Fundamentals & Components",
      "Hooks, Context & State Management",
      "Express.js & Node.js Basics",
      "MongoDB Integration",
      "Building Full Stack Projects with MERN",
    ],
  },
  {
    unit: "Module 6",
    title: "Capstone & Real-World Projects",
    topics: [
      "E-Commerce Platform with Authentication",
      "Portfolio Website Deployment",
      "REST API + Database Project",
      "Spring Boot + React Integration Project",
      "MERN Stack Final Capstone",
    ],
  },
];

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
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [selectedCyberUnit, setSelectedCyberUnit] = useState(0);

  return (
    <section className="py-16" id="curriculum">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Course Curriculum</h2>
          <p className="text-lg text-muted-foreground">
            From Programming to Projects — Learn Full Stack, DSA & Cyber Security with Practical Implementation
          </p>
        </motion.div>

        <Tabs defaultValue="fullstack" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8">
            <TabsTrigger value="fullstack">Full Stack + DSA</TabsTrigger>
            <TabsTrigger value="cyber">Cyber Security</TabsTrigger>
            <TabsTrigger value="mern">MERN (Legacy)</TabsTrigger>
          </TabsList>

          {/* Full Stack Curriculum */}
          <TabsContent value="fullstack">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                {fullStackCurriculum.map((unit, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      selectedUnit === index ? "shadow-glow border-primary" : "hover:shadow-glow"
                    }`}
                    onClick={() => setSelectedUnit(index)}
                  >
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{unit.unit}</p>
                      <p className="font-semibold text-sm">{unit.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="md:col-span-3 shadow-glow-lg">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold gradient-text mb-6">
                    {fullStackCurriculum[selectedUnit].title}
                  </h3>
                  <div className="space-y-3">
                    {fullStackCurriculum[selectedUnit].topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <ChevronRight className="text-primary flex-shrink-0" />
                        <span className="font-medium">Topic-{index + 1}</span>
                        <span className="text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button variant="gradient" size="lg">
                <Download className="mr-2" />
                Download Full Stack Curriculum
              </Button>
            </div>
          </TabsContent>

          {/* Cyber Security Curriculum */}
          <TabsContent value="cyber">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                {cyberSecurityCurriculum.map((unit, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      selectedCyberUnit === index ? "shadow-glow border-primary" : "hover:shadow-glow"
                    }`}
                    onClick={() => setSelectedCyberUnit(index)}
                  >
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{unit.unit}</p>
                      <p className="font-semibold text-sm">{unit.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="md:col-span-3 shadow-glow-lg">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold gradient-text mb-6">
                    {cyberSecurityCurriculum[selectedCyberUnit].title}
                  </h3>
                  <div className="space-y-3">
                    {cyberSecurityCurriculum[selectedCyberUnit].topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <ChevronRight className="text-primary flex-shrink-0" />
                        <span className="font-medium">Topic-{index + 1}</span>
                        <span className="text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground italic">
                    ⚠️ All tools and activities must be used for educational and ethical hacking purposes only.
                    Unauthorized use of these techniques is illegal.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button variant="gradient" size="lg">
                <Download className="mr-2" />
                Download Cyber Security Curriculum
              </Button>
            </div>
          </TabsContent>

          {/* MERN (Legacy placeholder) */}
          <TabsContent value="mern">
            <Card className="shadow-glow-lg">
              <CardContent className="p-12 text-center">
                <h3 className="text-2xl font-bold mb-4">MERN Stack Curriculum</h3>
                <p className="text-muted-foreground mb-6">
                  Legacy version focusing on MongoDB, Express, React, and Node.js stack.
                </p>
                <Button variant="gradient">
                  <Download className="mr-2" />
                  Download MERN Curriculum
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
