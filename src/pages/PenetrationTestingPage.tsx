import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ShieldAlert, Terminal, Lock, FileWarning, 
  CheckCircle, Server, User, Star, Code, ChevronDown, 
  Cpu, Crosshair, Quote
} from "lucide-react";

// --- DATA: TESTERS ---
// NOTE: Replace the 'image' URLs with your actual image hosted URLs.
const testers = [
  {
    id: 1,
    name: "Rudra Narayan",
    role: "Lead Penetration Tester",
    // REPLACE WITH YOUR REAL IMAGE URL
    image: "https://placehold.co/400x500/1e293b/ef4444?text=Rudra+Img", 
    specialty: "Network Infrastructure & Cloud Security",
    certs: ["OSCP", "CEH", "CISSP"],
    bio: "Expert in simulating advanced persistent threats (APT). Has uncovered critical vulnerabilities in Fortune 500 networks.",
    stats: { bugs: "500+", criticals: "120+" }
  },
  {
    id: 2,
    name: "Aisha Verma", 
    role: "Senior Security Researcher",
     // REPLACE WITH REAL IMAGE URL
    image: "https://placehold.co/400x500/1e293b/eab308?text=Aisha+Img",
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
    text: "We thought we were secure until the team ran their audit. Found a critical gateway flaw in 48 hours. Lifesavers.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    company: "HealthVault Cloud",
    text: "Professional and thorough. The report actually told us how to fix the issues step-by-step.",
    rating: 5
  },
  {
    name: "Amit Patel",
    company: "E-Com Express",
    text: "Knowing exactly who is testing our systems gave us immense confidence. Stellar work.",
    rating: 5
  },
    {
    name: "David L.",
    company: "SaaSify.io",
    text: "Their mobile app pentest revealed API vulnerabilities we completely missed internally. Worth every penny.",
    rating: 5
  },
];

// Duplicate testimonials for seamless looping
const duplicatedTestimonials = [...testimonials, ...testimonials];


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

// --- SUB-COMPONENT: ROBUST CSS FLIP CARD ---
// Uses CSS group-hover for a cleaner, non-mirroring flip
const TesterCard = ({ tester }) => {
  return (
    // Outer container defines dimensions and perspective
    <div className="w-full h-[450px] bg-transparent cursor-pointer group perspective-1000">
       {/* Inner container holds the 3D transform state */}
      <div className="relative w-full h-full text-center transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 shadow-2xl rounded-xl">
        
        {/* --- FRONT SIDE --- */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-slate-900 border border-slate-800 rounded-xl overflow-hidden z-20">
          <div className="h-3/4 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
             {/* Ensure object-cover is used for proper image sizing */}
             <img src={tester.image} alt={tester.name} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="h-1/4 p-4 flex flex-col justify-center relative z-20 bg-slate-900/80 backdrop-blur-md absolute bottom-0 w-full text-left border-t border-slate-800">
            <h3 className="text-xl font-bold text-white">{tester.name}</h3>
            <p className="text-red-400 font-mono text-xs mb-2">{tester.role}</p>
             <div className="flex flex-wrap gap-1">
              {tester.certs.map(c => (
                <Badge key={c} variant="outline" className="text-[10px] border-slate-600 text-slate-400 px-1 py-0">{c}</Badge>
              ))}
            </div>
          </div>
           <div className="absolute top-4 right-4 bg-red-600/80 backdrop-blur rounded-full p-2 z-30">
              <Crosshair className="w-5 h-5 text-white" />
            </div>
        </div>

        {/* --- BACK SIDE --- */}
        {/* Key: rotate-y-180 initially, solid background color, and backface-hidden */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-slate-950 border border-red-500/50 rounded-xl p-8 flex flex-col justify-center items-center shadow-[inset_0_0_30px_rgba(239,68,68,0.2)] z-10">
          <User className="w-12 h-12 text-red-500 mb-4 animate-pulse" />
          <h3 className="text-lg font-bold text-white mb-2">{tester.specialty}</h3>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">{tester.bio}</p>
          
          <div className="grid grid-cols-2 gap-4 w-full font-mono">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <div className="text-xl font-bold text-white">{tester.stats.bugs}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Vulnerabilities</div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <div className="text-xl font-bold text-red-500">{tester.stats.criticals}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Criticals</div>
            </div>
          </div>
        </div>
      </div>
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
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-red-500/30 overflow-x-hidden">
      
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

       {/* --- MEET THE HUNTERS (FIXED FLIP CARDS) --- */}
       <div className="bg-slate-900/30 py-24 border-b border-slate-800 relative">
         {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elite <span className="text-red-500">Operators</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto">Our lead penetration testers are certified experts in simulating real-world attacks. Hover to view clearance details.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {testers.map(tester => (
              <TesterCard key={tester.id} tester={tester} />
            ))}
          </div>
        </div>
      </div>

      {/* --- CONTINUOUS SCROLLING TESTIMONIALS --- */}
      <div className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 mb-12 text-center">
           <h2 className="text-3xl font-bold">Mission Reports</h2>
           <p className="text-slate-400 mt-2">What clients say after the smoke clears.</p>
        </div>
        
        {/* Gradient Masks for smooth fade effect on edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>

        {/* Scroller Container */}
        <div className="flex overflow-hidden">
          {/* Animated Track */}
          <motion.div 
            className="flex gap-6 flex-nowrap"
            // Animate from 0% to -50% because the content is doubled. 
            // When it reaches -50%, it instantly resets to 0% (which looks identical), creating a perfect loop.
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              ease: "linear", 
              duration: 25, // Adjust speed here (higher = slower)
              repeat: Infinity 
            }}
          >
            {duplicatedTestimonials.map((t, i) => (
              <div 
                key={i}
                className="w-[350px] md:w-[400px] flex-shrink-0 bg-slate-900/60 border border-slate-800 p-6 rounded-xl relative backdrop-blur-sm"
              >
                <Quote className="absolute top-4 right-4 text-slate-800 w-10 h-10" />
                <div className="flex gap-1 text-red-500 mb-4">
                  {[...Array(t.rating)].map((_, r) => <Star key={r} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-sm mb-6 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-slate-800/50 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center font-bold text-slate-400 border border-slate-700">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>


      {/* --- MIND BLOWING FAQ --- */}
      <div className="py-24 bg-slate-900/50 relative overflow-hidden border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Cpu className="text-red-500" /> System Protocols (FAQ)
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-slate-800 rounded-lg bg-slate-900/80 backdrop-blur-sm overflow-hidden hover:border-red-500/30 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full text-left p-4 flex justify-between items-center transition-all ${activeAccordion === index ? 'bg-red-950/30 text-red-100' : 'text-slate-200 hover:bg-slate-800'}`}
                >
                  <span className="font-mono font-bold flex gap-3 items-center flex-1">
                    <span className="text-red-600/70 text-xs">0{index + 1}_</span>
                    {faq.q}
                  </span>
                  <ChevronDown className={`text-slate-500 transition-transform duration-300 ${activeAccordion === index ? 'rotate-180 text-red-500' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-red-900/20"
                    >
                      <div className="p-4 text-slate-300 font-mono text-sm leading-relaxed bg-black/30 shadow-inner">
                        <span className="text-green-500 mr-2 font-bold">{">"}</span>
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
      
      {/* --- FOOTER CTA --- */}
      <div className="container mx-auto px-4 py-24 text-center border-t border-slate-800">
        <h2 className="text-4xl font-bold mb-6">Secure Your Assets Now</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">Don't wait for a breach to take action. Schedule your comprehensive security assessment today.</p>
        <Button onClick={handleCalendly} size="xl" className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all hover:scale-105">
            <Terminal className="mr-2 w-5 h-5" /> Get Free Consultation
        </Button>
      </div>
    </div>
  );
}