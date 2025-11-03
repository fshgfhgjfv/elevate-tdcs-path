import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, Mail, Send, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DashboardSupport = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // In real app, send to backend
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. Our support team will reach out shortly.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const faqs = [
    {
      question: "How do I access my purchased courses?",
      answer: "Navigate to the 'My Courses' section in your dashboard. All your enrolled courses will be listed there with progress tracking.",
    },
    {
      question: "How can I download my certificates?",
      answer: "Once you complete a course, go to the 'Certificates' section in your dashboard. You'll find download and share options for all your completed courses.",
    },
    {
      question: "How is the leaderboard calculated?",
      answer: "The leaderboard ranks students based on score points earned from course completions, assessments, and participation. Higher scores mean better rankings.",
    },
    {
      question: "Can I change my email address?",
      answer: "Yes, go to 'Account Settings' in your dashboard, update your email in the Profile Information section, and save changes.",
    },
    {
      question: "What is Two-Factor Authentication?",
      answer: "2FA adds an extra security layer to your account. When enabled, you'll need to verify your identity using a code sent to your email or authenticator app when logging in.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text">Support & Help</h1>
        <p className="text-muted-foreground">
          Get help with your account or courses
        </p>
      </motion.div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <div>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Send us a message and we'll get back to you soon</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message / Issue Description</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your issue or question..."
                rows={6}
              />
            </div>
            <Button type="submit" className="gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5" />
            <div>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Important policies and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Link to="/terms">
              <Button variant="outline" className="w-full gap-2 justify-start">
                <FileText className="w-4 h-4" />
                Terms of Service
              </Button>
            </Link>
            <Link to="/privacy">
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Shield className="w-4 h-4" />
                Privacy Policy
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSupport;
