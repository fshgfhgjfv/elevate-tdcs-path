import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Card } from "@/components/ui/card";

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

  // Measure width of one card for animation distance
  useEffect(() => {
    if (scrollRef.current) {
      const firstItem = scrollRef.current.children[0] as HTMLElement;
      if (firstItem) setItemWidth(firstItem.offsetWidth + 24);
    }
  }, []);

  // Continuous horizontal scrolling (right → left)
  useEffect(() => {
    if (!itemWidth) return;
    const totalWidth = mentors.length * itemWidth;
    const controls = animate(x, [0, -totalWidth], {
      duration: 60,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [itemWidth]);

  // Handle mobile tap flip toggle
  const handleFlip = (index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Meet Our Experts
        </h2>
        <p className="text-lg text-muted-foreground">
          Learn from industry professionals in cybersecurity and forensics
        </p>
      </div>

      {/* Scrolling Mentor Cards */}
      <div className="overflow-hidden">
        <motion.div
          ref={scrollRef}
          style={{ x }}
          className="flex gap-6 will-change-transform"
        >
          {scrollingMentors.map((mentor, index) => {
            const isFlipped = flipped[index];
            return (
              <div
                key={index}
                className="flex-shrink-0 w-80 perspective-1000"
                onClick={() => handleFlip(index)} // tap to flip (mobile)
              >
                <Card
                  className={`relative w-full h-96 border dark:border-gray-700 transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  } hover:[transform:rotateY(180deg)] cursor-pointer`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-64 object-cover rounded-t-xl"
                    />
                    <div className="p-4 text-center">
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
                  <div className="absolute inset-0 p-5 text-left bg-background border rounded-xl [transform:rotateY(180deg)] backface-hidden flex flex-col justify-center">
                    <h3 className="text-lg font-semibold mb-2">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-primary mb-3">{mentor.role}</p>
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
