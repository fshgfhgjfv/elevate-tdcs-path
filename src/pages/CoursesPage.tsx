import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Shield, 
  Bug, 
  Zap, 
  CheckCircle, 
  Clock, 
  Users,
  Star
} from "lucide-react";

const coursesData = [
  {
    id: "cyber-lite",
    name: "Cyber Master's Pro Lite",
    price: 499,
    originalPrice: 1999,
    description: "Foundational ethical hacking & network security program for beginners.",
    icon: Shield,
    color: "from-blue-500 to-cyan-500",
    duration: "4 Weeks",
    students: "500+",
    rating: 4.5,
    features: [
      "Network Security Basics",
      "Introduction to Linux",
      "Basic Penetration Testing",
      "Vulnerability Assessment",
      "Certificate on Completion",
    ],
  },
  {
    id: "cyber-blackhat",
    name: "Cyber Master's Pro Black Hat",
    price: 19999,
    originalPrice: 49999,
    description: "Advanced penetration testing & red team operations mastery program.",
    icon: Zap,
    color: "from-red-500 to-orange-500",
    duration: "16 Weeks",
    students: "200+",
    rating: 4.9,
    features: [
      "Advanced Penetration Testing",
      "Red Team Operations",
      "Malware Analysis",
      "Social Engineering",
      "Real-world Projects",
      "Lifetime Access",
      "1-on-1 Mentorship",
    ],
    popular: true,
  },
  {
    id: "bug-hunting",
    name: "Bug Hunting & Penetration Testing",
    price: 6999,
    originalPrice: 14999,
    description: "Professional bug bounty hunting & vulnerability assessment training.",
    icon: Bug,
    color: "from-purple-500 to-pink-500",
    duration: "8 Weeks",
    students: "300+",
    rating: 4.7,
    features: [
      "Bug Bounty Methodology",
      "Web Application Security",
      "API Security Testing",
      "Mobile App Testing",
      "Report Writing",
      "Platform Access",
    ],
  },
];

const CoursesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Our Courses</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master <span className="text-primary">Cybersecurity</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect program to start your journey in ethical hacking and cybersecurity
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course, index) => {
            const Icon = course.icon;
            
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full relative overflow-hidden ${course.popular ? "border-primary border-2" : ""}`}>
                  {course.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary">Most Popular</Badge>
                    </div>
                  )}
                  
                  {/* Gradient Header */}
                  <div className={`h-32 bg-gradient-to-r ${course.color} flex items-center justify-center`}>
                    <Icon className="h-16 w-16 text-white" />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{course.name}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        {course.rating}
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA */}
                    <Button 
                      className="w-full mt-4" 
                      size="lg"
                      onClick={() => navigate(`/enroll/${course.id}`)}
                    >
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-muted/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose TDCS Academy?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1000+</div>
                <p className="text-muted-foreground">Students Trained</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <p className="text-muted-foreground">Support</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <p className="text-muted-foreground">Practical Learning</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesPage;
