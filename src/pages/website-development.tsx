import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, Star } from "lucide-react";

// --- Service Data ---
const services = [
  {
    name: "Website Security",
    slug: "website-security",
    description: "Protect your site from hackers, malware, and data leaks with enterprise-grade monitoring.",
    price: "Starting at 1999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTult-T4p-9ig7zIoGth7nrWrSHOmtzv_C1gA&s",
  },
  {
    name: "Penetration Testing",
    slug: "penetration-testing",
    description: "Simulate cyberattacks to uncover vulnerabilities before real hackers do.",
    price: "Starting at 2999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT97UlNaiIwu_wXnTxSEQP1WwGCwcIwOBLXqQ&s",
  },
  {
    name: "Web Development",
    slug: "web-development",
    description: "Custom-built, responsive websites using React, Next.js, or WordPress.",
    price: "Starting at 4999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4bltNxyXCmTTjBUSrTkHyy5_10dIpwnkvDw&s",
  },
];

// --- Real Projects Showcase ---
const projects = [
  {
    title: "Finexa Banking Portal",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4nWsfrm6LUico5887e1nHr27RY5naM-RN4w&s",
    link: "https://finexa.com",
    desc: "A secure, AI-driven digital banking platform with interactive dashboards and real-time analytics.",
  },
  {
    title: "EduVerse Learning Hub",
    img: "https://images.unsplash.com/photo-1616628182505-0356d1b10b6b?auto=format&fit=crop&w=800&q=80",
    link: "https://eduverse.io",
    desc: "An immersive e-learning platform featuring gamified courses and live instructor sessions.",
  },
  {
    title: "NovaHealth AI Assistant",
    img: "https://images.unsplash.com/photo-1612831662375-295c1003d3f9?auto=format&fit=crop&w=800&q=80",
    link: "https://novahealth.ai",
    desc: "AI-powered healthcare app with chatbot integration, scheduling, and telemedicine tools.",
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
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const navigate = useNavigate();

  return (
    <section ref={ref} className="container mx-auto px-4 py-20 space-y-24 relative">
      {/* --- HERO --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Website Development & Security Services
        </h1>
        <p className="text-muted-foreground text-lg">
          From responsive design to advanced cybersecurity — we build, protect, and optimize your digital presence.
        </p>
      </motion.div>

      {/* --- SERVICES --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate(`/services/${service.slug}`)} // 👈 dynamic link
            className="cursor-pointer rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-b from-background to-background/80 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            <img src={service.image} alt={service.name} className="h-48 w-full object-cover" />
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">{service.price}</span>
                <Button
                  variant="default"
                  className="gradient-primary"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering card click
                    navigate(`/services/${service.slug}`);
                  }}
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </motion.div>
        ))}
      </div>

      {/* --- PROJECTS --- */}
      <motion.div style={{ y: y1 }} className="space-y-10">
        <h2 className="text-3xl font-bold text-center">🚀 Real Projects We’ve Built</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-2xl overflow-hidden bg-muted hover:shadow-glow transition-all"
            >
              <img src={p.img} alt={p.title} className="h-48 w-full object-cover" />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <Button
                  onClick={() => window.open(p.link, "_blank")}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- TESTIMONIALS --- */}
      <motion.div className="space-y-10">
        <h2 className="text-3xl font-bold text-center">💬 What Our Clients Say</h2>
        <div className="relative overflow-x-auto flex space-x-6 py-6 scrollbar-hide">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              whileHover={{ scale: 1.05 }}
              className="min-w-[300px] bg-gradient-to-b from-background to-muted p-6 rounded-2xl shadow-md hover:shadow-glow"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <p className="text-sm mb-3">{t.text}</p>
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- FAQ SECTION --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-6">❓ Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
