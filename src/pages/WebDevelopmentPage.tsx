import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, ChevronDown, Code, Cpu, Globe, Layers, Zap } from "lucide-react";

// ✅ Import your specific component
// If this path is slightly different in your project, please adjust it.


export default function WebDevelopmentPage() {
  const navigate = useNavigate();

  // --- DATA: Real Life Projects ---
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
      stack: ["Shopify Headless", "React", "Tailwind"],
    },
    {
      title: "MedCore Health",
      category: "Telemedicine",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
      desc: "HIPAA-compliant patient portal with video consultations and appointment scheduling.",
      stack: ["React Native", "Node.js", "WebRTC"],
    },
  ];

  // --- DATA: Developers (360 Flip) ---
  const developers = [
    {
      name: "Alex Chen",
      role: "Lead Architect",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      bio: "10+ years building scalable cloud infrastructure. Obsessed with clean code and system performance.",
      skills: ["System Design", "AWS", "Node.js", "Microservices"],
    },
    {
      name: "Sarah Jenkins",
      role: "UI/UX Engineer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
      bio: "Bridging the gap between design and code. Expert in animations and accessible interfaces.",
      skills: ["React", "Framer Motion", "Figma", "Accessibility"],
    },
    {
      name: "Marcus Thorne",
      role: "Backend Specialist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
      bio: "Database wizard ensuring data integrity and security. Specialist in API development.",
      skills: ["Python", "PostgreSQL", "Docker", "Cybersecurity"],
    },
  ];

  // --- DATA: FAQ ---
  const faqs = [
    { q: "How long does it take to build a website?", a: "A basic landing page takes 1-2 weeks. Complex web applications typically take 4-12 weeks depending on features and scope." },
    { q: "Will my website be mobile-friendly?", a: "Absolutely. We adopt a 'Mobile-First' approach, ensuring your site looks perfect on phones, tablets, and desktops." },
    { q: "Do you provide hosting and maintenance?", a: "Yes. We offer managed hosting packages that include SSL certificates, daily backups, and security updates." },
    { q: "Can I update the website myself?", a: "Yes. We implement user-friendly CMS solutions (like Sanity or WordPress) so you can edit text and images easily." },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-6 px-4 py-1 text-sm border-indigo-500/50 text-indigo-300 bg-indigo-500/10 backdrop-blur-md">
              <Zap className="w-3 h-3 mr-2 fill-indigo-300" /> Next-Gen Development
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              We Engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                Digital Excellence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Transforming complex business logic into stunning, high-performance web applications. Security, speed, and scalability included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 text-lg shadow-lg shadow-indigo-600/20">
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate(-1)} className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 h-12 text-lg">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- REAL PROJECTS SHOWCASE --- */}
      <section className="py-24 bg-[#0F0F11]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Case Studies</h2>
              <p className="text-gray-400 max-w-md">Real-world applications delivering tangible business results.</p>
            </div>
            <Button variant="link" className="text-indigo-400 p-0 hover:text-indigo-300">View All Work &rarr;</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-[#1a1a1d] border border-gray-800"
              >
                {/* Image Container with Zoom Effect */}
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  />
                  <div className="absolute top-4 left-4 z-20">
                     <Badge className="bg-black/60 backdrop-blur-md border-none text-white hover:bg-black/80">
                       {project.category}
                     </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <span key={tech} className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded border border-gray-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MEET THE DEVELOPERS (360 Flip Effect) --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Minds Behind the Code</h2>
            <p className="text-gray-400">Hover over a card to reveal their expertise.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {developers.map((dev, i) => (
              <div key={i} className="group h-[400px] w-full [perspective:1000px]">
                {/* The Flipping Container */}
                <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 h-full w-full rounded-2xl [backface-visibility:hidden] border border-gray-800 bg-[#151518] shadow-2xl flex flex-col items-center justify-center p-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500/20 mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                      <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{dev.name}</h3>
                    <p className="text-indigo-400 font-medium">{dev.role}</p>
                    <div className="mt-8 flex gap-2">
                       <Code className="w-5 h-5 text-gray-600" />
                       <Layers className="w-5 h-5 text-gray-600" />
                       <Cpu className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="absolute inset-0 h-full w-full rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-indigo-900 to-[#151518] border border-indigo-500/30 p-8 flex flex-col justify-center text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Expertise</h3>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                      "{dev.bio}"
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {dev.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-black/40 rounded-full text-xs text-indigo-300 border border-indigo-500/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/10 w-full">
                       <p className="text-xs text-gray-500 uppercase tracking-widest">TDC SD Elite</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SCROLLING TESTIMONIALS --- */}
      <section className="py-12 bg-[#0F0F11] border-y border-gray-800">
        <div className="container mx-auto px-6 mb-8 text-center">
          <Badge className="mb-4 bg-green-500/10 text-green-400 border-none hover:bg-green-500/20">Client Success</Badge>
          <h2 className="text-3xl font-bold">Trusted by Industry Leaders</h2>
        </div>
        {/* Importing your specific component here */}
        <ScrollingTestimonials />
      </section>

      {/* --- FAQ WITH NEW ANIMATION --- */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Common Queries</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={false}
                animate={openFaq === i ? "open" : "closed"}
                className="border border-gray-800 rounded-xl bg-[#151518] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                >
                  <span className="font-semibold text-lg text-gray-200">{faq.q}</span>
                  <motion.div
                    variants={{
                      open: { rotate: 180 },
                      closed: { rotate: 0 }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-indigo-400" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto", marginBottom: 24 },
                        collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 text-gray-400 leading-relaxed border-t border-gray-800/50 pt-4">
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
      <section className="py-24 px-6 text-center">
        <div className="container mx-auto max-w-4xl bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border border-indigo-500/20 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
          
          <h2 className="text-4xl font-bold mb-6">Ready to Scale?</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Join the forward-thinking companies that rely on our code to power their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="xl" className="bg-white text-black hover:bg-gray-200 font-bold px-8 h-14">
              Get Your Quote
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-400">
               <Check className="w-4 h-4 text-green-400" /> Free Consultation
               <Check className="w-4 h-4 text-green-400 ml-2" /> No Obligation
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}