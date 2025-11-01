import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  before: string;
  after: string;
  company: string;
  image?: string;
}

export const TestimonialCard = ({ name, before, after, company }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-glow hover:shadow-glow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold">
              {name.charAt(0)}
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-4">{name}</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-center">
                <div className="text-sm text-muted-foreground mb-1">Before</div>
                <div className="font-semibold text-sm">{before}</div>
              </div>
              
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="text-primary" />
              </motion.div>
              
              <div className="flex-1 text-center">
                <div className="text-sm text-muted-foreground mb-1">After</div>
                <div className="font-semibold text-sm gradient-text">{after}</div>
              </div>
            </div>
            
            <div className="text-center pt-3 border-t">
              <div className="text-sm font-semibold text-primary">{company}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
