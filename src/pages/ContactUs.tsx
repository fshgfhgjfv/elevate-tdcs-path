import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function ContactUs() {
const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use your deployed backend URL or localhost for testing
  const API_BASE_URL = "https://your-backend-url.com"; // Update this to your backend URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to connect to server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
            We’d love to hear from you — reach out to our team and let’s connect.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
          >
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <motion.div variants={fadeUp} custom={0.3}>
                    <Label
                      htmlFor="name"
                      className="text-white font-medium tracking-wide"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-white/10 text-white placeholder:text-gray-400 border border-white/20 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all rounded-xl"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fadeUp} custom={0.4}>
                    <Label
                      htmlFor="email"
                      className="text-white font-medium tracking-wide"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="bg-white/10 text-white placeholder:text-gray-400 border border-white/20 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all rounded-xl"
                    />
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={fadeUp} custom={0.5}>
                    <Label
                      htmlFor="phone"
                      className="text-white font-medium tracking-wide"
                    >
                      Phone (10 digits)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your 10-digit phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      className="bg-white/10 text-white placeholder:text-gray-400 border border-white/20 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all rounded-xl"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeUp} custom={0.6}>
                    <Label
                      htmlFor="message"
                      className="text-white font-medium tracking-wide"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Type your message..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="bg-white/10 text-white placeholder:text-gray-400 border border-white/20 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all rounded-xl"
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp} custom={0.8}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.4)] disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {[
              {
                icon: <Mail className="text-purple-400 w-6 h-6" />,
                title: "Email",
                text: "info@tdcs.tech",
                link: "mailto:info@tdcs.tech",
              },
              {
                icon: <Phone className="text-indigo-400 w-6 h-6" />,
                title: "Call Support",
                text: "+91 94227 99875",
                link: "tel:+919422799875",
              },
              {
                icon: <MessageCircle className="text-green-400 w-6 h-6" />,
                title: "WhatsApp Support",
                text: "+91 95647 30432",
                link: "https://wa.me/919564730432",
              },
              {
                icon: <MapPin className="text-pink-400 w-6 h-6" />,
                title: "Office",
                text: "Kolkata, West Bengal, India",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                custom={0.4 + idx * 0.1}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:bg-white/10 transition-all"
              >
                {item.icon}
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-white/90">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 transition"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <p className="text-gray-400">{item.text}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
