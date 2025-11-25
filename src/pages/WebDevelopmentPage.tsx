import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Check, ChevronDown, Code, Cpu, 
  Layers, Zap, Star, ExternalLink, Terminal, X, User 
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
`;

// --- UTILITY COMPONENT: BACKGROUND GRID ---
const BackgroundGrid = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]" />
    <style>{marqueeStyle}</style>
  </div>
);

// --- COMPONENT: SPOTLIGHT PROJECT CARD ---
const SpotlightCard = ({ project, index }: { project: any, index: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative group rounded-2xl overflow-hidden bg-[#121214] border border-white/10"
    >
      <div
        className="pointer-events-none absolute -inset-px transition opacity-0 duration-300 group-hover:opacity-100 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.15), transparent 40%)`,
        }}
      />
      <div className="h-56 overflow-hidden relative z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] to-transparent z-10 opacity-60" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        <div className="absolute top-3 left-3 z-20">
           <Badge variant="secondary" className="bg-black/50 backdrop-blur-md border border-white/10 text-white">
             {project.category}
           </Badge>
        </div>
      </div>
      <div className="p-6 relative z-20">
        <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        </div>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.map((tech: string) => (
            <span key={tech} className="text-[10px] uppercase tracking-wider font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENT: DEVELOPER CARD (SLIDE FROM LEFT) ---
// UPDATED: No 3D flip. Simple hover slide effect.
const DeveloperCard = ({ dev, index }: { dev: any, index: number }) => {
  return (
    <div className="group relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#121214] shadow-lg">
      
      {/* --- DEFAULT VIEW (Image & Name) --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 group-hover:scale-95 group-hover:opacity-30">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-xl">
             <img src={dev.image} alt={dev.name} className="w-full h-full object-cover rounded-full border-4 border-[#121214]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{dev.name}</h3>
          <p className="text-indigo-400 font-medium tracking-wide">{dev.role}</p>
          
          {/* Decorative Icons */}
          <div className="mt-8 flex gap-4 opacity-50">
             <Code className="w-5 h-5 text-gray-400" />
             <Cpu className="w-5 h-5 text-gray-400" />
          </div>
      </div>

      {/* --- HOVER OVERLAY (Slides in from Left) --- */}
      <div className="absolute inset-0 bg-[#0c0c0e]/95 backdrop-blur-md p-8 flex flex-col justify-center text-center transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0 border-r border-indigo-500/30">
         <div className="relative z-10">
           <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
             <User className="w-6 h-6" />
           </div>
           
           <h3 className="text-xl font-bold text-white mb-2">{dev.name}</h3>
           <div className="h-px w-10 bg-indigo-500 mx-auto mb-4" />
           
           <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Core Competencies</h4>
           <p className="text-gray-300 text-sm mb-6 leading-relaxed italic">
             "{dev.bio}"
           </p>
           
           <div className="flex flex-wrap justify-center gap-2">
            {dev.skills.map((skill: string) => (
              <span key={skill} className="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full text-xs text-indigo-300 border border-white/10">
                {skill}
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
        { name: "John D.", company: "TechFlow", text: "They completely transformed our backend architecture." },
        { name: "Sarah M.", company: "EcoLabs", text: "The 3D visualizations doubled our conversion rate." },
        { name: "Mike R.", company: "FinServe", text: "Security was our top concern, and they delivered flawlessly." },
        { name: "Emily W.", company: "Artsy", text: "A truly creative team that understands modern UX." },
        { name: "David K.", company: "BuildIt", text: "Scalable code that has saved us thousands in server costs." },
    ];
    
    const extendedReviews = [...reviews, ...reviews, ...reviews];

    return (
        <div className="relative flex overflow-x-hidden group mb-6">
            <div className={`flex gap-6 ${direction === 'reverse' ? 'animate-scroll-reverse' : 'animate-scroll'}`}>
                {extendedReviews.map((review, i) => (
                    <div key={i} className="w-[350px] bg-[#151518] border border-gray-800 p-6 rounded-xl flex-shrink-0 hover:border-indigo-500/50 transition-colors">
                        <div className="flex gap-1 mb-3">
                            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                        </div>
                        <p className="text-gray-300 text-sm mb-4">"{review.text}"</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs">{review.name[0]}</div>
                            <div>
                                <p className="text-sm font-bold">{review.name}</p>
                                <p className="text-xs text-gray-500">{review.company}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
        </div>
    );
};

// --- DATA: QUOTES ---
const webDevQuotes = [
  "Websites promote you 24/7: No employee will do that.",
  "Digital presence is the new storefront. Make yours count.",
  "Good design is obvious. Great design is transparent.",
  "Your website is the center of your digital ecosystem.",
  "It's not just code, it's business logic made visible.",
  "Investment in UX is investment in customer retention."
];

// --- DATA ---
const projects = [
  {
    title: "Nebula Dashboard",
    category: "SaaS Platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    desc: "A high-performance analytics dashboard processing 1M+ data points in real-time.",
    stack: ["Next.js", "D3.js", "Supabase"],
  },
  {
    title: "Luxe Threads",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
    desc: "Modern fashion marketplace with AI-driven recommendations and 3D product previews.",
    stack: ["Shopify", "React", "Tailwind"],
  },
  {
    title: "MedCore Health",
    category: "Telemedicine",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
    desc: "HIPAA-compliant patient portal with video consultations and appointment scheduling.",
    stack: ["React Native", "Node", "WebRTC"],
  },
];

const developers = [
  {
    name: "Alex Chen",
    role: "Lead Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    bio: "10+ years building scalable cloud infrastructure. Obsessed with clean code.",
    skills: ["System Design", "AWS", "Node.js"],
  },
  {
    name: "Sarah Jenkins",
    role: "UI/UX Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    bio: "Bridging the gap between design and code. Expert in animations.",
    skills: ["React", "Framer", "Figma"],
  },
  {
    name: "Marcus Thorne",
    role: "Backend Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    bio: "Database wizard ensuring data integrity and security.",
    skills: ["Python", "PostgreSQL", "Docker"],
  },
];

const faqs = [
  { q: "How long does it take to build a website?", a: "A basic landing page takes 1-2 weeks. Complex web applications typically take 4-12 weeks depending on features and scope." },
  { q: "Will my website be mobile-friendly?", a: "Absolutely. We adopt a 'Mobile-First' approach, ensuring your site looks perfect on phones, tablets, and desktops." },
  { q: "Do you provide hosting and maintenance?", a: "Yes. We offer managed hosting packages that include SSL certificates, daily backups, and security updates." },
  { q: "Can I update the website myself?", a: "Yes. We implement user-friendly CMS solutions (like Sanity or WordPress) so you can edit text and images easily." },
];

// --- MAIN PAGE COMPONENT ---
export default function WebDevelopmentPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // States for the Quote Modal
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeQuote, setActiveQuote] = useState("");

  const handleCalendly = () => {
    window.open(CALENDLY_LINK, "_blank");
  };

  const handleOpenQuote = () => {
    const random = webDevQuotes[Math.floor(Math.random() * webDevQuotes.length)];
    setActiveQuote(random);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans relative">
      <BackgroundGrid />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Available for new projects
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
              We Engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                Digital Excellence
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Transforming complex business logic into stunning, high-performance web applications. <span className="text-gray-200 font-medium">Security, speed, and scalability included.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button 
                size="lg" 
                onClick={handleCalendly}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] border border-indigo-500/50"
              >
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate(-1)} className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white px-8 h-14 text-lg rounded-full backdrop-blur-sm">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- REAL PROJECTS SHOWCASE --- */}
      <section className="py-32 relative bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Selected Works</h2>
            <p className="text-gray-400 text-lg mb-6">Real-world applications delivering tangible business results for our clients.</p>
            <Button variant="link" className="text-indigo-400 text-lg hover:text-indigo-300">View All Projects &rarr;</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <SpotlightCard key={i} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- MEET THE DEVELOPERS (UPDATED CARD STYLE) --- */}
      <section className="py-32 relative overflow-hidden bg-[#0c0c0e]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-900/50 to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">The Minds Behind the Code</h2>
            <p className="text-gray-400 text-lg">Hover over a card to reveal their core expertise.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {developers.map((dev, i) => (
              <DeveloperCard key={i} dev={dev} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="container mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
        </div>
        <InfiniteTestimonials direction="normal" />
        <InfiniteTestimonials direction="reverse" />
      </section>

      {/* --- FAQ --- */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-16">Common Queries</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'bg-[#151518] border-indigo-500/50' : 'bg-transparent border-white/10 hover:border-white/20'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                >
                  <span className={`font-medium text-lg ${openFaq === i ? 'text-white' : 'text-gray-300'}`}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="relative rounded-3xl p-12 overflow-hidden border border-white/10 bg-[#0F0F11] text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Scale?</h2>
              <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
                Join the forward-thinking companies that rely on our code to power their business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="xl" 
                  onClick={handleOpenQuote}
                  className="bg-white text-black hover:bg-gray-200 font-bold px-10 h-14 rounded-full text-lg shadow-xl"
                >
                  Get Your Quote
                </Button>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 sm:mt-0 px-4">
                   <button onClick={handleCalendly} className="flex items-center hover:text-indigo-400 transition-colors">
                     <Check className="w-4 h-4 text-indigo-500 mr-2" /> Free Consultation
                   </button>
                   <span className="flex items-center"><Check className="w-4 h-4 text-indigo-500 mr-2" /> No Obligation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUOTE MODAL --- */}
      <AnimatePresence>
        {isQuoteOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#121214] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/20 blur-[60px] rounded-full" />
              
              <button 
                onClick={() => setIsQuoteOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 text-center">
                <div className="mx-auto w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
                   <Zap className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-300 mb-2 uppercase tracking-wider">Insight of the moment</h3>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-6" />
                
                <p className="text-2xl font-bold text-white mb-8 leading-snug">
                  "{activeQuote}"
                </p>

                <Button 
                  onClick={handleCalendly}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 text-lg"
                >
                  Discuss this project
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}