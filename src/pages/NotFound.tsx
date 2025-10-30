import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const LOGO_URL =
  "https://blogger.googleusercontent.com/img/a/AVvXsEh6t9BjBO7igeafdAkeEQW1JNA1TAfi2lIR0Nr857ozJmsC-qPIm9m2BbQi8JkDD3TmGVuyKAyxnIc88lETBh18Xia9FqGTkGdtzD7215GLuqRBIhm9UCh7F4FDB9BsKHg78TKGkSUfCtTHefuZ5LwuXqdGLzO50ulgxWj2b-6gGAZJHE15AEKDUnwStMAm";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-gray-900 to-black text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-glow p-10 max-w-md w-full"
      >
        {/* Logo */}
        <motion.img
          src={LOGO_URL}
          alt="TDCS Logo"
          className="mx-auto mb-6 h-20 w-auto rounded-full shadow-glow"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
        />

        {/* 404 Text */}
        <motion.h1
          className="text-6xl font-bold text-primary mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-xl text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Oops! The page you’re looking for doesn’t exist.
        </motion.p>

        {/* Return Home Button */}
        <Link to="/">
          <Button
            variant="gradient"
            size="lg"
            className="flex items-center gap-2 mx-auto mt-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>

        {/* Path Info */}
        <motion.p
          className="text-sm text-gray-400 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="font-mono text-xs">{location.pathname}</span> is not a valid route.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
