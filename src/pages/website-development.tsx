import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  ExternalLink, 
  Star, 
  ShieldCheck, 
  Code, 
  Crosshair, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// --- Data ---
const services = [
  {
    name: "Website Security",
    slug: "website-security",
    description: "Protect your site from hackers, malware, and data leaks with enterprise-grade monitoring.",
    price: "Starting at ₹1,999",
    icon: <ShieldCheck className="w-10 h-10 text-emerald-400" />,
    features: ["Malware Removal", "Firewall Setup", "24/7 Monitoring"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Penetration Testing",
    slug: "penetration-testing",
    description: "Simulate cyberattacks to uncover vulnerabilities before real hackers do.",
    price: "Starting at ₹2,999",
    icon: <Crosshair className="w-10 h-10 text-red-400" />,
    features: ["Vulnerability Scan", "Exploit Testing", "Detailed Reporting"],
    image: "https://images.unsplash.com/photo-1563206767-5b1d97289374?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Web Development",
    slug: "web-development",
    description: "Custom-built, responsive websites using React, Next.js, or WordPress.",
    price: "Starting at ₹4,999",
    icon: <Code className="w-10 h-10 text-blue-400" />,
    features: ["SEO Optimized", "Mobile Responsive", "Custom UI/UX"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
  },
];

const projects = [
  {
    title: "Finexa Banking Portal",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    link: "https://finexa.com",
    tags: ["Fintech", "Security"],
    desc: "A secure, AI-driven digital banking platform with interactive dashboards and real-time analytics.",
  },
  {
    title: "EduVerse Learning Hub",
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    link: "https://eduverse.io",
    tags: ["EdTech", "Gamification"],
    desc: "An immersive e-learning platform featuring gamified courses and live instructor sessions.",
  },
  {
    title: "NovaHealth AI Assistant",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    link: "https://novahealth.ai",
    tags: ["Healthcare", "AI"],
    desc: "AI-powered healthcare app with chatbot integration, scheduling, and telemedicine tools.",
  },
];

const testimonials = [
  {
    name: "Emily Carter",
    role: "CEO, Finexa Bank",
    text: "Their security upgrade saved our platform from multiple cyber threats. Reliable, fast, and professional!",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Jason Lee",
    role: "Founder, EduVerse",
    text: "Outstanding design and functionality! The UI/UX exceeded expectations and boosted engagement by 60%.",
    img: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    name: "Ava Johnson",
    role: "CTO, NovaHealth",
    text: "Their AI integration transformed our system. Incredible team that delivers beyond promises.",
    img: "https://randomuser.me/api/portraits/women/57.jpg",
  },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most web development projects take between 3 to 6 weeks depending on complexity and revisions.",
  },
  {
    q: "Do you provide ongoing maintenance?",
    a: "Yes, we offer monthly and annual support plans for security, updates, and performance monitoring.",
  },
  {
    q: "Can you migrate my existing website?",
    a: "Absolutely. We handle full migrations with zero downtime and improved performance.",
  },
  {
    q: "What technologies do you use?",
    a: "We specialize in React, Next.js, Tailwind, Node.js, and secure backend APIs.",
  },
];

export default function WebsiteDevelopment() {
  const navigate = useNavigate();
  const ref = useRef(null);
  
  // Parallax for background or sections
  const { scrollYProgress } = useScroll({ target: ref });
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/20">
      
      {/* --- Background Ambient Effects --- */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24 space-y-32">
        
        {/* --- HERO SECTION --- */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative flex flex-col items-center text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-secondary text-sm font-medium text-secondary-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Accepting New Projects for 2025
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Build Faster. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">Secure Better.</span> <br/> Scale Forever.
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl">
            We merge cutting-edge web development with military-grade cybersecurity to create digital experiences that are safe, fast, and beautiful.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
              Start Your Project
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full backdrop-blur-sm bg-background/50">
              View Portfolio
            </Button>
          </motion.div>
        </motion.section>


        {/* --- SERVICES SECTION --- */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expertise</h2>
            <p className="text-muted-foreground">Comprehensive solutions for the modern web.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.name} variants={fadeInUp}>
                <div 
                  onClick={() => navigate(`/services/${service.slug}`)}
                  className="group relative h-full bg-background/60 backdrop-blur-md border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur rounded-xl p-2 border border-border/50 shadow-sm">
                      {service.icon}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{service.description}</p>
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                      <span className="font-bold text-lg">{service.price}</span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>


        {/* --- PROJECTS SECTION --- */}
        <section className="relative">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Work</h2>
              <p className="text-muted-foreground">Real results for industry leaders.</p>
            </div>
            <Button variant="ghost" className="gap-2 group">
              View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <Button variant="secondary" size="sm" onClick={() => window.open(p.link, "_blank")}>
                      Visit Site <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex gap-2">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-xl">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* --- TESTIMONIALS --- */}
        <section className="bg-gradient-to-br from-secondary/30 to-background rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
           {/* Decorative Quotes */}
           <div className="absolute top-10 left-10 text-9xl font-serif text-foreground/5 pointer-events-none opacity-50">"</div>
           
           <div className="relative z-10 text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-bold">Client Success Stories</h2>
           </div>

           <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-background/80 backdrop-blur p-6 rounded-2xl shadow-sm border border-border/50 flex flex-col"
              >
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-foreground/90 italic mb-6 flex-grow">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-border/50 pt-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full ring-2 ring-background" />
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
           </div>
        </section>


        {/* --- FAQ SECTION --- */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Got questions? We've got answers.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60">
                <AccordionTrigger className="text-lg hover:no-underline hover:text-primary py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>


        {/* --- CALL TO ACTION --- */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 text-center"
        >
          <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold">Ready to secure your digital future?</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Join industry leaders who trust us with their web infrastructure. Let's build something extraordinary together.
              </p>
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold rounded-full mt-4">
                Get a Free Consultation
              </Button>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}