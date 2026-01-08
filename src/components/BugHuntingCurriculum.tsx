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
  Bug, 
  Globe, 
  Search, 
  Server, 
  Shield, 
  FileText, 
  Code,
  Terminal,
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
    title: "Module 1: Bug Bounty Hunting Fundamentals",
    icon: <Bug className="w-5 h-5" />,
    duration: "Week 1",
    topics: [
      "Introduction to Bug Bounty Programs",
      "HackerOne & Bugcrowd Platforms",
      "Understanding Program Scopes",
      "Legal & Ethical Considerations",
      "Setting Up Your Bug Hunting Environment",
      "Building Your Bug Hunter Profile",
    ],
    skills: ["Bug Bounty Platforms", "Scope Analysis", "Environment Setup"],
  },
  {
    id: "module-2",
    title: "Module 2: Web Reconnaissance & Recon",
    icon: <Search className="w-5 h-5" />,
    duration: "Week 2-3",
    topics: [
      "Subdomain Enumeration (Amass, Subfinder)",
      "Content Discovery & Directory Bruteforcing",
      "Google Dorking & GitHub Dorking",
      "JavaScript File Analysis",
      "Asset Discovery & Mapping",
      "Automation with Nuclei & httpx",
    ],
    skills: ["Reconnaissance", "Asset Discovery", "Automation"],
    project: "Complete recon on a bug bounty target",
  },
  {
    id: "module-3",
    title: "Module 3: Advanced Web Application Security",
    icon: <Globe className="w-5 h-5" />,
    duration: "Week 3-5",
    topics: [
      "OWASP Top 10 Deep Dive",
      "SQL Injection (Union, Blind, Error-based)",
      "Cross-Site Scripting (Reflected, Stored, DOM)",
      "Server-Side Request Forgery (SSRF)",
      "XML External Entity (XXE) Attacks",
      "Insecure Direct Object References (IDOR)",
    ],
    skills: ["SQL Injection", "XSS", "SSRF", "XXE", "IDOR"],
    project: "Find vulnerabilities in practice targets",
  },
  {
    id: "module-4",
    title: "Module 4: API Security Testing",
    icon: <Server className="w-5 h-5" />,
    duration: "Week 5-6",
    topics: [
      "REST API Security Fundamentals",
      "GraphQL Security Testing",
      "API Authentication Bypass",
      "Rate Limiting & Business Logic Flaws",
      "API Documentation Analysis",
      "Postman & Burp Suite for API Testing",
    ],
    skills: ["API Security", "GraphQL", "Burp Suite"],
    project: "Test an API for security vulnerabilities",
  },
  {
    id: "module-5",
    title: "Module 5: Mobile Application Security",
    icon: <Shield className="w-5 h-5" />,
    duration: "Week 7-8",
    topics: [
      "Android Security Basics",
      "iOS Security Basics",
      "Mobile App Reconnaissance",
      "Traffic Interception (Charles/Burp)",
      "Finding Mobile API Vulnerabilities",
      "Mobile Bug Bounty Methodology",
    ],
    skills: ["Mobile Security", "Android Testing", "iOS Testing"],
  },
  {
    id: "module-6",
    title: "Module 6: Automation with Python & Bash",
    icon: <Terminal className="w-5 h-5" />,
    duration: "Week 9-10",
    topics: [
      "Python for Bug Hunters",
      "Bash Scripting Essentials",
      "Building Custom Recon Tools",
      "Automating Vulnerability Detection",
      "Working with APIs in Python",
      "Creating Bug Hunting Workflows",
    ],
    skills: ["Python", "Bash", "Automation", "Scripting"],
    project: "Build a custom bug hunting automation tool",
  },
  {
    id: "module-7",
    title: "Module 7: Professional Pentesting Methodology",
    icon: <Code className="w-5 h-5" />,
    duration: "Week 10-11",
    topics: [
      "Penetration Testing Standards (PTES, OWASP)",
      "Pre-engagement & Scoping",
      "Information Gathering Phase",
      "Vulnerability Analysis",
      "Exploitation & Post-Exploitation",
      "Professional Pentest Workflow",
    ],
    skills: ["Pentest Methodology", "PTES", "Professional Standards"],
  },
  {
    id: "module-8",
    title: "Module 8: Report Writing & Documentation",
    icon: <FileText className="w-5 h-5" />,
    duration: "Week 11-12",
    topics: [
      "Writing Professional Bug Reports",
      "CVSS Scoring & Severity Assessment",
      "Proof of Concept Development",
      "Video POC Creation",
      "Communicating with Security Teams",
      "Building Your Bug Hunting Portfolio",
    ],
    skills: ["Report Writing", "CVSS", "POC Development"],
    project: "Write professional reports for practice bugs",
  },
];

export const BugHuntingCurriculum = () => {
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
            Bug Bounty Curriculum
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            8 Specialized Modules
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master bug bounty hunting and professional penetration testing with real-world techniques used by top hunters
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>3 Months Duration</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-primary" />
              <span>8 Modules</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>5+ Real Bug Hunting Projects</span>
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
