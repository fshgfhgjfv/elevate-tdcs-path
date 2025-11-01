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

export const TestimonialCard = ({ name, before, after, company, image }: TestimonialCardProps) => {
  return (
    <Card className="shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full">
      <CardContent className="p-6">
        <motion.div 
          className="flex items-center justify-center mb-4"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
        >
          {image ? (
            <motion.img
              src={image}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                borderColor: "hsl(var(--primary))"
              }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold">
              {name.charAt(0)}
            </div>
          )}
        </motion.div>
        <motion.h3 
          className="text-xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {name}
        </motion.h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex-1 text-center"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-sm text-muted-foreground mb-1">Before</div>
              <div className="font-semibold text-sm">{before}</div>
            </motion.div>
            
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="text-primary" />
            </motion.div>
            
            <motion.div 
              className="flex-1 text-center"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-sm text-muted-foreground mb-1">After</div>
              <div className="font-semibold text-sm gradient-text">{after}</div>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center pt-3 border-t"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-sm font-semibold text-primary">{company}</div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
