import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Wrench, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const TOOLKIT_DISMISSED_KEY = "tdcs_toolkit_popup_dismissed";

export const ToolkitPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = sessionStorage.getItem(TOOLKIT_DISMISSED_KEY);
    if (!dismissed) {
      // Show after promo popup would have appeared (delayed by 8s)
      const timer = setTimeout(() => setOpen(true), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem(TOOLKIT_DISMISSED_KEY, "true");
  };

  const handleClick = () => {
    handleClose();
    navigate("/hardware");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-white/10 bg-background flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 bg-background/80 border border-border rounded-full p-1.5 shadow-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Poster Image */}
            <div
              className="md:w-1/2 cursor-pointer relative group"
              onClick={handleClick}
            >
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-B8SOxqsnttpFJ5pyesgM_l54wDPO1jadC-EHxrsreKKNDbyBEQYiIOPBeWiNCzOjwO7MKuEKEBvNmMhV2wgU0Sk0w4Yf0F7vVoDHO6plk-0uZ5f_CqPPzemKMQW3QbUifrLJU2h9QwcrRRyVQwzCjcQBjQEiMWhNRCp7B1mvnmD_U9tXRj4o9zVLCTDp/s1037/Screenshot%202026-03-08%20194137.png"
                alt="TDCS Toolkit - Advanced Model Services"
                className="w-full h-full object-cover min-h-[250px] md:min-h-[380px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
            </div>

            {/* Right: Info Panel */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="mb-3"
              >
                <Cpu className="w-10 h-10 text-cyan-400 mx-auto" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-2"
              >
                TDCS Toolkit 🛡️
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground mb-1"
              >
                All the advanced model services are here!
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="my-4 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 w-full"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Professional Hardware & Tools
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  {["WiFi Adapter", "Rubber Ducky", "Flipper Zero", "HackRF", "Pico W"].map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2 text-xs text-cyan-500 font-semibold mb-4"
              >
                <Wrench className="w-4 h-4" />
                <span>Get pro tools at student prices!</span>
                <Wrench className="w-4 h-4" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full"
              >
                <Button
                  onClick={handleClick}
                  size="lg"
                  className="w-full h-12 text-base font-bold rounded-full shadow-lg shadow-cyan-500/30 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white animate-[pulse_1.5s_ease-in-out_infinite] hover:animate-none hover:scale-105 transition-transform"
                >
                  🔧 Explore TDCS Toolkit
                </Button>
              </motion.div>

              <p className="text-[10px] text-muted-foreground mt-3 opacity-60">
                Professional-grade cybersecurity hardware
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
