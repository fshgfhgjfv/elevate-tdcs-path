import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price?: number;
  thumbnail: string;
  category: string;
  comingSoon?: boolean;
}

const AnimatedCard = ({ id, title, description, price, thumbnail, category, comingSoon }: CourseCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu relative ${comingSoon ? "pointer-events-none opacity-70" : ""}`}
    >
      <Link to={comingSoon ? "#" : `/courses/${id}`} className="block h-full">
        <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer rounded-2xl bg-background/80 backdrop-blur-md border border-white/10">
          <div className="h-48 overflow-hidden relative">
            <img
              src={thumbnail}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                comingSoon ? "blur-sm scale-105" : "hover:scale-110"
              }`}
            />
            {comingSoon && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <span className="text-white text-lg font-semibold">Coming Soon</span>
              </div>
            )}
          </div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs px-3 py-1 rounded-full bg-muted text-primary font-semibold">
                {category}
              </span>
              {!comingSoon && (
                <span className="text-xl font-bold text-primary">₹{price?.toLocaleString()}</span>
              )}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white" disabled={comingSoon}>
              {comingSoon ? "Coming Soon" : "View Details"}
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export const CourseShowcase = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/40 p-10">
      <h2 className="text-3xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
        Explore Our Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000">
        <AnimatedCard
          id="1"
          title="Ethical Hacking Masterclass"
          description="Learn penetration testing and cybersecurity fundamentals."
          price={1499}
          thumbnail="/images/hacking.jpg"
          category="Cybersecurity"
        />
        <AnimatedCard
          id="2"
          title="Red Teaming"
          description="Advanced offensive security and adversary emulation training."
          thumbnail="/images/red-team.jpg"
          category="Offensive Security"
          comingSoon
        />
        <AnimatedCard
          id="3"
          title="Blue Teaming"
          description="Defensive operations, threat hunting, and incident response."
          thumbnail="/images/blue-team.jpg"
          category="Defensive Security"
          comingSoon
        />
      </div>
    </div>
  );
};
