import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  Shield, 
  GraduationCap, 
  Palette,
  MessageSquare,
  Code2,
  Lock,
  BookOpen
} from "lucide-react";

const services = [
  {
    id: "ai-productivity",
    title: "AI & Productivity Tools Pro Pack",
    tagline: "All-in-one suite of intelligent tools for creators, coders & teams.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFV1jmQwMCaSvAiBpgx6xX5cddHC44BMdWTagPRbB8Ix7K1MZ8pIL-DWCsP0jf_XI1F8nT6G3MsRlbj9EEZcuj7nHQIdWI8lelL2ZqNkwl1-J16xafcYxcP1ffVKrAdCXqTmwbah16N5BlN22dE7JJaYlpfIFbNQR7XbtfP9huAYFvii7tZvBjQhku6Eto/s1024/AI%20TDCS%20bundel%20.png",
    tools: ["ChatGPT", "Perplexity", "Gemini", "Gamma", "Notion", "Replit", "Bolt.new", "N8N", "Make.com"],
    colors: "from-cyan-500 via-violet-500 to-purple-600",
    icon: Sparkles,
    badge: "SPECIAL OFFER",
    price: "₹2,999/month"
  },
  {
    id: "software-subscriptions",
    title: "Software & Subscriptions Ultimate Pack",
    tagline: "Premium creative and professional software suite for creators.",
    tools: ["Canva Pro", "Adobe Creative Cloud", "CorelDRAW", "Descript", "Filmora", "CapCut Pro", "ElevenLabs"],
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
    tools: ["ExpressVPN Premium", "Surfshark VPN", "Advanced Threat Protection", "Secure DNS"],
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
    tools: ["Coursera Plus", "edX Premium", "LinkedIn Learning", "Udemy Business", "Career Coaching"],
    colors: "from-navy-800 via-teal-500 to-amber-500",
    icon: GraduationCap,
    badge: "SPECIAL OFFER",
    price: "₹2,499/month"
  }
];

const Services = () => {
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

      {/* Services Grid */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-glow-lg transition-all duration-500 group border-2">
                    <CardContent className="p-0">
                      {/* Product Box Image */}
                      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-background to-muted/20">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${service.colors} opacity-80 flex items-center justify-center`}>
                            <IconComponent className="w-32 h-32 text-white/30" />
                          </div>
                        )}
                        
                        {/* Badge */}
                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/50">
                          <span className="text-sm font-bold gradient-text tracking-wider">
                            {service.badge}
                          </span>
                        </div>

                        {/* TDCS Logo Glow */}
                        <div className="absolute bottom-4 left-4">
                          <div className="text-3xl font-bold text-white drop-shadow-glow">
                            TDCS
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${service.colors}`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                            <p className="text-muted-foreground text-sm">{service.tagline}</p>
                          </div>
                        </div>

                        {/* Tools List */}
                        <div className="flex flex-wrap gap-2">
                          {service.tools.map((tool, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-muted rounded-full text-xs font-medium"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <p className="text-sm text-muted-foreground">Starting at</p>
                            <p className="text-2xl font-bold gradient-text">{service.price}</p>
                          </div>
                          <Button variant="gradient" size="lg" className="shadow-glow">
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
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
