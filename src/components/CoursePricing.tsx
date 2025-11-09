import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const pricingData = {
  "bug-hunting-pentest": {
    title: "Bug Bounty Hunter Pro",
    subtitle: "Starts As low as",
    monthlyPrice: "₹999/month",
    originalPrice: "₹30,000",
    discountedPrice: "₹6,999",
    features: [
      "Live Bug Hunting Sessions",
      "Access to Private Bug Bounty Platforms",
      "Real Vulnerability Reporting Experience",
      "1-on-1 Mentor Guidance",
      "Hall of Fame Recognition Support",
      "CVE Documentation Training",
      "Advanced Web & API Security",
      "Mobile App Security Testing",
    ],
    scholarship: "Additional Scholarships Up To ₹12,000",
  },
  "cyber-blackhat": {
    title: "Cyber Master's Pro Black Hat",
    subtitle: "Starts As low as",
    monthlyPrice: "₹2,833/month",
    originalPrice: "₹1,00,000",
    discountedPrice: "19,000/-",
    features: [
      "Aptitude Training",
      "Soft Skills Training",
      "Resume Preparation",
      "AI-Powered Mock Interviews",
      "Access to Placement Portal",
      "Access to 300+ Senior Interview Experiences",
      "Offline Placement Drives",
      "Mock Interviews by Tech and HR Panels",
    ],
    scholarship: "Additional Scholarships Up To ₹15,000",
  },
  "cyber-lite": {
    title: "Cyber Master's Pro Lite",
    subtitle: "Starts As low as",
    monthlyPrice: "₹250/month",
    originalPrice: "₹10,000",
    discountedPrice: "₹499",
    features: [
      "Aptitude Training",
      "Soft Skills Training",
      "Resume Preparation",
      "AI-Powered Mock Interviews",
      "Access to Placement Portal",
      "Access to 300+ Senior Interview Experiences",
      "Offline Placement Drives",
      "Mock Interviews by Tech and HR Panels",
    ],
    scholarship: "Additional Scholarships Up To ₹15,000",
  },
};

interface CoursePricingProps {
  onEnroll: () => void;
  courseId: string;
}

export const CoursePricing = ({ onEnroll, courseId }: CoursePricingProps) => {
  const pricing = pricingData[courseId as keyof typeof pricingData] || pricingData["cyber-blackhat"];
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
            <CardTitle className="text-2xl mb-2">{pricing.title}</CardTitle>
            <p className="text-muted-foreground">{pricing.subtitle}</p>
            <div className="text-4xl font-bold gradient-text my-4">{pricing.monthlyPrice}</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Lifetime Access to the Course</p>
              <p>12 month Zero cost EMI</p>
              <p className="text-primary font-semibold">{pricing.scholarship}</p>
            </div>
            <div className="mt-4">
              <span className="text-2xl line-through text-muted-foreground mr-4">{pricing.originalPrice}</span>
              <span className="text-3xl font-bold gradient-text">{pricing.discountedPrice}</span>
              <p className="text-xs text-muted-foreground mt-1">In total (incl. of all taxes)</p>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-6 text-center">
              Get an edge in the pursuit of your dream career
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {pricing.features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="gradient" size="lg" className="w-full" onClick={onEnroll}>
                  Apply Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" size="lg" className="w-full">
                  Request Callback
                </Button>
              </motion.div>
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
