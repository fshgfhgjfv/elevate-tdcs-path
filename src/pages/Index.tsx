import { motion, Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Book, HardHat, BarChart } from "lucide-react";

// --- Animation Variants ---

const pageContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

// Mock data
const overviewStats = [
  {
    title: "Total Students",
    value: "1,250",
    icon: Users,
    change: "+12%",
    changeColor: "text-green-500",
  },
  {
    title: "Available Courses",
    value: "48",
    icon: Book,
    change: "+2 new",
    changeColor: "text-green-500",
  },
  {
    title: "Hardware Kits",
    value: "Coming Soon",
    icon: HardHat,
    change: "4 types",
    changeColor: "text-orange-500",
  },
  {
    title: "Average Score",
    value: "15.2 pts",
    icon: BarChart,
    change: "-0.5%",
    changeColor: "text-red-500",
  },
];

const Index = () => {
  const currentUsername = "Manish Pande";

  return (
    <motion.div
      // Mobile: p-4, Desktop: p-8. min-h-screen ensures full height.
      className="min-h-screen bg-background p-4 md:p-8 pb-20" 
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto max-w-7xl space-y-6 md:space-y-8">
        {/* === Header === */}
        <motion.div variants={itemVariants} className="space-y-2">
          {/* Mobile: text-2xl, Desktop: text-4xl */}
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            Welcome back, {currentUsername}!
          </h1>
          {/* Mobile: text-sm, Desktop: text-lg */}
          <p className="text-sm md:text-lg text-muted-foreground">
            Here's your overview of the platform's activity.
          </p>
        </motion.div>

        {/* === Overview Stats Grid === */}
        <motion.div
          // Mobile: 1 col, Tablet (sm): 2 cols, Desktop (lg): 4 cols
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          variants={itemVariants}
        >
          {overviewStats.map((stat) => (
            <Card key={stat.title} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.changeColor || "text-muted-foreground"}`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* === Dashboard Placeholder === */}
        <motion.div variants={itemVariants}>
          <Card className="h-64 md:h-96 flex items-center justify-center border-dashed bg-muted/20">
            <CardContent className="text-center">
              <p className="text-sm md:text-base text-muted-foreground">
                Additional dashboard widgets (Charts, Activity Feed) will appear here.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;