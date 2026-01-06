import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, CheckCircle, Users, ArrowRight } from "lucide-react";

interface WhatsAppJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/DjpjRfZl7dI0wVIX9tXuFZ";

export const WhatsAppJoinModal = ({ isOpen, onClose, courseName }: WhatsAppJoinModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleJoinWhatsApp = () => {
    window.open(WHATSAPP_GROUP_LINK, "_blank");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 0.5,
                }}
                className={`absolute w-3 h-3 rounded-sm ${
                  ["bg-green-500", "bg-primary", "bg-yellow-400", "bg-blue-500", "bg-pink-500"][
                    Math.floor(Math.random() * 5)
                  ]
                }`}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Card className="w-full max-w-md shadow-2xl border-green-500/30 bg-gradient-to-br from-background via-background to-green-500/10">
            <CardHeader className="relative pb-2">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
              </div>
              
              <CardTitle className="text-center text-2xl font-bold">
                🎉 Payment Submitted Successfully!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">
                  Thank you for enrolling in
                </p>
                <p className="text-lg font-semibold text-primary">{courseName}</p>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Join Our WhatsApp Community</p>
                    <p className="text-sm text-muted-foreground">Connect with mentors & peers</p>
                  </div>
                </div>
                
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    Get instant doubt resolution
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    Receive class schedules & updates
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    Network with fellow learners
                  </li>
                </ul>
                
                <Button
                  onClick={handleJoinWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Join WhatsApp Group
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-center text-xs text-muted-foreground">
                Our team will verify your payment within 24 hours.
                <br />
                You'll receive access to course materials after verification.
              </p>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={onClose}
              >
                Continue to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
