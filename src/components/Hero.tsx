import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  CalendarCheck,
  Globe,
  Radio,
  Zap,
  Terminal,
  Cpu,
  Download,
  X,
  FileText,
  Activity,
  ChevronRight,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- CONSTANTS ---
const COMMON_BROCHURE_URL = "https://drive.google.com/file/d/1_oWjtOS1hRyVolJv22tHwPxdv2t2ePau/view?usp=drive_link";

// --- UTILS ---
const alertMessage = (message: string, type: 'success' | 'error') => {
    const alertBox = document.getElementById('global-alert-hero');
    if (alertBox) {
        alertBox.textContent = `[${type.toUpperCase()}] ${message}`;
        alertBox.className = `fixed top-4 right-4 z-[9999] p-4 rounded bg-[#0B0F17] border border-blue-500 text-blue-400 font-mono text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-in slide-in-from-right fade-in duration-300 block`;
        setTimeout(() => { alertBox.className = "hidden"; }, 3000);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
};

/* ======================================================
   🔥 TDCS GLITCH + 3D TILT TEXT (Updated with Screenshot Colors)
====================================================== */
const GlitchTDCS = ({ text }: { text: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-60, 60], [18, -18]);
  const rotateY = useTransform(x, [-60, 60], [-18, 18]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative inline-block cursor-pointer perspective-[1200px]"
    >
      {/* MAIN TEXT - Gradient updated to Orange/Purple/Pink */}
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 font-black drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]">
        {text}
      </span>

      {/* GLITCH LAYERS */}
      <span className="absolute inset-0 text-orange-500 opacity-0 hover:opacity-70 translate-x-[2px] -translate-y-[1px] mix-blend-screen animate-glitch-1">
        {text}
      </span>
      <span className="absolute inset-0 text-purple-500 opacity-0 hover:opacity-70 -translate-x-[2px] translate-y-[1px] mix-blend-screen animate-glitch-2">
        {text}
      </span>

      {/* SCAN LINE */}
      <span className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(255,255,255,0.18)_50%,transparent_60%)] opacity-0 hover:opacity-100 animate-scan-fast pointer-events-none" />
    </motion.div>
  );
};

/* ======================================================
   🌐 CYBER BACKGROUND
====================================================== */
const CyberBackground = () => (
  <div className="absolute inset-0 bg-[#0B0F17] overflow-hidden pointer-events-none">
     {/* Deep Glow Spots matching screenshot */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#111827_0%,#000_70%)] opacity-80" />
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "linear-gradient(to right,#4f46e5 1px,transparent 1px),linear-gradient(to bottom,#4f46e5 1px,transparent 1px)",
        backgroundSize: "50px 50px",
        transform:
          "perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)",
        animation: "gridMove 15s linear infinite",
        maskImage: "linear-gradient(to bottom,transparent,black)",
      }}
    />
  </div>
);

/* ======================================================
   MODAL SYSTEM
====================================================== */
const CyberModalFrame = ({ children, title, subtitle, icon: Icon, onClose, theme = "blue" }: any) => {
    const themes: any = {
        blue: { border: "border-blue-600", text: "text-blue-500", glow: "shadow-blue-500/20" },
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
            <div className="relative z-10 p-6">{children}</div>
        </motion.div>
    );
};

const CyberInput = ({ label, icon: Icon, color = "blue", ...props }: any) => {
    const c = color === "blue" ? "text-blue-400 border-blue-500 placeholder-blue-900" : "text-purple-400 border-purple-500 placeholder-purple-900";
    return (
        <div className="relative group">
            <label className={`block text-xs font-mono mb-1 tracking-widest uppercase opacity-80 ${c.split(' ')[0]}`}>{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className={`h-4 w-4 ${c.split(' ')[0]}`} />
                </div>
                <input {...props} className={`block w-full pl-10 pr-3 py-2.5 bg-[#0B0F17]/90 border rounded-md text-gray-100 bg-opacity-50 focus:ring-1 focus:outline-none transition-all font-mono text-sm ${c}`} />
            </div>
        </div>
    );
};

const BookDemoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <CyberModalFrame title="Book a Demo" subtitle="Schedule with an Expert" icon={Radio} onClose={onClose} theme="blue">
                <form onSubmit={(e) => { e.preventDefault(); alertMessage("Demo Requested!", "success"); onClose(); }} className="space-y-5">
                    <CyberInput label="Name" placeholder="Full Name" required icon={Terminal} color="blue" />
                    <CyberInput label="Phone" type="tel" placeholder="+91-XXXXXXXXXX" required icon={Activity} color="blue" />
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3">Confirm Booking</Button>
                </form>
            </CyberModalFrame>
        </div>
    );
};

const DownloadBrochureModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <CyberModalFrame title="Get Brochure" subtitle="Download Course Details" icon={FileText} onClose={onClose} theme="purple">
                <form onSubmit={(e) => { e.preventDefault(); alertMessage("Downloading...", "success"); window.open(COMMON_BROCHURE_URL, '_blank'); onClose(); }} className="space-y-4">
                    <CyberInput label="Name" placeholder="Full Name" icon={Terminal} required color="purple" />
                    <CyberInput label="Email" type="email" placeholder="Email" icon={Activity} required color="purple" />
                    <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3">Download Now</Button>
                </form>
            </CyberModalFrame>
        </div>
    );
};

/* ======================================================
   🚀 HERO COMPONENT
====================================================== */
export const Hero = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  // 3D Motion Logic
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
    <section className="relative min-h-screen flex items-center pt-24 pb-16 bg-[#0B0F17] text-white overflow-hidden font-sans">
      <CyberBackground />
      <div id="global-alert-hero" className="hidden"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* --- LEFT COLUMN: TEXT --- */}
          <div className="lg:col-span-7 space-y-8">
            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold leading-tight"
            >
              STAY <span className="text-white">SECURE</span> WITH <br />
              <GlitchTDCS text="TDCS TECHNOLOGIES" />
              <br />
              <span className="text-3xl md:text-5xl text-gray-400 font-bold">
                PRIVATE LIMITED
              </span>
            </motion.h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl border-l-2 border-gray-700 pl-6">
              Deploying next-gen cybersecurity solutions from
              <span className="text-blue-400 font-bold">
                {" "}
                Kharagpur
              </span>{" "}
              to the world. We don’t patch bugs — we build fortresses.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/courses">
                <Button className="h-14 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold clip-path-slant shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all hover:scale-105">
                  <Terminal className="w-5 h-5 mr-2" />
                  INITIATE_PROTOCOL
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => setIsDemoModalOpen(true)}
                className="h-14 px-8 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-white hover:bg-blue-500/10"
              >
                <Cpu className="w-5 h-5 mr-2" />
                BOOK_DEMO_SESSION
              </Button>

               <Button 
                    variant="ghost" 
                    className="h-14 px-4 text-purple-400 hover:text-purple-300 hover:bg-transparent font-mono text-sm underline underline-offset-4"
                    onClick={() => setIsBrochureModalOpen(true)}
                >
                    [ DOWNLOAD_INTEL ]
                </Button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: 3D CARDS (Blue, Green, Red) --- */}
          <motion.div
            className="lg:col-span-5 relative perspective-1000 flex flex-col gap-4"
            onMouseMove={handleMouseMove}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
             {/* 1. CEO CARD (Blue) */}
            <div className="bg-[#3B82F6] rounded-2xl p-6 shadow-2xl shadow-blue-900/50 flex items-center justify-between overflow-hidden relative group">
                <div className="z-10 text-white relative">
                    <h2 className="text-2xl font-black">DIBYAJIT GHOSH</h2>
                    <p className="text-blue-100 font-medium text-sm mt-1">FOUNDER & CEO</p>
                </div>
                {/* 3D Image Pop-out */}
                <div className="relative w-32 h-32 md:w-36 md:h-36 -mr-4 -mb-8">
                    <img 
                        src="https://blogger.googleusercontent.com/img/a/AVvXsEhSzVolb4WlhIzCqb-NK2ZYkFzDbr6WTVD9BR8yCWkRFrAKMyKGstimmgcYr_vpFeEjKgRSSyirXi51bh0jJNQa9jrhs_VLcV1BKwcdCSV5pyYXNwlaTjpMc95-OnaQJj3ZIYa8Gd7DxFzhBbHiJToZswZp5zR99bW08LP4oI1LZ6CHd6FSaHpKkqbFt2EA" 
                        alt="CEO"
                        className="w-full h-full object-cover transform scale-110 drop-shadow-2xl transition-transform group-hover:scale-125"
                    />
                </div>
            </div>

            {/* Split Row */}
            <div className="grid grid-cols-2 gap-4">
                 {/* 2. COO CARD (Green) */}
                <div className="bg-[#10B981] rounded-2xl p-5 shadow-xl shadow-green-900/50 flex flex-col justify-between h-48 overflow-hidden relative group">
                    <div className="z-10 text-white">
                        <h3 className="text-lg font-bold leading-tight">Shivam Shing</h3>
                        <p className="text-green-100 text-xs font-medium mt-1">COO</p>
                    </div>
                    <div className="self-center mt-auto relative w-24 h-24 -mb-6">
                        <img 
                            src="https://blogger.googleusercontent.com/img/a/AVvXsEgiDtg5YtmQ7bdvNmeAAMyhwpc5tLm_RNR2Lv4y4u6hsMzTiuqNyxo7O0qU32donmMZoTduoxe-4WgWVdPh29JH9vmYXkqCI7hiyzwaYBxxXgTfKbCsjTST6gyIWQB230kRXgwfQvxV-dqB9V-Xqr3915tuA9d88D1rGY-l9sJy_vhC3HJR0pdEI6F3E8Nr" 
                            className="w-full h-full object-cover transform scale-110 drop-shadow-xl transition-transform group-hover:scale-125"
                        />
                    </div>
                </div>

                {/* 3. CMO CARD (Red) */}
                <div className="bg-[#EF4444] rounded-2xl p-5 shadow-xl shadow-red-900/50 flex flex-col justify-between h-48 overflow-hidden relative group">
                    <div className="z-10 text-white">
                        <h3 className="text-lg font-bold leading-tight">Tushar Bhakta</h3>
                        <p className="text-red-100 text-xs font-medium mt-1">CMO</p>
                    </div>
                    <div className="self-center mt-auto relative w-24 h-24 -mb-6">
                        <img 
                            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh68HDmzQ4YTj9g9soRrkq-eHc9cAfbC03ZOXSClA19NofdsJ2lzm2A29d2qxG3xXSUfuEVl-sGEVnkokdgS6snQn86My-Bekn2MLrF135mZPHpwXfsLg1XxhFaClj1Uebgi6IcxeseCR6rvwc3vg6IgYUm8voolffwjQhcY4haMotxomzPVjfJm7ylnHdF/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png" 
                            className="w-full h-full object-cover transform scale-110 drop-shadow-xl transition-transform group-hover:scale-125"
                        />
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* GLOBAL ANIMATIONS */}
      <style>{`
        @keyframes glitch-1 {
          0% { transform: translate(0); }
          20% { transform: translate(-2px,2px); }
          40% { transform: translate(-2px,-2px); }
          60% { transform: translate(2px,2px); }
          80% { transform: translate(2px,-2px); }
          100% { transform: translate(0); }
        }
        @keyframes glitch-2 {
          0% { transform: translate(0); }
          20% { transform: translate(2px,-2px); }
          40% { transform: translate(2px,2px); }
          60% { transform: translate(-2px,-2px); }
          80% { transform: translate(-2px,2px); }
          100% { transform: translate(0); }
        }
        .animate-glitch-1 { animation: glitch-1 0.35s infinite; }
        .animate-glitch-2 { animation: glitch-2 0.35s infinite; }

        @keyframes scan-fast {
          0% { background-position: 0 -100%; }
          100% { background-position: 0 200%; }
        }
        .animate-scan-fast {
          background-size: 100% 200%;
          animation: scan-fast 1.2s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: perspective(1000px) rotateX(60deg) translateY(0) scale(2); }
          100% { transform: perspective(1000px) rotateX(60deg) translateY(50px) scale(2); }
        }

        .clip-path-slant {
          clip-path: polygon(10% 0,100% 0,100% 80%,90% 100%,0 100%,0 20%);
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