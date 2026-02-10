import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Target, Eye, Users, ArrowRight, Zap, Globe, Shield, Youtube, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Utility Components ---
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
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

function useInView(ref: React.RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
}

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
      className={cn("relative", className)}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-background/90" />
    <motion.div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "4rem 4rem",
      }}
      animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
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
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const cards = [
    { title: "Mission", icon: Target, color: "text-blue-500", desc: "Bridging the education-employment gap with high-impact, hands-on tactical training." },
    { title: "Vision", icon: Eye, color: "text-purple-500", desc: "Forging India's premier ecosystem for cybersecurity innovation and technical mastery." },
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
            className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground"
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

        {/* --- About Us Section: Photo Right, Description Left --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Who We <span className="text-primary">Are</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            {/* Left: Description */}
            <div className="space-y-5">
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">TDCS Technologies</strong> is a leading cybersecurity education and services company based in India. We provide hands-on training programs, professional tools, and real-world security solutions to students and professionals worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to bridge the gap between academic learning and industry requirements. With 35,000+ students trained and 5,000+ placements, we are building India's largest cybersecurity community.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From ethical hacking courses to pre-programmed hardware tools, from software services to legal advisory — we are a one-stop ecosystem for the next generation of cyber defenders.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://youtube.com/@TDCS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                >
                  <Youtube className="w-5 h-5" />
                  YouTube
                </a>
                <a
                  href="https://instagram.com/TDCS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
              </div>
            </div>

            {/* Right: Photo */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-2xl" />
              <img
                src="https://blogger.googleusercontent.com/img/a/AVvXsEh6t9BjBO7igeafdAkeEQW1JNA1TAfi2lIR0Nr857ozJmsC-qPIm9m2BbQi8JkDD3TmGVuyKAyxnIc88lETBh18Xia9FqGTkGdtzD7215GLuqRBIhm9UCh7F4FDB9BsKHg78TKGkSUfCtTHefuZ5LwuXqdGLzO50ulgxWj2b-6gGAZJHE15AEKDUnwStMAm"
                alt="TDCS Technologies"
                className="relative w-full rounded-2xl border border-border shadow-xl object-cover aspect-square"
              />
            </div>
          </div>
        </motion.div>

        {/* --- Stats Strip --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-border/30 py-10 bg-muted/10 backdrop-blur-sm rounded-xl">
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
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {cards.map((item, index) => (
            <TiltCard key={index} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="h-full p-8 rounded-2xl bg-gradient-to-br from-card/50 to-background border border-border/30 backdrop-blur-md shadow-2xl hover:border-primary/50 transition-colors group"
              >
                <div className="mb-6 relative">
                  <div className={`absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${item.color.replace('text', 'bg')}`} />
                  <item.icon className={`w-12 h-12 ${item.color} relative z-10`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* --- Story Section --- */}
        <motion.div style={{ y }} className="relative max-w-5xl mx-auto">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />

          <div className="relative rounded-3xl border border-border/30 bg-card/30 backdrop-blur-xl p-8 md:p-16 overflow-hidden">
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
                  className="mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold flex items-center gap-2 group hover:shadow-lg transition-all"
                >
                  Join the Revolution <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <div className="relative">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full aspect-square rounded-full border border-dashed border-border/30 relative flex items-center justify-center"
                >
                  <div className="w-2/3 h-2/3 rounded-full border border-border/20" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl" />
                  <div className="absolute text-5xl font-black text-muted-foreground/10 z-0">TDCS</div>
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
