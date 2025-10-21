import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", formData);
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold gradient-text mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">Get in touch with our team</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-glow">
              <CardHeader>
                <CardTitle className="gradient-text">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" variant="gradient" className="w-full">
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-glow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="text-primary mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a href="mailto:info@tdcs.tech" className="text-muted-foreground hover:text-primary">
                        info@tdcs.tech
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-glow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="text-primary mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary">
                        +91 123 456 7890
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-glow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-primary mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Office</h3>
                      <p className="text-muted-foreground">Kolkata, West Bengal, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
