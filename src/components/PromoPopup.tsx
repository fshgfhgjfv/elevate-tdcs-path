import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import promoImg from "@/assets/promo-popup.png";

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-lg w-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="absolute -top-3 -right-3 z-10 bg-background border border-border rounded-full p-1.5 shadow-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={promoImg}
              alt="Special Offer - Cyber Master's Pro Black-Hat Lite for ₹49"
              className="w-full rounded-xl shadow-2xl hover:shadow-primary/20 transition-shadow"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
