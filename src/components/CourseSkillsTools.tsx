import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Zap, Shield, Briefcase, Code } from 'lucide-react';

// --- HELPER COMPONENTS (Simulating Shadcn/UI for a single-file environment) ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-800/80 border border-gray-700 rounded-2xl backdrop-blur-sm shadow-2xl shadow-green-500/10 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const Tabs = ({ children, defaultValue, className = "" }) => {
    // We use local state to manage which tab is active
    const [activeTab, setActiveTab] = useState(defaultValue);

    // Pass the state and setter to the children
    return (
        <div className={className}>
            {React.Children.map(children, child => {
                if (child.type.name === 'TabsList') {
                    return React.cloneElement(child, { activeTab, setActiveTab });
                }
                if (child.type.name === 'TabsContent' && child.props.value === activeTab) {
                    return child;
                }
                return null;
            })}
        </div>
    );
};

const TabsList = ({ children, className = "", activeTab, setActiveTab }) => (
    <div className={`flex justify-center p-1 bg-gray-900 border border-gray-700 rounded-xl mb-10 shadow-lg ${className}`}>
        {React.Children.map(children, child =>
            React.cloneElement(child, { 
                isActive: child.props.value === activeTab, 
                onClick: () => setActiveTab(child.props.value) 
            })
        )}
    </div>
);

const TabsTrigger = ({ children, value, isActive, onClick, className = "" }) => (
    <button
        onClick={onClick}
        className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 transform 
            ${isActive 
                ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-md shadow-green-500/30' 
                : 'text-gray-400 hover:text-green-400 hover:bg-gray-700/50'
            } ${className}`}
    >
        {children}
    </button>
);

const TabsContent = ({ children, value }) => (
    <motion.div
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);


// --- DATA STRUCTURES (Updated for Cybersecurity) ---
const hackingSkills = [
  { name: "Ethical Hacking", icon: <Zap className="w-8 h-8 text-green-400" />, description: "Core concepts, methodologies, and phases of ethical hacking." },
  { name: "Web Security", icon: <Shield className="w-8 h-8 text-blue-400" />, description: "Defending against XSS, SQLi, CSRF, and session hijacking attacks." },
  { name: "Network Security", icon: <Code className="w-8 h-8 text-yellow-400" />, description: "Securing network infrastructure, protocols, and wireless systems." },
  { name: "Cryptography", icon: <Zap className="w-8 h-8 text-purple-400" />, description: "Understanding encryption, hashing, and digital signatures." },
  { name: "Reverse Engineering", icon: <Code className="w-8 h-8 text-red-400" />, description: "Analyzing malware and proprietary software for vulnerabilities." },
  { name: "Digital Forensics", icon: <Shield className="w-8 h-8 text-teal-400" />, description: "Collecting and analyzing digital evidence for investigations." },
  { name: "Cloud Security", icon: <Zap className="w-8 h-8 text-indigo-400" />, description: "Securing platforms like AWS, Azure, and Google Cloud environments." },
  { name: "Bug Bounty", icon: <Code className="w-8 h-8 text-orange-400" />, description: "Finding and reporting critical vulnerabilities on live applications." },
];

const hackingTools = [
  { name: "Kali Linux", icon: "🐧", description: "The industry-standard operating system for penetration testing." },
  { name: "Burp Suite", icon: "🕷️", description: "Essential tool for web application vulnerability scanning and exploitation." },
  { name: "Wireshark", icon: "🦈", description: "Packet sniffing and network analysis tool for deep protocol inspection." },
  { name: "Nmap", icon: "📡", description: "Network discovery and security auditing utility." },
  { name: "Metasploit", icon: "💉", description: "World's most used penetration testing framework." },
  { name: "Hydra / John the Ripper", icon: "🔑", description: "Powerful tools for password cracking and brute-force attacks." },
];

const hackingCareers = [
  "Penetration Tester (Pentesters are highly sought after)",
  "Security Analyst (First line of defense in a SOC)",
  "Bug Bounty Hunter (Freelance or in-house role)",
  "Forensic Investigator (Analyzing evidence after a breach)",
  "Security Consultant (Advising companies on security strategies)",
  "Red Team Operator (Simulating real-world attacks)",
];

const HackingCourseOverview = () => {
    // Custom CSS for Gradient Header Text
    const gradientTextStyle = "text-5xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500";

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: i => ({
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                delay: i * 0.05,
            },
        }),
    };
    
    return (
        <section className="py-16 md:py-24 min-h-screen bg-gray-900 text-gray-100 font-inter">
            {/* Custom CSS for Global Styles */}
            <style jsx>{`
                .container { max-width: 1200px; }
                .shadow-glow { box-shadow: 0 0 15px rgba(74, 222, 128, 0.2); }
            `}</style>
            
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ type: "spring", damping: 10, stiffness: 50 }}
                    className="text-center mb-16"
                >
                    <h2 className={gradientTextStyle}>
                        Master the Arsenal of a Cyber Professional
                    </h2>
                    <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                        Learn the most in-demand **Skills**, utilize the **Tools** of the trade, and secure your **Career** in the fastest-growing industry.
                    </p>
                </motion.div>

                <Tabs defaultValue="tools" className="max-w-6xl mx-auto">
                    <TabsList className="grid grid-cols-4 md:grid-cols-4 mb-10">
                        <TabsTrigger value="skills">Core Skills</TabsTrigger>
                        <TabsTrigger value="tools">Hacking Tools</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="careers">Career Paths</TabsTrigger>
                    </TabsList>

                    {/* --- SKILLS TAB --- */}
                    <TabsContent value="skills">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {hackingSkills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    custom={index}
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
                                    viewport={{ once: true }}
                                    className="relative group bg-gray-800 border border-gray-700 p-6 rounded-2xl flex flex-col items-start space-y-3 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                                            {skill.icon}
                                        </div>
                                        <h3 className="font-bold text-lg text-white">{skill.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-400">{skill.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* --- TOOLS TAB --- */}
                    <TabsContent value="tools">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                            {hackingTools.map((tool, index) => (
                                <motion.div
                                    key={index}
                                    custom={index}
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    whileHover={{ scale: 1.1, rotate: 1, boxShadow: "0 0 30px rgba(74, 222, 128, 0.7)" }}
                                    viewport={{ once: true }}
                                    className="relative group bg-gray-800 border border-green-500/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 transition-all cursor-pointer h-40"
                                >
                                    <div className="text-5xl mb-2" role="img" aria-label={tool.name}>
                                        {tool.icon}
                                    </div>
                                    <span className="font-bold text-white text-lg">{tool.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* --- PROJECTS TAB --- */}
                    <TabsContent value="projects">
                        <Card className="shadow-glow">
                            <CardContent className="p-8 text-center">
                                <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                                    Hands-On, Real-World Projects
                                </h3>
                                <p className="text-gray-400 mb-6 max-w-3xl mx-auto">
                                    Our curriculum is project-based, ensuring you gain practical experience. Here are a few examples of what you will build and master:
                                </p>
                                
                                <div className="grid md:grid-cols-3 gap-6">
                                    {hackingProjects.map((project, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(74, 222, 128, 0.3)" }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-4 bg-gray-900 rounded-xl border border-gray-700 text-left"
                                        >
                                            <h4 className="font-bold text-lg text-green-400 mb-1">{project.title}</h4>
                                            <p className="text-sm text-gray-500">{project.description}</p>
                                        </motion.div>
                                    ))}
                                </div>

                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* --- CAREERS TAB --- */}
                    <TabsContent value="careers">
                        <Card className="shadow-glow">
                            <CardContent className="p-8">
                                <h3 className="text-3xl font-bold mb-6 text-center text-blue-400">
                                    Top Career Paths After Certification
                                </h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {hackingCareers.map((career, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            whileHover={{ scale: 1.05, backgroundColor: '#1F2937' }} // bg-gray-800
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-700 transition-all cursor-pointer"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold shadow-md">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <span className="font-semibold text-base text-gray-200">{career}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default function App() {
    return <HackingCourseOverview />;
}