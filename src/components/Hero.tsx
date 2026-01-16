import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useInView, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, Globe, Radio, ShieldCheck, Zap, Terminal, Cpu, 
  Download, X, FileText, Activity, ChevronRight, MapPin, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have shadcn/ui or similar

// --- CONSTANTS ---
const COMMON_BROCHURE_URL = "https://drive.google.com/file/d/1_oWjtOS1hRyVolJv22tHwPxdv2t2ePau/view?usp=drive_link";
const GRADIENT_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600";

// --- UTILS ---
const alertMessage = (message, type) => {
    // Replace this with your actual toast notification system (e.g., react-hot-toast)
    console.log(`[${type.toUpperCase()}] ${message}`);
    const alertBox = document.getElementById('global-alert-hero');
    if (alertBox) {
        alertBox.textContent = message;
        alertBox.className = `fixed top-4 right-4 z-[9999] p-4 rounded bg-gray-900 border border-cyan-500 text-cyan-400 font-mono text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-in slide-in-from-right fade-in duration-300`;
        setTimeout(() => alertBox.className += " hidden", 3000);
    }
};

// ==========================================
// 1. VISUAL EFFECT COMPONENTS
// ==========================================

// --- ⚡ Electric Spark Text ---
const SparkText = ({ text }) => {
    return (
        <div className="relative inline-block group cursor-default">
            <span className={`relative z-10 ${GRADIENT_TEXT} font-black drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]`}>
                {text}
            </span>
            {/* Electric Sparks (CSS Animation) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-cyan-400 animate-pulse shadow-[0_0_20px_#22d3ee]"></div>
                <div className="absolute top-0 left-1/2 w-[2px] h-full bg-blue-500 animate-pulse shadow-[0_0_20px_#3b82f6]"></div>
            </div>
        </div>
    );
};

// --- 🌐 Cyber Matrix Background ---
const CyberBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
            {/* Deep Space Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,1)_0%,_rgba(0,0,0,1)_100%)]" />
            
            {/* Moving Grid Floor */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px),
                                      linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
                    animation: 'gridMove 15s linear infinite',
                    maskImage: 'linear-gradient(to bottom, transparent, black)'
                }}
            />
            {/* Random Binary Rain (Simulated) */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-20 animate-pulse" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-20 animate-pulse delay-700" />
            
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
        const states = [
            "CONNECTING TO KHARAGPUR_GRID...", 
            "ESTABLISHING SECURE LINK...", 
            "HQ: KOLKATA [ONLINE]", 
            "TARGET: GLOBAL DOMINATION"
        ];
        let i = 0;
        const interval = setInterval(() => {
            setText(states[i]);
            i = (i + 1) % states.length;
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm border-l-4 border-cyan-500 bg-gray-900/80 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="font-mono text-xs md:text-sm text-cyan-400 tracking-widest uppercase shadow-cyan-500/50">
                {text}
            </span>
        </div>
    );
};

// ==========================================
// 2. MODAL SYSTEM (Cyber Style)
// ==========================================

// --- SUB-COMPONENT: Cyber Input Field ---
const CyberInput = ({ label, icon: Icon, error, ...props }) => (
    <div className="relative group">
        <label className="block text-xs font-mono text-cyan-500/80 mb-1 tracking-widest uppercase">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-4 w-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <input
                {...props}
                className="block w-full pl-10 pr-3 py-2.5 bg-black/50 border border-gray-700 rounded-md text-gray-100 placeholder-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all font-mono text-sm shadow-[0_0_10px_rgba(6,182,212,0.1)] focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            />
            {/* Corner accent for input */}
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-500 group-focus-within:border-cyan-400" />
        </div>
        {error && <p className="text-red-500 text-xs mt-1 font-mono flex items-center"><X className="w-3 h-3 mr-1"/> {error}</p>}
    </div>
);

// --- SUB-COMPONENT: Cyber Modal Frame ---
const CyberModalFrame = ({ children, title, subtitle, icon: Icon, onClose, colorClass = "text-cyan-400 border-cyan-500" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Scanning Line Animation */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-down opacity-30"></div>
            </div>

            {/* Tactical Corners */}
            <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${colorClass}`}></div>
            <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${colorClass}`}></div>
            <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${colorClass}`}></div>
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${colorClass}`}></div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start p-6 border-b border-gray-800 bg-black/20">
                <div>
                    <h3 className={`text-xl font-black uppercase tracking-wider flex items-center gap-2 ${colorClass.split(' ')[0]}`}>
                        <Icon className="w-6 h-6" />
                        {title}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-1 border-l-2 border-gray-700 pl-2">
                        {subtitle}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-white transition-colors hover:rotate-90 duration-300"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
                {children}
            </div>
            
            <style>{`
                @keyframes scan-down {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }
                .animate-scan-down { animation: scan-down 4s linear infinite; }
            `}</style>
        </motion.div>
    );
};

// --- BOOK DEMO MODAL ---
const BookDemoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Processing Demo Request...");
        alertMessage("Request Acknowledged. Agent will intercept shortly.", "success");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </motion.div>

            <CyberModalFrame 
                title="INITIATE_DEMO" 
                subtitle="ESTABLISH SECURE LINK WITH COUNSELOR"
                icon={Radio}
                onClose={onClose}
                colorClass="text-red-500 border-red-500"
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <CyberInput label="OPERATOR_NAME" id="modal-demo-name" placeholder="ENTER IDENTIFIER" required icon={Terminal} />
                    <CyberInput label="COMM_CHANNEL (PHONE)" id="modal-demo-phone" type="tel" placeholder="+91-XXXXXXXXXX" required icon={Activity} />

                    <button type="submit" className="w-full relative group overflow-hidden bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded transition-all duration-300 clip-path-slant">
                        <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest">
                            <CalendarCheck className="w-5 h-5" /> Confirm_Uplink
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                    <p className="text-[10px] text-gray-500 text-center font-mono">// ENCRYPTED CONNECTION ESTABLISHED //</p>
                </form>
            </CyberModalFrame>
        </div>
    );
};

// --- DOWNLOAD BROCHURE MODAL ---
const DownloadBrochureModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    
    const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

    const handlePhoneChange = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 10);
        setFormData({ ...formData, phone: cleaned });
        if (cleaned.length > 0 && (cleaned.length < 10 || !/^[6-9]/.test(cleaned))) {
            setPhoneError("INVALID_CHECKSUM: 10 DIGITS REQ");
        } else {
            setPhoneError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.course) return alertMessage("SELECT TARGET DATA FIRST", "error");
        if (!validatePhone(formData.phone)) return alertMessage("INVALID COMM CHANNEL", "error");

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        alertMessage("DATA PACKET RECEIVED. DECRYPTING...", "success");
        window.open(COMMON_BROCHURE_URL, '_blank');

        setIsSubmitting(false);
        onClose();
        setFormData({ name: "", email: "", phone: "", course: "" });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            >
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0891b2_1px,transparent_1px),linear-gradient(to_bottom,#0891b2_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            </motion.div>

            <CyberModalFrame 
                title="DATA_ACCESS" 
                subtitle="REQUEST CLASSIFIED COURSE MATERIAL"
                icon={FileText}
                onClose={onClose}
                colorClass="text-cyan-400 border-cyan-500"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                        <label className="block text-xs font-mono text-cyan-500/80 mb-1 tracking-widest uppercase">Target_Module</label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <select
                                value={formData.course}
                                onChange={(e) => setFormData({...formData, course: e.target.value})}
                                className="block w-full pl-10 pr-3 py-2.5 bg-black/50 border border-gray-700 rounded-md text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 appearance-none font-mono text-sm shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                            >
                                <option value="" disabled>SELECT_PROTOCOL...</option>
                                <option value="cyber-lite">[LITE] CYBER MASTER PRO</option>
                                <option value="cyber-blackhat">[BLACK_HAT] OFFENSIVE OPS</option>
                                <option value="bug-hunting-pentest">[HUNT] BUG BOUNTY</option>
                                <option value="network-security-defense">[DEFENSE] NETSEC</option>
                            </select>
                            <div className="absolute right-3 top-3 pointer-events-none"><ChevronRight className="h-4 w-4 text-cyan-500 rotate-90" /></div>
                        </div>
                    </div>

                    <CyberInput label="AUTHORIZED_PERSONNEL" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="FULL NAME" icon={Terminal} required />
                    <CyberInput label="DIGITAL_ID (EMAIL)" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="USER@DOMAIN.COM" icon={Activity} required />
                    <CyberInput label="SECURE_LINE (PHONE)" type="tel" value={formData.phone} onChange={(e) => handlePhoneChange(e.target.value)} placeholder="98XXXXXXXX" icon={Activity} required error={phoneError} />

                    <button type="submit" disabled={isSubmitting} className="w-full relative group overflow-hidden bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-black font-bold py-3 px-4 rounded transition-all duration-300 clip-path-slant">
                        <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest">
                            {isSubmitting ? <span className="animate-pulse">TRANSFERRING...</span> : <><Download className="w-5 h-5" /> Download_Asset</>}
                        </span>
                        <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12"></div>
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
    
    // 3D Motion Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]); 
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.1);
        y.set((e.clientY - centerY) * 0.1);
    };

    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-black text-white selection:bg-cyan-500 selection:text-black font-sans">
            
            <CyberBackground />
            
            {/* Global Alert System Placeholder */}
            <div id="global-alert-hero" className="hidden"></div>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* --- LEFT COLUMN: TEXT CONTENT (Span 7) --- */}
                    <div className="lg:col-span-7 space-y-8">
                        <LocationHUD />

                        <motion.h1 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight"
                        >
                            STAY <span className="text-white">SECURE</span> WITH <br />
                            <SparkText text="TDCS TECHNOLOGIES" /> <br />
                            <span className="text-3xl md:text-5xl text-gray-400 font-bold">PRIVATE LIMITED</span>
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.5 }}
                            className="flex flex-col gap-4 border-l-2 border-gray-700 pl-6"
                        >
                            <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                                Deploying Next-Gen Cybersecurity protocols from the <span className="text-cyan-400 font-bold">Kharagpur System</span> to the World. 
                                We don't just patch bugs; we architect digital fortresses.
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm font-mono text-cyan-500">
                                <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-900 rounded">[ ISO_CERTIFIED ]</span>
                                <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-900 rounded">[ MSME_REGISTERED ]</span>
                                <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-900 rounded">[ 100%_PLACEMENT ]</span>
                            </div>
                        </motion.div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/courses">
                                <Button className="h-14 px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg tracking-wide clip-path-slant shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105">
                                    <Terminal className="w-5 h-5 mr-2" />
                                    INITIATE_PROTOCOL
                                </Button>
                            </Link>
                            <Button 
                                variant="outline" 
                                className="h-14 px-8 border-gray-600 text-gray-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 font-mono text-lg transition-all"
                                onClick={() => setIsDemoModalOpen(true)}
                            >
                                <Cpu className="w-5 h-5 mr-2" />
                                BOOK_DEMO_SESSION
                            </Button>
                            
                             <Button 
                                variant="ghost" 
                                className="h-14 px-4 text-cyan-400 hover:text-cyan-300 hover:bg-transparent font-mono text-sm underline underline-offset-4"
                                onClick={() => setIsBrochureModalOpen(true)}
                            >
                                [ DOWNLOAD_INTEL ]
                            </Button>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: CYBER CARDS (Span 5) --- */}
                    <motion.div 
                        className="lg:col-span-5 relative perspective-1000 mt-12 lg:mt-0"
                        onMouseMove={handleMouseMove}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    >
                        {/* 1. CEO CARD - THE KHARAGPUR ADMIN */}
                        <div className="relative z-30 mb-8 group">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                            
                            <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-700 p-6 rounded-xl overflow-visible">
                                {/* Decor: Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] animate-scan-down opacity-50 pointer-events-none"></div>
                                
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-black text-white italic">DIBYAJIT GHOSH</h2>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded">FOUNDER & CEO</span>
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        </div>
                                        <div className="text-xs font-mono text-cyan-400 pt-2 space-y-0.5">
                                            <p>{`>> ROLE: SECURITY_ADMIN`}</p>
                                            <p>{`>> SYS: KHARAGPUR_GRID`}</p>
                                            <p>{`>> AUTH: LEVEL_5_ROOT`}</p>
                                        </div>
                                    </div>
                                    
                                    {/* 📸 PHOTO: BIGGER & BREAKING OUT */}
                                    <div className="relative w-40 h-40 md:w-56 md:h-56 -mt-20 -mr-6 md:-mr-12 perspective-500">
                                        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[50px] opacity-20"></div>
                                        <img 
                                            src="https://blogger.googleusercontent.com/img/a/AVvXsEhSzVolb4WlhIzCqb-NK2ZYkFzDbr6WTVD9BR8yCWkRFrAKMyKGstimmgcYr_vpFeEjKgRSSyirXi51bh0jJNQa9jrhs_VLcV1BKwcdCSV5pyYXNwlaTjpMc95-OnaQJj3ZIYa8Gd7DxFzhBbHiJToZswZp5zR99bW08LP4oI1LZ6CHd6FSaHpKkqbFt2EA" 
                                            alt="CEO"
                                            className="w-full h-full object-cover rounded-full border-4 border-gray-900 shadow-2xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transform transition-transform group-hover:scale-105"
                                        />
                                        {/* Holographic Glitch Overlay */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/30 to-transparent opacity-50 mix-blend-overlay pointer-events-none"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. OPS & INTEL - SPLIT CARDS */}
                        <div className="grid grid-cols-2 gap-4 relative z-20">
                            
                            {/* SHIVAM SHING - OPS COMMANDER */}
                            <div className="relative group">
                                <div className="absolute -inset-[1px] bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-300"></div>
                                <div className="relative bg-gray-900 border border-gray-800 p-4 rounded-xl h-full overflow-hidden">
                                    <div className="flex flex-col h-full justify-between relative z-10">
                                        <div>
                                            <h3 className="font-bold text-white text-lg">SHIVAM SHING</h3>
                                            <p className="text-[10px] tracking-widest text-emerald-400 font-mono font-bold mt-1">OPS_COMMANDER</p>
                                        </div>
                                        {/* Photo - Pushed to bottom right */}
                                        <div className="self-end mt-4 relative w-24 h-24 -mb-6 -mr-6">
                                            <img 
                                                src="https://blogger.googleusercontent.com/img/a/AVvXsEgiDtg5YtmQ7bdvNmeAAMyhwpc5tLm_RNR2Lv4y4u6hsMzTiuqNyxo7O0qU32donmMZoTduoxe-4WgWVdPh29JH9vmYXkqCI7hiyzwaYBxxXgTfKbCsjTST6gyIWQB230kRXgwfQvxV-dqB9V-Xqr3915tuA9d88D1rGY-l9sJy_vhC3HJR0pdEI6F3E8Nr" 
                                                className="w-full h-full object-cover rounded-full border-2 border-emerald-500/50 grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 left-2 text-[8px] text-gray-600 font-mono">
                                        STATUS: DEPLOYED<br/>LOGISTICS: ACTIVE
                                    </div>
                                </div>
                            </div>

                            {/* TUSHAR BHAKTA - MARKET INTEL */}
                            <div className="relative group">
                                <div className="absolute -inset-[1px] bg-gradient-to-br from-red-500 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-300"></div>
                                <div className="relative bg-gray-900 border border-gray-800 p-4 rounded-xl h-full overflow-hidden">
                                    <div className="flex flex-col h-full justify-between relative z-10">
                                        <div>
                                            <h3 className="font-bold text-white text-lg">TUSHAR BHAKTA</h3>
                                            <p className="text-[10px] tracking-widest text-red-400 font-mono font-bold mt-1">MARKET_INTEL</p>
                                        </div>
                                        {/* Photo - Pushed to bottom right */}
                                        <div className="self-end mt-4 relative w-24 h-24 -mb-6 -mr-6">
                                            <img 
                                                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh68HDmzQ4YTj9g9soRrkq-eHc9cAfbC03ZOXSClA19NofdsJ2lzm2A29d2qxG3xXSUfuEVl-sGEVnkokdgS6snQn86My-Bekn2MLrF135mZPHpwXfsLg1XxhFaClj1Uebgi6IcxeseCR6rvwc3vg6IgYUm8voolffwjQhcY4haMotxomzPVjfJm7ylnHdF/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png" 
                                                className="w-full h-full object-cover rounded-full border-2 border-red-500/50 grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 left-2 text-[8px] text-gray-600 font-mono">
                                        DATA: SYNCED<br/>TARGETS: LOCKED
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- GLOBAL STYLES FOR ANIMATIONS --- */}
            <style>{`
                @keyframes scan-down {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan-down {
                    animation: scan-down 3s linear infinite;
                }
                .clip-path-slant {
                    clip-path: polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%);
                }
            `}</style>
            
            {/* --- MODALS --- */}
            <AnimatePresence>
                {isDemoModalOpen && <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />}
                {isBrochureModalOpen && <DownloadBrochureModal isOpen={isBrochureModalOpen} onClose={() => setIsBrochureModalOpen(false)} />}
            </AnimatePresence>
        </section>
    );
};

export default Hero;