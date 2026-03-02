import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Sparkles, PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import promoImg from "@/assets/promo-popup.png";
import { Button } from "@/components/ui/button";

const PROMO_DISMISSED_KEY = "tdcs_promo_popup_dismissed";

export const PromoPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = sessionStorage.getItem(PROMO_DISMISSED_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem(PROMO_DISMISSED_KEY, "true");
  };

  const handleClick = () => {
    handleClose();
    navigate("/courses/cyber-lite");
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
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 bg-background flex flex-col md:flex-row"
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
                src={promoImg}
                alt="Special Offer - Cyber Master's Pro Black-Hat Lite for ₹49"
                className="w-full h-full object-cover min-h-[250px] md:min-h-[380px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
            </div>

            {/* Right: Welcome & Offer Panel */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="mb-3"
              >
                <PartyPopper className="w-10 h-10 text-orange-400 mx-auto" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 mb-2"
              >
                Happy Holi! 🎨
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground mb-1"
              >
                Welcome! This exclusive offer is just for you
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="my-4 p-3 rounded-xl bg-primary/5 border border-primary/10 w-full"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Cyber Master's Pro Black-Hat Lite
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-muted-foreground line-through text-sm">₹499</span>
                  <span className="text-3xl font-black text-primary">₹49</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Use code: <span className="font-bold text-foreground">NEWSTUDENT85</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2 text-xs text-orange-500 font-semibold mb-4"
              >
                <Sparkles className="w-4 h-4" />
                <span>Offer valid for 15 days only!</span>
                <Sparkles className="w-4 h-4" />
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
                  className="w-full h-12 text-base font-bold rounded-full shadow-lg shadow-primary/30 animate-[pulse_1.5s_ease-in-out_infinite] hover:animate-none hover:scale-105 transition-transform"
                >
                  🎉 Register Now — Only ₹49!
                </Button>
              </motion.div>

              <p className="text-[10px] text-muted-foreground mt-3 opacity-60">
                Limited time Happy Holi celebration offer
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
