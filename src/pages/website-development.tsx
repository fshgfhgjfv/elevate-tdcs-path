import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Shield, 
  Zap, 
  Globe, 
  Lock, 
  Server, 
  Smartphone,
  CheckCircle2,
  Star,
  ArrowRight,
  Calendar,
  Cpu,
  Fingerprint,
  Briefcase
} from "lucide-react";

// --- 1. SPECIAL COMPONENTS ---

// A. Spotlight Card (With Image Support)
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
      className={`group relative border border-white/10 bg-gray-900/80 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
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

// B. The "Heartbeat" Calendly Button (Blinks & Zooms)
const CalendlyButton = () => (
  <motion.a
    href="https://calendly.com/" // REPLACE WITH YOUR LINK
    target="_blank"
    rel="noopener noreferrer"
    animate={{ 
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0 0px rgba(99, 102, 241, 0.4)",
        "0 0 0 10px rgba(99, 102, 241, 0)",
        "0 0 0 0px rgba(99, 102, 241, 0)"
      ]
    }}
    transition={{ 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className="relative inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-full text-lg z-50 transition-colors"
  >
    <Calendar className="w-5 h-5" />
    Book Priority Audit
  </motion.a>
);

// --- DATA ---

const services = [
  {
    title: "Cyber Defense",
    price: "₹1,999/mo",
    desc: "Military-grade encryption, 24/7 active threat monitoring, and automated firewall management to keep your perimeter secure.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    features: ["DDoS Protection", "Real-time Alerts", "Malware Removal"],
    icon: <Shield className="w-6 h-6 text-emerald-400" />
  },
  {
    title: "Offensive Security",
    price: "₹2,999/scan",
    desc: "Ethical hacking simulations to find vulnerabilities in your logic before malicious actors do. Comprehensive reporting included.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    features: ["Penetration Testing", "Vulnerability Assessment", "Code Audit"],
    icon: <Lock className="w-6 h-6 text-red-400" />
  },
  {
    title: "Full-Stack Dev",
    price: "₹4,999/project",
    desc: "High-performance React/Next.js applications optimized for speed, SEO, and scalability on global edge networks.",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800",
    features: ["Custom UI/UX", "Database Design", "API Integration"],
    icon: <Cpu className="w-6 h-6 text-blue-400" />
  }
];

const customServices = [
  { name: "Blockchain Integration", icon: <Fingerprint /> },
  { name: "Legacy Migration", icon: <Server /> },
  { name: "Mobile App Security", icon: <Smartphone /> },
  { name: "Cloud Architecture", icon: <Globe /> },
];

const faqs = [
  { q: "How long does a typical security audit take?", a: "A standard offensive security scan takes 3-5 days, while full-scale penetration testing can take 2 weeks depending on system complexity." },
  { q: "Do you offer post-development support?", a: "Yes, all our development packages come with 30 days of free support. We also offer monthly retainers for ongoing maintenance." },
  { q: "Can you fix a hacked website?", a: "Absolutely. Our Cyber Defense team specializes in disaster recovery and malware removal. We can usually restore sites within 24 hours." },
  { q: "What stack do you use for development?", a: "We primarily use the MERN stack (MongoDB, Express, React, Node.js) and Next.js for frontend, deployed on Vercel or AWS." },
  { q: "How is the pricing determined for custom jobs?", a: "Custom jobs are billed based on hourly engineering effort. Book a call with us to get a precise quote." },
  { q: "Is my data safe during the testing?", a: "We sign strict NDAs before any work begins. All testing is done in a controlled sandbox environment to prevent data loss." },
];

export default function EnhancedLanding() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50" />

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 container mx-auto px-6 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Systems Operational
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600">
          TDCS.TECH
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          The convergence of aesthetic engineering and military-grade cybersecurity. 
          <span className="text-indigo-400"> We build it. We break it. We secure it.</span>
        </p>

        <div className="flex flex-col items-center gap-6">
          <CalendlyButton />
          <p className="text-sm text-gray-500">Limited slots available for this month</p>
        </div>
      </section>

      {/* --- SERVICES WITH IMAGES --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
           <div>
             <h2 className="text-4xl font-bold mb-2">Primary Modules</h2>
             <p className="text-gray-400">Choose your deployment package.</p>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <SpotlightCard key={i} className="rounded-3xl h-[500px] group cursor-default">
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 mb-6">
                  {s.icon}
                </div>
                
                <h3 className="text-3xl font-bold mb-2">{s.title}</h3>
                <p className="text-indigo-400 font-mono text-lg mb-4">{s.price}</p>
                <p className="text-gray-300 mb-6 line-clamp-3 group-hover:line-clamp-none transition-all">
                  {s.desc}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {s.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500" /> {f}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md">
                  View Details
                </Button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* --- CUSTOM SOLUTIONS (New Section) --- */}
      <section className="bg-gray-900/30 border-y border-white/5 py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-xs font-bold mb-4">
                 BESPOKE DEVELOPMENT
               </div>
               <h2 className="text-4xl md:text-5xl font-bold mb-6">Need something custom?</h2>
               <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                 Standard packages don't fit? We engineer tailored solutions for enterprise clients. 
                 From blockchain architectures to legacy system migrations, our engineering team handles complexity.
               </p>
               <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 h-12 px-6">
                 Request Custom Quote <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {customServices.map((cs, i) => (
                <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:border-purple-500/30 transition-colors">
                  <div className="mb-4 text-purple-400 p-3 bg-purple-500/10 rounded-full">
                    {cs.icon}
                  </div>
                  <span className="font-semibold text-sm">{cs.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- APPLY / CAREERS (New Section) --- */}
      <section className="container mx-auto px-6 py-20">
         <div className="rounded-3xl bg-gradient-to-r from-indigo-900/40 to-black border border-indigo-500/20 p-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Briefcase className="text-indigo-400"/> Join the Elite
                </h2>
                <p className="text-gray-400 max-w-lg">
                  Are you a white-hat hacker or a React wizard? We are expanding our remote team. 
                  High equity, competitive salary, and classified projects.
                </p>
              </div>
              <div className="flex gap-4">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Apply Now
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  View Openings
                </Button>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 blur-[80px]" />
         </div>
      </section>

      {/* --- EXTENDED FAQ --- */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Directives & Protocols</h2>
          <p className="text-gray-500">Frequently asked questions about our operations.</p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 bg-white/5 rounded-xl px-4 data-[state=open]:border-indigo-500/50 transition-all">
              <AccordionTrigger className="hover:no-underline py-6 text-lg font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6 text-base leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="border-t border-white/10 bg-black pt-20 pb-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to secure your future?</h2>
          <div className="flex justify-center mb-12">
            <CalendlyButton />
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-left text-sm text-gray-500 border-t border-white/5 pt-10">
             <div>
               <h4 className="text-white font-bold mb-4">TDCS.TECH</h4>
               <p>Jagatpur, Odisha, India</p>
               <p>Reg: TDCS Technologies Pvt Ltd</p>
             </div>
             <div>
               <h4 className="text-white font-bold mb-4">Services</h4>
               <ul className="space-y-2">
                 <li><a href="#" className="hover:text-indigo-400">Cyber Defense</a></li>
                 <li><a href="#" className="hover:text-indigo-400">Penetration Testing</a></li>
                 <li><a href="#" className="hover:text-indigo-400">Web Development</a></li>
               </ul>
             </div>
             <div>
               <h4 className="text-white font-bold mb-4">Company</h4>
               <ul className="space-y-2">
                 <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
                 <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
                 <li><a href="#" className="hover:text-indigo-400">Legal</a></li>
               </ul>
             </div>
             <div>
               <h4 className="text-white font-bold mb-4">Connect</h4>
               <div className="flex gap-4">
                 <Globe className="w-5 h-5 hover:text-white cursor-pointer" />
                 <CheckCircle2 className="w-5 h-5 hover:text-white cursor-pointer" />
               </div>
             </div>
          </div>
          <p className="mt-12 text-xs text-gray-700">© 2025 TDCS Technologies. All Systems Operational.</p>
        </div>
      </footer>

    </div>
  );
}