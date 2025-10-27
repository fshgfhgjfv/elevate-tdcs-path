import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from "lucide-react";

const LOGO_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEh6t9BjBO7igeafdAkeEQW1JNA1TAfi2lIR0Nr857ozJmsC-qPIm9m2BbQi8JkDD3TmGVuyKAyxnIc88lETBh18Xia9FqGTkGdtzD7215GLuqRBIhm9m2BbQi8JkDD3TmGVuyKAyxnIc88lETBh18Xia9FqGTkGdtzD7215GLuqRBIhm9UCh7F4FDB9BsKHg78TKGkSUfCtTHefuZ5LwuXqdGLzO50ulgxWj2b-6gGAZJHE15AEKDUnwStMAm";
const GRADIENT_TEXT_CLASS = "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";

export const Footer = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "TDCS Technologies Private Limited";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Split the links into two logical groups: Company/Navigation and Legal/Support
  const companyLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Gallery", path: "/gallery" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
  ];
  
  const legalAndSupportLinks = [
    { name: "Contact Us", path: "/contact-us" },
    { name: "Verify Certificate", path: "/verify-certificate" },
    { name: "Terms and Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <footer className="bg-muted/30 dark:bg-gray-900 border-t mt-20 transition-colors duration-500">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & Typewriter */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {/* Added responsive sizing for the logo */}
              <img 
                src={LOGO_URL} 
                alt="TDCS Logo" 
                className="h-10 md:h-12 w-auto rounded-full shadow-lg" 
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/48x48/8C53FF/ffffff?text=TDCS'; e.currentTarget.onerror = null; }}
              />
            </div>
            <h3 className={`text-xl font-bold mb-4 h-8 ${GRADIENT_TEXT_CLASS}`}>
              {typewriterText}
              <span className="animate-blink">|</span>
            </h3>
            <p className="text-muted-foreground dark:text-gray-400 mb-4 max-w-sm text-sm">
              The Training and Placement platform for your career. Get job-ready with expert-led courses or participate in our free hiring drives.
            </p>
            <div className="flex gap-4 mt-4">
              {/* Social Icons with enhanced hover */}
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  aria-label={Icon.displayName}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 transform hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Part 1: Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links Part 2: Legal & Support Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Legal & Support</h4>
            <ul className="space-y-3">
              {legalAndSupportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Connect</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground dark:text-gray-400">
                <Mail size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@tdcs.tech" className="hover:text-primary transition-colors break-words">
                  info@tdcs.tech
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground dark:text-gray-400">
                <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+911234567890" className="hover:text-primary transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              {/* Optional: Add Address Field */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground dark:text-gray-400">
                 {/* Lucide location pin icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5 flex-shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="leading-relaxed">
                  TDCS Campus, 1st Floor, Tech Hub Center, New Delhi, India 110001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6 text-center text-xs text-muted-foreground dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} TDCS Technologies Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
