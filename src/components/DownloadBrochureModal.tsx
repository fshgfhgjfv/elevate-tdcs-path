import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";

const BROCHURE_URL =
  "https://drive.google.com/file/d/1QyvVIVld5m8ORla6uqNK1NQHZIItwbzJ/view?usp=drivesdk";

interface DownloadBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadBrochureModal = ({
  isOpen,
  onClose,
}: DownloadBrochureModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    if (!/^\d{10}$/.test(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!/.+@.+\..+/.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.course) {
      toast({
        title: "Course Required",
        description: "Please select your course of interest.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive course updates to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Track analytics (if available)
    if (typeof (window as any).gtag !== "undefined") {
      (window as any).gtag("event", "download_brochure_submit", {
        course: formData.course,
        source: "brochure-download",
      });
    }

    toast({
      title: "Success!",
      description:
        "Thanks! Brochure download starting. A counselor will contact you shortly.",
    });

    // ✅ Redirect to brochure in new tab
    window.open(BROCHURE_URL, "_blank");

    setIsSubmitting(false);
    onClose();
    setFormData({
      name: "",
      phone: "",
      email: "",
      course: "",
      consent: false,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Download Brochure
          </DialogTitle>
          <DialogDescription>
            Fill in your details to download our course brochure.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              placeholder="Enter 10-digit mobile number"
              pattern="\d{10}"
              maxLength={10}
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <Label htmlFor="course">Course of Interest *</Label>
            <Select
              value={formData.course}
              onValueChange={(value) =>
                setFormData({ ...formData, course: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cyber-masters-pro-lite">
                  Cyber Master’s Pro Lite
                </SelectItem>
                <SelectItem value="cyber-masters-pro-black-hat">
                  Cyber Master’s Pro Black Hat
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, consent: checked as boolean })
              }
            />
            <label
              htmlFor="consent"
              className="text-sm text-muted-foreground leading-none"
            >
              I agree to receive course updates and offers from TDCS.
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Download Brochure"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};