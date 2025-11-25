import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ShieldAlert, Terminal, Lock, FileWarning, 
  CheckCircle, Server, User, Star, Code, ChevronDown, 
  Cpu, Crosshair, Quote, Check
} from "lucide-react";

// --- DATA: TESTERS ---
const testers = [
  {
    id: 1,
    name: "Rudra Narayan",
    role: "Senior Penetration Tester", // Updated Role
    // Updated Image
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEh-jgwTQ5FLXjpgEyZC5KPC0L9QkHlNAGMsuc_1GVpFzUrxBJJamCvkj716z2BaVYYryPyJjctPxHvlyDbdR9_P7C1vilIjcUwJvhXCEsDjR6PeaSbzAUugjGWvqd74zS8pPvD4_A4XaPNN4JpBN9U5et8vhWx13FjTjyNWJ1L-sNkSmmPVX-dqEF8pZ2qE", 
    specialty: "Network Infrastructure & Cloud Security",
    certs: ["OSCP", "CEH", "CISSP"],
    bio: "Lead operator for TDCS Technologies. Expert in simulating advanced persistent threats (APT) and Red Teaming. Has secured critical infrastructure for enterprise clients.",
    stats: { bugs: "500+", criticals: "120+" }
  },
  {
    id: 2,
    name: "Aisha Verma", 
    role: "Security Researcher",
    // Placeholder for second card
    image: "https://placehold.co/400x500/1e293b/eab308?text=Aisha+Img",
    specialty: "Web App & Mobile Security",
    certs: ["OSEP", "Burp Suite Certified"],
    bio: "Specializes in logic flaws and zero-day exploits in SaaS platforms. A master of bypassing WAFs and API security testing.",
    stats: { bugs: "350+", criticals: "90+" }
  }
];

// --- DATA: PRICING PLANS ---
const plans = [
  {
    name: "Basic Audit",
    price: "₹14,999",
    desc: "Essential vulnerability scanning for small websites.",
    features: [
      "Automated Vulnerability Scan",
      "Basic Manual Verification",
      "OWASP Top 10 Check",
      "PDF Summary Report",
      "Email Support"
    ],
    recommended: false
  },
  {
    name: "Pro Penetration",
    price: "₹29,999",
    desc: "Deep manual testing for business-critical applications.",
    features: [
      "Everything in Basic",
      "Deep Manual Exploitation",
      "Business Logic Error Testing",
      "API Security Testing",
      "Detailed PoC & Remediation",
      "1 Re-test Free"
    ],
    recommended: true
  },
  {
    name: "Black Hat Simulation",
    price: "Custom",
    desc: "Full-scale Red Team attack on all infrastructure.",
    features: [
      "Full Red Team Operation",
      "Social Engineering (Phishing)",
      "Network & Cloud Penetration",
      "DoS Stress Testing",
      "Executive Presentation",
      "24/7 Priority Support"
    ],
    recommended: false
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
  }
];

// --- SUB-COMPONENT: CLICK FLIP CARD ---
const TesterCard = ({ tester }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-[500px] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="h-3/4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
            <img src={tester.image} alt={tester.name} className="w-full h-full object-cover" />
            
            {/* Click Hint */}
            <div className="absolute top-4 right-4 z-30 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs text-white border border-white/20">
              Click to View Profile
            </div>
          </div>
          <div className="h-1/4 p-6 flex flex-col justify-center relative z-20 bg-slate-900 border-t border-slate-800">
            <h3 className="text-2xl font-bold text-white">{tester.name}</h3>
            <p className="text-red-500 font-mono text-sm">{tester.role}</p>
          </div>
        </div>

        {/* BACK */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden border border-red-500/50 bg-slate-950 p-8 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(239,68,68,0.2)]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <User className="w-16 h-16 text-red-500 mb-6 animate-pulse" />
          <h3 className="text-2xl font-bold text-white mb-2">{tester.name}</h3>
          <h4 className="text-red-400 text-sm font-mono mb-6">{tester.specialty}</h4>
          
          <p className="text-slate-300 text-sm mb-8 leading-relaxed">"{tester.bio}"</p>
          
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
          <p className="mt-6 text-xs text-slate-500">(Click again to flip back)</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function PenetrationTestingPage() {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const handleCalendly = () => {
    window.open("https://calendly.com/rudranarayanswain/30min", "_blank");
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

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
            Identify vulnerabilities before they are exploited. Professional VAPT services for Web, Mobile, and Cloud.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* ZOOMING BUTTONS */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Button onClick={handleCalendly} size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                Start Security Audit
              </Button>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
            >
              <Button variant="outline" size="lg" onClick={handleCalendly} className="border-slate-700 text-slate-300 hover:bg-slate-900 hover:text-white text-lg">
                Get Free Consultation
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- PRICING / PLANS SECTION --- */}
      <div className="py-20 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Strategic Defense <span className="text-red-500">Plans</span></h2>
            <p className="text-slate-400">Choose the level of depth required for your security architecture.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative rounded-2xl p-8 border ${plan.recommended ? 'border-red-500 bg-red-950/10 shadow-[0_0_30px_rgba(239,68,68,0.15)]' : 'border-slate-800 bg-slate-950'} flex flex-col`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-red-400 mb-4">{plan.price}</div>
                <p className="text-slate-400 text-sm mb-6">{plan.desc}</p>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="w-5 h-5 text-red-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button onClick={handleCalendly} className={`w-full ${plan.recommended ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  Choose Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MEET THE HUNTERS (CLICK TO FLIP) --- */}
      <div className="bg-slate-950 py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elite <span className="text-red-500">Operators</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto">Click on an agent's card to reveal their classified profile and clearance level.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {testers.map(tester => (
              <TesterCard key={tester.id} tester={tester} />
            ))}
          </div>
        </div>
      </div>

      {/* --- SCROLLING TESTIMONIALS --- */}
      <div className="py-24 bg-slate-900/20 relative overflow-hidden border-t border-slate-800">
        <div className="container mx-auto px-4 mb-12 text-center">
           <h2 className="text-3xl font-bold">Mission Reports</h2>
        </div>
        
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>

        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-6 flex-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {duplicatedTestimonials.map((t, i) => (
              <div key={i} className="w-[350px] md:w-[400px] flex-shrink-0 bg-slate-900 border border-slate-800 p-6 rounded-xl relative">
                <div className="flex gap-1 text-red-500 mb-4">
                  {[...Array(t.rating)].map((_, r) => <Star key={r} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-sm mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-slate-800 pt-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-500 border border-slate-700">
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

      {/* --- FAQ --- */}
      <div className="py-24 container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <Cpu className="text-red-500" /> System Protocols (FAQ)
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-800 rounded-lg bg-slate-900/50">
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full text-left p-4 flex justify-between items-center transition-all ${activeAccordion === index ? 'text-red-400' : 'text-slate-200'}`}
              >
                <span className="font-mono font-bold flex gap-3 items-center">
                  <span className="text-slate-500 text-xs">0{index + 1}_</span>
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
                    className="border-t border-slate-800"
                  >
                    <div className="p-4 text-slate-400 font-mono text-sm leading-relaxed bg-black/20">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      {/* --- FOOTER CTA --- */}
      <div className="container mx-auto px-4 py-24 text-center border-t border-slate-800">
        <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Future?</h2>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="inline-block"
        >
          <Button onClick={handleCalendly} size="xl" className="bg-white text-slate-950 hover:bg-gray-200 font-bold px-10 py-6 text-lg rounded-full">
              <Terminal className="mr-2 w-5 h-5" /> Get Free Consultation
          </Button>
        </motion.div>
      </div>
    </div>
  );
}