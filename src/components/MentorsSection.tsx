import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const originalMentors = [
  {
    name: "Rajesh Kumar",
    role: "Senior Security Architect",
    company: "Google",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    expertise: ["DSA", "System Design", "Cybersecurity"],
    experience: "12+ years",
  },
  {
    name: "Priya Sharma",
    role: "Lead Developer",
    company: "Microsoft",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    expertise: ["SQL", "Java", "Cloud Security"],
    experience: "10+ years",
  },
  {
    name: "Arjun Patel",
    role: "Security Engineer",
    company: "Amazon",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEjvnQ-XVDQqDgH-7EK9Ly0kFPzidegGH5pEn8j3z2zekuxoY_mLkPGhgc70nTzGnY8KLuDuLCjrVSM3xvpQWX8miuzk9NwrFkzy3CztocerwCVTnka36nKHr4KT1pTTcVhhibfQQA9O7VChuL6GOUVEJ9E9_RuDi8yDUecEtd-qLtl0gSOLX2ZnZvUgtRpe", // New image
    expertise: ["Python", "Ethical Hacking", "DevSecOps"],
    experience: "8+ years",
  },
  {
    name: "Sneha Reddy",
    role: "Full Stack Developer",
    company: "Meta",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh68HDmzQ4YTj9g9soRrkq-eHc9cAfbC03ZOXSClA19NofdsJ2lzm2A29d2qxG3xXSUfuEVl-sGEVnkokdgS6snQn86My-Bekn2MLrF135mZPHpwXfsLg1XxhFaClj1Uebgi6IcxeseCR6rvwc3vg6IgYUm8voolffwjQhcY4haMotxomzPVjfJm7ylnHdF/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png", // New image
    expertise: ["React", "Node.js", "Web Security"],
    experience: "9+ years",
  },
  // Adding two more for variety and better loop effect
  {
    name: "Vikram Singh",
    role: "DevOps Engineer",
    company: "Netflix",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&h=300&fit=crop",
    expertise: ["AWS", "Docker", "Kubernetes"],
    experience: "7+ years",
  },
  {
    name: "Anjali Verma",
    role: "Data Scientist",
    company: "IBM",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
    expertise: ["Machine Learning", "Python", "Big Data"],
    experience: "6+ years",
  },
];

// Duplicate mentors to create a seamless infinite scroll effect
const mentors = [...originalMentors, ...originalMentors, ...originalMentors];

export const MentorsSection = () => {
  const scrollRef = useRef(null);
  const xTranslation = useMotionValue(0); // This will control the horizontal scroll
  const [isHovered, setIsHovered] = useState(false);
  const [itemWidth, setItemWidth] = useState(0); // To store the width of a single mentor card
  const [animationDuration, setAnimationDuration] = useState(60); // Initial duration

  useEffect(() => {
    // Calculate the width of a single item to determine scroll distance
    if (scrollRef.current && originalMentors.length > 0) {
      const firstItem = scrollRef.current.children[0];
      if (firstItem) {
        setItemWidth(firstItem.clientWidth + 24); // Card width + gap (tailwind gap-6 is 24px)
      }
    }

    // Adjust animation duration based on number of items and item width
    if (itemWidth > 0) {
      const totalOriginalWidth = originalMentors.length * itemWidth;
      // Duration is proportional to the total width to maintain constant speed
      setAnimationDuration(totalOriginalWidth / 50); // Adjust 50 for desired speed (lower = faster)
    }
  }, [itemWidth]); // Recalculate if itemWidth changes

  useEffect(() => {
    if (!itemWidth || isHovered) return; // Don't start if itemWidth isn't calculated or if hovered

    const finalPosition = -(originalMentors.length * itemWidth); // Scroll one full set of original mentors
    const controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: animationDuration,
      repeat: Infinity,
      repeatType: "loop",
      onComplete: () => {
        // This onComplete might not fire due to repeat:Infinity,
        // but if it were to, it ensures a smooth loop start.
      },
    });

    return () => controls.stop(); // Clean up animation on component unmount
  }, [itemWidth, isHovered, animationDuration]); // Re-run effect if itemWidth or hover state changes

  // Variants for section header
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section 
      id="mentors" 
      className="py-16 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Learn from the Best
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our mentors have worked at top tech companies and are passionate about teaching
          </p>
        </motion.div>

        {/* --- Infinite Scroll Track --- */}
        <div className="relative overflow-hidden py-4"> {/* Added padding for visual breathing room */}
          <motion.div
            ref={scrollRef}
            style={{ x: xTranslation }} // Apply the animated x position
            className="flex gap-6 will-change-transform" // Use gap for spacing between cards
          >
            {mentors.map((mentor, index) => (
              <motion.div
                key={index} // Use index here because items are duplicated
                className="flex-shrink-0 w-80 lg:w-96" // Fixed width for each card, adjust as needed
              >
                <Card className="group h-full hover:shadow-glow-lg transition-all duration-300 overflow-hidden border dark:border-gray-700">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                      <p className="text-sm text-primary font-medium mb-1">{mentor.role}</p>
                      <p className="text-sm text-muted-foreground mb-3">{mentor.company}</p>
                      
                      <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-wrap gap-1">
                          {mentor.expertise.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {mentor.experience} experience
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};