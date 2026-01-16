import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, Radio, Terminal, Cpu, 
  Download, X, FileText, Activity, ChevronRight, Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button"; 

// --- THEME CONSTANTS ---
const COLORS = {
  coral: "#E5645F",
  plum: "#361C26",
  rose: "#7A3947",
  purple: "#A54C94",
  bg: "#1A121A"
};

const COMMON_BROCHURE_URL = "https://drive.google.com/file/d/1_oWjtOS1hRyVolJv22tHwPxdv2t2ePau/view?usp=drive_link";
// Updated Gradient: Coral -> Purple -> Coral
const GRADIENT_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-[#E5645F] via-[#A54C94] to-[#E5645F]";

// --- UTILS ---
const alertMessage = (message: string, type: 'success' | 'error') => {
    const alertBox = document.getElementById('global-alert-hero');
    if (alertBox) {
        alertBox.textContent = `[${type.toUpperCase()}] ${message}`;
        alertBox.className = `fixed top-4 right-4 z-[9999] p-4 rounded bg-[#361C26] border border-[#E5645F] text-[#E5645F] font-mono text-sm shadow-[0_0_20px_rgba(229,100,95,0.3)] animate-in slide-in-from-right fade-in duration-300 block`;
        setTimeout(() => { alertBox.className = "hidden"; }, 3000);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
};

// ==========================================
// 1. VISUAL HELPERS
// ==========================================

// --- ⚡ Electric Spark Text (Updated Colors) ---
const SparkText = ({ text }: { text: string }) => {
    return (
        <div className="relative inline-block group cursor-default">
            <span className={`relative z-10 ${GRADIENT_TEXT} font-black drop-shadow-[0_0_15px_rgba(165,76,148,0.5)]`}>
                {text}
            </span>
            {/* Electric Sparks */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#E5645F] animate-pulse shadow-[0_0_20px_#E5645F]"></div>
                <div className="absolute top-0 left-1/2 w-[2px] h-full bg-[#A54C94] animate-pulse shadow-[0_0_20px_#A54C94]"></div>
            </div>
        </div>
    );
};

// --- 🌐 Cyber Background (Updated Colors) ---
const CyberBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#1A121A] pointer-events-none">
            {/* Deep Rose/Plum Gradient Spot */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(54,28,38,1)_0%,_rgba(26,18,26,1)_100%)]" />
            
            {/* Moving Grid Floor (Rose Color) */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, #7A3947 1px, transparent 1px),
                                      linear-gradient(to bottom, #7A3947 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
                    animation: 'gridMove 15s linear infinite',
                    maskImage: 'linear-gradient(to bottom, transparent, black)'
                }}
            />
             {/* Random Rain (Coral/Purple) */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#E5645F] to-transparent opacity-20 animate-pulse" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#A54C94] to-transparent opacity-20 animate-pulse delay-700" />
            
            <style>{`
                @keyframes gridMove {
                    0% { transform: perspective(1000px) rotateX(60deg) translateY(0) scale(2) }
                    100% { transform: perspective(1000px) rotateX(60deg) translateY(50px) scale(2) }
                }
            `}</style>
        </div>
    );
};

// --- 📍 Global HUD Ticker (Updated Colors) ---
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
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm border-l-4 border-[#E5645F] bg-[#361C26]/80 backdrop-blur-md mb-6 md:mb-8 shadow-[0_0_15px_rgba(229,100,95,0.1)]">
            <Radio className="w-4 h-4 text-[#E5645F] animate-pulse" />
            <span className="font-mono text-xs md:text-sm text-[#E5645F] tracking-widest uppercase shadow-[#E5645F]/50">
                {text}
            </span>
        </div>
    );
};

// ==========================================
// 2. CYBER MODAL SYSTEM (Updated Colors)
// ==========================================

// --- SUB-COMPONENT: Cyber Input Field ---
const CyberInput = ({ label, icon: Icon, error, ...props }: any) => (
    <div className="relative group">
        <label className="block text-xs font-mono text-[#E5645F]/80 mb-1 tracking-widest uppercase">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-4 w-4 text-[#7A3947] group-focus-within:text-[#E5645F] transition-colors" />
            </div>
            <input
                {...props}
                className="block w-full pl-10 pr-3 py-2.5 bg-[#1A121A]/80 border border-[#7A3947] rounded-md text-gray-100 placeholder-[#7A3947] focus:border-[#E5645F] focus:ring-1 focus:ring-[#E5645F] focus:outline-none transition-all font-mono text-sm shadow-[0_0_10px_rgba(122,57,71,0.1)] focus:shadow-[0_0_15px_rgba(229,100,95,0.3)]"
            />
            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#7A3947] group-focus-within:border-[#E5645F]" />
        </div>
        {error && <p className="text-[#E5645F] text-xs mt-1 font-mono flex items-center"><X className="w-3 h-3 mr-1"/> {error}</p>}
    </div>
);

// --- SUB-COMPONENT: Cyber Modal Frame ---
const CyberModalFrame = ({ children, title, subtitle, icon: Icon, onClose }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            // Mobile: w-[95%] | Desktop: max-w-md
            className="relative w-[95%] max-w-md bg-[#361C26]/95 backdrop-blur-xl border border-[#7A3947] rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Scanning Line Animation (Rose Color) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E5645F]/20 to-transparent animate-scan-down opacity-30"></div>
            </div>

            {/* Tactical Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 text-[#E5645F] border-[#E5645F]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 text-[#E5645F] border-[#E5645F]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 text-[#E5645F] border-[#E5645F]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 text-[#E5645F] border-[#E5645F]"></div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start p-6 border-b border-[#7A3947] bg-[#1A121A]/40">
                <div>
                    <h3 className="text-xl font-black uppercase tracking-wider flex items-center gap-2 text-[#E5645F]">
                        <Icon className="w-6 h-6" />
                        {title}
                    </h3>
                    <p className="text-xs text-[#E5645F]/70 font-mono mt-1 border-l-2 border-[#7A3947] pl-2">
                        {subtitle}
                    </p>
                </div>
                <button onClick={onClose} className="text-[#7A3947] hover:text-[#E5645F] transition-colors hover:rotate-90 duration-300">
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
                {children}
            </div>
        </motion.div>
    );
};

// --- BOOK DEMO MODAL ---
const BookDemoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alertMessage("Request Acknowledged. Agent will intercept shortly.", "success");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1A121A]/90 backdrop-blur-sm" onClick={onClose} />
            <CyberModalFrame title="INITIATE_DEMO" subtitle="ESTABLISH SECURE LINK" icon={Radio} onClose={onClose}>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <CyberInput label="OPERATOR_NAME" id="modal-demo-name" placeholder="ENTER IDENTIFIER" required icon={Terminal} />
                    <CyberInput label="COMM_CHANNEL" id="modal-demo-phone" type="tel" placeholder="+91-XXXXXXXXXX" required icon={Activity} />
                    <button type="submit" className="w-full relative group overflow-hidden bg-[#E5645F] hover:bg-[#A54C94] text-white font-bold py-3 px-4 rounded transition-all duration-300 clip-path-slant">
                        <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest">
                            <CalendarCheck className="w-5 h-5" /> Confirm_Uplink
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                    <p className="text-[10px] text-[#7A3947] text-center font-mono">// ENCRYPTED CONNECTION //</p>
                </form>
            </CyberModalFrame>
        </div>
    );
};

// --- DOWNLOAD BROCHURE MODAL ---
const DownloadBrochureModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        alertMessage("DATA PACKET RECEIVED. DECRYPTING...", "success");
        window.open(COMMON_BROCHURE_URL, '_blank');
        setIsSubmitting(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1A121A]/90 backdrop-blur-sm" onClick={onClose} />
            <CyberModalFrame title="DATA_ACCESS" subtitle="REQUEST CLASSIFIED MATERIAL" icon={FileText} onClose={onClose}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                        <label className="block text-xs font-mono text-[#E5645F]/80 mb-1 tracking-widest uppercase">Target_Module</label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-3 h-4 w-4 text-[#7A3947]" />
                            <select 
                                onChange={(e) => setFormData({...formData, course: e.target.value})}
                                className="block w-full pl-10 pr-3 py-2.5 bg-[#1A121A]/80 border border-[#7A3947] rounded-md text-gray-100 focus:border-[#E5645F] focus:ring-1 focus:ring-[#E5645F] appearance-none font-mono text-sm"
                            >
                                <option value="" disabled>SELECT_PROTOCOL...</option>
                                <option value="cyber-lite">[LITE] CYBER MASTER</option>
                                <option value="cyber-blackhat">[BLACK_HAT] OFFENSIVE OPS</option>
                            </select>
                            <div className="absolute right-3 top-3 pointer-events-none"><ChevronRight className="h-4 w-4 text-[#E5645F] rotate-90" /></div>
                        </div>
                    </div>
                    <CyberInput label="AUTHORIZED_PERSONNEL" onChange={(e: any) => setFormData({...formData, name: e.target.value})} placeholder="FULL NAME" icon={Terminal} required />
                    <CyberInput label="DIGITAL_ID (EMAIL)" type="email" onChange={(e: any) => setFormData({...formData, email: e.target.value})} placeholder="USER@DOMAIN.COM" icon={Activity} required />
                    <button type="submit" disabled={isSubmitting} className="w-full relative group overflow-hidden bg-[#A54C94] hover:bg-[#E5645F] text-white font-bold py-3 px-4 rounded transition-all duration-300 clip-path-slant">
                        <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest">
                            {isSubmitting ? "TRANSFERRING..." : <><Download className="w-5 h-5" /> Download_Asset</>}
                        </span>
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12"></div>
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

    // 3D Motion (Reduced effect slightly for mobile)
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
        <section className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden bg-[#1A121A] text-white selection:bg-[#E5645F] selection:text-[#1A121A] font-sans">
            
            <CyberBackground />
            
            {/* Global Alert System Placeholder */}
            <div id="global-alert-hero" className="hidden"></div>

            <div className="container mx-auto px-4 z-10 relative">
                {/* Mobile: 1 Column | Desktop: 12 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* --- LEFT COLUMN: TEXT CONTENT (Span 7) --- */}
                    <div className="lg:col-span-7 space-y-6 md:space-y-8 order-1 lg:order-1">
                        <LocationHUD />

                        <motion.h1 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            // Mobile: text-4xl | Desktop: text-7xl
                            className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight"
                        >
                            STAY <span className="text-white">SECURE</span> WITH <br />
                            <SparkText text="TDCS TECHNOLOGIES" /> <br />
                            <span className="text-2xl sm:text-3xl md:text-5xl text-[#7A3947] font-bold">PRIVATE LIMITED</span>
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.5 }}
                            className="flex flex-col gap-4 border-l-2 border-[#7A3947] pl-4 md:pl-6"
                        >
                            <p className="text-base md:text-xl text-[#E5645F]/80 max-w-2xl">
                                Deploying Next-Gen Cybersecurity protocols from the <span className="text-[#E5645F] font-bold">Kharagpur System</span> to the World.
                            </p>
                            <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm font-mono text-[#E5645F]">
                                <span className="px-2 py-1 bg-[#361C26] border border-[#7A3947] rounded">[ ISO_CERTIFIED ]</span>
                                <span className="px-2 py-1 bg-[#361C26] border border-[#7A3947] rounded">[ MSME ]</span>
                            </div>
                        </motion.div>

                        {/* Buttons: Stack on Mobile, Row on Desktop */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/courses" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto h-12 md:h-14 px-8 bg-[#E5645F] hover:bg-[#A54C94] text-white font-bold text-lg tracking-wide clip-path-slant shadow-[0_0_20px_rgba(229,100,95,0.4)] transition-all hover:scale-105">
                                    <Terminal className="w-5 h-5 mr-2" />
                                    INITIATE_PROTOCOL
                                </Button>
                            </Link>
                            
                            <Button 
                                variant="outline" 
                                className="w-full sm:w-auto h-12 md:h-14 px-8 border-[#7A3947] text-[#E5645F] hover:text-white hover:border-[#E5645F] hover:bg-[#E5645F]/10 font-mono text-lg transition-all"
                                onClick={() => setIsDemoModalOpen(true)}
                            >
                                <Cpu className="w-5 h-5 mr-2" />
                                BOOK_DEMO
                            </Button>
                            
                             <Button 
                                variant="ghost" 
                                className="w-full sm:w-auto h-12 md:h-14 px-4 text-[#A54C94] hover:text-[#E5645F] hover:bg-transparent font-mono text-sm underline underline-offset-4"
                                onClick={() => setIsBrochureModalOpen(true)}
                            >
                                [ DOWNLOAD_INTEL ]
                            </Button>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: CYBER CARDS (Span 5) --- */}
                    <motion.div 
                        className="lg:col-span-5 relative perspective-1000 mt-8 lg:mt-0 order-2 lg:order-2"
                        onMouseMove={handleMouseMove}
                        // Only apply 3D tilt on larger screens to save mobile resources
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    >
                        {/* 1. CEO CARD */}
                        <div className="relative z-30 mb-8 group">
                            {/* Glow Effect (Purple to Coral) */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#E5645F] to-[#A54C94] rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                            
                            <div className="relative bg-[#361C26]/90 backdrop-blur-xl border border-[#7A3947] p-6 rounded-xl overflow-visible">
                                {/* Decor: Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#E5645F] shadow-[0_0_15px_rgba(229,100,95,1)] animate-scan-down opacity-50 pointer-events-none"></div>
                                
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="space-y-1">
                                        <h2 className="text-xl md:text-2xl font-black text-white italic">DIBYAJIT GHOSH</h2>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] md:text-xs font-bold bg-[#A54C94] text-white px-2 py-0.5 rounded">FOUNDER & CEO</span>
                                            <span className="w-2 h-2 bg-[#E5645F] rounded-full animate-pulse"></span>
                                        </div>
                                        <div className="text-[10px] md:text-xs font-mono text-[#E5645F] pt-2 space-y-0.5">
                                            <p>{`>> ROLE: SECURITY_ADMIN`}</p>
                                            <p>{`>> SYS: KHARAGPUR_GRID`}</p>
                                            <p>{`>> AUTH: LEVEL_5_ROOT`}</p>
                                        </div>
                                    </div>
                                    
                                    {/* 📸 PHOTO: Adjusted Margins for Mobile to prevent overlap */}
                                    <div className="relative w-32 h-32 md:w-56 md:h-56 -mt-10 md:-mt-20 -mr-2 md:-mr-12 perspective-500">
                                        <div className="absolute inset-0 bg-[#E5645F] rounded-full blur-[40px] opacity-20"></div>
                                        <img 
                                            src="https://blogger.googleusercontent.com/img/a/AVvXsEhSzVolb4WlhIzCqb-NK2ZYkFzDbr6WTVD9BR8yCWkRFrAKMyKGstimmgcYr_vpFeEjKgRSSyirXi51bh0jJNQa9jrhs_VLcV1BKwcdCSV5pyYXNwlaTjpMc95-OnaQJj3ZIYa8Gd7DxFzhBbHiJToZswZp5zR99bW08LP4oI1LZ6CHd6FSaHpKkqbFt2EA" 
                                            alt="CEO"
                                            className="w-full h-full object-cover rounded-full border-4 border-[#361C26] shadow-2xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transform transition-transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#A54C94]/30 to-transparent opacity-50 mix-blend-overlay pointer-events-none"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. OPS & INTEL - SPLIT CARDS */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4 relative z-20">
                            
                            {/* SHIVAM SHING - OPS COMMANDER */}
                            <div className="relative group">
                                <div className="absolute -inset-[1px] bg-gradient-to-br from-[#E5645F] to-[#7A3947] rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-300"></div>
                                <div className="relative bg-[#361C26] border border-[#7A3947] p-4 rounded-xl h-full overflow-hidden">
                                    <div className="flex flex-col h-full justify-between relative z-10">
                                        <div>
                                            <h3 className="font-bold text-white text-sm md:text-lg">SHIVAM SHING</h3>
                                            <p className="text-[9px] md:text-[10px] tracking-widest text-[#E5645F] font-mono font-bold mt-1">OPS_COMMANDER</p>
                                        </div>
                                        {/* Photo - Pushed to bottom right */}
                                        <div className="self-end mt-4 relative w-16 h-16 md:w-24 md:h-24 -mb-4 -mr-4 md:-mb-6 md:-mr-6">
                                            <img 
                                                src="https://blogger.googleusercontent.com/img/a/AVvXsEgiDtg5YtmQ7bdvNmeAAMyhwpc5tLm_RNR2Lv4y4u6hsMzTiuqNyxo7O0qU32donmMZoTduoxe-4WgWVdPh29JH9vmYXkqCI7hiyzwaYBxxXgTfKbCsjTST6gyIWQB230kRXgwfQvxV-dqB9V-Xqr3915tuA9d88D1rGY-l9sJy_vhC3HJR0pdEI6F3E8Nr" 
                                                className="w-full h-full object-cover rounded-full border-2 border-[#7A3947]/50 grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 left-2 text-[8px] text-[#E5645F]/70 font-mono">
                                        STATUS: DEPLOYED
                                    </div>
                                </div>
                            </div>

                            {/* TUSHAR BHAKTA - MARKET INTEL */}
                            <div className="relative group">
                                <div className="absolute -inset-[1px] bg-gradient-to-br from-[#A54C94] to-[#7A3947] rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-300"></div>
                                <div className="relative bg-[#361C26] border border-[#7A3947] p-4 rounded-xl h-full overflow-hidden">
                                    <div className="flex flex-col h-full justify-between relative z-10">
                                        <div>
                                            <h3 className="font-bold text-white text-sm md:text-lg">TUSHAR BHAKTA</h3>
                                            <p className="text-[9px] md:text-[10px] tracking-widest text-[#A54C94] font-mono font-bold mt-1">MARKET_INTEL</p>
                                        </div>
                                        {/* Photo - Pushed to bottom right */}
                                        <div className="self-end mt-4 relative w-16 h-16 md:w-24 md:h-24 -mb-4 -mr-4 md:-mb-6 md:-mr-6">
                                            <img 
                                                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh68HDmzQ4YTj9g9soRrkq-eHc9cAfbC03ZOXSClA19NofdsJ2lzm2A29d2qxG3xXSUfuEVl-sGEVnkokdgS6snQn86My-Bekn2MLrF135mZPHpwXfsLg1XxhFaClj1Uebgi6IcxeseCR6rvwc3vg6IgYUm8voolffwjQhcY4haMotxomzPVjfJm7ylnHdF/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png" 
                                                className="w-full h-full object-cover rounded-full border-2 border-[#7A3947]/50 grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 left-2 text-[8px] text-[#A54C94]/70 font-mono">
                                        DATA: SYNCED
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
            
            <AnimatePresence>
                {isDemoModalOpen && <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />}
                {isBrochureModalOpen && <DownloadBrochureModal isOpen={isBrochureModalOpen} onClose={() => setIsBrochureModalOpen(false)} />}
            </AnimatePresence>
        </section>
    );
};

export default Hero;