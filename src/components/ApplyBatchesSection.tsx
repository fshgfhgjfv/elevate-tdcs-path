import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Phone,
  Calendar,
  BookOpen,
  ArrowRight,
  Loader2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Motion-enabled button
const MotionButton = motion(Button);

const steps = [
  {
    icon: Phone,
    title: "Request Callback",
    description: "Kickstart your learning journey by requesting a callback today.",
    number: "1"
  },
  {
    icon: Calendar,
    title: "Get on a Call",
    description: "Chat with us to learn more about your options.",
    number: "2"
  },
  {
    icon: BookOpen,
    title: "Book your seat",
    description: "Secure your spot and embark on your learning adventure!",
    number: "3"
  }
];

export const ApplyBatchesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    courseInterest: "",
    message: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return false;
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      toast({
        title: "Error",
        description: "Valid email is required",
        variant: "destructive"
      });
      return false;
    }
    if (
      !formData.phone.trim() ||
      !/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/[\s-]/g, ""))
    ) {
      toast({
        title: "Error",
        description: "Valid phone number is required",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Success! 🎉",
        description:
          "Your callback request has been submitted. We'll contact you soon!"
      });

      if (typeof window !== "undefined" && "gtag" in window) {
        (window as any).gtag("event", "request_callback_submitted", {
          event_category: "engagement",
          event_label: formData.courseInterest
        });
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredTime: "",
        courseInterest: "",
        message: ""
      });

      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Apply For Upcoming Batches
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of students transforming their careers with TDCS
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="p-6 h-full hover:shadow-glow transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                      {step.number}
                    </div>
                    <div className="relative z-10">
                      <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MotionButton
              variant="gradient"
              size="lg"
              className="shadow-glow group min-w-[200px]"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Callback
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MotionButton>

            <MotionButton
              variant="outline"
              size="lg"
              className="min-w-[200px]"
              onClick={() => navigate("/courses")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Courses
            </MotionButton>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side Graphic */}
            <div className="relative hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1557862921-3e16092bb49c?q=80&w=1770&auto=format&fit=crop"
                alt="Support Advisor"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">We're here to help!</h3>
                <p className="text-white/80 text-sm">
                  An advisor will reach out to guide you through the next steps.
                </p>
              </div>
            </div>

            {/* Right Side Form */}
            <div className="p-6 sm:p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">
                  Request a Callback
                </DialogTitle>
                <DialogDescription>
                  Fill out the form below and our team will contact you shortly.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98888 88888"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime">Preferred Time Window</Label>
                    <Input
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 2-4 PM"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="courseInterest">Course Interest</Label>
                    <Select
                      value={formData.courseInterest}
                      onValueChange={(value) =>
                        handleSelectChange("courseInterest", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-stack-java">
                          Full Stack Development (Java)
                        </SelectItem>
                        <SelectItem value="full-stack-mern">
                          Full Stack Development (MERN)
                        </SelectItem>
                        <SelectItem value="data-science">
                          Data Science & Analytics
                        </SelectItem>
                        <SelectItem value="ai-ml">
                          AI & Machine Learning
                        </SelectItem>
                        <SelectItem value="not-sure">
                          Not sure yet
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any specific questions or requirements?"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
