import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://api.whatsapp.com/send/?phone=919564730432&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-32 z-50"
      initial={{ scale: 0, y: 0 }}
      animate={{ 
        scale: 1,
        y: [0, -10, 0]
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative h-16 w-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl flex items-center justify-center">
          <MessageCircle className="h-8 w-8 text-white" fill="currentColor" />
        </div>
      </div>
    </motion.a>
  );
};