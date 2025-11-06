import { Menu, X, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
// Import 'Link' removed, 'useLocation' kept for 'isActive' styling
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Typewriter component for the main title (left to right)
// Removed TypeScript type annotations
const TypewriterTitle = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
};

// Typewriter component for the tagline (right to left, looping)
// Removed TypeScript type annotations
const TypewriterTagline = ({ text, className, speed = 80 }) => {
  const [displayText, setDisplayText] = useState('');
  const indexRef = useRef(0);
  const forwardRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = indexRef.current;
      const forward = forwardRef.current;

      if (forward) {
        indexRef.current = index + 1;
        setDisplayText(text.slice(0, index + 1));
        if (index + 1 === text.length) forwardRef.current = false;
      } else {
        indexRef.current = index - 1;
        setDisplayText(text.slice(0, index - 1));
        if (index - 1 <= 0) forwardRef.current = true;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Removed TypeScript type annotation
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/98 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <motion.div className="flex flex-col items-center md:items-start" whileHover={{ scale: 1.02 }}>
            {/* Replaced Link with a div, it no longer links to '/' */}
            <div className="flex flex-col items-center md:items-start cursor-default">
              {/* This inner div keeps the logo and title on the same line */}
              <div className="flex items-center space-x-3">
                <motion.img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMTAyWcLA1v-12B7LaUlPTXd6x9u6_TMqE6I_fuzRglv1D9vKhEZGi8kpJy7_2A4spT3ZXKhRS7AMK_mHKj865QnDKT_bf7mmmpgV-5xFWFE4O7EtbMx4pa29NznnWoPRIbrC737B7JMbPrFR_ZhoFX-PZPFsmLZRhY-fx1dBkxd28GYncwjr8X0wc8bH7/s370/Screenshot_2025-10-07_170427-removebg-preview.png"
                  alt="ShikhoTech Academy Logo"
                  className="h-16 w-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                />
                <TypewriterTitle
                  text="ShikhoTech Academy" // ✅ Removed leading space
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
                />
              </div>
              {/* The tagline is now inside the div, but on its own line */}
              <TypewriterTagline
                text="Build careers of tomorrow"
                className="text-md font-medium text-gray-600 mt-1" // Added mt-1 for spacing
                speed={100}
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 mt-4 md:mt-0">
            {navItems.map((item) => (
              // Replaced Link with an 'a' tag that doesn't navigate
              <a
                key={item.path}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="relative group cursor-default"
              >
                <span className={`font-semibold transition-colors ${isActive(item.path) ? 'text-blue-600' : 'text-gray-700'}`}>
                  {item.label}
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: isActive(item.path) ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
            <motion.button className="p-2 text-gray-700 hover:text-blue-600 transition" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Search className="h-5 w-5" />
            </motion.button>
            {/* Replaced Link with an 'a' tag that doesn't navigate */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg cursor-default"
            >
              Enroll Now
            </a>
          </div>

          <button className="md:hidden mt-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t overflow-hidden"
            >
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  // Replaced Link with an 'a' tag that doesn't navigate
                  <a
                    key={item.path}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                    }}
                    className={`font-semibold ${isActive(item.path) ? 'text-blue-600' : 'text-gray-700'}`}
                  >
                    {item.label}
                  </a>
                ))}
                {/* Replaced Link with an 'a' tag that doesn't navigate */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center shadow-lg"
                >
                  Enroll Now
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}