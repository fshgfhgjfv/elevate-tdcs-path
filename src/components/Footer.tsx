import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from "lucide-react";

const LOGO_URL =
  "https://blogger.googleusercontent.com/img/a/AVvXsEh6t9BjBO7igeafdAkeEQW1JNA1TAfi2lIR0Nr857ozJmsC-qPIm9m2BbQi8JkDD3TmGVuyKAyxnIc88lETBh18Xia9FqGTkGdtzD7215GLuqRBIhm9UCh7F4FDB9BsKHg78TKGkSUfCtTHefuZ5LwuXqdGLzO50ulgxWj2b-6gGAZJHE15AEKDUnwStMAm";

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

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Gallery", path: "/gallery" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact-us" },
    { name: "About", path: "/about" },
    { name: "Verify Certificate", path: "/verify-certificate" },
    { name: "Terms and Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  // Split the links into two columns
  const half = Math.ceil(quickLinks.length / 2);
  const leftLinks = quickLinks.slice(0, half);
  const rightLinks = quickLinks.slice(half);

  return (
    <footer className="bg-muted/30 border-t mt-20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* --- Logo & About --- */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="TDCS Logo" className="h-12 w-auto" />
            </div>
            <h3 className="text-xl font-bold gradient-text mb-4 h-8">
              {typewriterText}
              <span className="animate-blink">|</span>
            </h3>
            <p className="text-muted-foreground mb-5 max-w-md">
              The Training and Placement platform for your career. Get job-ready with
              expert-led courses and participate in our free hiring drives.
            </p>

            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* --- Quick Links (2 Columns) --- */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-8">
              <ul className="space-y-2">
                {leftLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {rightLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- Contact Info --- */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={18} className="text-primary" />
                <a
                  href="mailto:info@tdcs.tech"
                  className="hover:text-primary transition-colors"
                >
                  info@tdcs.tech
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={18} className="text-primary" />
                <a
                  href="tel:+911234567890"
                  className="hover:text-primary transition-colors"
                >
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Line --- */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} TDCS Technologies Private Limited. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
