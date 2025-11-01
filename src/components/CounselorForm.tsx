import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Phone } from "lucide-react";
import { useLeadSubmission } from "@/hooks/useLeadSubmission";

export const CounselorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    degree: "",
    state: "",
  });

  const { submitLead, isSubmitting } = useLeadSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const result = await submitLead({
      name: formData.name,
      email: '', // Optional field
      phone: formData.phone,
      message: `Degree: ${formData.degree}, State: ${formData.state}`,
      source: 'counselor_callback',
    });

    if (result.success) {
      setFormData({ name: "", phone: "", degree: "", state: "" });
    }
  };

  return (
    <Card className="shadow-glow-lg sticky top-24">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <Phone className="w-12 h-12 mx-auto mb-3 text-primary" />
          <h3 className="text-xl font-bold gradient-text mb-2">Talk To Our Counsellor</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="flex gap-2">
            <div className="w-16">
              <Input value="+91" disabled className="text-center" />
            </div>
            <Input
              placeholder="Phone Number *"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          
          <Select value={formData.degree} onValueChange={(value) => setFormData({ ...formData, degree: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="btech">B.Tech</SelectItem>
              <SelectItem value="bca">BCA</SelectItem>
              <SelectItem value="mca">MCA</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="up">Uttar Pradesh</SelectItem>
              <SelectItem value="haryana">Haryana</SelectItem>
              <SelectItem value="punjab">Punjab</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Request Callback'}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            By clicking 'Request Callback', you agree to our Terms & Conditions
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
