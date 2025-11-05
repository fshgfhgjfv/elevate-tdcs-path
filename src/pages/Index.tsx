import { motion, Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Book, HardHat, BarChart } from "lucide-react";

// --- Animation Variants ---

// 1. Staggered container for the whole page
const pageContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// 2. Variants for items to fade-in and slide-up
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

// Mock data for the overview cards
const overviewStats = [
  {
    title: "Total Students",
    value: "1,250",
    icon: Users,
    change: "+12%",
  },
  {
    title: "Available Courses",
    value: "48",
    icon: Book,
    change: "+2 new",
  },
  {
    title: "Hardware Kits",
    value: "Coming Soon",
    icon: HardHat,
    change: "4 types",
  },
  {
    title: "Average Score",
    value: "15.2 pts",
    icon: BarChart,
    change: "-0.5%",
  },
];

const Index = () => {
  // Example: Get the current user's name
  // In a real app, you'd get this from auth context
  const currentUsername = "Manish Pande";

  return (
    <motion.div
      className="min-h-screen bg-background p-4 md:p-8"
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* === Header === */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Welcome back, {currentUsername}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's your overview of the platform's activity.
          </p>
        </motion.div>

        {/* === Overview Stats Grid === */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={itemVariants}
        >
          {overviewStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* === Placeholder for additional dashboard sections === */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Additional dashboard features will be added here.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;