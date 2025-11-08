import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { testimonials } from "@/data/courses";
import { Quote } from "lucide-react";

interface CourseSpecificTestimonialsProps {
  courseId: string;
}

export const CourseSpecificTestimonials = ({ courseId }: CourseSpecificTestimonialsProps) => {
  const courseTestimonials = testimonials.filter((t) => t.courseId === courseId);

  if (courseTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Success Stories from This Course
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from students who transformed their careers with this program
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              style={{ perspective: 1000 }}
            >
              <Card className="h-full shadow-glow hover:shadow-glow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.before} → {testimonial.after}
                      </p>
                      <p className="text-xs text-primary font-semibold mt-1">
                        {testimonial.company}
                      </p>
                    </div>
                    <Quote className="w-6 h-6 text-primary/30" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
