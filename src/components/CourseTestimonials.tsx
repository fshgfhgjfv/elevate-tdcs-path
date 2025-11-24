import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Linkedin, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useMotionTemplate, useTransform } from "framer-motion";

// --- New and Updated Testimonials Data ---
const testimonials = [
  {
    name: "Stuti Pandey",
    role: "Software Engineer @Walmart",
    preAccio: "B.Tech",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mbacrystalball.com%2Fblog%2F2022%2F10%2F17%2Findian-it-male-engineer-mba-success-stories%2F&psig=AOvVaw2M_QSMN6-d7UyHVPImVqUx&ust=1761768733596000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNCD1Y7ax5ADFQAAAAAdAAAAABAE",
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
  // --- New Testimonials Integrated ---
  {
    name: "Akshita Ale",
    role: "Full Stack Developer @HCLTech", // Placeholder Role
    preAccio: "BCA", // Placeholder Education
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Findian-man&psig=AOvVaw29BmcdaIkc1jrXA8AlG6TT&ust=1761845457553000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLjJ0P73yZADFQAAAAAdAAAAABAE", // Placeholder Photo
    quote: "The live classes, daily assignments & doubt sessions made sure that everything was crystal clear to everyone. The multiple mock interviews are a very good simulation for the actual interviews.",
    company: "https://upload.wikimedia.org/wikipedia/commons/1/15/HCL_Technologies_logo.svg", // Placeholder Company
  },
  {
    name: "Kasim Khan",
    role: "Data Analyst @KPMG", // Placeholder Role
    preAccio: "B.Com", // Placeholder Education
    image: "https://images.unsplash.com/photo-1547425260-76bc0351e1e6?w=200&h=200&fit=crop", // Placeholder Photo
    quote: "For a person with a background in a non-technical field, TDCS trained me and helped me in improving my technical skills perfectly and land the job I had dreamed of!",
    company: "https://upload.wikimedia.org/wikipedia/commons/e/e0/KPMG_logo.svg", // Placeholder Company
  },
  {
    name: "Aninda Khan",
    role: "Software Engineer @TCS", // Placeholder Role
    preAccio: "Auto Engineering",
    image: "https://images.unsplash.com/photo-1601705626993-27051cc7299a?w=200&h=200&fit=crop", // Placeholder Photo
    quote: "It's never too late to change your professional path. I was an Automobile Engineering student, who wanted to switch to IT Field and with TDCS's help I was able to make that switch.",
    company: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Tata_Consultancy_Services_Logo.svg", // Placeholder Company
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

const ITEM_WIDTH_PERCENT = 50; // Show 2 items per page (50% width)
const AUTOPLAY_DELAY = 4000; // 4 seconds

export const CourseTestimonials = () => {
  const [page, setPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Framer Motion for Carousel Dragging
  const x = useMotionValue(0);
  const totalPages = Math.ceil(testimonials.length / 2);
  const maxDrag = (totalPages - 1) * 100; // Total drag distance in percentage

  // Function to move the carousel to the next page
  const nextPage = () => {
    setPage((prevPage) => (prevPage + 1) % totalPages);
  };

  // Auto-Play Logic
  useEffect(() => {
    if (isHovered) return; // Pause on hover

    const interval = setInterval(nextPage, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Framer Motion Effect for manual page change and drag snapping
  useEffect(() => {
    // When 'page' changes, animate the 'x' motion value to the correct position
    const targetX = -page * ITEM_WIDTH_PERCENT * 2; // e.g., page 1: -100%, page 2: -200%
    x.set(targetX); 
  }, [page]);
  
  // Handlers for manual navigation
  const goToNextPage = () => setPage((p) => (p + 1) % totalPages);
  const goToPrevPage = () => setPage((p) => (p - 1 + totalPages) % totalPages);


  // Animation variants for the whole section
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 bg-muted/20 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={sectionVariants} className="text-4xl font-bold gradient-text mb-4">
            Stories from people like you 
          </motion.h2>
          <motion.p variants={sectionVariants} className="text-lg text-muted-foreground">
            Hear from our successful students who transformed their careers.
          </motion.p>
        </motion.div>

        {/* CAROUSEL TRACK CONTAINER (overflow hidden) */}
        <div className="relative overflow-hidden max-w-6xl mx-auto">
          <motion.div
            className="flex w-full"
            style={{ x }} // Apply the motion value 'x' to the horizontal position
            drag="x" // Enable horizontal dragging
            dragConstraints={{ left: -maxDrag * (containerRef.current?.offsetWidth || 1) / 100, right: 0 }} // Dynamic constraint based on container width
            dragElastic={0.2} // Slight spring effect on drag
            onDragEnd={(event, info) => {
              // Calculate which page to snap to after drag ends
              const currentOffset = info.offset.x;
              const cardWidth = containerRef.current.offsetWidth / 2; // Width of one card (approximately)
              const newPage = Math.round(Math.abs(currentOffset) / cardWidth / 2); // 2 cards visible
              
              const clampedPage = Math.min(totalPages - 1, Math.max(0, newPage));
              setPage(clampedPage);
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 p-3 w-full md:w-1/2`} // Each item takes 50% width on MD and up
                variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 dark:border-gray-700">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/50"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <div className="flex gap-2">
                            <Linkedin className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>

                    <p className="text-base italic leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                      <div>
                        <p className="text-xs text-muted-foreground">Pre TDCS</p>
                        <p className="text-sm font-semibold">{testimonial.preAccio}</p>
                      </div>
                      <div className="text-2xl gradient-text font-bold mx-4">→</div>
                      <div>
                        <p className="text-xs text-muted-foreground">Post TDCS</p>
                        <img src={testimonial.company} alt="Company" className="h-6 mt-1 object-contain" />
                      </div>
                      <PlayCircle className="w-8 h-8 text-primary cursor-pointer hover:scale-110 transition-transform ml-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Navigation Dots and Arrows */}
        <div className="flex justify-center items-center mt-8 gap-4 max-w-6xl mx-auto">
          <button 
            onClick={goToPrevPage}
            className="p-2 rounded-full border-2 border-primary/50 text-primary hover:bg-primary/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === page ? 'bg-primary scale-125' : 'bg-gray-400 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial page ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={goToNextPage}
            className="p-2 rounded-full border-2 border-primary/50 text-primary hover:bg-primary/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};