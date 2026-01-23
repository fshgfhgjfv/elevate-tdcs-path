// ===========================================
// 🧠 TDCS Platform Data Model (Enhanced)
// ===========================================
// TODO: Replace with Supabase/Firebase integration

// ---------------------
// 🎓 Course Model
// ---------------------
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: "Live Online" | "Offline" | "Self-Paced";
  duration: string;
  modules: string[];
  overview: string;
  includes: string[];
  demoVideo?: string;
  resources?: { name: string; url: string }[];
}

// ---------------------
// 💬 Testimonial Model
// ---------------------
export interface Testimonial {
  name: string;
  before: string;
  after: string;
  company: string;
  courseId: string;
  image?: string;
  testimonial: string;
}

// ---------------------
// 🧰 Tool Model (Updated)
// ---------------------
export interface Tool {
  name: string;
  emoji: string; // Name and Emoji only
}

// ---------------------
// 💼 Hiring Drive Model
// ---------------------
export interface HiringDrive {
  company: string;
  role: string;
  salary: string;
  location: string;
  logo: string;
  courseId: string;
}

// ===========================================
// 📚 COURSES
// ===========================================
export const courses: Course[] = [
  {
    id: "cyber-lite",
    title: "Cyber Master's Pro Black-Hat Lite",
    description:
      "Foundational ethical hacking & network security program for beginners.",
    price: 499,
    thumbnail:
      "https://blogger.googleusercontent.com/img/a/AVvXsEgMKmkTzJvEcIjr3zQ0n8wt-k2D4hq-_cD5twU3IeF_a5y9REqrVDKUuepUCt4Nng6emAaSP1MurvyeXwOZchv200tIdBMdPShsr5wc2QVV7N05ONwXelMMgDNUe3s9biRkRiIJgAwyKORuwVDaLlRhHTl2UeoDn1V1uiwu0XrpQ6fM5Pee7UaAkV5NaMsN",
    category: "Live Online",
    duration: "15 days",
    modules: [
      "Network Security Fundamentals",
      "Password Cracking Techniques",
      "Web Application Vulnerabilities",
      "Social Engineering",
      "Reconnaissance & Information Gathering",
      "Linux for Security Professionals",
    ],
    overview:
      "This foundational course in ethical hacking covers the essential concepts of penetration testing basics, network security, reconnaissance, and basic Linux commands. Perfect for beginners looking to start their cybersecurity career.",
    includes: [
      "Video lessons with lifetime access",
      "Hands-on practice labs",
      "Downloadable study materials and PDFs",
      "Completion certificate",
      "Community forum access",
    ],
    demoVideo: "https://youtu.be/JNcuJSJ3Z1Q?si=boi5NFQYhCrvT5JV",
    resources: [
      { name: "Sample Lab Guide", url: "#" },
      { name: "Course Slidebook", url: "#" },
      { name: "Security Cheat Sheet", url: "#" },
    ],
  },
  {
    id: "cyber-blackhat",
    title: "Cyber Master's Pro Black Hat",
    description:
      "Advanced program covering exploit dev, malware analysis, red teaming & advanced pentesting.",
    price: 19999,
    thumbnail:
      "https://blogger.googleusercontent.com/img/a/AVvXsEimZrWbA4DGBCy0eQXhIBbuVefY_7WOcvJ6SC11Q55L0rc9sMT_b_2-BRTbGYPv9e6r05aREJI91KC7tE1rlobdc_gOLsRIO11_PAD246NAYCDsCboM9pSzJtqHLmhaXcDfb9c1NwfQviILZrJHgLByTSuTUKjmSAfkPgqWVgbYCNL8NF7ZCLb4UiJtqpBd",
    category: "Live Online",
    duration: "6 months",
    modules: [
      "Exploit Development",
      "Reverse Engineering",
      "Malware Analysis",
      "Red Teaming Operations",
      "Advanced Network Pentesting",
      "Digital Forensics",
    ],
    overview:
      "Advanced ethical hacking program covering exploit development, reverse engineering, malware analysis, red teaming strategies, and professional penetration testing workflows. Designed for experienced security professionals.",
    includes: [
      "Private lab environment access",
      "Real-world case studies",
      "Professional pentesting tools",
      "Professional certificate",
      "Career placement support",
      "1-on-1 mentorship sessions",
    ],
    demoVideo: "https://youtu.be/JNcuJSJ3Z1Q?si=boi5NFQYhCrvT5JV",
    resources: [
      { name: "Advanced Lab Guide", url: "#" },
      { name: "Exploit Development Manual", url: "#" },
      { name: "Malware Analysis Toolkit", url: "#" },
    ],
  },
  {
    id: "bug-hunting-pentest",
    title: "Bug Hunting & Penetration Testing",
    description:
      "Specialized course covering bug bounty hunting, web security, API testing & professional pentesting.",
    price: 9999,
    thumbnail:
      "https://blogger.googleusercontent.com/img/a/AVvXsEiDzw2wArcdtq3c1v02jDShldtvfyD2qvWJM2yaXc29klQ_ExVwMldeZrakMyLyyNcCF7nYsNdUxVVBCypNx3TPvxEFgsf74dPzE2DrU2Wx658znAPE_f4ikvGr2M4-sJY_4TmL7QdE7XSgBkD1tn65aeBOrYDZSDa54MK1u5HcANKoBXCsXvEOhLjYCUq3",
    category: "Live Online",
    duration: "3 months",
    modules: [
      "Bug Bounty Hunting Fundamentals",
      "Advanced Web Application Security",
      "API Security Testing",
      "Mobile Application Security",
      "OWASP Top 10 Exploitation",
      "Professional Penetration Testing Methodology",
      "Report Writing & Documentation",
      "Automation with Python & Bash",
    ],
    overview:
      "Master the art of bug hunting and professional penetration testing. This intermediate-level course covers real-world bug bounty techniques, advanced web vulnerabilities, API security, and professional penetration testing methodologies used by industry experts.",
    includes: [
      "Dedicated bug bounty practice environment",
      "Live bug bounty platform access",
      "Video lessons with lifetime access",
      "Professional penetration testing toolkit",
      "Industry-recognized certificate",
      "Bug bounty tips and tricks",
      "Career guidance for bug hunters",
      "Community support and mentorship",
    ],
    demoVideo:
      "https://drive.google.com/file/d/1aSj5YmuMg7RZ_Cc37h2x-p0pE3ZD1TNY/view",
    resources: [
      { name: "Bug Hunting Checklist", url: "#" },
      { name: "Pentest Methodology Guide", url: "#" },
      { name: "Report Templates", url: "#" },
    ],
  },
  {
    id: "network-security-defense",
    title: "Network Security & Defense",
    description:
      "Comprehensive 5-month program covering network fundamentals, firewall management, IDS/IPS, SIEM, and enterprise defense strategies. ₹12,000 only.",
    price: 12000,
    thumbnail:
      "https://blogger.googleusercontent.com/img/a/AVvXsEimZrWbA4DGBCy0eQXhIBbuVefY_7WOcvJ6SC11Q55L0rc9sMT_b_2-BRTbGYPv9e6r05aREJI91KC7tE1rlobdc_gOLsRIO11_PAD246NAYCDsCboM9pSzJtqHLmhaXcDfb9c1NwfQviILZrJHgLByTSuTUKjmSAfkPgqWVgbYCNL8NF7ZCLb4UiJtqpBd",
    category: "Live Online",
    duration: "5 months",
    modules: [
      "Module 1: Network Fundamentals & OSI Model",
      "Module 2: TCP/IP Protocol Suite Deep Dive",
      "Module 3: Subnetting & IP Addressing Mastery",
      "Module 4: Router & Switch Configuration",
      "Module 5: Firewall Architecture & pfSense/FortiGate",
      "Module 6: Intrusion Detection Systems (Snort/Suricata)",
      "Module 7: Intrusion Prevention & Threat Blocking",
      "Module 8: Network Traffic Analysis with Wireshark",
      "Module 9: VPN Technologies (IPSec, OpenVPN, WireGuard)",
      "Module 10: Wireless Security (WPA3, RADIUS, 802.1X)",
      "Module 11: SIEM Implementation (Splunk/ELK Stack)",
      "Module 12: Log Analysis & Threat Hunting",
      "Module 13: Network Forensics & Evidence Collection",
      "Module 14: Incident Response & Recovery",
      "Module 15: Zero Trust Network Architecture",
      "Module 16: Cloud Network Security (AWS VPC, Azure NSG)",
      "Module 17: Network Hardening & Compliance (NIST/ISO 27001)",
      "Module 18: Capstone Project: Enterprise SOC Setup",
    ],
    overview:
      "Master network security and defense in this intensive 5-month program for ₹12,000. Starting from network fundamentals and OSI model, you'll progress through hands-on training with industry-standard tools including Wireshark, Snort, Splunk, pfSense, and more. Learn to configure enterprise firewalls, implement IDS/IPS, build SIEM solutions, and respond to security incidents. Perfect for aspiring SOC Analysts, Network Security Engineers, and IT professionals seeking to specialize in defensive security.",
    includes: [
      "60+ hours of live online classes",
      "Dedicated virtual lab environment",
      "Real firewall & IDS/IPS configurations",
      "Splunk/ELK SIEM hands-on training",
      "Industry-recognized certification",
      "100% placement assistance",
      "1-on-1 mentorship with SOC professionals",
      "Lifetime access to recordings & materials",
      "Active Discord community support",
      "Mock interviews & resume building",
      "Capstone project for portfolio",
    ],
    demoVideo: "https://youtu.be/JNcuJSJ3Z1Q?si=boi5NFQYhCrvT5JV",
    resources: [
      { name: "Network Security Handbook", url: "#" },
      { name: "Firewall Configuration Guide", url: "#" },
      { name: "Wireshark Cheat Sheet", url: "#" },
      { name: "SIEM Implementation Manual", url: "#" },
      { name: "Incident Response Playbook", url: "#" },
    ],
  },
];

// ===========================================
// 💬 TESTIMONIALS
// ===========================================
export const testimonials: Testimonial[] = [
  {
    name: "Sandeep Singh",
    before: "Chemical Engineer",
    after: "Software Engineer",
    company: "Innovaccer",
    courseId: "cyber-blackhat",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIQ18JzfbqKwsK3e5KlUt8EJbaEaeduXgJkA&s",
    testimonial:
      "The Black Hat program transformed my career. The placement assistance and mock interviews were invaluable in landing my dream job.",
  },
  {
    name: "Kabita Mondal",
    before: "M.Sc in CS",
    after: "Application Developer",
    company: "Thoughtworks",
    courseId: "cyber-blackhat",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzzCpnE0enlEeacrQHddcjdy1bKy4rqZOK5g&s",
    testimonial:
      "Comprehensive curriculum with excellent mentorship. The hands-on projects prepared me well for real-world challenges.",
  },
  {
    name: "Akash Ingoley",
    before: "Gap year",
    after: "Software Developer",
    company: "Pay Glocal",
    courseId: "cyber-lite",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    testimonial:
      "Perfect for beginners! The foundational course gave me the confidence to pursue cybersecurity professionally.",
  },
  {
    name: "Pradyot Verma",
    before: "Mechanical Engineer",
    after: "Software Developer",
    company: "MakeMyTrip",
    courseId: "cyber-blackhat",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    testimonial:
      "Career transition made easy with TDCS. The placement support and industry connections are top-notch.",
  },
  {
    name: "Stuti Pandey",
    before: "Fresher Graduate",
    after: "Full Stack Developer",
    company: "Zomato",
    courseId: "cyber-lite",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    testimonial:
      "As a fresher, this course gave me the edge I needed. The practical labs and projects were game-changers.",
  },
  {
    name: "Lalit K Tiwari",
    before: "Civil Engineer",
    after: "Data Analyst",
    company: "Flipkart",
    courseId: "cyber-lite",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    testimonial:
      "Excellent introduction to cybersecurity. The instructors are knowledgeable and always available for doubts.",
  },
  {
    name: "Rahul Mehta",
    before: "IT Professional",
    after: "Bug Bounty Hunter",
    company: "HackerOne",
    courseId: "bug-hunting-pentest",
    image: "https://randomuser.me/api/portraits/men/43.jpg",
    testimonial:
      "The bug bounty program is exceptional! I earned my first bounty within 2 months of completing the course.",
  },
  {
    name: "Priya Sharma",
    before: "Web Developer",
    after: "Security Researcher",
    company: "Bugcrowd",
    courseId: "bug-hunting-pentest",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    testimonial:
      "Real-world bug hunting techniques that actually work. I'm now earning consistently from bug bounties.",
  },
  {
    name: "Amit Kumar",
    before: "Network Admin",
    after: "Penetration Tester",
    company: "Accenture",
    courseId: "bug-hunting-pentest",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    testimonial:
      "The pentesting methodology taught here is industry-standard. Got certified and hired within a month!",
  },
  {
    name: "Vikram Rao",
    before: "System Administrator",
    after: "Network Security Engineer",
    company: "Cisco",
    courseId: "network-security-defense",
    image: "https://randomuser.me/api/portraits/men/72.jpg",
    testimonial:
      "The Network Security & Defense course transformed my career. The hands-on labs with real firewalls and SIEM tools gave me practical experience that employers value.",
  },
  {
    name: "Neha Gupta",
    before: "IT Support",
    after: "SOC Analyst",
    company: "Wipro",
    courseId: "network-security-defense",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    testimonial:
      "Excellent curriculum covering everything from network fundamentals to advanced threat detection. The placement assistance helped me land my dream job!",
  },
  {
    name: "Rajesh Kumar",
    before: "Fresher",
    after: "Network Security Specialist",
    company: "TCS",
    courseId: "network-security-defense",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    testimonial:
      "As a fresher, this 5-month program gave me comprehensive knowledge in network security. The mentorship and real-world projects were invaluable.",
  },
];

// ===========================================
// 🧰 TOOLS (Name & Emoji Only)
// ===========================================
export const tools: Tool[] = [
  {
    name: "Kali Linux",
    emoji: "🐉",
  },
  {
    name: "Nmap",
    emoji: "👁️",
  },
  {
    name: "Metasploit",
    emoji: "⚔️",
  },
  {
    name: "Burp Suite",
    emoji: "🐞",
  },
  {
    name: "Wireshark",
    emoji: "🦈",
  },
  {
    name: "Python",
    emoji: "🐍",
  },
  {
    name: "Linux",
    emoji: "🐧",
  },
  {
    name: "Docker",
    emoji: "🐳",
  },
  {
    name: "Git",
    emoji: "🌿",
  },
  {
    name: "SQL",
    emoji: "🗄️",
  },
];

// ===========================================
// 💼 HIRING DRIVES (Fixed Typo)
// ===========================================
export const hiringDrives: HiringDrive[] = [
  {
    company: "TechCorp India",
    role: "Software Developer",
    salary: "6–10 LPA",
    location: "Bangalore",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_T4gIa3-huI-PtTmRr95TxKLqS3KBnCtTgw&s",
    courseId: "cyber-blackhat",
  },
  {
    company: "DataSystems Pro",
    role: "Data Analyst",
    salary: "5–8 LPA",
    location: "Mumbai",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLXJxerw8fSd7U0TIPAFknujTCkTZD0Ktt2Q&s",
    courseId: "cyber-lite",
  },
  {
    company: "SecureNet Solutions",
    role: "Security Analyst",
    salary: "7–12 LPA",
    location: "Hyderabad",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIQ18JzfbqKwsK3e5KlUt8EJbaEaeduXgJkA&s",
    courseId: "bug-hunting-pentest",
  },
  {
    company: "CloudTech Services",
    role: "DevOps Engineer",
    salary: "8–15 LPA",
    location: "Pune",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzzCpnE0enlEeacrQHddcjdy1bKy4rqZOK5g&s",
    courseId: "cyber-blackhat",
  },
];