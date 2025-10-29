import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Stuti Pandey",
    role: "Software Engineer @Walmart",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    quote: "TDCS transformed my career with their comprehensive training program.",
  },
  {
    name: "Pradyot Verma",
    role: "Software Developer @MakeMyTrip",
    image: "https://i.pinimg.com/736x/19/d9/c9/19d9c9b09bb586793888781ad5f73397.jpg",
    quote: "From mechanical engineering to software development - TDCS made it possible!",
  },
  {
    name: "Akash Ingoley",
    role: "Software Developer @PayGlocal",
    image: "https://i.pinimg.com/736x/78/f9/1f/78f91f94b77493e89f43404ed5ede4f4.jpg",
    quote: "It's never too late to switch careers. TDCS helped me transition to IT.",
  },
  {
    name: "Kabita Mondal",
    role: "Application Developer @Thoughtworks",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    quote: "Despite low CGPA, TDCS helped me land my dream job through practical projects.",
  },
  {
    name: "Meenakshi G",
    role: "Software Engineer @Gainsight",
    image: "https://i.pinimg.com/736x/f9/a0/b1/f9a0b1afa65d0e0f16c5b1c70ec8b69f.jpg",
    quote: "The mock interviews prepared me perfectly for the real thing.",
  },
  {
    name: "Abdullah Safwi",
    role: "Software Developer @Maersk",
    image: "https://i.pinimg.com/736x/65/0a/2c/650a2c5ab4e520513a57f104547bdc41.jpg",
    quote: "TDCS provided the perfect structure and guidance to crack tech interviews.",
  },
  {
    name: "Namrata Rathore",
    role: "Software Developer @Searce",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    quote: "From Biotech to Software - TDCS made my career transition smooth and successful.",
  },
  {
    name: "Sandeep Singh",
    role: "Software Engineer @Innovaccer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    quote: "Best investment in my career. The placement support is exceptional!",
  },
];

// Duplicate for infinite scroll effect
const duplicatedTestimonials = [...testimonials, ...testimonials];

export const ScrollingTestimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/10 to-background overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Hear from Our Success Stories
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands who transformed their careers with TDCS
          </p>
        </motion.div>
      </div>

      {/* First Row - Scroll Left to Right */}
      <div className="relative mb-8">
        <div className="flex gap-6 animate-scroll-left-fast">
          {duplicatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={`left-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-80 bg-card border rounded-xl p-6 shadow-glow hover:shadow-glow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Second Row - Scroll Right to Left */}
      <div className="relative">
        <div className="flex gap-6 animate-scroll-right-fast">
          {duplicatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={`right-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-80 bg-card border rounded-xl p-6 shadow-glow hover:shadow-glow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
