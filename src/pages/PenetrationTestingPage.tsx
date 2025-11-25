import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ShieldAlert, Terminal, Lock, CheckCircle, 
  Server, Star, ChevronDown, Cpu, Crosshair, Check, 
  Siren, Fingerprint, Activity
} from "lucide-react";

// --- UTILITY: LINKS ---
const CALENDLY_LINK = "https://calendly.com/rudranarayanswain/30min";

// --- UTILITY: CSS FOR MARQUEE (INJECTED) ---
const marqueeStyle = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-scroll {
    animation: scroll 30s linear infinite;
  }
  .animate-scroll-reverse {
    animation: scroll 30s linear infinite reverse;
  }
  .text-glow {
    text-shadow: 0 0 10px rgba(239, 68, 68, 0.7);
  }
`;

// --- UTILITY COMPONENT: SECURITY GRID BACKGROUND ---
const SecurityGrid = () => (
  <div className="absolute inset-0 z-0 pointer-events-none bg-slate-950">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef44440a_1px,transparent_1px),linear-gradient(to_bottom,#ef44440a_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[500px] w-[500px] rounded-full bg-red-900/10 blur-[120px]" />
    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
    <style>{marqueeStyle}</style>
  </div>
);

// --- COMPONENT: TERMINAL TYPEWRITER EFFECT ---
const TerminalText = ({ text, isActive }: { text: string; isActive: boolean }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  if (!isActive) return null;

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "5px" }} key={index} className="text-slate-300 font-mono text-sm">
          {word}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-2 h-4 bg-red-500 ml-1"
      />
    </motion.div>
  );
};

// --- COMPONENT: ADVANCED FAQ ITEM ---
const AdvancedFAQItem = ({ faq, index, isOpen, toggle }: { faq: any, index: number, isOpen: boolean, toggle: () => void }) => {
  return (
    <motion.div 
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={`group border rounded-lg overflow-hidden transition-all duration-500 ${
        isOpen 
          ? 'bg-slate-900/80 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]' 
          : 'bg-slate-900/30 border-slate-800 hover:border-slate-600'
      }`}
    >
      <button
        onClick={toggle}
        className="relative w-full text-left p-5 flex justify-between items-center z-10"
      >
        <div className="flex items-center gap-4">
          <span className={`font-mono text-xs font-bold px-2 py-1 rounded transition-colors ${isOpen ? 'bg-red-500 text-black' : 'bg-slate-800 text-slate-500'}`}>
            0{index + 1}
          </span>
          <span className={`font-bold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
            {faq.q}
          </span>
        </div>
        
        {/* Animated Chevron */}
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-red-500/20 rotate-180' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
          <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-red-500' : 'text-slate-400'}`} />
        </div>
      </button>

      {/* Answer Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="relative overflow-hidden"
          >
            {/* Scanline Effect */}
            <motion.div 
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.5, repeat: 0 }}
              className="absolute left-0 w-full h-px bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.8)] z-20 pointer-events-none"
            />
            
            <div className="p-5 pt-0 border-l-2 border-red-500 ml-5 mb-5 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div className="pl-4 pt-2">
                 <TerminalText text={faq.a} isActive={isOpen} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- COMPONENT: HUNTER CARD ---
const HunterCard = ({ tester, index }: { tester: any, index: number }) => {
  return (
    <div className="group relative h-[500px] w-full rounded-xl overflow-hidden border border-red-900/30 bg-slate-900 shadow-2xl">
      <div className="absolute inset-0 h-full w-full">
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
         <img 
            src={tester.image} 
            alt={tester.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-40" 
         />
         <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-0 transition-transform duration-500 group-hover:translate-y-full">
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-red-500/50 text-red-500 bg-red-950/30 animate-pulse">
                    ACTIVE OPERATOR
                </Badge>
            </div>
            <h3 className="text-3xl font-bold text-white font-mono uppercase tracking-tighter">{tester.name}</h3>
            <p className="text-red-400 font-mono text-sm tracking-widest uppercase">{tester.role}</p>
         </div>
      </div>

      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md p-8 flex flex-col justify-center border-r-2 border-red-600 transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0 z-30">
         <div className="absolute top-4 right-4">
            <Fingerprint className="w-12 h-12 text-red-900/20" />
         </div>
         <div className="relative z-10">
           <h3 className="text-2xl font-bold text-white mb-1 font-mono">{tester.name}</h3>
           <p className="text-red-500 text-xs uppercase tracking-widest mb-6 border-b border-red-900/50 pb-4">
             Classified Profile
           </p>
           <div className="space-y-6">
             <div>
                <h4 className="text-slate-500 text-xs uppercase mb-2 flex items-center gap-2">
                    <Crosshair className="w-3 h-3 text-red-500" /> Specialty
                </h4>
                <p className="text-slate-200 font-medium">{tester.specialty}</p>
             </div>
             <div>
                <h4 className="text-slate-500 text-xs uppercase mb-2 flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-red-500" /> Bio
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed font-mono">"{tester.bio}"</p>
             </div>
             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-red-900/30">
                <div className="bg-red-950/10 p-3 rounded border border-red-900/20">
                    <div className="text-2xl font-bold text-white font-mono">{tester.stats.bugs}</div>
                    <div className="text-[10px] text-red-400 uppercase">Vulnerabilities</div>
                </div>
                <div className="bg-red-950/10 p-3 rounded border border-red-900/20">
                    <div className="text-2xl font-bold text-white font-mono">{tester.stats.criticals}</div>
                    <div className="text-[10px] text-red-400 uppercase">Critical Severity</div>
                </div>
             </div>
           </div>
           <div className="mt-6 flex flex-wrap gap-2">
            {tester.certs.map((cert: string) => (
              <span key={cert} className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-slate-300 border border-slate-700">
                {cert}
              </span>
            ))}
          </div>
         </div>
      </div>
    </div>
  );
}

// --- COMPONENT: INFINITE TESTIMONIALS ---
const InfiniteTestimonials = ({ direction = "normal" }: { direction?: "normal" | "reverse" }) => {
    const reviews = [
        { name: "Rajesh K.", company: "FinTech Solutions", text: "Found a critical gateway flaw in 48 hours. Lifesavers." },
        { name: "Sarah J.", company: "HealthVault", text: "The report actually told us how to fix the issues step-by-step." },
        { name: "Amit P.", company: "E-Com Express", text: "Knowing exactly who is testing our systems gave us immense confidence." },
        { name: "David L.", company: "SaaSify.io", text: "Mobile app pentest revealed API vulnerabilities we missed." },
        { name: "Elena R.", company: "CryptoGuard", text: "Advanced persistent threat simulation was eye-opening." },
    ];
    const extendedReviews = [...reviews, ...reviews, ...reviews];

    return (
        <div className="relative flex overflow-x-hidden group mb-4">
            <div className={`flex gap-4 ${direction === 'reverse' ? 'animate-scroll-reverse' : 'animate-scroll'}`}>
                {extendedReviews.map((review, i) => (
                    <div key={i} className="w-[400px] bg-slate-900/50 border border-slate-800 p-6 rounded-sm flex-shrink-0 hover:border-red-500/30 transition-colors backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-1">
                                {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-red-600 text-red-600" />)}
                            </div>
                            <Lock className="w-3 h-3 text-slate-600" />
                        </div>
                        <p className="text-slate-300 text-sm mb-4 font-mono leading-relaxed">"{review.text}"</p>
                        <div className="flex items-center gap-3 border-t border-slate-800/50 pt-3">
                            <div className="w-8 h-8 bg-red-900/20 rounded-full flex items-center justify-center font-bold text-xs text-red-500 border border-red-900/30">{review.name[0]}</div>
                            <div>
                                <p className="text-sm font-bold text-white">{review.name}</p>
                                <p className="text-xs text-slate-500 uppercase">{review.company}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-10" />
        </div>
    );
};

// --- DATA ---
const testers = [
  {
    id: 1,
    name: "Rudra Narayan",
    role: "Senior Penetration Tester",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEh-jgwTQ5FLXjpgEyZC5KPC0L9QkHlNAGMsuc_1GVpFzUrxBJJamCvkj716z2BaVYYryPyJjctPxHvlyDbdR9_P7C1vilIjcUwJvhXCEsDjR6PeaSbzAUugjGWvqd74zS8pPvD4_A4XaPNN4JpBN9U5et8vhWx13FjTjyNWJ1L-sNkSmmPVX-dqEF8pZ2qE", 
    specialty: "Network & Cloud Security",
    certs: ["OSCP", "CEH", "CISSP"],
    bio: "Lead operator for TDCS. Expert in simulating advanced persistent threats (APT) and Red Teaming.",
    stats: { bugs: "500+", criticals: "120+" }
  },
  {
    id: 2,
    name: "Aisha Verma", 
    role: "Security Researcher",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    specialty: "Web App & Mobile Security",
    certs: ["OSEP", "Burp Certified"],
    bio: "Specializes in logic flaws and zero-day exploits in SaaS platforms. Master of API security.",
    stats: { bugs: "350+", criticals: "90+" }
  }
];

const plans = [
  {
    name: "Basic Audit",
    price: "₹14,999",
    desc: "Essential vulnerability scanning for small websites.",
    features: ["Automated Vulnerability Scan", "OWASP Top 10 Check", "PDF Summary Report", "Email Support"],
    recommended: false
  },
  {
    name: "Pro Penetration",
    price: "₹29,999",
    desc: "Deep manual testing for business-critical apps.",
    features: ["Manual Exploitation", "Business Logic Testing", "API Security Testing", "Detailed Remediation"],
    recommended: true
  },
  {
    name: "Red Team Sim",
    price: "Custom",
    desc: "Full-scale attack simulation on infrastructure.",
    features: ["Full Red Team Operation", "Social Engineering", "DoS Stress Testing", "24/7 Priority Support"],
    recommended: false
  }
];

const faqs = [
  { q: "Will penetration testing take my site offline?", a: "NEGATIVE. We perform non-destructive testing as standard. However, during stress testing (DoS simulation), we coordinate strictly with your IT team to ensure zero downtime." },
  { q: "How long does a typical audit take?", a: "VARIABLE. Small web apps take 3-5 days. Complex enterprise networks can take 2-3 weeks. We provide a timeline estimate after the initial reconnaissance phase." },
  { q: "Do you provide a fix for the bugs found?", a: "AFFIRMATIVE. We don't just break things. Our final report includes code-level remediation guides, configuration patches, and a re-test period to verify your fixes." },
  { q: "Is my data safe during the testing process?", a: "ABSOLUTE PRIORITY. We operate under strict NDA. All data found during exploitation is redacted in reports. We use encrypted channels for all communication." },
  { q: "What is the difference between Vulnerability Scan and Pentest?", a: "DISTINCTION: A Scan is automated and finds known surface issues. A Pentest is manual, human-led, and uses logic to chain vulnerabilities together to simulate a real hacker attack." },
];

// --- MAIN PAGE COMPONENT ---
export default function PenetrationTestingPage() {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const handleCalendly = () => {
    window.open(CALENDLY_LINK, "_blank");
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-red-500/30 overflow-x-hidden relative">
      <SecurityGrid />
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="container mx-auto relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 text-sm mb-8 backdrop-blur-md"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" /> 
            <span className="font-mono tracking-widest uppercase">Cyber Defense Unit // Active</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase">
            Penetration <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 text-glow">Testing</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
            Identify vulnerabilities before they are exploited. 
            <span className="block mt-2 text-slate-300 font-medium">Professional VAPT for Web, Mobile, and Cloud.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Button 
                onClick={handleCalendly} 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 h-14 shadow-[0_0_40px_-10px_rgba(220,38,38,0.6)] rounded-full border border-red-500/50"
              >
                <Terminal className="mr-2 w-5 h-5" /> Start Security Audit
              </Button>
            </motion.div>

            <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate(-1)} 
                className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-14 rounded-full px-8 text-lg"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> Back to HQ
            </Button>
          </div>
        </div>
      </div>

      {/* --- PRICING SECTION --- */}
      <div className="py-24 border-y border-slate-900 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-mono uppercase tracking-tight">Strategic Defense <span className="text-red-600">Plans</span></h2>
            <p className="text-slate-400">Choose the level of clearance required for your security architecture.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative rounded-xl p-8 border flex flex-col ${plan.recommended ? 'border-red-500 bg-red-950/10 shadow-[0_0_30px_rgba(220,38,38,0.1)]' : 'border-slate-800 bg-slate-900/50'}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-lg">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2 font-mono uppercase">{plan.name}</h3>
                <div className="text-3xl font-bold text-red-500 mb-4">{plan.price}</div>
                <p className="text-slate-400 text-sm mb-6 border-b border-slate-800 pb-6">{plan.desc}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-mono">
                      <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button onClick={handleCalendly} className={`w-full rounded-sm font-bold tracking-wide uppercase ${plan.recommended ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  Deploy
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- ELITE OPERATORS --- */}
      <div className="py-32 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-mono uppercase">Elite <span className="text-red-600">Operators</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto">Hover over an agent's card to reveal their classified profile.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {testers.map((tester, i) => (
              <HunterCard key={tester.id} tester={tester} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* --- SCROLLING TESTIMONIALS --- */}
      <div className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-4 mb-12 text-center">
            <h2 className="text-3xl font-bold font-mono uppercase flex items-center justify-center gap-3">
                <Server className="text-red-500" /> Mission Reports
            </h2>
        </div>
        <InfiniteTestimonials direction="normal" />
        <InfiniteTestimonials direction="reverse" />
      </div>

      {/* --- ADVANCED FAQ SECTION --- */}
      <div className="py-32 container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3 font-mono uppercase">
            <Activity className="text-red-500 animate-pulse" /> System Protocols
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-mono">
            // DECRYPTING COMMON QUERIES...
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AdvancedFAQItem 
              key={index} 
              faq={faq} 
              index={index} 
              isOpen={activeAccordion === index}
              toggle={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>
      
      {/* --- FOOTER CTA --- */}
      <div className="container mx-auto px-4 py-24 text-center border-t border-slate-800 bg-gradient-to-b from-slate-950 to-red-950/10">
        <h2 className="text-4xl font-bold mb-8 uppercase tracking-tight">Ready to Secure Your Future?</h2>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="inline-block"
        >
          <Button 
            onClick={handleCalendly} 
            size="xl" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-8 text-xl rounded-full shadow-[0_0_50px_-10px_rgba(220,38,38,0.8)] border border-red-400"
          >
              <Siren className="mr-3 w-6 h-6 animate-pulse" /> Get Free Consultation
          </Button>
        </motion.div>
        <div className="mt-8 text-slate-500 font-mono text-xs flex justify-center gap-6">
            <span className="flex items-center gap-2"><Check className="w-3 h-3 text-red-500" /> ENCRYPTED COMM CHANNEL</span>
            <span className="flex items-center gap-2"><Check className="w-3 h-3 text-red-500" /> 24/7 RESPONSE UNIT</span>
        </div>
      </div>
    </div>
  );
}