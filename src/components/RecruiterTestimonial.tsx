import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export const RecruiterTestimonial = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-glow-lg border-2">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop"
                    alt="Varghese Abraham"
                    className="w-32 h-32 rounded-full object-cover shadow-glow"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-12 h-12 text-primary mb-4 mx-auto md:mx-0" />
                  <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                    "We hired rockstar developers from AccioJob! The students demonstrate excellent 
                    sound fundamentals and first principle thinking. They're well-prepared and 
                    ready to contribute from day one. AccioJob has been a reliable partner in our 
                    recruitment process."
                  </p>
                  
                  <div>
                    <h3 className="text-xl font-bold gradient-text mb-1">Varghese Abraham</h3>
                    <p className="text-muted-foreground font-medium">
                      Senior Hiring Manager, Tech Mahindra
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Previously at Infosys • 15+ years in Tech Recruitment
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
