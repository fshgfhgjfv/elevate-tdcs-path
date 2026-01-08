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
  Bug, 
  Skull, 
  Code, 
  FileSearch,
  Server,
  Zap,
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
    title: "Module 1: Advanced Network Security",
    icon: <Network className="w-5 h-5" />,
    duration: "Week 1-2",
    topics: [
      "Advanced TCP/IP & Protocol Analysis",
      "Network Architecture Deep Dive",
      "Packet Crafting with Scapy",
      "Man-in-the-Middle Attacks",
      "Network Sniffing & Interception",
      "Bypassing Network Security Controls",
    ],
    skills: ["Network Analysis", "Packet Crafting", "MITM Attacks"],
    project: "Perform a complete network penetration test",
  },
  {
    id: "module-2",
    title: "Module 2: Exploit Development",
    icon: <Code className="w-5 h-5" />,
    duration: "Week 3-4",
    topics: [
      "Buffer Overflow Fundamentals",
      "Stack-Based Exploits",
      "Heap Exploitation Basics",
      "Shellcode Development",
      "Exploit Mitigation Bypass (ASLR, DEP)",
      "Writing Custom Exploits",
    ],
    skills: ["Exploit Development", "Assembly", "Shellcoding"],
    project: "Develop a custom buffer overflow exploit",
  },
  {
    id: "module-3",
    title: "Module 3: Reverse Engineering",
    icon: <Zap className="w-5 h-5" />,
    duration: "Week 5-6",
    topics: [
      "Introduction to Reverse Engineering",
      "x86/x64 Assembly Language",
      "Static Analysis with IDA Pro & Ghidra",
      "Dynamic Analysis with Debuggers",
      "Unpacking & Deobfuscation",
      "Crackme Challenges",
    ],
    skills: ["Reverse Engineering", "IDA Pro", "Ghidra", "Assembly"],
    project: "Reverse engineer a protected application",
  },
  {
    id: "module-4",
    title: "Module 4: Malware Analysis",
    icon: <Bug className="w-5 h-5" />,
    duration: "Week 7-8",
    topics: [
      "Malware Types & Classification",
      "Setting Up Malware Analysis Lab",
      "Static Malware Analysis",
      "Dynamic Malware Analysis",
      "Behavioral Analysis",
      "Writing YARA Rules",
    ],
    skills: ["Malware Analysis", "YARA", "Sandbox Analysis"],
    project: "Analyze a real-world malware sample",
  },
  {
    id: "module-5",
    title: "Module 5: Red Teaming Operations",
    icon: <Skull className="w-5 h-5" />,
    duration: "Week 9-11",
    topics: [
      "Red Team vs Penetration Testing",
      "Initial Access Techniques",
      "Lateral Movement Strategies",
      "Privilege Escalation (Windows & Linux)",
      "Persistence Mechanisms",
      "Command & Control (C2) Frameworks",
      "Evasion & Anti-Detection",
    ],
    skills: ["Red Teaming", "C2 Frameworks", "Post-Exploitation"],
    project: "Execute a complete red team engagement",
  },
  {
    id: "module-6",
    title: "Module 6: Advanced Network Pentesting",
    icon: <Server className="w-5 h-5" />,
    duration: "Week 12-13",
    topics: [
      "Active Directory Exploitation",
      "Kerberos Attacks (Golden/Silver Ticket)",
      "NTLM Relay & Pass-the-Hash",
      "Cloud Infrastructure Pentesting",
      "Wireless Network Attacks",
      "VoIP & IoT Security Testing",
    ],
    skills: ["AD Pentesting", "Kerberos", "Cloud Security"],
    project: "Compromise an Active Directory environment",
  },
  {
    id: "module-7",
    title: "Module 7: Digital Forensics",
    icon: <FileSearch className="w-5 h-5" />,
    duration: "Week 14-16",
    topics: [
      "Digital Forensics Fundamentals",
      "Evidence Acquisition & Chain of Custody",
      "File System Forensics",
      "Memory Forensics with Volatility",
      "Network Forensics",
      "Mobile Device Forensics",
      "Forensic Report Writing",
    ],
    skills: ["Digital Forensics", "Volatility", "Evidence Analysis"],
    project: "Conduct a complete forensic investigation",
  },
];

export const CyberBlackhatCurriculum = () => {
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
            Advanced Curriculum
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            7 Advanced Modules
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master advanced offensive security techniques including exploit development, malware analysis, red teaming, and digital forensics
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>4 Months Duration</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-primary" />
              <span>7 Advanced Modules</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>7+ Real-world Projects</span>
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
