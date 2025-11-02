import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}

export const CourseCard = ({ id, title, description, price, thumbnail, category }: CourseCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth rotation mapping
  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  // Handle mouse movement for 3D effect
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
    <div className="flex items-center justify-center min-h-screen perspective-[1000px]">
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="transform-gpu"
      >
        <Link to={`/courses/${id}`} className="block h-full">
          <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer rounded-2xl bg-background/80 backdrop-blur-md border border-white/10">
            <div className="h-48 overflow-hidden">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-3 py-1 rounded-full bg-muted gradient-text font-semibold">
                  {category}
                </span>
                <span className="text-xl font-bold gradient-text">₹{price.toLocaleString()}</span>
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="gradient" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </motion.div>
    </div>
  );
};
