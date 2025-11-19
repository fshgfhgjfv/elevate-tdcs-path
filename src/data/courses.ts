"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Terminal, Shield, Cpu, Award, CheckCircle, MapPin, PlayCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

// ---
// --- 1. DATA SECTION ---
// ---

// Tools Data (Updated with high-quality CDNs)
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

// Courses Data
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

// Testimonials Data
const testimonials = [
  { name: "Sandeep Singh", role: "Software Engineer", company: "Innovaccer", feedback: "The Black Hat program transformed my career. The placement assistance was invaluable." },
  { name: "Kabita Mondal", role: "App Developer", company: "Thoughtworks", feedback: "Comprehensive curriculum with excellent mentorship. Hands-on projects were great." },
  { name: "Akash Ingoley", role: "Software Developer", company: "Pay Glocal", feedback: "Perfect for beginners! Gave me confidence to pursue cybersecurity professionally." },
  { name: "Rahul Mehta", role: "Bug Bounty Hunter", company: "HackerOne", feedback: "Earned my first bounty within 2 months of completing the course!" },
];

// Hiring Drives
const hiringDrives = [
  { company: "TechCorp India", role: "Software Developer", salary: "6–10 LPA", location: "Bangalore" },
  { company: "DataSystems Pro", role: "Data Analyst", salary: "5–8 LPA", location: "Mumbai" },
  { company: "SecureNet", role: "Security Analyst", salary: "7–12 LPA", location: "Hyderabad" },
  { company: "CloudTech", role: "DevOps Engineer", salary: "8–15 LPA", location: "Pune" },
];

// --- 2. ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// --- 3. MAIN COMPONENT ---
const TDCSLandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-slate-900 text-white">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Badge className="mb-6 bg-blue-600 hover:bg-blue-700 px-4 py-1 text-sm">
              🚀 New Batch Starting Soon
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Master Cybersecurity <br /> & Secure Your Future
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 35,000+ students learning ethical hacking, penetration testing, and software development with <strong>TDCS Technologies</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-900/50">
                Explore Courses
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-900 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg rounded-full">
                <PlayCircle className="mr-2 w-5 h-5" /> Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- TOOLS SECTION (UPDATED) --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tools You Will Master</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Get hands-on experience with industry-standard tools used by top cybersecurity professionals.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            {tools.map((tool, index) => (
              <motion.a
                key={index}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="group flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-16 w-16 mb-6 relative flex items-center justify-center">
                  <img
                    src={tool.icon}
                    alt={`${tool.name} logo`}
                    className="max-h-full max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <h3 className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- COURSES SECTION --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Expert-Led Courses</h2>
            <p className="text-slate-600">Choose the path that fits your career goals.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-all z-10"/>
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <Badge className="absolute top-4 right-4 z-20 bg-white/90 text-slate-900 hover:bg-white">
                    {course.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.modules.slice(0, 3).map((mod, i) => (
                      <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                        {mod}
                      </span>
                    ))}
                    {course.modules.length > 3 && <span className="text-xs text-slate-400 px-2 py-1">+ more</span>}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-slate-900">{course.price}</span>
                    <Button className="bg-slate-900 text-white hover:bg-blue-600 rounded-full px-6">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- HIRING PARTNERS --- */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Active Hiring Drives</h2>
              <p className="text-slate-400">Exclusive opportunities for TDCS students.</p>
            </div>
            <Button variant="outline" className="border-slate-600 text-slate-900 hover:bg-white hover:text-slate-900">
              View All Drives <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringDrives.map((job, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-slate-900 font-bold text-xl">
                    {job.company.charAt(0)}
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Active</Badge>
                </div>
                <h4 className="font-bold text-lg mb-1">{job.role}</h4>
                <p className="text-slate-400 text-sm mb-4">{job.company}</p>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center"><Award className="w-4 h-4 mr-2 text-blue-400"/> {job.salary}</div>
                  <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-blue-400"/> {job.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS MARQUEE --- */}
      <section className="py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Success Stories</h2>
        </div>
        
        <div className="relative w-full overflow-hidden mask-image-gradient">
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: "-50%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[400px] bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <p className="text-slate-600 italic mb-6 text-lg leading-relaxed">"{t.feedback}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{t.name}</h5>
                    <p className="text-sm text-slate-500">{t.role} at {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2025 TDCS Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TDCSLandingPage;