import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, BookOpen, Users } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  duration?: string;
  modules?: string[];
}

export const CourseCard = ({ id, title, description, price, thumbnail, category, duration, modules }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Link to={`/courses/${id}`} className="block h-full">
        <Card className="h-full shadow-glow hover:shadow-glow-lg transition-all duration-300 overflow-hidden cursor-pointer group">
          {/* Larger Image */}
          <div className="h-56 md:h-64 overflow-hidden relative">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute top-4 left-4 text-xs px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground font-semibold backdrop-blur-sm">
              {category}
            </span>
          </div>
          
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {duration}
                  </span>
                )}
                {modules && (
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {modules.length} Modules
                  </span>
                )}
              </div>
              <span className="text-2xl font-bold gradient-text">₹{price.toLocaleString()}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold leading-tight">{title}</h3>
          </CardHeader>
          
          <CardContent className="pb-4">
            <p className="text-muted-foreground line-clamp-2">{description}</p>
            
            {/* Quick highlights */}
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>5000+ students enrolled</span>
            </div>
          </CardContent>
          
          <CardFooter className="pt-0">
            <Button variant="gradient" className="w-full" size="lg">
              View Details
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};
