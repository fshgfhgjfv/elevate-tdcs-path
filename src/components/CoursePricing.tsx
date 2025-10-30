import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Aptitude Training",
  "Soft Skills Training",
  "Resume Preparation",
  "AI-Powered Mock Interviews",
  "Access to Placement Portal",
  "Access to 300+ Senior Interview Experiences",
  "Offline Placement Drives",
  "Mock Interviews by Tech and HR Panels",
];

interface CoursePricingProps {
  onEnroll: () => void;
}

export const CoursePricing = ({ onEnroll }: CoursePricingProps) => {
  return (
    <section className="py-16 bg-muted/20" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Our Pricing</h2>
        </motion.div>

        <Card className="max-w-3xl mx-auto shadow-glow-lg">
          <CardHeader className="text-center border-b">
            <CardTitle className="text-2xl mb-2">Cyber Master's Pro Lite</CardTitle>
            <p className="text-muted-foreground">Starts As low as</p>
            <div className="text-4xl font-bold gradient-text my-4">₹5,833/month</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Lifetime Access to the Course</p>
              <p>12 month Zero cost EMI</p>
              <p className="text-primary font-semibold">Additional Scholarships Up To ₹15,000</p>
            </div>
            <div className="mt-4">
              <span className="text-2xl line-through text-muted-foreground mr-4">₹1,00,000</span>
              <span className="text-3xl font-bold gradient-text">₹85,000/-</span>
              <p className="text-xs text-muted-foreground mt-1">In total (incl. of all taxes)</p>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-6 text-center">
              Get an edge in the pursuit of your dream career
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button variant="gradient" size="lg" className="w-full" onClick={onEnroll}>
                Apply Now
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Request Callback
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Get certified by NSDC</h3>
              <p className="text-sm text-muted-foreground mb-4">Verifiable Certificate of Accomplishment</p>
              <img
                src="https://blogger.googleusercontent.com/img/a/AVvXsEgQBCknDQq2PSSJ5SzQS6ei73FcO8IbRNgjKW3b9r3DtAnmMR_9OClnJXyZn9MEci-jQazc0qSX6nRaRn638FkssY5npovgqEHVu6o2FfNjB1oXXSbuxV9OCu2dArjAC1HOMOJHrP3-TvNgbHqIxfeIEf9H6BeQa2VziRX7w3u4Tx1QigCeDINCHEHPIsnm"
                alt="NSDC Certificate"
                className="mx-auto h-34"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
