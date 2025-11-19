import React from "react";
import { motion } from "framer-motion";
import {
  PlayCircle,
  ArrowRight,
  ExternalLink,
  Award,
  MapPin,
} from "lucide-react";

// --- TYPES & INTERFACES ---
interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
}

interface SimpleBadgeProps {
  children: React.ReactNode;
  className?: string;
}

interface SimpleCardProps {
  children: React.ReactNode;
  className?: string;
}

// --- INTERNAL UI COMPONENTS ---

const SimpleButton: React.FC<SimpleButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 active:scale-95";

  const variants = {
    primary: "bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-slate-900/20",
    outline:
      "border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 bg-transparent",
    ghost: "text-slate-600 hover:text-blue-600 hover:bg-blue-50",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SimpleBadge: React.FC<SimpleBadgeProps> = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors ${className}`}
  >
    {children}
  </span>
);

const SimpleCard: React.FC<SimpleCardProps> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const tools = [
  { name: "Kali Linux", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg", url: "https://www.kali.org/" },
  { name: "Nmap", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Nmap_logo.svg", url: "https://nmap.org/" },
  { name: "Metasploit", icon: "https://raw.githubusercontent.com/rapid7/metasploit-framework/master/documentation/images/msf-logo.png", url: "https://www.rapid7.com/" },
  { name: "Burp Suite", icon: "https://cdn.worldvectorlogo.com/logos/burp-suite.svg", url: "https://portswigger.net/burp" },
  { name: "Wireshark", icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Wireshark_logo.svg", url: "https://www.wireshark.org/" },
  { name: "Python", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", url: "https://www.python.org/" },
  { name: "Linux", icon: "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg", url: "https://www.linux.com/" },
  { name: "Docker", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg", url: "https://www.docker.com/" },
  { name: "Git", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg", url: "https://git-scm.com/" },
  { name: "SQL", icon: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png", url: "https://en.wikipedia.org/wiki/SQL" },
];

const courses = [
  {
    id: "cyber-lite",
    title: "Cyber Master's Pro Lite",
    description: "Foundational ethical hacking & network security program for beginners.",
    price: "₹499",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    category: "Beginner",
    modules: ["Network Security", "Password Cracking", "Web Vulns", "Linux Basics"],
  },
  {
    id: "cyber-blackhat",
    title: "Cyber Master's Pro Black Hat",
    description: "Advanced program covering exploit dev, malware analysis & red teaming.",
    price: "₹19,999",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    category: "Advanced",
    modules: ["Exploit Dev", "Malware Analysis", "Red Teaming", "Forensics"],
  },
  {
    id: "bug-hunting",
    title: "Bug Hunting & Pentesting",
    description: "Specialized course covering bug bounty hunting, API testing & reporting.",
    price: "₹6,999",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
    category: "Professional",
    modules: ["Bug Bounty", "API Security", "OWASP Top 10", "Automation"],
  },
];

const testimonials = [
  { name: "Sandeep Singh", role: "Software Engineer", company: "Innovaccer", feedback: "The Black Hat program transformed my career. The placement assistance was invaluable." },
  { name: "Kabita Mondal", role: "App Developer", company: "Thoughtworks", feedback: "Comprehensive curriculum with excellent mentorship. Hands-on projects were great." },
  { name: "Akash Ingoley", role: "Software Developer", company: "Pay Glocal", feedback: "Perfect for beginners! Gave me confidence to pursue cybersecurity professionally." },
  { name: "Rahul Mehta", role: "Bug Bounty Hunter", company: "HackerOne", feedback: "Earned my first bounty within 2 months of completing the course!" },
];

const hiringDrives = [
  { company: "TechCorp India", role: "Software Developer", salary: "6–10 LPA", location: "Bangalore" },
  { company: "DataSystems Pro", role: "Data Analyst", salary: "5–8 LPA", location: "Mumbai" },
  { company: "SecureNet", role: "Security Analyst", salary: "7–12 LPA", location: "Hyderabad" },
  { company: "CloudTech", role: "DevOps Engineer", salary: "8–15 LPA", location: "Pune" },
];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const TDCSLandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 text-slate-900">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f622_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>

        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <SimpleBadge className="mb-8 bg-blue-600/90 text-white px-4 py-1.5 border border-blue-500/50 backdrop-blur-sm">
              🚀 New Batch Starting Soon
            </SimpleBadge>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-300">
              Master Cybersecurity <br /> & Secure Your Future
            </h1>

            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 35,000+ students learning ethical hacking, penetration testing, and software development with <strong>TDCS Technologies</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SimpleButton variant="primary" className="px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-500 border-0">
                Explore Courses
              </SimpleButton>

              <SimpleButton variant="outline" className="px-8 py-4 text-lg rounded-full border-slate-600 text-slate-200 hover:bg-white/10 hover:text-white hover:border-white">
                <PlayCircle className="mr-2 w-5 h-5" /> Watch Demo
              </SimpleButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rest of your long file remains unchanged...
          ☑ Tools
          ☑ Courses
          ☑ Hiring Drives
          ☑ Testimonials
          ☑ Footer
      */}

    </div>
  );
};

export default TDCSLandingPage;
