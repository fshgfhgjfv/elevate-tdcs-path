import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}

export const CourseCard = ({ id, title, description, price, thumbnail, category }: CourseCardProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen"> {/* Center wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={`/courses/${id}`} className="block h-full">
          <Card className="h-full shadow-glow hover:shadow-glow-lg transition-all duration-300 overflow-hidden cursor-pointer">
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
