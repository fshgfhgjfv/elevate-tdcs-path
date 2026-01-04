import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Sparkles, Shield, Clock, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock service data - in production, fetch from API
const servicesData: Record<string, any> = {
  "ai-productivity": {
    id: "ai-productivity",
    title: "AI & Productivity Tools Pro Pack",
    tagline: "All-in-one suite of intelligent tools for creators, coders & teams.",
    price: "₹2,999/month",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFV1jmQwMCaSvAiBpgx6xX5cddHC44BMdWTagPRbB8Ix7K1MZ8pIL-DWCsP0jf_XI1F8nT6G3MsRlbj9EEZcuj7nHQIdWI8lelL2ZqNkwl1-J16xafcYxcP1ffVKrAdCXqTmwbah16N5BlN22dE7JJaYlpfIFbNQR7XbtfP9huAYFvii7tZvBjQhku6Eto/s1024/AI%20TDCS%20bundel%20.png",
    features: [
      "21 Premium AI & Productivity Tools",
      "Access to ChatGPT, Gemini Pro & Ultra",
      "Development tools: Lovable, Replit, Bolt.new",
      "Automation: N8N, Make.com",
      "Design: Mobbin, Magic Patterns",
      "Productivity: Notion Business, Superhuman"
    ],
    whatYouGet: [
      "ChatGPT (3 Months) - Advanced AI chat assistant",
      "Perplexity AI Pro (1 Year) - AI-powered search engine",
      "Gemini Pro (1 Year) - Google's advanced AI",
      "Gemini Ultra (1 Month) - Premium Gemini tier",
      "Gamma AI (1 Year) - AI presentation maker",
      "Notion Business (6 Months) - All-in-one workspace",
      "Lovable Pro (1 Year) - AI app development",
      "Replit Core (1 Year) - Cloud IDE platform",
      "Bolt.new AI Code (1 Year) - AI code assistant",
      "N8N Automation (1 Year) - Workflow automation",
      "Make.com (1 Year) - Visual automation",
      "And 10 more premium tools..."
    ],
    faqs: [
      {
        question: "How do I get access to the tools?",
        answer: "Once payment is confirmed, you'll receive login credentials via email within 24 hours for all included tools."
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel anytime. No long-term commitments required."
      },
      {
        question: "Are these official licenses?",
        answer: "Yes, all tools are legitimate premium accounts with full features and support."
      },
      {
        question: "What happens after the duration expires?",
        answer: "You can renew at the same discounted rate or let the subscription expire. Your data remains safe."
      }
    ]
  },
  "software-subscriptions": {
    id: "software-subscriptions",
    title: "Software & Subscriptions Ultimate Pack",
    tagline: "Premium creative and professional software suite for creators.",
    price: "₹3,499/month",
    features: [
      "7 Premium Creative Software",
      "Canva Pro + Adobe Creative Cloud",
      "Video editing: Filmora, CapCut Pro, Descript",
      "AI Voice: ElevenLabs",
      "Vector design: CorelDRAW"
    ],
    whatYouGet: [
      "Canva Pro (1 Year) - Graphic design platform",
      "Adobe Creative Cloud (1 Year) - Complete creative suite",
      "CorelDRAW (1 Year) - Vector graphics editor",
      "Descript (1 Year) - Video & audio editor",
      "Filmora (1 Year) - Video editing software",
      "CapCut Pro (1 Year) - Advanced video editor",
      "ElevenLabs (1 Year) - AI voice generation"
    ],
    faqs: [
      {
        question: "Do I get all Adobe apps?",
        answer: "Yes, the Adobe Creative Cloud subscription includes Photoshop, Illustrator, Premiere Pro, After Effects, and more."
      },
      {
        question: "Can I use these for commercial projects?",
        answer: "Yes, all licenses support commercial use."
      }
    ]
  },
  "vpn-security": {
    id: "vpn-security",
    title: "VPN & Security Premium Shield Pack",
    tagline: "Ultimate cyber-security and privacy protection for your digital life.",
    price: "₹1,999/month",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEgKhACxAr7EGf7djwXWrEILJBM4o6uNqZgZtPIzHETuPuEyU5MZJLspMJYG7E-nTmQ3so6qRNUv-AD07hjuQ7kw6BV9akDuQPNQ_d6dR6VGRVP2iuT1UY4d7NmnpIJC7vA3AHDmyvzzJe5nO6MX62WXTAYTxWYXqUyArte20G2wCtTBkMr8KAedpHH3VIP8",
    features: [
      "Premium VPN services",
      "ExpressVPN + Surfshark",
      "Advanced threat protection",
      "Secure DNS",
      "Military-grade encryption"
    ],
    whatYouGet: [
      "ExpressVPN Premium (1 Year) - 160+ locations, military encryption",
      "Surfshark VPN (1 Year) - Unlimited devices",
      "Advanced Threat Protection (1 Year) - Real-time security",
      "Secure DNS (1 Year) - Privacy DNS with ad blocking"
    ],
    faqs: [
      {
        question: "How many devices can I use?",
        answer: "ExpressVPN supports 5 devices, Surfshark supports unlimited devices."
      },
      {
        question: "Is my data safe?",
        answer: "Yes, both VPNs use military-grade encryption and have strict no-logs policies."
      }
    ]
  },
  "learning-career": {
    id: "learning-career",
    title: "Learning & Career Master Pack",
    tagline: "Upskill. Learn. Grow with TDCS.",
    price: "₹2,499/month",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZJ8UZ5YOIKAZAYU99rDZqXqJRQ7Ffh9zwjQzgq-F_KhKdELqFAzioCj-TAsUOU073_VczWPIgLLTwUG9TCvEhYdF6eavKc4Fsqu2KPU05Xs_-CZEI-h5KF2Khbr3oKsOA8IlI8CFW-1CGRVjI9M0VmxG6XSoUCxN7giYDYh-n3YXlD_aHRux5zf2W-S6_/s1024/Learning%20&%20Career%20tdcs.png",
    features: [
      "5 Premium learning platforms",
      "Coursera Plus + edX Premium",
      "LinkedIn Learning + Udemy Business",
      "1-on-1 Career Coaching",
      "Professional certificates"
    ],
    whatYouGet: [
      "Coursera Plus (1 Year) - 7000+ courses",
      "edX Premium (1 Year) - University courses",
      "LinkedIn Learning (1 Year) - 16000+ courses",
      "Udemy Business (1 Year) - Business learning",
      "Career Coaching (1 Year) - Resume review, interview prep"
    ],
    faqs: [
      {
        question: "Can I get certificates?",
        answer: "Yes, all platforms offer professional certificates upon course completion."
      },
      {
        question: "How does career coaching work?",
        answer: "You'll get 1-on-1 sessions with industry experts for resume review, mock interviews, and career guidance."
      }
    ]
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <Button onClick={() => navigate("/services")}>Back to Services</Button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    // Navigate to checkout for manual payment
    navigate("/checkout", { 
      state: { 
        serviceName: service.title, 
        price: service.price 
      } 
    });
    toast({
      title: "Redirecting to Payment",
      description: "Complete your payment using UPI to activate your subscription.",
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/services")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Services
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Service Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="mb-4" variant="secondary">SPECIAL OFFER</Badge>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {service.tagline}
              </p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold gradient-text">{service.price}</span>
                <span className="text-muted-foreground">per month</span>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Button
                  variant="gradient"
                  size="lg"
                  className="shadow-glow"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </motion.div>

            {/* Right: Service Image */}
            {service.image && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full rounded-lg shadow-glow-lg"
                  loading="lazy"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.features.map((feature: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 h-full hover:shadow-glow transition-all">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm">{feature}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What You Get</h2>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <ul className="space-y-4">
                {service.whatYouGet.map((item: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose This Pack?</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Verified Premium", desc: "100% authentic accounts" },
              { icon: Clock, title: "Instant Access", desc: "Get started within 24 hours" },
              { icon: Users, title: "24/7 Support", desc: "Always here to help" },
              { icon: Sparkles, title: "Best Value", desc: "Save up to 70% vs individual" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-glow transition-all">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq: any, index: number) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center shadow-glow-lg">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of satisfied customers who trust TDCS
            </p>
            <Button
              variant="gradient"
              size="lg"
              className="shadow-glow"
              onClick={handleBookNow}
            >
              Book {service.title}
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
