import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText } from "lucide-react";
import { dbService } from "@/services/database";

const COMMON_BROCHURE_URL = "https://drive.google.com/file/d/1_oWjtOS1hRyVolJv22tHwPxdv2t2ePau/view?usp=drive_link";

interface DownloadBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
}

export const DownloadBrochureModal = ({ isOpen, onClose, preselectedCourse }: DownloadBrochureModalProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: preselectedCourse || "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const { toast } = useToast();

  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: cleaned });
    setPhoneError(cleaned.length === 10 && !validatePhone(cleaned) ? "Please enter a valid Indian mobile number starting with 6-9" : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { toast({ title: "Name Required", description: "Please enter your full name", variant: "destructive" }); return; }
    if (!formData.email.trim() || !validateEmail(formData.email)) { toast({ title: "Invalid Email", description: "Please enter a valid email address", variant: "destructive" }); return; }
    if (!validatePhone(formData.phone)) { toast({ title: "Invalid Phone", description: "Please enter a valid 10-digit Indian mobile number", variant: "destructive" }); return; }
    if (!formData.course) { toast({ title: "Course Required", description: "Please select a course", variant: "destructive" }); return; }

    setIsSubmitting(true);
    try {
      await dbService.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Brochure Download - Course: ${formData.course}`,
        source: 'download_brochure',
      });
      toast({ title: "Success!", description: "Opening brochure in a new tab." });
      window.open(COMMON_BROCHURE_URL, '_blank');
      onClose();
      setFormData({ name: "", email: "", phone: "", course: preselectedCourse || "" });
    } catch (error) {
      console.error("Brochure download error:", error);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <FileText className="w-5 h-5 text-primary" /> Download Course Brochure
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in your details to download the complete course brochure
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="course" className="text-foreground font-medium">Select Course *</Label>
            <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
              <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Choose your course" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cyber-lite">🔐 Cyber Master's Pro Black-Hat Lite (₹499)</SelectItem>
                <SelectItem value="cyber-blackhat">🎯 Cyber Master's Pro Black Hat (₹19,999)</SelectItem>
                <SelectItem value="bug-hunting-pentest">🐛 Bug Hunting & Penetration Testing (₹9,999)</SelectItem>
                <SelectItem value="network-security-defense">🛡️ Network Security & Defense (₹12,000)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Full Name *</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="Enter your full name" className="bg-background border-border" />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Email Address *</Label>
            <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder="name@example.com" className="bg-background border-border" />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Phone Number *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">+91</span>
              <Input type="tel" value={formData.phone} onChange={(e) => handlePhoneChange(e.target.value)} required placeholder="98XXXXXXXX" className="bg-background border-border pl-12" maxLength={10} />
            </div>
            {phoneError && <p className="text-destructive text-xs">{phoneError}</p>}
          </div>
          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isSubmitting || !formData.name || !formData.email || !validatePhone(formData.phone) || !formData.course}>
            {isSubmitting ? <span className="flex items-center gap-2"><span className="animate-spin">⏳</span> Processing...</span> : <span className="flex items-center gap-2"><Download className="w-5 h-5" /> Download Brochure</span>}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
