import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Globe } from "lucide-react";

const founders = [
  {
    name: "Dibyajit Ghosh",
    role: "Founder & CEO (Director of TDCS)",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEjNQhD_FqbzJzTQupYXGoQBA-TyfWRY7LI76n5is3RoKkbKLeSkELjipGiDLQodxlbsFEfhBsyKVKj0sKLXSiPNd2GedCzGcT3DDwxb0fSspFYBWV0Lb6JV5DYj0jrrcjKZ1U1bVDn1gQ4bMdp8WViDpcHEWE8XaAyqAEeqb0rnmlIgg4au8lLLqCPYRxa9",
    bio: "Visionary leader driving future talent.",
    linkedin: "https://linkedin.com",
    website: "https://tdcs.tech",
  },
  {
    name: "Shivam Shing",
    role: "COO",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEgrwmLkO5Feodxq5QaY_atrGnsO9pqgfFM05kadDK8NB_24j-cIBsML47l20CtYES_Zfa4jUVR24_u4po_QnjcsO4yiRZUlpESCdAb2JVdbzkhp3gaU55kpGn_v-EUQaxkosCtzSR3-0eyjtW4m9gkglNME7wzxffg-A0kX98SqspAZNX1Aep3Wf-OgGpoP",
    bio: "",
    linkedin: "https://linkedin.com",
    website: "https://tdcs.tech",
  },
  {
    name: "Tushar Bhakta",
    role: "Chief Marketing Officer (CMO)",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEhPcY7OD_gvFPpSHxxFdNsKjh7B0YsN4dDz2DATlkBPxrfHB1s1vJuSY6ivppjiUWBLJgnaHmag-MT1j5dY3ogIZnmk8XUANyMirIM2KFEX0NU7IOem0cxXU3JZz181SdNAfMxSn0UvfmB0B_0binfWdGEjveahWjhfSjJ5COdckX94i6iZxkBBB4akTyyz",
    bio: "Strategizing market penetration and brand value.",
    linkedin: "https://linkedin.com",
    website: "https://tdcs.tech",
  },
];

// Animated Globe Component
const AnimatedGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const resize = () => {
      const size = isMobile ? 280 : 400;
      canvas.width = size;
      canvas.height = size;
    };
    resize();

    // Network nodes on the globe
    const nodes: { lat: number; lng: number; pulse: number }[] = [];
    for (let i = 0; i < 20; i++) {
      nodes.push({
        lat: (Math.random() - 0.5) * 180,
        lng: Math.random() * 360,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Data streams
    const streams: { startLat: number; startLng: number; endLat: number; endLng: number; progress: number; speed: number }[] = [];
    for (let i = 0; i < 8; i++) {
      streams.push({
        startLat: (Math.random() - 0.5) * 140,
        startLng: Math.random() * 360,
        endLat: (Math.random() - 0.5) * 140,
        endLng: Math.random() * 360,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      });
    }

    // Radar rings
    const radarRings: { progress: number; speed: number }[] = [
      { progress: 0, speed: 0.005 },
      { progress: 0.33, speed: 0.005 },
      { progress: 0.66, speed: 0.005 },
    ];

    const latLngTo3D = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + rotation) * (Math.PI / 180);
      return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
      };
    };

    const project = (x: number, y: number, z: number) => {
      const perspective = 600;
      const scale = perspective / (perspective + z);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      return {
        x: centerX + x * scale,
        y: centerY + y * scale,
        scale,
        visible: z < 0,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = isMobile ? 100 : 140;

      // Radar rings expanding outward
      radarRings.forEach((ring) => {
        ring.progress += ring.speed;
        if (ring.progress > 1) ring.progress = 0;
        
        const ringRadius = radius + ring.progress * 80;
        const opacity = 1 - ring.progress;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Globe atmosphere glow
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.3);
      gradient.addColorStop(0, 'rgba(0, 212, 255, 0.1)');
      gradient.addColorStop(0.5, 'rgba(0, 150, 255, 0.05)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Globe base with gradient
      const globeGradient = ctx.createRadialGradient(centerX - radius * 0.3, centerY - radius * 0.3, 0, centerX, centerY, radius);
      globeGradient.addColorStop(0, 'rgba(20, 40, 80, 0.9)');
      globeGradient.addColorStop(0.7, 'rgba(10, 25, 50, 0.95)');
      globeGradient.addColorStop(1, 'rgba(5, 15, 35, 1)');
      ctx.fillStyle = globeGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Grid lines (latitude)
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
      ctx.lineWidth = 0.5;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lng = 0; lng <= 360; lng += 5) {
          const point = latLngTo3D(lat, lng, radius);
          const projected = project(point.x, point.y, point.z);
          if (lng === 0) {
            ctx.moveTo(projected.x, projected.y);
          } else if (projected.visible) {
            ctx.lineTo(projected.x, projected.y);
          }
        }
        ctx.stroke();
      }

      // Grid lines (longitude)
      for (let lng = 0; lng < 360; lng += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const point = latLngTo3D(lat, lng, radius);
          const projected = project(point.x, point.y, point.z);
          if (lat === -90) {
            ctx.moveTo(projected.x, projected.y);
          } else if (projected.visible) {
            ctx.lineTo(projected.x, projected.y);
          }
        }
        ctx.stroke();
      }

      // Network nodes with pulse
      nodes.forEach((node) => {
        node.pulse += 0.05;
        const point = latLngTo3D(node.lat, node.lng, radius);
        const projected = project(point.x, point.y, point.z);
        
        if (projected.visible) {
          const pulseSize = 3 + Math.sin(node.pulse) * 2;
          
          // Glow
          const nodeGlow = ctx.createRadialGradient(projected.x, projected.y, 0, projected.x, projected.y, pulseSize * 3);
          nodeGlow.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
          nodeGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = nodeGlow;
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, pulseSize * 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Core
          ctx.fillStyle = '#00ffff';
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, pulseSize * projected.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Data streams
      streams.forEach((stream) => {
        stream.progress += stream.speed;
        if (stream.progress > 1) {
          stream.progress = 0;
          stream.startLat = (Math.random() - 0.5) * 140;
          stream.startLng = Math.random() * 360;
          stream.endLat = (Math.random() - 0.5) * 140;
          stream.endLng = Math.random() * 360;
        }

        const currentLat = stream.startLat + (stream.endLat - stream.startLat) * stream.progress;
        const currentLng = stream.startLng + (stream.endLng - stream.startLng) * stream.progress;
        
        const point = latLngTo3D(currentLat, currentLng, radius + 5);
        const projected = project(point.x, point.y, point.z);
        
        if (projected.visible) {
          ctx.fillStyle = `rgba(0, 255, 200, ${0.8 - stream.progress * 0.5})`;
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, 2 * projected.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Globe edge highlight
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      rotation += 0.3;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative flex items-center justify-center"
    >
      <canvas ref={canvasRef} className="relative z-10" />
      {/* Additional glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
      </div>
    </motion.div>
  );
};

// Glassmorphism Card Component
const FounderCard = ({ founder, index }: { founder: typeof founders[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)" 
            : "0 10px 40px -10px rgba(0, 0, 0, 0.3)",
        }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-6"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        }}
      >
        {/* Glow border effect on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50 pointer-events-none"
        />
        
        {/* Floating animation wrapper */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Profile Image */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-md opacity-50" />
            <img
              src={founder.image}
              alt={founder.name}
              className="relative w-24 h-24 rounded-full object-cover border-2 border-cyan-400/50"
            />
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-1">{founder.name}</h3>
            <p className="text-cyan-400 text-sm font-medium mb-3">{founder.role}</p>
            {founder.bio && (
              <p className="text-white/70 text-sm leading-relaxed mb-4">{founder.bio}</p>
            )}
            
            {/* Social Links */}
            <div className="flex justify-center gap-4 pt-2">
              <motion.a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-white/10 hover:bg-cyan-400/20 transition-colors"
              >
                <Linkedin size={18} className="text-cyan-400" />
              </motion.a>
              <motion.a
                href={founder.website}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-white/10 hover:bg-cyan-400/20 transition-colors"
              >
                <Globe size={18} className="text-cyan-400" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const FoundersSection = () => {
  return (
    <section id="founders" className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0a1a 0%, #0f1629 50%, #0a0a1a 100%)" }}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Global Leadership
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Driving innovation in cybersecurity education worldwide
          </p>
        </motion.div>

        {/* Animated Globe Centerpiece */}
        <div className="flex justify-center mb-16">
          <AnimatedGlobe />
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <FounderCard key={index} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
