import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ShieldAlert, Terminal, Lock, FileWarning, 
  CheckCircle, Server, User, Star, Code, ChevronDown, 
  Cpu, Crosshair 
} from "lucide-react";

// --- DATA: TESTERS ---
const testers = [
  {
    id: 1,
    name: "Rudra Narayan",
    role: "Lead Penetration Tester",
    image: "/api/placeholder/400/400", // Replace with real image
    specialty: "Network Infrastructure & Cloud Security",
    certs: ["OSCP", "CEH", "CISSP"],
    bio: "Expert in simulating advanced persistent threats (APT). Has uncovered critical vulnerabilities in Fortune 500 networks.",
    stats: { bugs: "500+", criticals: "120+" }
  },
  {
    id: 2,
    name: "Aisha Verma", // Example Name
    role: "Senior Security Researcher",
    image: "/api/placeholder/400/400", // Replace with real image
    specialty: "Web App & Mobile Security",
    certs: ["OSEP", "Burp Suite Certified"],
    bio: "Specializes in logic flaws and zero-day exploits in SaaS platforms. A master of bypassing WAFs.",
    stats: { bugs: "350+", criticals: "90+" }
  }
];

// --- DATA: TESTIMONIALS ---
const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "FinTech Solutions Pvt Ltd",
    text: "We thought we were secure until TDCS ran their audit. They found a critical payment gateway flaw in 48 hours. Absolute lifesavers.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    company: "HealthVault Cloud",
    text: "Professional, stealthy, and thorough. The report wasn't just technical jargon; it actually told us how to fix the issues step-by-step.",
    rating: 5
  },
  {
    name: "Amit Patel",
    company: "E-Com Express",
    text: "The flip-card team transparency gave us confidence. Knowing exactly who is testing our systems made a huge difference.",
    rating: 5
  }
];

// --- DATA: FAQ ---
const faqs = [
  {
    q: "Will penetration testing take my site offline?",
    a: "NEGATIVE. We perform non-destructive testing standard. However, during stress testing (DoS simulation), we coordinate strictly with your IT team to ensure zero downtime for users."
  },
  {
    q: "How long does a typical audit take?",
    a: "VARIABLE. Small web apps take 3-5 days. Complex enterprise networks can take 2-3 weeks. We provide a timeline estimate after the initial reconnaissance phase."
  },
  {
    q: "Do you provide a fix for the bugs found?",
    a: "AFFIRMATIVE. We don't just break things. Our final report includes code-level remediation guides, configuration patches, and a re-test period to verify your fixes."
  },
  {
    q: "Is my data safe with you?",
    a: "ENCRYPTED. We operate under a strict NDA. All findings are stored on air-gapped servers and deleted 30 days after project completion."
  }
];

// --- SUB-COMPONENT: FLIP CARD ---
const TesterCard = ({ tester }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-[450px] cursor-pointer perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="h-2/3 bg-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
            <img src={tester.image} alt={tester.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="h-1/3 p-6 flex flex-col justify-center relative z-20">
            <h3 className="text-2xl font-bold text-white">{tester.name}</h3>
            <p className="text-red-400 font-mono text-sm">{tester.role}</p>
            <div className="mt-3 flex gap-2">
              {tester.certs.map(c => (
                <Badge key={c} variant="outline" className="text-[10px] border-slate-600 text-slate-400">{c}</Badge>
              ))}
            </div>
            <div className="absolute top-[-20px] right-6 bg-red-600 rounded-full p-2">
              <Crosshair className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* BACK */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden border border-red-500/50 bg-slate-950 p-8 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(239,68,68,0.2)]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <User className="w-12 h-12 text-red-500 mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-white mb-2">{tester.specialty}</h3>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">{tester.bio}</p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <div className="text-2xl font-bold text-white">{tester.stats.bugs}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Bugs Found</div>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <div className="text-2xl font-bold text-red-500">{tester.stats.criticals}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Criticals</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function PenetrationTestingPage() {
  const navigate = useNavigate();
  
  const handleCalendly = () => {
    window.open("https://calendly.com/rudranarayanswain/30min", "_blank");
  };

  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const vulnerabilities = [
    "SQL Injection & XSS", "Broken Authentication", "Sensitive Data Exposure", "Misconfiguration", "Outdated Components"
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-red-500/30">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-slate-950 to-slate-950 z-0" />
        
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm mb-6"
          >
            <ShieldAlert className="w-4 h-4" /> Cyber Defense Unit
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Penetration <span className="text-red-500 text-shadow-glow">Testing</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            We simulate sophisticated cyberattacks on your infrastructure to find vulnerabilities before real hackers do. OWASP Standard VAPT.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleCalendly} size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all hover:scale-105">
              Start Security Audit
            </Button>
            <Button variant="outline" size="lg" onClick={handleCalendly} className="border-slate-700 text-slate-300 hover:bg-slate-900 hover:text-white">
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* --- TERMINAL / PROCESS SECTION --- */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold border-l-4 border-red-500 pl-4">
              How We Breach (Ethically)
            </h2>
            <div className="space-y-6">
              {[
                { title: "Reconnaissance", desc: "Gathering intel: IP addresses, employee emails, tech stack." },
                { title: "Scanning", desc: "Using automated tools to find open ports and weak endpoints." },
                { title: "Exploitation", desc: "Manual attempts to inject payloads (SQLi, XSS) to gain access." },
                { title: "Reporting", desc: "Detailed PDF report with proof-of-concept and fix guides." }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 font-bold shrink-0 border border-red-500/20">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-200">{step.title}</h4>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mock Terminal UI */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
            <div className="bg-slate-900 px-4 py-2 flex gap-2 items-center border-b border-slate-800 relative z-10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-slate-400 font-mono">root@kali-linux:~</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2 relative z-10 h-[300px] overflow-y-auto custom-scrollbar">
              <div className="text-green-400">$ nmap -sC -sV target-site.com</div>
              <div className="text-slate-300">Starting Nmap 7.92...</div>
              <div className="text-slate-300">Scanning ports...</div>
              <div className="text-yellow-400">DISCOVERED: Port 80/tcp (http) - VULNERABLE</div>
              <div className="text-yellow-400">DISCOVERED: Port 22/tcp (ssh) - WEAK CRYPTO</div>
              <div className="text-green-400 animate-pulse">$ initiating exploit_module_7...</div>
              <div className="text-slate-500">Payload injected. Access granted.</div>
              <div className="text-red-500 font-bold">ROOT SHELL ACQUIRED #</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- MEET THE HUNTERS (FLIP CARDS) --- */}
      <div className="bg-slate-900/50 py-20 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elite <span className="text-red-500">Operators</span></h2>
            <p className="text-slate-400">Hover over the cards to reveal agent clearance details.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testers.map(tester => (
              <TesterCard key={tester.id} tester={tester} />
            ))}
          </div>
        </div>
      </div>

      {/* --- TESTIMONIALS --- */}
      <div className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Mission Reports</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative"
            >
              <div className="absolute top-[-10px] left-6">
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-full text-yellow-500 flex gap-1">
                  {[...Array(t.rating)].map((_, r) => <Star key={r} size={12} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-6 mt-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 border-t border-slate-800 pt-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MIND BLOWING FAQ --- */}
      <div className="py-20 bg-slate-950 relative overflow-hidden">
        {/* Matrix background effect hint */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Cpu className="text-red-500" /> System Protocols (FAQ)
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-slate-800 rounded-lg bg-slate-900/80 backdrop-blur-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full text-left p-4 flex justify-between items-center transition-colors ${activeAccordion === index ? 'bg-red-900/20 text-red-400' : 'text-slate-200 hover:bg-slate-800'}`}
                >
                  <span className="font-mono font-bold flex gap-3 items-center">
                    <span className="text-slate-500 text-xs">0{index + 1} //</span>
                    {faq.q}
                  </span>
                  <ChevronDown className={`transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-red-900/30"
                    >
                      <div className="p-4 text-slate-400 font-mono text-sm leading-relaxed bg-slate-950/50">
                        <span className="text-green-500 mr-2">{">"}</span>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- TARGET VECTORS --- */}
      <div className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Target Scope</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-950 border-red-900/30 hover:border-red-500/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Server className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="font-bold text-lg mb-2 text-white">Network Infrastructure</h3>
                <p className="text-slate-400 text-sm">Firewalls, routers, and server misconfigurations.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-950 border-red-900/30 hover:border-red-500/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Lock className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="font-bold text-lg mb-2 text-white">Web Applications</h3>
                <p className="text-slate-400 text-sm">OWASP Top 10: Injections, Broken Auth, XSS.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-950 border-red-900/30 hover:border-red-500/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <FileWarning className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="font-bold text-lg mb-2 text-white">Mobile Apps</h3>
                <p className="text-slate-400 text-sm">Decompiling APKS, API security, and local storage.</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
             {vulnerabilities.map(v => (
               <Badge key={v} variant="outline" className="border-red-500/40 text-red-300 px-3 py-1 bg-red-950/10">
                 <CheckCircle className="w-3 h-3 mr-1" /> {v}
               </Badge>
             ))}
          </div>
        </div>
      </div>

      {/* --- PRICING CTA --- */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Secure Your Assets Now</h2>
        <p className="text-slate-400 mb-8">Vulnerability Assessments starting at <span className="text-white font-bold text-xl">₹2,999</span></p>
        <Button onClick={handleCalendly} size="xl" className="bg-white text-slate-950 hover:bg-gray-200 font-bold px-8 py-6 text-lg rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:scale-105">
            <Terminal className="mr-2 w-5 h-5" /> Get Free Consultation
        </Button>
      </div>
    </div>
  );
}