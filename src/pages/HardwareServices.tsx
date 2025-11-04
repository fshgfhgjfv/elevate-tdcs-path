import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Cpu, Wifi, Shield } from "lucide-react";

const hardwareItems = [
  { title: "Hacking Gadgets", icon: Shield },
  { title: "Pentesting Tools", icon: Wrench },
  { title: "Raspberry Pi Kits", icon: Cpu },
  { title: "WiFi Jammer Devices", icon: Wifi },
];

// --- Animation Variants ---

// 1. Variants for the page container to stagger its children
const pageContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger header, notice, and grid
    },
  },
};

// 2. Variants for the items inside the page (header, notice)
const pageItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

// 3. Variants for the grid container to stagger the cards
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger each card
    },
  },
};

// 4. Variants for the individual cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.03, // Card lifts up
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

// 5. Variants for the "Coming Soon" overlay
const overlayVariants: Variants = {
  initial: { opacity: 0, y: "100%" },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// 6. Variants for the icon inside the card
const iconVariants: Variants = {
  initial: { opacity: 0.7, scale: 1 },
  hover: {
    opacity: 1,
    scale: 1.2,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// --- Component ---

const HardwareServices = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        className="container mx-auto px-4 text-center"
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.div className="mb-10" variants={pageItemVariants}>
          <h1 className="text-4xl font-bold animated-gradient-text mb-3">
            Hardware Services
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our upcoming lineup of cybersecurity hardware and tools.
          </p>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div className="mb-10" variants={pageItemVariants}>
          <span className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md">
            🚧 Coming Soon 🚧
          </span>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center"
          variants={gridContainerVariants}
          initial="hidden"
          // This triggers the animation when the grid scrolls into view
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Animate once when 30% is visible
        >
          {hardwareItems.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover="hover" // Triggers the "hover" state for this and all children
              initial="initial" // Children will inherit this
            >
              <Card className="relative backdrop-blur-md border-2 border-primary/20 shadow-lg overflow-hidden group h-full">
                <CardHeader>
                  <motion.div
                    className="flex justify-center"
                    // Add a subtle, infinite "floating" animation
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3, // Stagger the start of the float
                    }}
                  >
                    <motion.div variants={iconVariants}>
                      <item.icon className="h-10 w-10 text-primary" />
                    </motion.div>
                  </motion.div>
                  <CardTitle className="text-lg mt-3">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* This overlay now animates based on the parent's "hover" state */}
                  <motion.div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    variants={overlayVariants}
                  >
                    <span className="text-white font-semibold text-sm tracking-widest">
                      COMING SOON
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HardwareServices;


.animated-gradient-text {
  background: linear-gradient(
    -45deg,
    #ff6b6b, // Primary-like red
    #f06595, // Pink
    #845ef7, // Primary-like purple
    #339af0, // Blue
    #22b8cf, // Teal
    #ff6b6b
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-flow 15s ease infinite;
}

@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

