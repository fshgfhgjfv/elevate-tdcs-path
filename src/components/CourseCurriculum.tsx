import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, ShieldCheck, ChevronDown, Trophy, Zap, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA STRUCTURE: MULTIPLE COURSES ---

const COURSES = [
  {
    id: "blackhat",
    name: "Cyber Master's Pro (Black Hat)",
    icon: <ShieldCheck className="w-5 h-5" />,
    description: "The complete 6-month flagship program with placement assistance.",
    curriculum: [
      {
        unit: "Module 1",
        title: "Cyber Security Fundamentals",
        topics: [
          { title: "Ethical Hacking vs Malicious Hacking", details: "White hat vs Black hat concepts and legal boundaries." },
          { title: "Network Basics & OSI Model", details: "TCP/IP, Subnetting, and the OSI layers deep dive." },
          { title: "Virtual Labs Setup", details: "Setting up Kali Linux, Windows, and Metasploitable in VirtualBox/VMware." },
        ],
      },
      {
        unit: "Module 2",
        title: "Offensive Security (Red Team)",
        topics: [
          { title: "System Hacking", details: "Password cracking, privilege escalation, and covering tracks." },
          { title: "Malware Threats", details: "Trojan, Virus, and Worm creation and analysis (in sandbox)." },
          { title: "Social Engineering", details: "Phishing simulations and human-based attack vectors." },
        ],
      },
      {
        unit: "Module 3",
        title: "Network Defense (Blue Team)",
        topics: [
          { title: "Firewalls & Honeypots", details: "Configuring IDS/IPS and setting up honeypots to trap hackers." },
          { title: "SIEM Operations", details: "Log monitoring and incident response using Splunk/Wazuh." },
        ],
      },
      {
        unit: "Module 4",
        title: "Advanced Web Pentesting",
        topics: [
          { title: "OWASP Top 10", details: "Deep dive into SQLi, XSS, and IDOR vulnerabilities." },
          { title: "Burp Suite Pro", details: "Advanced interception and automated scanning techniques." },
        ],
      },
      {
        unit: "Module 5",
        title: "Digital Forensics",
        topics: [
          { title: "Disk Forensics", details: "Recovering deleted data and analyzing drive images." },
          { title: "Memory Forensics", details: "Using Volatility to analyze RAM dumps for malware." },
        ],
      },
    ],
  },
  {
    id: "bugbounty",
    name: "Bug Bounty Hunter Pro",
    icon: <Trophy className="w-5 h-5" />,
    description: "Specialized training to find bugs and earn bounties on HackerOne & Bugcrowd.",
    curriculum: [
      {
        unit: "Module 1",
        title: "Web Architecture & Protocols",
        topics: [
          { title: "HTTP Request/Response", details: "Understanding headers, status codes, and methods (GET, POST, PUT)." },
          { title: "Cookies & Sessions", details: "How authentication and session management works." },
        ],
      },
      {
        unit: "Module 2",
        title: "Reconnaissance (Recon)",
        topics: [
          { title: "Subdomain Enumeration", details: "Using Amass, Subfinder, and crt.sh to find hidden assets." },
          { title: "Content Discovery", details: "Directory bruteforcing with Ffuf and Dirb." },
          { title: "GitHub Dorking", details: "Finding leaked API keys and secrets in public repositories." },
        ],
      },
      {
        unit: "Module 3",
        title: "Server-Side Vulnerabilities",
        topics: [
          { title: "SQL Injection (SQLi)", details: "Manual and automated exploitation (SQLmap)." },
          { title: "SSRF (Server-Side Request Forgery)", details: "Tricking servers into making internal requests." },
          { title: "RCE (Remote Code Execution)", details: "The holy grail of bug bounties: getting a shell." },
        ],
      },
      {
        unit: "Module 4",
        title: "Client-Side Vulnerabilities",
        topics: [
          { title: "XSS (Cross-Site Scripting)", details: "Reflected, Stored, and DOM-based XSS methodologies." },
          { title: "CSRF & CORS", details: "Cross-Site Request Forgery and Misconfigured CORS headers." },
        ],
      },
      {
        unit: "Module 5",
        title: "Reporting & Career",
        topics: [
          { title: "Writing Professional Reports", details: "How to write POCs that get accepted and paid." },
          { title: "Platform Navigation", details: "Strategies for HackerOne, Bugcrowd, and Synack." },
        ],
      },
    ],
  },
  {
    id: "lite",
    name: "Cyber Master's Pro Black-Hat Lite",
    icon: <Zap className="w-5 h-5" />,
    description: "A fast-track 15-day course covering essential security skills.",
    curriculum: [
      {
        unit: "Module 1",
        title: "Introduction & Networking",
        topics: [
          { title: "Cyber Security Basics", details: "CIA Triad, threats, and safety protocols." },
          { title: "Networking Essentials", details: "IP addresses, ports, and common protocols (HTTP, FTP, SSH)." },
        ],
      },
      {
        unit: "Module 2",
        title: "Linux & Tools",
        topics: [
          { title: "Linux Command Line", details: "Navigating the terminal, permissions, and bash scripting." },
          { title: "Hacking Tools Overview", details: "Intro to Nmap, Metasploit, and Wireshark." },
        ],
      },
      {
        unit: "Module 3",
        title: "Basic Web Security",
        topics: [
          { title: "Understanding Web Attacks", details: "How websites get hacked: SQLi and XSS basics." },
          { title: "Securing Yourself", details: "Password managers, 2FA, and safe browsing habits." },
        ],
      },
    ],
  },
];

export const CourseCurriculum = () => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0); // Default to Black Hat
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  const currentCourse = COURSES[selectedCourseIndex];
  const currentModule = currentCourse.curriculum[selectedModuleIndex];

  const handleCourseChange = (index: number) => {
    setSelectedCourseIndex(index);
    setSelectedModuleIndex(0); // Reset module selection
    setExpandedTopic(null);    // Close expanded topics
  };

  const handleTopicClick = (index: number) => {
    setExpandedTopic(expandedTopic === index ? null : index);
  };

  return (
    <section className="py-16 bg-background" id="curriculum">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <div className="p-4 rounded-full bg-primary/10">
                <Terminal className="w-10 h-10 text-primary" />
            </div>
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">Course Curriculum</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a specialized track below to explore the detailed syllabus.
          </p>
        </div>

        {/* COURSE SELECTOR TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {COURSES.map((course, index) => (
            <Button
              key={course.id}
              variant={selectedCourseIndex === index ? "default" : "outline"}
              className={`h-auto py-3 px-6 gap-2 transition-all ${
                selectedCourseIndex === index ? "shadow-lg scale-105 ring-2 ring-primary/20" : "hover:bg-muted"
              }`}
              onClick={() => handleCourseChange(index)}
            >
              {course.icon}
              <div className="flex flex-col items-start">
                <span className="font-bold text-md">{course.name}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Selected Course Description */}
        <motion.div 
            key={currentCourse.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 text-muted-foreground font-medium"
        >
            {currentCourse.description}
        </motion.div>

        {/* Curriculum Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          
          {/* SIDEBAR: Module List */}
          <div className="space-y-2 md:col-span-1">
            {currentCourse.curriculum.map((unit, index) => (
              <motion.div
                key={`${currentCourse.id}-module-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 border-l-4 ${
                    selectedModuleIndex === index
                      ? "border-l-primary bg-primary/5 shadow-md"
                      : "border-l-transparent hover:bg-muted/50"
                  }`}
                  onClick={() => {
                    setSelectedModuleIndex(index);
                    setExpandedTopic(null);
                  }}
                >
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {unit.unit}
                    </p>
                    <p className={`font-semibold text-sm ${selectedModuleIndex === index ? "text-primary" : ""}`}>
                        {unit.title}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* MAIN CONTENT: Topics List */}
          <motion.div
            key={`${currentCourse.id}-${selectedModuleIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-3"
          >
            <Card className="h-full border-t-4 border-t-primary shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {selectedModuleIndex + 1}
                    </div>
                    <h3 className="text-2xl font-bold">
                    {currentModule.title}
                    </h3>
                </div>

                {/* Expandable Topics */}
                <div className="space-y-3">
                  {currentModule.topics.map((topic, index) => (
                    <motion.div key={index} layout className="border rounded-lg overflow-hidden bg-card/50">
                      <div
                        className="flex items-center justify-between gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleTopicClick(index)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-foreground/80">{topic.title}</span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                            expandedTopic === index ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </div>

                      <AnimatePresence>
                        {expandedTopic === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-muted/30"
                          >
                            <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-dashed border-muted-foreground/20 mt-2 mx-4 py-4">
                              {topic.details}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Download Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="shadow-lg hover:shadow-primary/20 transition-all">
            <Download className="mr-2 h-4 w-4" />
            Download {currentCourse.name} Syllabus
          </Button>
        </div>
      </div>
    </section>
  );
};