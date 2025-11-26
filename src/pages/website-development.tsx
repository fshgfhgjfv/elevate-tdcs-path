import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  Lock, 
  Server, 
  Smartphone,
  CheckCircle2,
  Star
} from "lucide-react";

// --- 1. UTILITY COMPONENTS ---

// A. Mouse-tracking Spotlight Card (Refined)
function SpotlightCard({ children, className = "", spotlightColor = "rgba(56, 189, 248, 0.25)" }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-gray-900/40 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full z-20">{children}</div>
    </div>
  );
}

// B. Infinite Marquee Component
const Marquee = ({ children, direction = "left", speed = 25 }: { children: React.ReactNode, direction?: "left"|"right", speed?: number }) => {
  return (
    <div className="flex overflow-hidden select-none gap-8 mask-linear-fade">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : 0 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0 gap-8 items-center"
      >
        {children}
        {children} {/* Duplicate for seamless loop */}
      </motion.div>
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : 0 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0 gap-8 items-center"
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

// --- DATA ---

const services = [
  {
    title: "Enterprise Security",
    desc: "24/7 Threat monitoring and firewall protection.",
    icon: <Shield className="w-6 h-6 text-emerald-400" />
  },
  {
    title: "Rapid Development",
    desc: "Next.js applications deployed on Edge networks.",
    icon: <Zap className="w-6 h-6 text-yellow-400" />
  },
  {
    title: "Cloud Infrastructure",
    desc: "Scalable AWS/Azure architecture management.",
    icon: <Server className="w-6 h-6 text-blue-400" />
  }
];

const testimonials = [
  { name: "Sarah J.", role: "CTO, FintechGlobal", text: "They secured our entire banking infrastructure in weeks." },
  { name: "Mark D.", role: "Founder, EduTech", text: "The fastest dev team we've ever worked with." },
  { name: "Elena R.", role: "Director, HealthPlus", text: "Zero downtime during our migration. Incredible." },
  { name: "David K.", role: "VP, CyberSafe", text: "Their penetration testing found critical bugs others missed." },
];

const brands = ["Finexa", "Google", "Amazon", "Stripe", "Vercel", "Microsoft"];

export default function AgencyLanding() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative min-h-screen bg-[#030303] text-white font-sans selection:bg-indigo-500/30">
      
      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-50" />

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            TDCS<span className="text-indigo-400">.SECURE</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Services</a>
            <a href="#" className="hover:text-white transition-colors">Work</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
          <Button size="sm" className="bg-white text-black hover:bg-gray-200 rounded-full px-6 font-semibold">
            Book Audit
          </Button>
        </div>
      </nav>

      <div className="relative z-10 pt-32 space-y-32 pb-20">

        {/* --- HERO SECTION --- */}
        <section className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Accepting High-Risk Security Contracts
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Digital Assets.<br /> Secured & Scaled.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            We are the agency that builds high-performance platforms and fortifies them with military-grade cybersecurity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="h-12 px-8 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
              Start Project
            </Button>
            <Button variant="outline" className="h-12 px-8 rounded-full border-white/10 text-white hover:bg-white/5">
              View Case Studies
            </Button>
          </div>
        </section>

        {/* --- BRAND STRIP --- */}
        <section className="border-y border-white/5 bg-black/30 backdrop-blur-sm py-10 overflow-hidden">
          <p className="text-center text-xs text-gray-500 mb-6 uppercase tracking-widest font-semibold">Trusted by industry leaders</p>
          <Marquee speed={40}>
            {brands.map((brand, i) => (
              <span key={i} className="text-2xl font-bold text-gray-700 mx-8 uppercase tracking-tighter hover:text-white transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </Marquee>
        </section>

        {/* --- SERVICES GRID --- */}
        <section className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Our Capabilities</h2>
              <p className="text-gray-400">Full-cycle digital production.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <SpotlightCard key={i} className="rounded-3xl h-64">
                <div className="h-full p-8 flex flex-col justify-between bg-black/20">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-400">{s.desc}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* --- BENTO GRID PROJECTS --- */}
        <section className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Recent Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
            
            {/* Project 1 - Large Left */}
            <SpotlightCard className="md:col-span-2 md:row-span-2 rounded-3xl" spotlightColor="rgba(168, 85, 247, 0.2)">
              <div className="relative h-full group">
                <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800" 
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="text-purple-400 font-mono text-xs mb-2">FINTECH // 01</span>
                  <h3 className="text-3xl font-bold">Finexa Bank</h3>
                  <p className="text-gray-300 mt-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    Complete backend overhaul with Node.js and banking-grade security protocols.
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Project 2 - Top Right */}
            <SpotlightCard className="md:col-span-2 rounded-3xl" spotlightColor="rgba(34, 197, 94, 0.2)">
              <div className="relative h-full group flex items-center p-8 gap-6">
                <div className="flex-1">
                   <span className="text-emerald-400 font-mono text-xs mb-2 block">HEALTH // 02</span>
                   <h3 className="text-2xl font-bold">Nova Med</h3>
                   <p className="text-gray-400 text-sm mt-2">Telemedicine app with WebRTC.</p>
                </div>
                <div className="w-32 h-32 bg-emerald-900/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                  <Smartphone className="w-12 h-12 text-emerald-400" />
                </div>
              </div>
            </SpotlightCard>

            {/* Project 3 - Bottom Right 1 */}
            <SpotlightCard className="rounded-3xl" spotlightColor="rgba(59, 130, 246, 0.2)">
              <div className="h-full p-6 flex flex-col justify-between bg-gradient-to-br from-blue-900/20 to-transparent">
                <Globe className="w-10 h-10 text-blue-400" />
                <div>
                   <h3 className="font-bold text-lg">EduVerse</h3>
                   <p className="text-xs text-gray-400">Global learning platform</p>
                </div>
              </div>
            </SpotlightCard>

            {/* Project 4 - Bottom Right 2 */}
            <SpotlightCard className="rounded-3xl cursor-pointer group">
              <div className="h-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                 <div className="text-center">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">View All Cases</span>
                 </div>
              </div>
            </SpotlightCard>
            
          </div>
        </section>

        {/* --- INFINITE MARQUEE TESTIMONIALS --- */}
        <section className="py-20 bg-gradient-to-b from-transparent to-indigo-900/10">
          <div className="container mx-auto px-6 mb-12 text-center">
             <h2 className="text-4xl font-bold mb-4">Client Success Stories</h2>
             <p className="text-gray-400">Don't just take our word for it.</p>
          </div>

          <div className="relative">
            {/* Gradient masks to fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10" />
            
            <Marquee direction="left" speed={50}>
              {testimonials.map((t, i) => (
                <div 
                  key={i} 
                  className="w-[400px] bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex gap-1 mb-4 text-indigo-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-lg text-gray-200 mb-6 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-xs text-indigo-300">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="container mx-auto px-6 pb-20">
          <div className="rounded-[3rem] bg-indigo-600 p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-[100px] opacity-50" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to secure your future?</h2>
              <p className="text-indigo-100 text-lg">
                Join the 50+ companies who trust TDCS to protect and power their digital infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full h-14 px-8 text-lg font-bold">
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full h-14 px-8 text-lg">
                  Pricing Plans
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}