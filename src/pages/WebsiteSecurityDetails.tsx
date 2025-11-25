import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, ShieldAlert, Code, Terminal } from "lucide-react";

// --- EXPANDED DATA SOURCE ---
// In a real app, this might come from a database or CMS.
const serviceData: Record<string, any> = {
  "penetration-testing": {
    title: "Penetration Testing & VAPT",
    subtitle: "Ethical Hacking to Fortify Your Defenses",
    description: "We simulate real-world cyberattacks on your infrastructure to identify weak points before malicious hackers do. Our VAPT (Vulnerability Assessment and Penetration Testing) follows OWASP standards.",
    price: "Starting at ₹2999",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
    icon: <Terminal className="w-12 h-12 text-red-500 mb-4" />,
    features: [
      "Full Web & Mobile App Scanning",
      "Network Infrastructure Stress Test",
      "Detailed Vulnerability Report (PDF)",
      "Remediation Support & Retesting",
      "OWASP Top 10 Compliance Check",
    ],
    process: [
      { step: "01", name: "Reconnaissance", desc: "Gathering intelligence about target systems." },
      { step: "02", name: "Scanning", desc: "Automated and manual discovery of vulnerabilities." },
      { step: "03", name: "Exploitation", desc: "Attempting to breach security to prove risks." },
      { step: "04", name: "Reporting", desc: "Comprehensive documentation of fixes." },
    ]
  },
  "web-development": {
    title: "Custom Web Development",
    subtitle: "High-Performance, Secure React Applications",
    description: "We build pixel-perfect, responsive, and secure websites tailored to your business goals. We specialize in the MERN stack (MongoDB, Express, React, Node) and Next.js.",
    price: "Starting at ₹4999",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1000",
    icon: <Code className="w-12 h-12 text-blue-500 mb-4" />,
    features: [
      "Custom UI/UX Design (Figma)",
      "SEO Optimized Architecture",
      "Fast Loading Speeds (Core Web Vitals)",
      "Secure API Integration",
      "Admin Dashboard Setup",
    ],
    process: [
      { step: "01", name: "Discovery", desc: "Understanding your brand and requirements." },
      { step: "02", name: "Design", desc: "Wireframing and prototyping the UI." },
      { step: "03", name: "Development", desc: "Coding with clean, scalable practices." },
      { step: "04", name: "Launch", desc: "Testing, deployment, and handover." },
    ]
  },
  "website-security": {
    title: "Website Security Shield",
    subtitle: "24/7 Monitoring & Malware Removal",
    description: "Don't let your website go down. We provide continuous security monitoring, SSL configuration, and instant malware removal services.",
    price: "Starting at ₹1999",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000",
    icon: <ShieldAlert className="w-12 h-12 text-emerald-500 mb-4" />,
    features: [
      "24/7 Uptime Monitoring",
      "DDoS Protection Setup",
      "Malware Scanning & Removal",
      "Firewall Configuration (WAF)",
      "Weekly Security Audits",
    ],
    process: [
        { step: "01", name: "Audit", desc: "Scanning current site health." },
        { step: "02", name: "Hardening", desc: "Patching immediate holes." },
        { step: "03", name: "Monitor", desc: "Setting up real-time alerts." },
        { step: "04", name: "Maintain", desc: "Regular updates and backups." },
    ]
  }
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Look up the data based on the URL
  const service = serviceData[slug || ""];

  // Handle "Page Not Found" if the slug doesn't match our data
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Service Not Found</h1>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* --- HERO HEADER --- */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             {service.icon}
             <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
               {service.title}
             </h1>
             <p className="text-xl text-gray-200 font-medium max-w-2xl mx-auto">
               {service.subtitle}
             </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-30">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8"
        >
            {/* --- MAIN CONTENT LEFT --- */}
            <div className="md:col-span-2 space-y-8">
                <Card className="p-8 border-border/50 shadow-xl bg-card">
                    <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        {service.description}
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-6">What We Will Do</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {service.features.map((feature: string, i: number) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                                <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                                <span className="text-sm font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* --- PROCESS STEPS --- */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold">How It Works</h3>
                    <div className="grid gap-4">
                        {service.process?.map((step: any, i: number) => (
                            <div key={i} className="flex gap-4 items-center p-4 border border-border/40 rounded-xl bg-muted/10">
                                <span className="text-4xl font-bold text-muted-foreground/20">{step.step}</span>
                                <div>
                                    <h4 className="font-bold text-lg">{step.name}</h4>
                                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- SIDEBAR RIGHT --- */}
            <div className="space-y-6">
                <Card className="p-6 border-primary/20 bg-primary/5 sticky top-24">
                    <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                    <div className="text-3xl font-bold text-primary mb-6">{service.price}</div>
                    
                    <div className="space-y-3">
                        <Button size="lg" className="w-full font-bold">
                            Book Consultation
                        </Button>
                        <Button 
                            variant="outline" 
                            size="lg" 
                            className="w-full"
                            onClick={() => navigate(-1)} // Go back
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                        *Final price depends on project scope.
                    </p>
                </Card>
            </div>
        </motion.div>
      </div>
    </div>
  );
}