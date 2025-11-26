import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  ExternalLink, 
  ShieldCheck, 
  Code, 
  Crosshair, 
  ArrowRight, 
  Zap,
  Cpu,
  Globe
} from "lucide-react";

// --- 1. SPECIAL COMPONENTS ---

// A. Mouse-tracking Spotlight Card
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-gray-900/50 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 248, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// B. Animated Grid Background
const BackgroundGrid = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    <motion.div 
      animate={{ 
        opacity: [0.3, 0.5, 0.3], 
        scale: [1, 1.1, 1],
      }} 
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        opacity: [0.2, 0.4, 0.2], 
        x: [0, 50, 0]
      }} 
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" 
    />
  </div>
);

// --- DATA ---
const services = [
  {
    name: "Cyber Defense",
    slug: "security",
    desc: "Military-grade encryption and active threat monitoring.",
    price: "₹1,999/mo",
    icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />,
    color: "from-cyan-500/20 to-blue-500/5"
  },
  {
    name: "Offensive Security",
    slug: "pentest",
    desc: "Ethical hacking to find holes before the bad guys do.",
    price: "₹2,999/scan",
    icon: <Crosshair className="w-8 h-8 text-red-400" />,
    color: "from-red-500/20 to-orange-500/5"
  },
  {
    name: "Full-Stack Dev",
    slug: "dev",
    desc: "High-performance React/Next.js applications.",
    price: "₹4,999/project",
    icon: <Code className="w-8 h-8 text-violet-400" />,
    color: "from-violet-500/20 to-purple-500/5"
  },
];

const projects = [
  {
    title: "Finexa Vault",
    tag: "Fintech",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    glow: "shadow-cyan-500/20"
  },
  {
    title: "EduVerse AI",
    tag: "EdTech",
    img: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800",
    glow: "shadow-purple-500/20"
  },
  {
    title: "Nova MedLink",
    tag: "Health",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    glow: "shadow-emerald-500/20"
  }
];

export default function HighTechLanding() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={ref} className="relative min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      <BackgroundGrid />

      <div className="container mx-auto px-4 py-20 relative z-10 space-y-32">
        
        {/* --- HERO SECTION --- */}
        <section className="relative flex flex-col items-center justify-center text-center min-h-[60vh]">
          
          {/* Floating Icons Background */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-[10%] opacity-20"><Cpu size={40} /></motion.div>
            <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 right-[15%] opacity-20"><Globe size={50} /></motion.div>
            <motion.div animate={{ y: [-20, 0, -20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-[80%] opacity-20"><Zap size={30} /></motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            System Online: v2.5.0
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6"
          >
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">CODE.</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"> SECURE.</span>
            <br />
            <span className="text-white/80">DOMINATE.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed"
          >
            We forge digital fortresses. Experience the perfect synthesis of 
            <span className="text-cyan-400 font-semibold"> aesthetic engineering</span> and 
            <span className="text-red-400 font-semibold"> offensive security</span>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button className="h-14 px-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all duration-300 transform hover:-translate-y-1">
              Initialize Project
            </Button>
            <Button variant="outline" className="h-14 px-8 rounded-full border-white/20 hover:bg-white/10 text-white backdrop-blur-md">
              View Directives
            </Button>
          </motion.div>
        </section>

        {/* --- GLOWING SERVICES --- */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-700"></div>
            <h2 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">CORE MODULES</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-700"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <SpotlightCard key={i} className="rounded-2xl">
                <div className={`h-full p-8 bg-gradient-to-b ${s.color} backdrop-blur-sm flex flex-col`}>
                  <div className="mb-6 p-4 rounded-xl bg-black/40 w-fit border border-white/5 shadow-inner">
                    {s.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{s.name}</h3>
                  <p className="text-gray-400 mb-6 flex-grow">{s.desc}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-cyan-400">{s.price}</span>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* --- HOLOGRAPHIC PROJECTS --- */}
        <section className="relative">
          <motion.div style={{ y: yParallax }} className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-4xl font-bold mb-12 text-center text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">DEPLOYED SYSTEMS</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900 ${p.glow} hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                
                {/* Image with Glitch Effect on Hover (Simulated via scale/opacity) */}
                <div className="h-80 overflow-hidden">
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110" 
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="text-xs font-mono text-cyan-400 mb-2 block tracking-widest uppercase">
                     // {p.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all">
                    <Button variant="link" className="p-0 text-white/70 hover:text-white h-auto">
                      Access Terminal <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- FAQ / DATA BANK --- */}
        <section className="max-w-3xl mx-auto border border-white/10 rounded-3xl p-8 md:p-12 bg-black/40 backdrop-blur-lg relative overflow-hidden">
          {/* Animated border line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          
          <h2 className="text-3xl font-bold mb-8 text-center">DATA BANK</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              "Encryption Standards?",
              "Deployment Velocity?",
              "Maintenance Protocols?",
            ].map((q, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10 px-4 rounded-lg data-[state=open]:bg-white/5 transition-colors">
                <AccordionTrigger className="hover:no-underline hover:text-cyan-400 font-mono text-lg">
                  {">"} {q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pl-6 border-l-2 border-cyan-500/50">
                  Data classified. Access granted: Our protocols utilize AES-256 encryption with rotating keys and automated CI/CD pipelines ensuring zero-downtime updates.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* --- FOOTER CTA --- */}
        <div className="text-center py-20">
          <h2 className="text-5xl md:text-9xl font-black text-white/5 tracking-tighter hover:text-white/10 transition-colors cursor-default select-none">
            TDCS TECH
          </h2>
        </div>

      </div>
    </div>
  );
}