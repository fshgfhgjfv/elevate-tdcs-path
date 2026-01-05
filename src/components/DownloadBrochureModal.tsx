import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText } from "lucide-react";

// The single brochure URL for all courses as requested
const COMMON_BROCHURE_URL = "https://drive.google.com/file/d/1_oWjtOS1hRyVolJv22tHwPxdv2t2ePau/view?usp=drive_link";

interface DownloadBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
}

export const DownloadBrochureModal = ({ isOpen, onClose, preselectedCourse }: DownloadBrochureModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Added email field
    phone: "",
    course: preselectedCourse || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const { toast } = useToast();

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneChange = (value: string) => {
    // Only allow digits and limit to 10
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: cleaned });
    
    if (cleaned.length === 10 && !validatePhone(cleaned)) {
      setPhoneError("Please enter a valid Indian mobile number starting with 6-9");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast({ title: "Name Required", description: "Please enter your full name", variant: "destructive" });
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast({ title: "Invalid Phone Number", description: "Please enter a valid 10-digit Indian mobile number", variant: "destructive" });
      return;
    }

    if (!formData.course) {
      toast({ title: "Course Required", description: "Please select a course to download the brochure", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Track analytics
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'download_brochure_submit', {
        course: formData.course,
        source: 'brochure-download'
      });
    }

    toast({
      title: "Success!",
      description: "Opening brochure in a new tab. A counselor will contact you shortly.",
    });

    // Open the single common PDF link
    window.open(COMMON_BROCHURE_URL, '_blank');

    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: preselectedCourse || "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <FileText className="w-5 h-5 text-primary" />
            Download Course Brochure
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in your details to download the complete course brochure with curriculum, pricing & FAQs
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Course Selection (Reordered) */}
          <div className="space-y-2">
            <Label htmlFor="course" className="text-foreground font-medium">
              Select Course *
            </Label>
            <Select 
              value={formData.course} 
              onValueChange={(value) => setFormData({ ...formData, course: value })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Choose your course" />
              </SelectTrigger>
              <SelectContent>
                {/* Order: Cyber Master's Pro -> Black Hat -> Bug Hunting -> Network Security */}
                <SelectItem value="cyber-lite">
                  <span className="flex items-center gap-2">
                    🔐 Cyber Master's Pro (₹499 - 2 months)
                  </span>
                </SelectItem>
                <SelectItem value="cyber-blackhat">
                  <span className="flex items-center gap-2">
                    🎯 Cyber Master's Pro Black Hat (₹19,999 - 4 months)
                  </span>
                </SelectItem>
                <SelectItem value="bug-hunting-pentest">
                  <span className="flex items-center gap-2">
                    🐛 Bug Hunting & Penetration Testing (₹9,999 - 3 months)
                  </span>
                </SelectItem>
                <SelectItem value="network-security-defense">
                  <span className="flex items-center gap-2">
                    🛡️ Network Security & Defense (₹12,000 - 5 months)
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 2. Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Enter your full name"
              className="bg-background border-border"
            />
          </div>

          {/* 3. Email Field (New) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="name@example.com"
              className="bg-background border-border"
            />
          </div>

          {/* 4. Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">
              Phone Number * (10-digit Indian mobile)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                +91
              </span>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                required
                placeholder="98XXXXXXXX"
                className="bg-background border-border pl-12"
                maxLength={10}
              />
            </div>
            {phoneError && (
              <p className="text-destructive text-xs">{phoneError}</p>
            )}
            <p className="text-xs text-muted-foreground">
              We'll send course updates and counselor will contact you
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold transition-all hover:shadow-lg hover:shadow-primary/30" 
            disabled={isSubmitting || !formData.name || !formData.email || !validatePhone(formData.phone) || !formData.course}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Brochure
              </span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};