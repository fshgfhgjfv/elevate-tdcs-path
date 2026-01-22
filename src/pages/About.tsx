import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Target, Eye, Users, ArrowRight, Zap, Globe, Shield } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a standard shadcn utility or clsx/tailwind-merge

// --- Utility Components ---

// 1. Animated Counter for Stats
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef); // Custom hook or framer's whileInView logic

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const incrementTime = (duration / end) * 1000;
      
      // Simple easing logic for large numbers
      let timer = setInterval(() => {
        start += Math.ceil(end / 100);
        if (start > end) start = end;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}+</span>;
};

// Helper for InView (Simple version)
function useInView(ref: React.RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
}

// 2. 3D Tilt Card Component
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  return (
    <motion.div
      className={cn("relative preserve-3d", className)}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

// 3. Background Grid Animation
const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-background/90" />
    <motion.div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: "linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(to right, #4f46e5 1px, transparent 1px)",
        backgroundSize: "4rem 4rem",
      }}
      animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    {/* Floating Orbs */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px]"
      animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]"
      animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.5, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// --- Main Component ---

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Parallax effect

  const cards = [
    { title: "Mission", icon: Target, color: "text-blue-500", desc: "Bridging the education-employment gap with high-impact, hands-on tactical training." },
    { title: "Vision", icon: Eye, color: "text-purple-500", desc: "Forging India’s premier ecosystem for cybersecurity innovation and technical mastery." },
    { title: "Community", icon: Users, color: "text-green-500", desc: "A global network of 35k+ alumni leading the charge in top-tier tech firms." },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden text-foreground">
      <AnimatedBackground />

      <div className="container mx-auto px-4 pt-32 pb-24 relative z-10">
        
        {/* --- Hero Section --- */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <span className="relative px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest backdrop-blur-md">
              Innovate. Secure. Deploy.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_auto] animate-gradient"
            style={{ animation: "gradient 8s linear infinite" }}
          >
            About TDCS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
          >
            Empowering futures through <span className="text-foreground font-semibold border-b-2 border-primary/50">Cybersecurity</span>,{" "}
            <span className="text-foreground font-semibold border-b-2 border-primary/50">Software</span>, and{" "}
            <span className="text-foreground font-semibold border-b-2 border-primary/50">Career Excellence</span>.
          </motion.p>
        </div>

        {/* --- Stats Strip --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-white/10 py-10 bg-white/5 backdrop-blur-sm">
          {[
            { label: "Students Trained", value: 35000, icon: Users },
            { label: "Placements", value: 5000, icon: Zap },
            { label: "Partners", value: 50, icon: Shield },
            { label: "Countries", value: 12, icon: Globe },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary/70" />
              <div className="text-3xl md:text-4xl font-bold font-mono">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* --- 3D Cards Section --- */}
        <div className="grid md:grid-cols-3 gap-8 mb-32 perspective-1000">
          {cards.map((item, index) => (
            <TiltCard key={index} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="h-full p-8 rounded-2xl bg-gradient-to-br from-card/50 to-background border border-white/10 backdrop-blur-md shadow-2xl hover:border-primary/50 transition-colors group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="transform translate-z-20 mb-6 relative">
                  <div className={`absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${item.color.replace('text', 'bg')}`} />
                  <item.icon className={`w-12 h-12 ${item.color} relative z-10`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 transform translate-z-10 text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed transform translate-z-10">
                  {item.desc}
                </p>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* --- Story Section with Glassmorphism --- */}
        <motion.div
          style={{ y }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Decorative elements behind the card */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />

          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-16 overflow-hidden">
            {/* Shimmer Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-4xl md:text-5xl font-bold mb-8"
                >
                  The <span className="text-primary">Origin</span> Code
                </motion.h2>
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p>
                    <strong className="text-foreground">TDCS Technologies</strong> wasn't built in a boardroom. It was built in a terminal. Born from a necessity to bridge the widening chasm between academic theory and industry reality.
                  </p>
                  <p>
                    We deploy <span className="text-primary font-medium">military-grade discipline</span> in our training modules, focusing on 
                    <span className="text-primary font-medium"> Cybersecurity, DevSecOps,</span> and <span className="text-primary font-medium">Next-Gen Tech</span>.
                  </p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold flex items-center gap-2 group hover:shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all"
                >
                  Join the Revolution <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <div className="relative">
                {/* Abstract graphic representing the story */}
                <motion.div
                   initial={{ rotate: 0 }}
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="w-full aspect-square rounded-full border border-dashed border-white/20 relative flex items-center justify-center"
                >
                    <div className="w-2/3 h-2/3 rounded-full border border-white/10 animate-spin-slow" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl" />
                    <div className="absolute text-5xl font-black text-white/5 z-0">TDCS</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;