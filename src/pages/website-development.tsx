import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, Star, Shield, Code, Crosshair, ArrowRight } from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// --- Service Data ---
const services = [
  {
    name: "Website Security",
    slug: "website-security",
    description: "Protect your site from hackers, malware, and data leaks with enterprise-grade monitoring.",
    price: "Starting at ₹1,999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTult-T4p-9ig7zIoGth7nrWrSHOmtzv_C1gA&s",
    icon: <Shield className="w-6 h-6 text-emerald-500" />,
  },
  {
    name: "Penetration Testing",
    slug: "penetration-testing",
    description: "Simulate cyberattacks to uncover vulnerabilities before real hackers do.",
    price: "Starting at ₹2,999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT97UlNaiIwu_wXnTxSEQP1WwGCwcIwOBLXqQ&s",
    icon: <Crosshair className="w-6 h-6 text-red-500" />,
  },
  {
    name: "Web Development",
    slug: "web-development",
    description: "Custom-built, responsive websites using React, Next.js, or WordPress.",
    price: "Starting at ₹4,999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4bltNxyXCmTTjBUSrTkHyy5_10dIpwnkvDw&s",
    icon: <Code className="w-6 h-6 text-blue-500" />,
  },
];

// --- Real Projects Showcase ---
const projects = [
  {
    title: "Finexa Banking Portal",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4nWsfrm6LUico5887e1nHr27RY5naM-RN4w&s",
    link: "https://finexa.com",
    desc: "A secure, AI-driven digital banking platform with interactive dashboards and real-time analytics.",
    tag: "Fintech",
  },
  {
    title: "EduVerse Learning Hub",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT97UlNaiIwu_wXnTxSEQP1WwGCwcIwOBLXqQ&s", // Placeholder fixed
    link: "https://eduverse.io",
    desc: "An immersive e-learning platform featuring gamified courses and live instructor sessions.",
    tag: "EdTech",
  },
  {
    title: "NovaHealth AI Assistant",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4bltNxyXCmTTjBUSrTkHyy5_10dIpwnkvDw&s", // Placeholder fixed
    link: "https://novahealth.ai",
    desc: "AI-powered healthcare app with chatbot integration, scheduling, and telemedicine tools.",
    tag: "Health",
  },
];

// --- Testimonials ---
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

// --- FAQs ---
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const navigate = useNavigate();

  return (
    <div ref={ref} className="bg-background min-h-screen overflow-hidden">
      
      {/* --- Background Ambient Glow --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <section className="container mx-auto px-6 py-24 space-y-32">
        
        {/* --- HERO SECTION --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
            🚀 Elevate Your Digital Presence
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Build Faster. <br />
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              Secure Forever.
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            From responsive design to 

[Image of secure web application architecture]
 advanced cybersecurity — we build, protect, and optimize your digital infrastructure.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-4 justify-center pt-4">
             <Button size="lg" className="rounded-full px-8 text-base shadow-lg shadow-primary/25">Get Started</Button>
             <Button size="lg" variant="outline" className="rounded-full px-8 text-base">View Portfolio</Button>
          </motion.div>
        </motion.div>

        {/* --- SERVICES SECTION --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
            <p className="text-muted-foreground">Comprehensive solutions for modern businesses.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.name}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer h-full"
                onClick={() => navigate(`/services/${service.slug}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl" />
                <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden flex flex-col transition-colors group-hover:border-primary/50">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-background rounded-lg border border-border">{service.icon}</div>
                      <h3 className="text-xl font-bold">{service.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">{service.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-border/50">
                      <span className="font-semibold text-primary">{service.price}</span>
                      <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- PROJECTS SECTION --- */}
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
             <div className="max-w-2xl">
               <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
               <p className="text-muted-foreground text-lg">Real results. Real impact. See how we help brands scale.</p>
             </div>
             <Button variant="secondary">View All Projects</Button>
          </div>

          <motion.div style={{ y: yParallax }} className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 backdrop-blur text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  {p.tag}
                </div>
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-xl mb-1">{p.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{p.desc}</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-white text-black hover:bg-gray-200"
                    onClick={() => window.open(p.link, "_blank")}
                  >
                    View Case Study
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- TESTIMONIALS SECTION --- */}
        <div className="bg-secondary/20 -mx-6 px-6 py-20 rounded-[3rem]">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold">Client Success Stories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-background/80 backdrop-blur p-8 rounded-2xl shadow-sm border border-border/50 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80 italic mb-6 flex-grow">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-background" />
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto pb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-2">Got Questions?</h2>
          <p className="text-center text-muted-foreground mb-10">Everything you need to know about our process.</p>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4 data-[state=open]:bg-muted/50 transition-colors">
                <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

      </section>
    </div>
  );
}