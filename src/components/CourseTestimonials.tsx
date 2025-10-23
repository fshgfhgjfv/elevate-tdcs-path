import { Card, CardContent } from "@/components/ui/card";
import { Star, Linkedin, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Stuti Pandey",
    role: "Software Engineer @Walmart",
    preAccio: "B.Tech",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    quote: "The whole training is designed keeping each and every student and their educational and professional past in mind. The batch managers keep track of our progress every month.",
    company: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
  },
  {
    name: "Pradyot Verma",
    role: "Software Developer @MakeMyTrip",
    preAccio: "B.Tech Mech",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    quote: "As a mechanical engineer, I used to think it was near to impossible for me to land a tech role in the Software Industry. But then, TDCS happened.",
    company: "https://companieslogo.com/img/orig/MMYT.NS-8d61db31.png",
  },
  {
    name: "Akash Ingoley",
    role: "Software Developer @PayGlocal",
    preAccio: "Gap Year",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    quote: "It's never too late to change your professional path. With TDCS's help I was able to make that switch to IT.",
    company: "https://payglocal.in/assets/img/logo-main.svg",
  },
  {
    name: "Kabita Mondal",
    role: "Application Developer @Thoughtworks",
    preAccio: "M.Sc in CS",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    quote: "Low CGPA in college was a constant worry. TDCS made me realise the importance of making real-time projects. In just 5 months, I mastered and landed a great job.",
    company: "https://www.thoughtworks.com/content/dam/thoughtworks/images/photography/brand/thoughtworks-logo.svg",
  },
];

export const CourseTestimonials = () => {
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
            Stories from people like you
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <div className="flex gap-2">
                          <Linkedin className="w-5 h-5 text-primary" />
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-4">{testimonial.quote}</p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Pre TDCS</p>
                      <p className="text-sm font-semibold">{testimonial.preAccio}</p>
                    </div>
                    <div className="text-2xl gradient-text font-bold">→</div>
                    <div>
                      <p className="text-xs text-muted-foreground">Post TDCS</p>
                      <img src={testimonial.company} alt="Company" className="h-6 mt-1" />
                    </div>
                    <PlayCircle className="w-8 h-8 text-primary cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
