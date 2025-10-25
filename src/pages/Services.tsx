import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCard } from "@/components/ServiceCard";
import { 
  Sparkles, 
  Shield, 
  GraduationCap, 
  Palette,
  MessageSquare,
  Code2,
  Lock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RAZORPAY_KEY = "rzp_test_1DP5mmOlF5G5ag";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const services = [
  {
    id: "ai-productivity",
    title: "AI & Productivity Tools Pro Pack",
    tagline: "All-in-one suite of intelligent tools for creators, coders & teams.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFV1jmQwMCaSvAiBpgx6xX5cddHC44BMdWTagPRbB8Ix7K1MZ8pIL-DWCsP0jf_XI1F8nT6G3MsRlbj9EEZcuj7nHQIdWI8lelL2ZqNkwl1-J16xafcYxcP1ffVKrAdCXqTmwbah16N5BlN22dE7JJaYlpfIFbNQR7XbtfP9huAYFvii7tZvBjQhku6Eto/s1024/AI%20TDCS%20bundel%20.png",
    tools: [
      { name: "ChatGPT", icon: "🤖", duration: "3 Months", description: "Advanced AI chat assistant", features: ["GPT-4 access", "Faster responses", "Priority access"] },
      { name: "Perplexity AI Pro", icon: "🤖", duration: "1 Year", description: "AI-powered search engine", features: ["Unlimited searches", "Deep research", "Source citations"] },
      { name: "Gemini Pro", icon: "🔮", duration: "1 Year", description: "Google's advanced AI", features: ["Multimodal AI", "Code generation", "Document analysis"] },
      { name: "Gemini Ultra", icon: "🔮", duration: "1 Month", description: "Premium Gemini tier", features: ["Most capable model", "Extended context", "Advanced reasoning"] },
      { name: "Gamma AI", icon: "⚡", duration: "1 Year", description: "AI presentation maker", features: ["Auto design", "Templates", "Collaboration"] },
      { name: "Notion Business", icon: "📝", duration: "6 Months", description: "All-in-one workspace", features: ["Unlimited pages", "Team collaboration", "Advanced permissions"] },
      { name: "Lovable Pro", icon: "💖", duration: "1 Year", description: "AI app development", features: ["Code generation", "Real-time preview", "Deployment"] },
      { name: "Replit Core", icon: "💻", duration: "1 Year", description: "Cloud IDE platform", features: ["Always-on projects", "Multiplayer coding", "Ghostwriter AI"] },
      { name: "Bolt.new AI Code", icon: "⚡", duration: "1 Year", description: "AI code assistant", features: ["Code generation", "Auto-completion", "Debugging help"] },
      { name: "N8N Automation", icon: "🔄", duration: "1 Year", description: "Workflow automation", features: ["300+ integrations", "Self-hosted option", "Custom workflows"] },
      { name: "Make.com", icon: "🔹", duration: "1 Year", description: "Visual automation", features: ["No-code builder", "1000+ apps", "Advanced logic"] },
      { name: "ClickSites AI Website", icon: "🌐", duration: "1 Year", description: "AI website builder", features: ["Instant sites", "SEO optimization", "Custom domains"] },
      { name: "Jasper AI", icon: "✍", duration: "1 Month", description: "AI content writer", features: ["Marketing copy", "Blog posts", "Social media"] },
      { name: "Warp Dev AI", icon: "🖥", duration: "1 Year", description: "Modern terminal", features: ["AI command search", "Workflows", "Collaboration"] },
      { name: "Mobbin UI/UX", icon: "🎨", duration: "1 Year", description: "UI design library", features: ["50k+ screens", "Design patterns", "Mobile & web"] },
      { name: "Magic Patterns", icon: "🎭", duration: "1 Year", description: "AI UI generator", features: ["Generate designs", "Export code", "Figma plugin"] },
      { name: "Wispr Voice AI", icon: "🎤", duration: "1 Year", description: "Voice transcription", features: ["Real-time transcription", "Multi-language", "High accuracy"] },
      { name: "Granola Meeting", icon: "🍳", duration: "1 Year", description: "AI meeting notes", features: ["Auto summaries", "Action items", "Integrations"] },
      { name: "Superhuman", icon: "📧", duration: "1 Year", description: "Email productivity", features: ["Blazing fast", "Keyboard shortcuts", "AI assistance"] },
      { name: "Linear AI Project", icon: "📊", duration: "1 Year", description: "Issue tracking", features: ["Project management", "Roadmaps", "Integrations"] },
      { name: "Raycast AI", icon: "⚡", duration: "1 Year", description: "Productivity launcher", features: ["Quick actions", "Extensions", "AI commands"] },
    ],
    colors: "from-cyan-500 via-violet-500 to-purple-600",
    icon: Sparkles,
    badge: "SPECIAL OFFER",
    price: "₹2,999/month"
  },
  {
    id: "software-subscriptions",
    title: "Software & Subscriptions Ultimate Pack",
    tagline: "Premium creative and professional software suite for creators.",
    tools: [
      { name: "Canva Pro", icon: "🎨", duration: "1 Year", description: "Graphic design platform", features: ["Premium templates", "Brand kit", "Background remover"] },
      { name: "Adobe Creative Cloud", icon: "🎭", duration: "1 Year", description: "Creative suite", features: ["All Adobe apps", "Cloud storage", "Premium fonts"] },
      { name: "CorelDRAW", icon: "✏️", duration: "1 Year", description: "Vector graphics editor", features: ["Professional design", "Typography", "Illustrations"] },
      { name: "Descript", icon: "🎬", duration: "1 Year", description: "Video & audio editor", features: ["Transcription", "Overdub", "Screen recording"] },
      { name: "Filmora", icon: "🎥", duration: "1 Year", description: "Video editing", features: ["Effects library", "AI tools", "Export options"] },
      { name: "CapCut Pro", icon: "📹", duration: "1 Year", description: "Video editor", features: ["Advanced editing", "Effects", "Auto captions"] },
      { name: "ElevenLabs", icon: "🔊", duration: "1 Year", description: "AI voice generation", features: ["Voice cloning", "Multiple languages", "High quality"] },
    ],
    colors: "from-blue-500 via-purple-500 to-pink-500",
    icon: Palette,
    badge: "LIMITED DEAL",
    price: "₹3,499/month"
  },
  {
    id: "vpn-security",
    title: "VPN & Security Premium Shield Pack",
    tagline: "Ultimate cyber-security and privacy protection for your digital life.",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEgKhACxAr7EGf7djwXWrEILJBM4o6uNqZgZtPIzHETuPuEyU5MZJLspMJYG7E-nTmQ3so6qRNUv-AD07hjuQ7kw6BV9akDuQPNQ_d6dR6VGRVP2iuT1UY4d7NmnpIJC7vA3AHDmyvzzJe5nO6MX62WXTAYTxWYXqUyArte20G2wCtTBkMr8KAedpHH3VIP8",
    tools: [
      { name: "ExpressVPN Premium", icon: "🛡️", duration: "1 Year", description: "Top-tier VPN service", features: ["160+ locations", "Military encryption", "24/7 support"] },
      { name: "Surfshark VPN", icon: "🦈", duration: "1 Year", description: "Unlimited devices VPN", features: ["Unlimited devices", "CleanWeb", "Multi-hop"] },
      { name: "Advanced Threat Protection", icon: "🔒", duration: "1 Year", description: "Security suite", features: ["Real-time protection", "Malware blocking", "Safe browsing"] },
      { name: "Secure DNS", icon: "🌐", duration: "1 Year", description: "Privacy DNS", features: ["Ad blocking", "Tracking protection", "Fast resolution"] },
    ],
    colors: "from-gray-700 via-cyan-500 to-blue-600",
    icon: Shield,
    badge: "CYBER SAFE DEAL",
    price: "₹1,999/month"
  },
  {
    id: "learning-career",
    title: "Learning & Career Master Pack",
    tagline: "Upskill. Learn. Grow with TDCS.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZJ8UZ5YOIKAZAYU99rDZqXqJRQ7Ffh9zwjQzgq-F_KhKdELqFAzioCj-TAsUOU073_VczWPIgLLTwUG9TCvEhYdF6eavKc4Fsqu2KPU05Xs_-CZEI-h5KF2Khbr3oKsOA8IlI8CFW-1CGRVjI9M0VmxG6XSoUCxN7giYDYh-n3YXlD_aHRux5zf2W-S6_/s1024/Learning%20&%20Career%20tdcs.png",
    tools: [
      { name: "Coursera Plus", icon: "🎓", duration: "1 Year", description: "Online learning", features: ["7000+ courses", "Professional certificates", "University courses"] },
      { name: "edX Premium", icon: "📚", duration: "1 Year", description: "University courses", features: ["Top universities", "MicroMasters", "Certificates"] },
      { name: "LinkedIn Learning", icon: "💼", duration: "1 Year", description: "Professional skills", features: ["16000+ courses", "Certificates", "Expert instructors"] },
      { name: "Udemy Business", icon: "🎯", duration: "1 Year", description: "Business learning", features: ["7000+ courses", "Team access", "Learning paths"] },
      { name: "Career Coaching", icon: "👨‍💼", duration: "1 Year", description: "1-on-1 coaching", features: ["Resume review", "Interview prep", "Career guidance"] },
    ],
    colors: "from-navy-800 via-teal-500 to-amber-500",
    icon: GraduationCap,
    badge: "SPECIAL OFFER",
    price: "₹2,499/month"
  }
];

const Services = () => {
  const handleGetService = (serviceId: string, serviceName: string, price: string) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: parseInt(price.replace(/[^0-9]/g, '')) * 100,
      currency: "INR",
      name: "TDCS Technologies",
      description: serviceName,
      handler: function (response: any) {
        toast({
          title: "Payment Successful! 🎉",
          description: `Your ${serviceName} subscription is now active.`,
        });
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#FFB347",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      toast({
        title: "Payment Failed ❌",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    });
    rzp.open();
  };
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              TDCS Premium Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock your potential with our exclusive bundle packages. Get premium tools, software, and learning resources at unbeatable prices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Mobile Optimized */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                onGetService={handleGetService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Why Choose TDCS Bundles?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Premium access to industry-leading tools at a fraction of the cost
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Sparkles, title: "Premium Quality", desc: "Verified premium accounts" },
              { icon: Lock, title: "Secure Access", desc: "Protected & encrypted" },
              { icon: MessageSquare, title: "24/7 Support", desc: "Always here to help" },
              { icon: Code2, title: "Easy Setup", desc: "Instant activation" }
            ].map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="text-center p-6 hover:shadow-glow transition-all duration-300">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                      <FeatureIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card className="p-12 shadow-glow-lg border-2">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                Ready to Upgrade Your Digital Arsenal?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of satisfied customers who trust TDCS for their software needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg" className="shadow-glow">
                  View All Bundles
                </Button>
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
