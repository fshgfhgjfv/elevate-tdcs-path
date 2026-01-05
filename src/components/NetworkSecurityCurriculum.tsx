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
  Eye, 
  Server, 
  Wifi, 
  Database, 
  FileSearch, 
  AlertTriangle,
  Cloud,
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
    title: "Module 1: Network Fundamentals & OSI Model",
    icon: <Network className="w-5 h-5" />,
    duration: "Week 1-2",
    topics: [
      "Introduction to Computer Networks",
      "OSI Model - All 7 Layers Explained",
      "Network Topologies (Star, Mesh, Hybrid)",
      "Network Devices: Routers, Switches, Hubs",
      "MAC Addresses & ARP Protocol",
      "Network Cables & Connectors",
    ],
    skills: ["Network Architecture", "OSI Model", "Hardware Basics"],
  },
  {
    id: "module-2",
    title: "Module 2: TCP/IP Protocol Suite Deep Dive",
    icon: <Server className="w-5 h-5" />,
    duration: "Week 2-3",
    topics: [
      "TCP/IP Model vs OSI Model",
      "IP Addressing (IPv4 & IPv6)",
      "TCP vs UDP - When to Use Each",
      "ICMP, ARP, DHCP Protocols",
      "DNS Resolution Process",
      "HTTP/HTTPS & TLS Handshake",
    ],
    skills: ["TCP/IP", "Protocol Analysis", "DNS"],
  },
  {
    id: "module-3",
    title: "Module 3: Subnetting & IP Addressing Mastery",
    icon: <Target className="w-5 h-5" />,
    duration: "Week 3-4",
    topics: [
      "Subnetting Fundamentals & CIDR Notation",
      "Subnet Mask Calculations",
      "VLSM (Variable Length Subnet Masking)",
      "Private vs Public IP Addresses",
      "NAT & PAT Concepts",
      "Hands-on Subnetting Exercises",
    ],
    skills: ["Subnetting", "IP Planning", "NAT"],
  },
  {
    id: "module-4",
    title: "Module 4: Router & Switch Configuration",
    icon: <Network className="w-5 h-5" />,
    duration: "Week 4-5",
    topics: [
      "Cisco IOS Basics & CLI Navigation",
      "Router Configuration from Scratch",
      "Static & Dynamic Routing (OSPF, EIGRP)",
      "VLAN Configuration & Trunking",
      "Inter-VLAN Routing",
      "Port Security & MAC Filtering",
    ],
    skills: ["Cisco IOS", "Routing Protocols", "VLANs"],
    project: "Configure a multi-VLAN network with routing",
  },
  {
    id: "module-5",
    title: "Module 5: Firewall Architecture & Configuration",
    icon: <Shield className="w-5 h-5" />,
    duration: "Week 5-7",
    topics: [
      "Firewall Types: Stateful vs Stateless",
      "pfSense Installation & Configuration",
      "FortiGate Firewall Basics",
      "Firewall Rules & Policies",
      "NAT Rules on Firewalls",
      "DMZ Architecture Design",
      "Application Layer Filtering",
    ],
    skills: ["pfSense", "FortiGate", "Firewall Policies"],
    project: "Deploy a pfSense firewall with DMZ",
  },
  {
    id: "module-6",
    title: "Module 6: Intrusion Detection Systems (IDS)",
    icon: <Eye className="w-5 h-5" />,
    duration: "Week 7-8",
    topics: [
      "IDS vs IPS - Key Differences",
      "Snort Installation & Configuration",
      "Suricata Setup & Rule Writing",
      "Signature-based vs Anomaly Detection",
      "Creating Custom Detection Rules",
      "Alert Management & Tuning",
    ],
    skills: ["Snort", "Suricata", "Rule Writing"],
  },
  {
    id: "module-7",
    title: "Module 7: Intrusion Prevention & Threat Blocking",
    icon: <Lock className="w-5 h-5" />,
    duration: "Week 8-9",
    topics: [
      "IPS Deployment Strategies (Inline vs Passive)",
      "Real-time Threat Blocking",
      "False Positive Reduction",
      "Integration with Firewalls",
      "Automated Response Actions",
      "Performance Optimization",
    ],
    skills: ["IPS Deployment", "Threat Blocking", "Optimization"],
  },
  {
    id: "module-8",
    title: "Module 8: Network Traffic Analysis with Wireshark",
    icon: <FileSearch className="w-5 h-5" />,
    duration: "Week 9-10",
    topics: [
      "Wireshark Interface & Navigation",
      "Capture Filters vs Display Filters",
      "Protocol Analysis (HTTP, DNS, FTP)",
      "Detecting Malicious Traffic Patterns",
      "TCP Stream Following",
      "Exporting Evidence & Reporting",
    ],
    skills: ["Wireshark", "Packet Analysis", "Traffic Forensics"],
    project: "Analyze a PCAP file to detect intrusion",
  },
  {
    id: "module-9",
    title: "Module 9: VPN Technologies",
    icon: <Lock className="w-5 h-5" />,
    duration: "Week 10-11",
    topics: [
      "VPN Types: Site-to-Site vs Remote Access",
      "IPSec Fundamentals & Modes",
      "OpenVPN Server Setup",
      "WireGuard Configuration",
      "SSL/TLS VPNs",
      "VPN Troubleshooting",
    ],
    skills: ["IPSec", "OpenVPN", "WireGuard"],
  },
  {
    id: "module-10",
    title: "Module 10: Wireless Network Security",
    icon: <Wifi className="w-5 h-5" />,
    duration: "Week 11-12",
    topics: [
      "Wireless Standards (802.11a/b/g/n/ac/ax)",
      "WPA2 vs WPA3 Security",
      "RADIUS Authentication Setup",
      "802.1X Implementation",
      "Rogue AP Detection",
      "Wireless Penetration Testing Basics",
    ],
    skills: ["WPA3", "RADIUS", "802.1X"],
  },
  {
    id: "module-11",
    title: "Module 11: SIEM Implementation",
    icon: <Database className="w-5 h-5" />,
    duration: "Week 12-14",
    topics: [
      "SIEM Architecture & Components",
      "Splunk Installation & Configuration",
      "ELK Stack Setup (Elasticsearch, Logstash, Kibana)",
      "Log Collection & Normalization",
      "Creating Dashboards & Visualizations",
      "Alert Rules & Correlation",
    ],
    skills: ["Splunk", "ELK Stack", "Log Management"],
    project: "Build a complete SIEM dashboard",
  },
  {
    id: "module-12",
    title: "Module 12: Log Analysis & Threat Hunting",
    icon: <FileSearch className="w-5 h-5" />,
    duration: "Week 14-15",
    topics: [
      "Windows Event Log Analysis",
      "Linux Syslog & Auth Logs",
      "Firewall Log Analysis",
      "Threat Hunting Methodologies",
      "MITRE ATT&CK Framework",
      "Building Detection Queries",
    ],
    skills: ["Log Analysis", "Threat Hunting", "MITRE ATT&CK"],
  },
  {
    id: "module-13",
    title: "Module 13: Network Forensics",
    icon: <Eye className="w-5 h-5" />,
    duration: "Week 15-16",
    topics: [
      "Network Forensics Fundamentals",
      "Evidence Collection Best Practices",
      "Chain of Custody",
      "Packet Carving & Reconstruction",
      "Timeline Analysis",
      "Forensic Reporting",
    ],
    skills: ["Evidence Collection", "Forensic Analysis", "Reporting"],
  },
  {
    id: "module-14",
    title: "Module 14: Incident Response & Recovery",
    icon: <AlertTriangle className="w-5 h-5" />,
    duration: "Week 16-17",
    topics: [
      "Incident Response Lifecycle (NIST)",
      "Detection & Identification",
      "Containment Strategies",
      "Eradication & Recovery",
      "Post-Incident Analysis",
      "Creating IR Playbooks",
    ],
    skills: ["NIST Framework", "IR Playbooks", "Recovery"],
    project: "Create an incident response playbook",
  },
  {
    id: "module-15",
    title: "Module 15: Zero Trust Network Architecture",
    icon: <Shield className="w-5 h-5" />,
    duration: "Week 17-18",
    topics: [
      "Zero Trust Principles",
      "Identity-based Access Control",
      "Micro-segmentation",
      "Software-Defined Perimeter (SDP)",
      "Implementing Zero Trust with Azure AD",
      "Zero Trust Maturity Model",
    ],
    skills: ["Zero Trust", "Identity Management", "Micro-segmentation"],
  },
  {
    id: "module-16",
    title: "Module 16: Cloud Network Security",
    icon: <Cloud className="w-5 h-5" />,
    duration: "Week 18-19",
    topics: [
      "AWS VPC Architecture & Security",
      "Azure Virtual Networks & NSGs",
      "Cloud Firewall Configuration",
      "Security Groups vs NACLs",
      "Cloud-native SIEM (CloudTrail, Azure Sentinel)",
      "Multi-cloud Security Considerations",
    ],
    skills: ["AWS Security", "Azure Security", "Cloud Architecture"],
  },
  {
    id: "module-17",
    title: "Module 17: Network Hardening & Compliance",
    icon: <CheckCircle2 className="w-5 h-5" />,
    duration: "Week 19-20",
    topics: [
      "CIS Benchmarks for Network Devices",
      "NIST Cybersecurity Framework",
      "ISO 27001 Network Controls",
      "PCI-DSS Network Requirements",
      "Vulnerability Scanning with Nessus",
      "Compliance Reporting",
    ],
    skills: ["NIST", "ISO 27001", "Compliance"],
  },
  {
    id: "module-18",
    title: "Module 18: Capstone Project - Enterprise SOC Setup",
    icon: <Target className="w-5 h-5" />,
    duration: "Week 20-22",
    topics: [
      "Design Enterprise Network Architecture",
      "Deploy Firewall, IDS/IPS, SIEM Stack",
      "Configure Detection Rules",
      "Simulate Attack Scenarios",
      "Incident Detection & Response",
      "Final Presentation & Portfolio",
    ],
    skills: ["SOC Operations", "Architecture Design", "Defense in Depth"],
    project: "Build a complete enterprise SOC lab",
  },
];

export const NetworkSecurityCurriculum = () => {
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
            18 Comprehensive Modules
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From network fundamentals to advanced SOC operations - master every aspect of network security and defense in 5 months
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>5 Months Duration</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-primary" />
              <span>18 Modules</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>5+ Hands-on Projects</span>
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