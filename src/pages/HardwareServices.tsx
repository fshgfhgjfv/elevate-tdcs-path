import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Cpu, Wifi, Shield } from "lucide-react";

const hardwareItems = [
  { title: "Hacking Gadgets", icon: Shield },
  { title: "Pentesting Tools", icon: Wrench },
  { title: "Raspberry Pi Kits", icon: Cpu },
  { title: "WiFi Jammer Devices", icon: Wifi },
];

const HardwareServices = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 text-center">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold gradient-text mb-3">Hardware Services</h1>
          <p className="text-muted-foreground text-lg">
            Explore our upcoming lineup of cybersecurity hardware and tools.
          </p>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <span className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md">
            🚧 Coming Soon 🚧
          </span>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {hardwareItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="relative backdrop-blur-md border-2 border-primary/20 shadow-lg overflow-hidden group">
                <CardHeader>
                  <div className="flex justify-center">
                    <item.icon className="h-10 w-10 text-primary opacity-70 group-hover:opacity-100 transition-all" />
                  </div>
                  <CardTitle className="text-lg mt-3">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-100 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white font-semibold text-sm tracking-widest">
                      COMING SOON
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HardwareServices;
