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
// 🧰 Tool Model
// ---------------------
export interface Tool {
  name: string;
  icon: string;
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
    title: "Cyber Master's Pro Lite",
    description: "Foundational ethical hacking & network security program for beginners.",
    price: 499,
    thumbnail: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80",
    category: "Live Online",
    duration: "2 months",
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
    demoVideo: "https://drive.google.com/file/d/1aSj5YmuMg7RZ_Cc37h2x-p0pE3ZD1TNY/view",
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
    thumbnail: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=900&q=80",
    category: "Live Online",
    duration: "4 months",
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
    demoVideo: "https://drive.google.com/file/d/1aSj5YmuMg7RZ_Cc37h2x-p0pE3ZD1TNY/view",
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
    price: 6999,
    thumbnail: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=80",
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
    demoVideo: "https://drive.google.com/file/d/1aSj5YmuMg7RZ_Cc37h2x-p0pE3ZD1TNY/view",
    resources: [
      { name: "Bug Hunting Checklist", url: "#" },
      { name: "Pentest Methodology Guide", url: "#" },
      { name: "Report Templates", url: "#" },
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
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    testimonial:
      "The Black Hat program transformed my career. The placement assistance and mock interviews were invaluable in landing my dream job.",
  },
  {
    name: "Kabita Mondal",
    before: "M.Sc in CS",
    after: "Application Developer",
    company: "Thoughtworks",
    courseId: "cyber-blackhat",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
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
];

// ===========================================
// 🧰 TOOLS
// ===========================================
export const tools: Tool[] = [
  { name: "Kali Linux", icon: "🐉" },
  { name: "Nmap", icon: "🗺️" },
  { name: "Metasploit", icon: "🎯" },
  { name: "Burp Suite", icon: "🔍" },
  { name: "Wireshark", icon: "🦈" },
  { name: "Python", icon: "🐍" },
  { name: "Linux", icon: "🐧" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "📦" },
  { name: "SQL", icon: "💾" },
];

// ===========================================
// 💼 HIRING DRIVES
// ===========================================
export const hiringDrives: HiringDrive[] = [
  {
    company: "TechCorp India",
    role: "Software Developer",
    salary: "6–10 LPA",
    location: "Bangalore",
    logo: "https://images.unsplash.com/photo-1581093588401-22c7a2c57c8e?auto=format&fit=crop&w=300&q=80",
    courseId: "cyber-blackhat",
  },
  {
    company: "DataSystems Pro",
    role: "Data Analyst",
    salary: "5–8 LPA",
    location: "Mumbai",
    logo: "https://images.unsplash.com/photo-1581092795360-fd1ca5a1a5a2?auto=format&fit=crop&w=300&q=80",
    courseId: "cyber-lite",
  },
  {
    company: "SecureNet Solutions",
    role: "Security Analyst",
    salary: "7–12 LPA",
    location: "Hyderabad",
    logo: "https://images.unsplash.com/photo-1612831662375-295c1003d3b2?auto=format&fit=crop&w=300&q=80",
    courseId: "bug-hunting-pentest",
  },
  {
    company: "CloudTech Services",
    role: "DevOps Engineer",
    salary: "8–15 LPA",
    location: "Pune",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80",
    courseId: "cyber-blackhat",
  },
];
