import { motion } from "framer-motion";
import { Shield, Lock, Activity, Eye, Server, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WebsiteSecurityDetails() {
  return (
    <section className="container mx-auto px-4 py-20 space-y-20">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Website Security Solutions
        </h1>
        <p className="text-muted-foreground text-lg">
          Protect your website from hackers, DDoS attacks, malware, and data breaches — with 24/7 monitoring and advanced defense systems.
        </p>
        <Button size="lg" className="gradient-primary mt-4">Get a Free Security Audit</Button>
      </motion.div>

      {/* VIDEO / DEMO SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto"
      >
        <iframe
          className="w-full h-64 md:h-96"
          src="https://youtu.be/pZVUjbrSpQ8?si=Ln11VRIZoBJzejEI"
          title="Website Security Demo"
          allowFullScreen
        />
      </motion.div>

      {/* FEATURES GRID */}
      <div className="space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center"
        >
          🔒 Key Security Features
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Lock, title: "SSL/TLS Encryption", desc: "End-to-end data encryption for all communication." },
            { icon: Shield, title: "Firewall Protection", desc: "Blocks malicious traffic and unauthorized access." },
            { icon: Activity, title: "Real-time Threat Detection", desc: "24/7 AI monitoring for suspicious activity." },
            { icon: Eye, title: "Vulnerability Scans", desc: "Automated scans to detect and patch exploits." },
            { icon: Server, title: "Secure Server Hardening", desc: "Optimized configurations to prevent breaches." },
            { icon: Zap, title: "DDoS Prevention", desc: "Advanced protection against large-scale attacks." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-2xl bg-gradient-to-b from-background to-muted p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PRICING SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        <h2 className="text-3xl font-bold text-center">💰 Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Basic", price: "1999", features: ["SSL Setup", "Weekly Scan", "Firewall Config"] },
            { title: "Pro", price: "2999", features: ["24/7 Monitoring", "DDoS Protection", "Monthly Report"] },
            { title: "Enterprise", price: "4999", features: ["Dedicated Security Expert", "Advanced AI Protection", "Priority Support"] },
          ].map((plan, i) => (
            <motion.div
              key={plan.title}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border p-6 bg-background/80 backdrop-blur-md text-center hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-3xl font-bold mb-4 text-primary">{plan.price}</p>
              <ul className="space-y-2 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                variant="default"
                className="gradient-primary"
                onClick={() => {
                  const message = encodeURIComponent(`Hi, I'm interested in the ${plan.title} Website Security plan (₹${plan.price}/mo). Please share more details.`);
                  window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
                }}
              >
                Choose Plan
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* WHY CHOOSE US */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold">🌐 Why Choose Us?</h2>
        <p className="text-muted-foreground">
          We combine experience, automation, and proactive defense strategies to ensure your website stays protected around the clock.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {[
            "24/7 Expert Support",
            "ISO-Certified Security Standards",
            "AI-Driven Threat Detection",
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-muted hover:bg-muted/70 transition-all"
            >
              <h4 className="font-semibold">{item}</h4>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-6">❓ Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "Is my website really at risk?", a: "Yes — even small websites are targeted by bots and hackers daily. Security is essential." },
            { q: "Do you monitor 24/7?", a: "Yes, all Pro and Enterprise plans include continuous AI-based threat monitoring." },
            { q: "Can you secure eCommerce or WordPress sites?", a: "Absolutely. We specialize in securing CMS platforms and online stores." },
            { q: "Do I need technical knowledge?", a: "No — our team handles everything from setup to maintenance for you." },
          ].map((faq, i) => (
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
