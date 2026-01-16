import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Download, X, FileText, CalendarCheck, Globe, MapPin, Radio, ShieldCheck, Zap } from "lucide-react";
import type { RefObject } from "react";

// --- CONSTANTS ---
const GRADIENT_CLASS = "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";
const COMMON_BROCHURE_URL = "https://drive.google.com/file/d/1_oWjtOS1hRyVolJv22tHwPxdv2t2ePau/view?usp=drive_link";

// --- HELPER: Random Character Generator for Glitch Effect ---
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________";

const GlitchText = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState(text);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.95) { // 5% chance to glitch per tick
                const glitchArr = text.split('').map((char, i) => {
                    if (Math.random() > 0.7) return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                    return char;
                });
                setDisplay(glitchArr.join(''));
                setTimeout(() => setDisplay(text), 100); // Reset quickly
            }
        }, 200);
        return () => clearInterval(interval);
    }, [text]);

    return <span>{display}</span>;
};

// --- COMPONENT: Animated Cyber Background Grid ---
const CyberBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white dark:from-gray-900/0 dark:via-gray-900/80 dark:to-gray-900 z-10" />
            
            {/* Moving Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px),
                                      linear-gradient(to bottom, #808080 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
                    animation: 'gridMove 20s linear infinite'
                }}
            />
            
            {/* Floating Particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-indigo-500 rounded-full opacity-20 blur-xl"
                    initial={{ x: Math.random() * 1000, y: Math.random() * 800, scale: 0 }}
                    animate={{ 
                        y: [null, Math.random() * -100], 
                        opacity: [0, 0.4, 0],
                        scale: [1, 2, 0]
                    }}
                    transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
                    style={{ width: Math.random() * 100 + 50, height: Math.random() * 100 + 50 }}
                />
            ))}
            
            <style>{`
                @keyframes gridMove {
                    0% { transform: perspective(500px) rotateX(60deg) translateY(0) }
                    100% { transform: perspective(500px) rotateX(60deg) translateY(40px) }
                }
            `}</style>
        </div>
    );
};

// --- COMPONENT: Location/Global Ticker (HUD Style) ---
const LocationHUD = () => {
    const [mode, setMode] = useState<'local' | 'global'>('local');

    useEffect(() => {
        const timer = setInterval(() => {
            setMode(prev => prev === 'local' ? 'global' : 'local');
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-900/20 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </div>
            
            <div className="h-4 w-[1px] bg-indigo-300 dark:bg-indigo-700"></div>

            <div className="w-48 h-6 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {mode === 'local' ? (
                        <motion.div
                            key="local"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="absolute inset-0 flex items-center text-sm font-bold text-indigo-700 dark:text-indigo-300 tracking-wide"
                        >
                            <MapPin className="w-4 h-4 mr-2" />
                            HQ: KOLKATA, IN
                        </motion.div>
                    ) : (
                        <motion.div
                            key="global"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="absolute inset-0 flex items-center text-sm font-bold text-pink-600 dark:text-pink-400 tracking-wide"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            REACH: WORLDWIDE
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- INTERFACES (UNCHANGED) ---
interface HeroProps { showOnInnerPages?: boolean; }
interface DownloadBrochureModalProps { isOpen: boolean; onClose: () => void; }
interface BookDemoModalProps { isOpen: boolean; onClose: () => void; }

// --- MODALS (UNCHANGED LOGIC, JUST PLACEHOLDERS FOR BREVITY) ---
// (Assuming BookDemoModal and DownloadBrochureModal are defined exactly as in your previous code. 
//  I am omitting their full body here to focus on the HERO changes, but you should include them.)
const BookDemoModal = ({ isOpen, onClose }: BookDemoModalProps) => {
    if(!isOpen) return null;
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}><div className="bg-white p-8 rounded">Demo Modal Content (Click outside to close)</div></div>;
};
const DownloadBrochureModal = ({ isOpen, onClose }: DownloadBrochureModalProps) => {
    if(!isOpen) return null;
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}><div className="bg-white p-8 rounded">Brochure Modal Content (Click outside to close)</div></div>;
};

// --- ANIMATION VARIANTS ---
const wordContainerVariants = {
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } },
};
const wordItemVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100 } },
};
const scannerVariants = {
    animate: {
        top: ["0%", "100%", "0%"],
        opacity: [0, 1, 0],
        transition: { duration: 3, ease: "linear", repeat: Infinity }
    }
};

// --- MAIN HERO COMPONENT ---
export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    
    const heroRef = useRef(null);
    const isInView = useInView(heroRef, { once: true, amount: 0.1 });

    // 3D Motion Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    // Card Refs
    const cardRefCEO: RefObject<HTMLDivElement> = useRef(null);
    const cardRefCOO: RefObject<HTMLDivElement> = useRef(null);
    const cardRefCMO: RefObject<HTMLDivElement> = useRef(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cardRef: RefObject<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.2);
        y.set((e.clientY - centerY) * 0.2);
    };

    const headline = "Stay Secure with TDCS TECHNOLOGIES PRIVATE LIMITED";
    const words = headline.split(" ");

    return (
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 lg:pt-40 bg-white dark:bg-gray-950 overflow-hidden font-sans">
            
            {/* 1. NEW: Cyber Background System */}
            <CyberBackground />

            {/* Alert Placeholder */}
            <div id="global-alert-hero" className="fixed top-4 right-4 z-[9999] opacity-0 transition-opacity duration-300 pointer-events-none"></div>

            <div className="container mx-auto px-4 z-10 relative">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                >
                    {/* --- LEFT COLUMN: CONTENT --- */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* 2. NEW: Location HUD (Kolkata -> World) */}
                        <motion.div variants={wordItemVariants}>
                           <LocationHUD />
                        </motion.div>

                        {/* HEADLINE */}
                        <motion.h1
                            variants={wordContainerVariants}
                            className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white"
                        >
                            {words.map((word, index) => (
                                <motion.span key={index} variants={wordItemVariants} className="inline-block mr-2" style={{ perspective: 1000 }}>
                                    {word === 'TDCS' || word === 'TECHNOLOGIES' ? (
                                        <span className={`${GRADIENT_CLASS} font-black`}>
                                            <GlitchText text={word} /> {/* 3. NEW: Glitch Effect */}
                                        </span>
                                    ) : (
                                        word
                                    )}
                                </motion.span>
                            ))}
                        </motion.h1>

                        {/* SUBTEXT with Icons */}
                        <motion.div variants={wordItemVariants} className="flex flex-col space-y-4 max-w-xl text-lg text-gray-600 dark:text-gray-400">
                             <p>
                                From our High-Tech Campus in <b>Kolkata</b> to students across the <b>Globe</b>. 
                                As an ISO & MSME certified leader, we don't just teach security; we define it.
                             </p>
                             <div className="flex gap-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> Cyber Defense</span>
                                <span className="flex items-center"><Radio className="w-4 h-4 mr-1"/> Live Warfare Labs</span>
                                <span className="flex items-center"><Zap className="w-4 h-4 mr-1"/> 24/7 Mentorship</span>
                             </div>
                        </motion.div>

                        {/* CTA BUTTONS */}
                        <motion.div variants={wordItemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/courses">
                                <Button size="lg" className="relative overflow-hidden group text-lg px-8 py-6 w-full sm:w-auto shadow-lg bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black">
                                    <span className="relative z-10">Explore Courses</span>
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-indigo-600/20"></div>
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg px-8 py-6 w-full sm:w-auto border-2 border-indigo-500/20 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                onClick={() => setIsDemoModalOpen(true)}
                            >
                                <CalendarCheck className="mr-2 h-5 w-5" />
                                Book Live Demo
                            </Button>
                        </motion.div>
                    </div>

                    {/* --- RIGHT COLUMN: CYBER CARDS --- */}
                    <div className="lg:col-span-1 space-y-4 flex flex-col items-center lg:items-end perspective-1000">
                        
                        {/* CEO CARD with SCANNER Effect */}
                        <motion.div
                            ref={cardRefCEO}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", delay: 0.5 }}
                            className="relative w-full p-[1px] rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" // Border Gradient
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            onMouseMove={(e) => handleMouseMove(e, cardRefCEO)}
                            onMouseLeave={() => { x.set(0); y.set(0); setHoveredCard(null); }}
                            onMouseEnter={() => setHoveredCard('ceo')}
                        >
                            <div className="relative p-8 md:p-10 w-full rounded-2xl bg-gray-900 overflow-hidden">
                                {/* 4. NEW: Laser Scanner Animation */}
                                <motion.div 
                                    className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"
                                    variants={scannerVariants}
                                    animate="animate"
                                />

                                <div className="relative z-20 text-white">
                                    <h3 className="text-xl font-extrabold mb-1 flex items-center gap-2">
                                        Dibyajit Ghosh <span className="text-[10px] px-1 bg-cyan-500 rounded text-black font-bold">FOUNDER</span>
                                    </h3>
                                    <p className="text-cyan-400 text-sm font-mono tracking-wider mb-4">SYSTEM_ADMIN</p>
                                    
                                    <AnimatePresence>
                                        {hoveredCard === 'ceo' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="text-xs text-gray-300 font-mono border-l-2 border-cyan-500 pl-2 overflow-hidden"
                                            >
                                                [STATUS]: ONLINE<br/>
                                                [LOC]: KOLKATA_HQ<br/>
                                                [MISSION]: EDU_REVOLUTION
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                
                                {/* Image with filters */}
                                <motion.img
                                    src="https://blogger.googleusercontent.com/img/a/AVvXsEhSzVolb4WlhIzCqb-NK2ZYkFzDbr6WTVD9BR8yCWkRFrAKMyKGstimmgcYr_vpFeEjKgRSSyirXi51bh0jJNQa9jrhs_VLcV1BKwcdCSV5pyYXNwlaTjpMc95-OnaQJj3ZIYa8Gd7DxFzhBbHiJToZswZp5zR99bW08LP4oI1LZ6CHd6FSaHpKkqbFt2EA"
                                    alt="CEO"
                                    className="absolute -right-5 -bottom-5 w-40 h-40 object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                                    style={{ x: useTransform(x, [-100, 100], [10, -10]), y: useTransform(y, [-100, 100], [10, -10]) }}
                                />
                            </div>
                        </motion.div>

                        {/* COO & CMO Stacked with Cyber Borders */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            {/* COO */}
                            <motion.div
                                ref={cardRefCOO}
                                className="relative flex-1 rounded-xl bg-gray-900 border border-green-500/30 overflow-hidden p-6 cursor-pointer group hover:bg-gray-800 transition-colors"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                onMouseMove={(e) => handleMouseMove(e, cardRefCOO)}
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-50"><Globe className="w-4 h-4 text-green-500"/></div>
                                <h3 className="text-lg font-bold text-white relative z-20">Shivam Shing</h3>
                                <p className="text-xs text-green-400 font-mono mb-2">OPS_COMMANDER</p>
                                <motion.img
                                     src="https://blogger.googleusercontent.com/img/a/AVvXsEgiDtg5YtmQ7bdvNmeAAMyhwpc5tLm_RNR2Lv4y4u6hsMzTiuqNyxo7O0qU32donmMZoTduoxe-4WgWVdPh29JH9vmYXkqCI7hiyzwaYBxxXgTfKbCsjTST6gyIWQB230kRXgwfQvxV-dqB9V-Xqr3915tuA9d88D1rGY-l9sJy_vhC3HJR0pdEI6F3E8Nr"
                                     className="absolute -right-2 -bottom-2 w-20 h-20 object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all"
                                />
                            </motion.div>

                            {/* CMO */}
                            <motion.div
                                ref={cardRefCMO}
                                className="relative flex-1 rounded-xl bg-gray-900 border border-red-500/30 overflow-hidden p-6 cursor-pointer group hover:bg-gray-800 transition-colors"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                onMouseMove={(e) => handleMouseMove(e, cardRefCMO)}
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-50"><Zap className="w-4 h-4 text-red-500"/></div>
                                <h3 className="text-lg font-bold text-white relative z-20">Tushar Bhakta</h3>
                                <p className="text-xs text-red-400 font-mono mb-2">MARKET_INTEL</p>
                                <motion.img
                                     src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh68HDmzQ4YTj9g9soRrkq-eHc9cAfbC03ZOXSClA19NofdsJ2lzm2A29d2qxG3xXSUfuEVl-sGEVnkokdgS6snQn86My-Bekn2MLrF135mZPHpwXfsLg1XxhFaClj1Uebgi6IcxeseCR6rvwc3vg6IgYUm8voolffwjQhcY4haMotxomzPVjfJm7ylnHdF/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png"
                                     className="absolute -right-2 -bottom-2 w-20 h-20 object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all"
                                />
                            </motion.div>
                        </div>

                    </div>
                </motion.div>
            </div>

            {/* Hidden Modals (Add your props here) */}
            <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
            <DownloadBrochureModal isOpen={isBrochureModalOpen} onClose={() => setIsBrochureModalOpen(false)} />
        </section>
    );
};