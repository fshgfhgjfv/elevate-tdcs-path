import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Network, 
  Lock, 
  Terminal, 
  Key, 
  Globe, 
  CheckCircle2,
  BookOpen,
  Clock,
  Target
} from "lucide-react";

interface ModuleData {
  id: string;
  title: string;
  icon: React.ReactNode;
  duration: string;
  topics: string[];
  skills: string[];
  project?: string;
}

const curriculumModules: ModuleData[] = [
  {
    id: "module-1",
    title: "Module 1: Network Security Fundamentals",
    icon: <Network className="w-5 h-5" />,
    duration: "Week 1",
    topics: [
      "Introduction to Computer Networks",
      "OSI Model Overview",
      "TCP/IP Basics",
      "Network Devices & Their Roles",
      "Common Network Protocols",
      "Introduction to Firewalls",
    ],
    skills: ["Network Basics", "OSI Model", "TCP/IP"],
  },
  {
    id: "module-2",
    title: "Module 2: Password Cracking Techniques",
    icon: <Key className="w-5 h-5" />,
    duration: "Week 2",
    topics: [
      "Password Security Fundamentals",
      "Hash Functions & Password Storage",
      "Dictionary Attacks",
      "Brute Force Attacks",
      "Rainbow Table Attacks",
      "Password Cracking Tools (John the Ripper, Hashcat)",
    ],
    skills: ["Password Security", "Hash Cracking", "Security Tools"],
    project: "Crack sample password hashes using various techniques",
  },
  {
    id: "module-3",
    title: "Module 3: Web Application Vulnerabilities",
    icon: <Globe className="w-5 h-5" />,
    duration: "Week 3-4",
    topics: [
      "Introduction to Web Security",
      "OWASP Top 10 Overview",
      "SQL Injection Basics",
      "Cross-Site Scripting (XSS)",
      "Cross-Site Request Forgery (CSRF)",
      "Basic Web Pentesting Methodology",
    ],
    skills: ["Web Security", "OWASP", "SQL Injection", "XSS"],
    project: "Find vulnerabilities in a practice web application",
  },
  {
    id: "module-4",
    title: "Module 4: Social Engineering",
    icon: <Shield className="w-5 h-5" />,
    duration: "Week 5",
    topics: [
      "Human Element in Security",
      "Phishing Attacks & Prevention",
      "Pretexting & Baiting",
      "Tailgating & Physical Security",
      "Social Engineering Toolkit (SET)",
      "Building Security Awareness",
    ],
    skills: ["Social Engineering", "Phishing Awareness", "Security Culture"],
  },
  {
    id: "module-5",
    title: "Module 5: Reconnaissance & Information Gathering",
    icon: <Target className="w-5 h-5" />,
    duration: "Week 6-7",
    topics: [
      "Passive vs Active Reconnaissance",
      "OSINT Techniques",
      "Footprinting & Scanning",
      "Google Dorking",
      "Shodan & Censys",
      "Nmap Basics",
    ],
    skills: ["OSINT", "Reconnaissance", "Nmap"],
    project: "Perform reconnaissance on a target domain",
  },
  {
    id: "module-6",
    title: "Module 6: Linux for Security Professionals",
    icon: <Terminal className="w-5 h-5" />,
    duration: "Week 7-8",
    topics: [
      "Linux File System & Navigation",
      "Essential Linux Commands",
      "File Permissions & Ownership",
      "User & Group Management",
      "Bash Scripting Basics",
      "Setting Up Kali Linux",
    ],
    skills: ["Linux CLI", "Kali Linux", "Bash Scripting"],
    project: "Create a basic security automation script",
  },
];

export const CyberLiteCurriculum = () => {
  const [activeModule, setActiveModule] = useState<string | undefined>(undefined);

  return (
    <section className="py-20 bg-background" id="curriculum">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Complete Curriculum
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            6 Foundational Modules
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start your cybersecurity journey with essential skills in ethical hacking, network security, and Linux fundamentals
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>2 Months Duration</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-primary" />
              <span>6 Modules</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>4 Hands-on Projects</span>
            </div>
          </div>
        </motion.div>

        {/* Curriculum Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion
            type="single"
            collapsible
            value={activeModule}
            onValueChange={setActiveModule}
            className="space-y-3"
          >
            {curriculumModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={module.id}
                  className={`
                    border rounded-xl px-4 transition-all duration-300
                    ${activeModule === module.id
                      ? "bg-primary/5 border-primary/30 shadow-lg"
                      : "bg-card border-border hover:border-primary/20"
                    }
                  `}
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                        ${activeModule === module.id 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground"
                        }
                      `}>
                        {module.icon}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${activeModule === module.id ? "text-primary" : "text-foreground"}`}>
                          {module.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{module.duration}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="pl-14 space-y-4">
                      {/* Topics */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Topics Covered:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {module.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Skills */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Skills You'll Gain:</h4>
                        <div className="flex flex-wrap gap-2">
                          {module.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Project */}
                      {module.project && (
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <h4 className="text-sm font-semibold text-primary mb-1">🎯 Hands-on Project:</h4>
                          <p className="text-sm text-muted-foreground">{module.project}</p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
