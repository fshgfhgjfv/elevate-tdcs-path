import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Phone, MapPin, MessageCircle, Globe, ShieldCheck } from "lucide-react";
import { dbService } from "@/services/database";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      await dbService.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: 'contact_form',
      });

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      console.error("Contact form error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      
      {/* Background Cyber Grid Animation */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="inline-block p-2 px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-4 tracking-wider uppercase">
             <Globe className="w-3 h-3 inline mr-2" /> Global Operations
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600 mb-4 drop-shadow-2xl">
            Contact HQ
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
            Secure communication channel established. Reach out to our team below.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
          
          {/* Contact Form */}
          <motion.div variants={fadeUp} custom={0.2} initial="hidden" animate="visible" className="h-full">
            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(129,140,248,0.2)] rounded-2xl h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400"><Mail className="w-5 h-5"/></span>
                  Send Encrypted Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div variants={fadeUp} custom={0.3}>
                    <Label htmlFor="name" className="text-gray-300 font-medium tracking-wide">Name</Label>
                    <Input id="name" placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="bg-white/5 text-white placeholder:text-gray-500 border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all rounded-lg" />
                  </motion.div>
                  <motion.div variants={fadeUp} custom={0.4}>
                    <Label htmlFor="email" className="text-gray-300 font-medium tracking-wide">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="bg-white/5 text-white placeholder:text-gray-500 border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all rounded-lg" />
                  </motion.div>
                  <motion.div variants={fadeUp} custom={0.5}>
                    <Label htmlFor="phone" className="text-gray-300 font-medium tracking-wide">Phone (10 digits)</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required pattern="[0-9]{10}" maxLength={10} className="bg-white/5 text-white placeholder:text-gray-500 border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all rounded-lg" />
                  </motion.div>
                  <motion.div variants={fadeUp} custom={0.6}>
                    <Label htmlFor="message" className="text-gray-300 font-medium tracking-wide">Message</Label>
                    <Textarea id="message" rows={4} placeholder="Type your message..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="bg-white/5 text-white placeholder:text-gray-500 border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all rounded-lg" />
                  </motion.div>
                  <motion.div variants={fadeUp} custom={0.8}>
                    <Button type="submit" disabled={isSubmitting} className="w-full py-6 text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all rounded-xl shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 relative overflow-hidden group">
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      {isSubmitting ? "Transmitting..." : "Establish Connection"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map & Info Section */}
          <div className="space-y-6">
             <motion.div variants={fadeUp} custom={0.3} initial="hidden" animate="visible" className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <Card className="relative bg-black border border-white/10 rounded-2xl overflow-hidden h-80">
                   <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
                      <div className="w-full h-1 bg-indigo-500/50 absolute top-0 shadow-[0_0_15px_rgba(99,102,241,1)] animate-scan-line"></div>
                   </div>
                   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.21689694463!2d88.26495039230678!3d22.53556493699318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1709664551234!5m2!1sen!2sin&maptype=satellite" width="100%" height="100%" style={{ border: 0, filter: "grayscale(100%) invert(90%) hue-rotate(180deg) contrast(1.2)" }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"></iframe>
                   <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-indigo-300">HQ: ONLINE</span>
                   </div>
                   <div className="absolute bottom-4 right-4 z-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-indigo-500/30">
                      <p className="text-xs text-gray-400 font-mono">LAT: 22.5726° N</p>
                      <p className="text-xs text-gray-400 font-mono">LNG: 88.3639° E</p>
                   </div>
                </Card>
             </motion.div>

             <motion.div variants={fadeUp} custom={0.4} initial="hidden" animate="visible" className="grid sm:grid-cols-2 gap-4">
               {[
                 { icon: <Phone className="text-indigo-400 w-5 h-5" />, title: "Secure Line", text: "+91 94227 99875", link: "tel:+919422799875", color: "indigo" },
                 { icon: <MessageCircle className="text-green-400 w-5 h-5" />, title: "WhatsApp", text: "+91 95647 30432", link: "https://wa.me/919564730432", color: "green" },
                 { icon: <Mail className="text-purple-400 w-5 h-5" />, title: "Email Uplink", text: "info@tdcs.tech", link: "mailto:info@tdcs.tech", color: "purple" },
                 { icon: <ShieldCheck className="text-pink-400 w-5 h-5" />, title: "Base of Ops", text: "Kolkata, West Bengal", color: "pink" },
               ].map((item, idx) => (
                 <a key={idx} href={item.link || "#"} target={item.link ? "_blank" : "_self"} rel="noopener noreferrer" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group flex items-start gap-4">
                   <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">{item.icon}</div>
                   <div>
                     <h3 className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{item.title}</h3>
                     <p className="text-xs text-gray-500 mt-1">{item.text}</p>
                   </div>
                 </a>
               ))}
             </motion.div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan-line { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan-line { animation: scan-line 3s linear infinite; }
      `}</style>
    </div>
  );
}
