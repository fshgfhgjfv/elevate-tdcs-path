import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Card } from "@/components/ui/card"; // Assuming this is a basic Card container

const mentors = [
  {
    name: "Dibyajit Ghosh",
    role: "Tech & Mentor",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEjvnQ-XVDQqDgH-7EK9Ly0kFPzidegGH5pEn8j3z2zekuxoY_mLkPGhgc70nTzGnY8KLuDuLCjrVSM3xvpQWX8miuzk9NwrFkzy3CztocerwCVTnka36nKHr4KT1pTTcVhhibfQQA9O7VChuL6GOUVEJ9E9_RuDi8yDUecEtd-qLtl0gSOLX2ZnZvUgtRpe",
    expertise: [
      "Forensic",
      "Data Security",
      "Cyber Security",
      "Penetration Testing",
    ],
    description:
      "Expert in Forensic, Data Security, Cyber Security, and Penetration Testing with a deep understanding of modern cyber defense strategies and investigation techniques.",
  },
  {
    name: "Shivam Singh",
    role: "COO",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEgrwmLkO5Feodxq5QaY_atrGnsO9pqgfFM05kadDK8NB_24j-cIBsML47l20CtYES_Zfa4jUVR24_u4po_QnjcsO4yiRZUlpESCdAb2JVdbzkhp3gaU55kpGn_v-EUQaxkosCtzSR3-0eyjtW4m9gkglNME7wzxffg-A0kX98SqspAZNX1Aep3Wf-OgGpoP",
    expertise: [
      "Reverse Engineering",
      "Social Engineering",
      "Bug Bounty",
      "Python",
    ],
    description:
      "MBA in Finance passionate about cybersecurity and technology. Experienced in Reverse Engineering, Social Engineering, Bug Bounty, and Python Development — blending business insight with technical skill.",
  },
  {
    name: "Tushar Bhakta",
    role: "CMO",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEhPcY7OD_gvFPpSHxxFdNsKjh7B0YsN4dDz2DATlkBPxrfHB1s1vJuSY6ivppjiUWBLJgnaHmag-MT1j5dY3ogIZnmk8XUANyMirIM2KFEX0NU7IOem0cxXU3JZz181SdNAfMxSn0UvfmB0B_0binfWdGEjveahWjhfSjJ5COdckX94i6iZxkBBB4akTyyz",
    expertise: ["SOC Analysis", "Bug Bounty", "Cyber Strategy"],
    description:
      "CMO with expertise in SOC Analysis, Bug Bounty, and Cybersecurity strategy — integrating marketing innovation with advanced security knowledge.",
  },
];

const scrollingMentors = [...mentors, ...mentors]; // for infinite loop

export const MentorsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});
  const [isPaused, setIsPaused] = useState(false); // New state to control animation pause
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  // --- Animation Control (Pause/Resume) ---

  const startAnimation = useCallback((totalWidth: number) => {
    if (controlsRef.current) controlsRef.current.stop();

    controlsRef.current = animate(x, [x.get(), -totalWidth], {
      duration: 60,
      ease: "linear",
      repeat: Infinity,
      // If the current value of x is already at the end of a loop, reset it
      onRepeat: () => {
        if (Math.abs(x.get()) >= totalWidth) {
            x.set(0);
        }
      },
    });
  }, [x]);

  const pauseAnimation = useCallback(() => {
    if (controlsRef.current) {
        controlsRef.current.stop();
        setIsPaused(true);
    }
  }, []);

  // --- Main Animation Effect ---
  useEffect(() => {
    if (!itemWidth || isPaused) return;

    const totalWidth = mentors.length * itemWidth;
    startAnimation(totalWidth);

    return () => {
      if (controlsRef.current) controlsRef.current.stop();
    };
  }, [itemWidth, isPaused, startAnimation]);

  // Measure width of one card for animation distance
  useEffect(() => {
    if (scrollRef.current) {
      // Find the first card element. The card's width is w-80 (320px) + gap-6 (24px)
      // For safety, we use the actual measured width + gap.
      const firstItem = scrollRef.current.children[0] as HTMLElement;
      // Get the width of the card element itself (w-80 = 320px)
      const cardWidth = firstItem ? firstItem.offsetWidth : 320; 
      // Add the gap (gap-6 in TailwindCSS is 1.5rem or 24px)
      const gapWidth = 24; 

      if (cardWidth) setItemWidth(cardWidth + gapWidth);
    }
  }, []);
  
  // --- Interaction Handlers ---

  // Handle mobile tap flip toggle
  const handleFlip = (index: number) => {
    setFlipped((prev) => {
      const isCurrentlyFlipped = !prev[index];
      
      // Pause/Resume scrolling based on flip state
      if (isCurrentlyFlipped) {
        pauseAnimation();
      } else if (Object.values(prev).filter(v => v).length === 1) {
        // Only resume if this was the last flipped card
        setIsPaused(false);
      }
      
      return { ...prev, [index]: isCurrentlyFlipped };
    });
  };

  // Handle desktop mouse enter/leave
  const handleMouseEnter = () => {
    pauseAnimation();
  };

  const handleMouseLeave = () => {
    // Only resume if no cards are currently flipped by mobile tap
    if (Object.values(flipped).every(v => !v)) {
        setIsPaused(false);
    }
  };

  // The CSS in the JSX is updated to fix the backward text and ensure 3D perspective

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600 mb-4">
          Meet Our Experts 👨‍💻
        </h2>
        <p className="text-lg text-muted-foreground">
          Learn from industry professionals in **cybersecurity and forensics**
        </p>
      </div>

      {/* Scrolling Mentor Cards */}
      <div className="overflow-hidden">
        <motion.div
          ref={scrollRef}
          style={{ x }}
          className="flex gap-6 will-change-transform"
          onMouseEnter={handleMouseEnter} // Pause scroll on hover
          onMouseLeave={handleMouseLeave} // Resume scroll on unhover
        >
          {scrollingMentors.map((mentor, index) => {
            const isFlipped = flipped[index];
            return (
              <div
                key={index}
                // IMPORTANT: The perspective must be on the parent of the flippable element
                className="flex-shrink-0 w-80 perspective-[1000px]" 
                // Using onClick for mobile, hover styles for desktop
                onClick={() => handleFlip(index)} 
              >
                <Card
                  className={`
                    relative w-full h-96 border dark:border-gray-700 
                    transition-transform duration-700 [transform-style:preserve-3d]
                    ${isFlipped ? "[transform:rotateY(180deg)]" : ""} 
                    // New hover class for desktop flip:
                    group-hover:[transform:rotateY(180deg)] cursor-pointer 
                  `}
                >
                  {/* Front Side */}
                  <div 
                    className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center rounded-xl overflow-hidden"
                  >
                    {/* The image should display correctly as it's a standard URL */}
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-64 object-cover" // Removed rounded-t-xl for full Card size
                      onError={(e) => {
                          e.currentTarget.onerror = null; 
                          e.currentTarget.src="https://via.placeholder.com/320x256?text=Image+Not+Found"; // Fallback image
                      }}
                    />
                    <div className="p-4 text-center w-full">
                      <h3 className="text-xl font-semibold">{mentor.name}</h3>
                      <p className="text-primary text-sm">{mentor.role}</p>
                      <div className="flex flex-wrap gap-1 mt-2 justify-center">
                        {mentor.expertise.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-secondary text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div 
                    className="absolute inset-0 p-5 text-left bg-background border rounded-xl 
                    [transform:rotateY(180deg)] 
                    // FIX 1: [backface-visibility:hidden] is already on the front, but we need [transform:rotateY(180deg)]
                    // FIX 2: Correct the orientation of the text on the back side
                    [backface-visibility:hidden] 
                    flex flex-col justify-center"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      {mentor.name}
                    </h3>
                    <p className="text-sm mb-3 font-medium">{mentor.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {mentor.description}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};