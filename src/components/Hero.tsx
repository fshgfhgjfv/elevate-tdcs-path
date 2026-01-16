import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, Radio, Terminal, Cpu, 
  Download, X, FileText, Activity, ChevronRight, Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button"; 

// --- THEME CONSTANTS (MATCHING SCREENSHOT) ---
const COLORS = {
  blue: "#3B82F6",    // CEO Card
  green: "#10B981",   // COO Card
  red: "#EF4444",     // CMO Card
  orange: "#F97316",  // TDCS Text
  purple: "#A855F7",  // Technologies Text
  bg: "#0B0F17"       // Deep Dark Background
};

const COMMON_BROCHURE_URL = "https://drive.google.com/file/d/1_oWjtOS1hRyVolJv22tHwPxdv2t2ePau/view?usp=drive_link";

// --- UTILS ---
const alertMessage = (message: string, type: 'success' | 'error') => {
    const alertBox = document.getElementById('global-alert-hero');
    if (alertBox) {
        alertBox.textContent = `[${type.toUpperCase()}] ${message}`;
        // Styling matches the Blue primary theme
        alertBox.className = `fixed top-4 right-4 z-[9999] p-4 rounded bg-[#0B0F17] border border-blue-500 text-blue-400 font-mono text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-in slide-in-from-right fade-in duration-300 block`;
        setTimeout(() => { alertBox.className = "hidden"; }, 3000);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
};

// ==========================================
// 1. VISUAL HELPERS
// ==========================================

// --- ⚡ Text Gradient Helpers ---
const GradientText = ({ text, from, to }: { text: string, from: string, to: string }) => {
    return (
        <div className="relative inline-block group cursor-default">
            <span 
                className="relative z-10 font-black bg-clip-text text-transparent bg-gradient-to-r"
                style={{ backgroundImage: `linear-gradient(to right, ${from}, ${to})` }}
            >
                {text}
            </span>
        </div>
    );
};

// --- 🌐 Cyber Background (Deep Slate) ---
const CyberBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0B0F17] pointer-events-none">
            {/* Deep Blue Glow Spot */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
            
            {/* Moving Grid Floor (Subtle Blue) */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #3B82F6 1px, transparent 1px),
                                      linear-gradient(to bottom, #3B82F6 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
                    animation: 'gridMove 20s linear infinite',
                    maskImage: 'linear-gradient(to bottom, transparent, black)'
                }}
            />
            <style>{`
                @keyframes gridMove {
                    0% { transform: perspective(1000px) rotateX(60deg) translateY(0) scale(2) }
                    100% { transform: perspective(1000px) rotateX(60deg) translateY(50px) scale(2) }
                }
            `}</style>
        </div>
    );
};

// --- 📍 Global HUD Ticker ---
const LocationHUD = () => {
    const [text, setText] = useState("SYSTEM_INIT...");
    useEffect(() => {
        const states = ["CONNECTING...", "HQ: KOLKATA [ONLINE]", "TARGET: GLOBAL"];
        let i = 0;
        const interval = setInterval(() => { setText(states[i]); i = (i + 1) % states.length; }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/30 backdrop-blur-md mb-6 md:mb-8">
            <Radio className="w-3 h-3 text-blue-400 animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs text-blue-300 tracking-widest uppercase">
                {text}
            </span>
        </div>
    );
};

// ==========================================
// 2. CYBER MODAL SYSTEM
// ==========================================

const CyberInput = ({ label, icon: Icon, error, color = "blue", ...props }: any) => {
    // Map color prop to tailwind classes
    const colors: any = {
        blue: "text-blue-400 border-blue-500 focus:border-blue-400 focus:ring-blue-400 placeholder-blue-900",
        green: "text-emerald-400 border-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 placeholder-emerald-900",
        red: "text-red-400 border-red-500 focus:border-red-400 focus:ring-red-400 placeholder-red-900",
    };
    const c = colors[color] || colors.blue;

    return (
        <div className="relative group">
            <label className={`block text-xs font-mono mb-1 tracking-widest uppercase opacity-80 ${c.split(' ')[0]}`}>
                {label}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className={`h-4 w-4 ${c.split(' ')[0]}`} />
                </div>
                <input
                    {...props}
                    className={`block w-full pl-10 pr-3 py-2.5 bg-[#0B0F17]/90 border rounded-md text-gray-100 bg-opacity-50 focus:ring-1 focus:outline-none transition-all font-mono text-sm ${c}`}
                />
            </div>
            {error && <p className={`text-xs mt-1 font-mono flex items-center ${c.split(' ')[0]}`}><X className="w-3 h-3 mr-1"/> {error}</p>}
        </div>
    );
};

const CyberModalFrame = ({ children, title, subtitle, icon: Icon, onClose, theme = "blue" }: any) => {
    // Theme configurations based on color
    const themes: any = {
        blue: { border: "border-blue-600", text: "text-blue-500", glow: "shadow-blue-500/20" },
        red: { border: "border-red-600", text: "text-red-500", glow: "shadow-red-500/20" },
        purple: { border: "border-purple-600", text: "text-purple-500", glow: "shadow-purple-500/20" },
    };
    const t = themes[theme] || themes.blue;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative w-[95%] max-w-md bg-[#0B0F17]/95 backdrop-blur-xl border ${t.border} rounded-xl shadow-2xl ${t.glow} overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className={`relative z-10 flex justify-between items-start p-6 border-b ${t.border} bg-black/20`}>
                <div>
                    <h3 className={`text-xl font-black uppercase tracking-wider flex items-center gap-2 ${t.text}`}>
                        <Icon className="w-6 h-6" /> {title}
                    </h3>
                    <p className={`text-xs opacity-70 font-mono mt-1`}>{subtitle}</p>
                </div>
                <button onClick={onClose} className={`${t.text} hover:opacity-80 transition-colors`}>
                    <X className="w-6 h-6" />
                </button>
            </div>
            {/* Content */}
            <div className="relative z-10 p-6">{children}</div>
        </motion.div>
    );
};

// --- BOOK DEMO MODAL (Blue Theme) ---
const BookDemoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alertMessage("Demo Request Sent!", "success");
        onClose();
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <CyberModalFrame title="Book a Demo" subtitle="Schedule with an Expert" icon={Radio} onClose={onClose} theme="blue">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <CyberInput label="Name" id="demo-name" placeholder="Full Name" required icon={Terminal} color="blue" />
                    <CyberInput label="Phone" id="demo-phone" type="tel" placeholder="+91-XXXXXXXXXX" required icon={Activity} color="blue" />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded transition-all">
                        Confirm Booking
                    </button>
                </form>
            </CyberModalFrame>
        </div>
    );
};

// --- DOWNLOAD BROCHURE MODAL (Red/Purple Theme) ---
const DownloadBrochureModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        alertMessage("Brochure Downloading...", "success");
        window.open(COMMON_BROCHURE_URL, '_blank');
        setIsSubmitting(false);
        onClose();
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <CyberModalFrame title="Get Brochure" subtitle="Download Course Details" icon={FileText} onClose={onClose} theme="purple">
                <form onSubmit={handleSubmit} className="space-y-4">
                     {/* Simplified Select for Brevity */}
                    <div className="relative">
                        <select onChange={(e) => setFormData({...formData, course: e.target.value})} className="w-full bg-[#0B0F17] border border-purple-600 text-white p-2 rounded">
                            <option>Select Course...</option>
                            <option value="cyber">Cyber Security</option>
                        </select>
                    </div>
                    <CyberInput label="Name" onChange={(e: any) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" icon={Terminal} required color="blue" />
                    <CyberInput label="Email" type="email" onChange={(e: any) => setFormData({...formData, email: e.target.value})} placeholder="Email" icon={Activity} required color="blue" />
                    <button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded transition-all">
                        {isSubmitting ? "Downloading..." : "Download Now"}
                    </button>
                </form>
            </CyberModalFrame>
        </div>
    );
};

// ==========================================
// 3. MAIN HERO COMPONENT
// ==========================================

export const Hero = () => {
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

    // 3D Motion
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]); 
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.1);
        y.set((e.clientY - centerY) * 0.1);
    };

    return (
        <section className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden bg-[#0B0F17] text-white selection:bg-purple-500 selection:text-white font-sans">
            
            <CyberBackground />
            <div id="global-alert-hero" className="hidden"></div>

            <div className="container mx-auto px-4 z-10 relative">
                {/* 1 Column Mobile, 12 Columns Desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* --- LEFT COLUMN: TEXT (Span 7) --- */}
                    <div className="lg:col-span-7 space-y-6 md:space-y-8 order-1">
                        <LocationHUD />

                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                             {/* HEADLINE: Matches Screenshot Text & Gradients */}
                             <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                                Stay Secure with <br />
                                <GradientText text="TDCS" from="#F97316" to="#EC4899" /> <br />
                                <GradientText text="TECHNOLOGIES" from="#A855F7" to="#EC4899" /> <span className="text-[#A855F7]">PRIVATE LIMITED</span>
                             </h1>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.5 }}
                            className="flex flex-col gap-4 pl-1"
                        >
                            <p className="text-base md:text-xl text-gray-400 max-w-2xl leading-relaxed">
                                As an ISO and MSME certified leader in cybersecurity, we offer expert online training to equip you with skills to confidently navigate the digital world.
                            </p>
                        </motion.div>

                        {/* BUTTONS: Matches Screenshot Colors */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {/* View Courses: Purple/Blue Gradient */}
                            <Link to="/courses" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto h-12 md:h-14 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg rounded-lg shadow-lg shadow-purple-500/30 transition-all hover:scale-105">
                                    View Courses
                                </Button>
                            </Link>
                            
                            {/* Book a Demo: Solid Blue */}
                            <Button 
                                className="w-full sm:w-auto h-12 md:h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-lg shadow-lg shadow-blue-500/30 transition-all"
                                onClick={() => setIsDemoModalOpen(true)}
                            >
                                Book a Demo
                            </Button>
                            
                            {/* Brochure: Dark Outline Style */}
                             <Button 
                                variant="outline" 
                                className="w-full sm:w-auto h-12 md:h-14 px-8 border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 hover:bg-gray-800 font-medium text-lg rounded-lg transition-all"
                                onClick={() => setIsBrochureModalOpen(true)}
                            >
                                <Download className="w-5 h-5 mr-2" /> Download Brochure
                            </Button>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: CARDS (Span 5) --- */}
                    <motion.div 
                        className="lg:col-span-5 relative mt-8 lg:mt-0 order-2 flex flex-col gap-4"
                        onMouseMove={handleMouseMove}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    >
                        {/* 1. CEO CARD (Blue) */}
                        <div className="relative group perspective-500">
                             {/* Solid Blue Card */}
                            <div className="relative bg-[#3B82F6] p-6 rounded-2xl shadow-2xl shadow-blue-900/50 flex items-center justify-between overflow-hidden">
                                <div className="z-10 text-white">
                                    <h3 className="text-2xl font-bold">Dibyajit Ghosh</h3>
                                    <p className="text-blue-100 text-sm font-medium mt-1">Founder & CEO</p>
                                </div>
                                {/* 3D Image Pop-out */}
                                <div className="relative w-28 h-28 md:w-32 md:h-32 -mr-4 -mb-8">
                                    <img 
                                        src="https://blogger.googleusercontent.com/img/a/AVvXsEhSzVolb4WlhIzCqb-NK2ZYkFzDbr6WTVD9BR8yCWkRFrAKMyKGstimmgcYr_vpFeEjKgRSSyirXi51bh0jJNQa9jrhs_VLcV1BKwcdCSV5pyYXNwlaTjpMc95-OnaQJj3ZIYa8Gd7DxFzhBbHiJToZswZp5zR99bW08LP4oI1LZ6CHd6FSaHpKkqbFt2EA" 
                                        alt="CEO"
                                        className="w-full h-full object-cover transform scale-125 translate-y-2 drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Split Row for COO & CMO */}
                        <div className="grid grid-cols-2 gap-4">
                            
                            {/* 2. COO CARD (Green) */}
                            <div className="relative bg-[#10B981] p-5 rounded-2xl shadow-xl shadow-green-900/50 flex flex-col justify-between h-48 overflow-hidden group hover:scale-[1.02] transition-transform">
                                <div className="z-10 text-white">
                                    <h3 className="text-lg font-bold leading-tight">Shivam Shing</h3>
                                    <p className="text-green-100 text-xs font-medium mt-1">COO</p>
                                </div>
                                <div className="self-center mt-auto relative w-24 h-24 -mb-6">
                                    <img 
                                        src="https://blogger.googleusercontent.com/img/a/AVvXsEgiDtg5YtmQ7bdvNmeAAMyhwpc5tLm_RNR2Lv4y4u6hsMzTiuqNyxo7O0qU32donmMZoTduoxe-4WgWVdPh29JH9vmYXkqCI7hiyzwaYBxxXgTfKbCsjTST6gyIWQB230kRXgwfQvxV-dqB9V-Xqr3915tuA9d88D1rGY-l9sJy_vhC3HJR0pdEI6F3E8Nr" 
                                        className="w-full h-full object-cover transform scale-110 drop-shadow-xl"
                                    />
                                </div>
                            </div>

                            {/* 3. CMO CARD (Red) */}
                            <div className="relative bg-[#EF4444] p-5 rounded-2xl shadow-xl shadow-red-900/50 flex flex-col justify-between h-48 overflow-hidden group hover:scale-[1.02] transition-transform">
                                <div className="z-10 text-white">
                                    <h3 className="text-lg font-bold leading-tight">Tushar Bhakta</h3>
                                    <p className="text-red-100 text-xs font-medium mt-1">CMO</p>
                                </div>
                                <div className="self-center mt-auto relative w-24 h-24 -mb-6">
                                    <img 
                                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh68HDmzQ4YTj9g9soRrkq-eHc9cAfbC03ZOXSClA19NofdsJ2lzm2A29d2qxG3xXSUfuEVl-sGEVnkokdgS6snQn86My-Bekn2MLrF135mZPHpwXfsLg1XxhFaClj1Uebgi6IcxeseCR6rvwc3vg6IgYUm8voolffwjQhcY4haMotxomzPVjfJm7ylnHdF/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png" 
                                        className="w-full h-full object-cover transform scale-110 drop-shadow-xl"
                                    />
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
            
            <AnimatePresence>
                {isDemoModalOpen && <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />}
                {isBrochureModalOpen && <DownloadBrochureModal isOpen={isBrochureModalOpen} onClose={() => setIsBrochureModalOpen(false)} />}
            </AnimatePresence>
        </section>
    );
};

export default Hero;