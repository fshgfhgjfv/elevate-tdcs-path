import React, { useState } from "react";
// import emailjs from "@emailjs/browser"; // Uncomment if using EmailJS setup from previous step

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal = ({ isOpen, onClose }: BookDemoModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Custom CSS for cyber animations
  const cyberStyles = `
    @keyframes cyber-scan {
      0% { background-position: 0% 0%; }
      100% { background-position: 0% 100%; }
    }
    
    @keyframes border-pulse {
        0%, 100% { box-shadow: 0 0 5px #06b6d4, inset 0 0 5px #06b6d4; border-color: #06b6d4; }
        50% { box-shadow: 0 0 20px #06b6d4, inset 0 0 10px #06b6d4; border-color: #22d3ee; }
    }

    .cyber-box-container {
        // Subtle circuit board pattern overlay
        background-image: radial-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px);
        background-size: 20px 20px;
        backdrop-filter: blur(10px);
    }

    .cyber-border-animate {
        animation: border-pulse 3s infinite ease-in-out;
    }

    .cyber-input {
       background: rgba(17, 24, 39, 0.8); /* gray-900 with opacity */
       transition: all 0.3s ease;
    }
    .cyber-input:focus {
       box-shadow: 0 0 10px #06b6d4;
       background: rgba(6, 182, 212, 0.1);
    }
  `;

  const showAlert = (message: string, type: "success" | "error") => {
    // (Keep your existing alert logic here - omitted for brevity in this view)
    console.log(type, message);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // ... (Your existing form submission logic from previous step goes here)
    
    // Simulation for demo purposes:
    setTimeout(() => {
        showAlert("Redirecting...", "success");
        setIsSubmitting(false);
        onClose();
    }, 2000);
  };

  return (
    <>
      <style>{cyberStyles}</style>
      <div
        // Changed backdrop to darker, heavier blur
        className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md cyber-box-container"
        onClick={onClose}
      >
        {/* Cyber Box Container 
           - Removed heavy rounding (rounded-xl -> rounded-lg)
           - Added cyan border and glowing shadow
           - Added the pulse animation class
           - Changed entrance animation to a quick vertical stretch (scale-y)
        */}
        <div
          className="relative bg-gray-900 border-2 border-cyan-500 cyber-border-animate shadow-[0_0_30px_rgba(6,182,212,0.3)] rounded-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-90 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top "Scanner" Line effect */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 animate-pulse"></div>

          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-cyan-900/50 bg-gray-900/50">
            <h3 className="text-xl font-bold text-cyan-400 uppercase tracking-wider drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">
               Generate Access Key // Demo
            </h3>
            <button
              onClick={onClose}
              className="text-cyan-600 hover:text-cyan-300 transition p-1 rounded hover:bg-cyan-900/30"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 relative z-10">
            {/* Input Field Structure Changed */}
            <div>
              <label className="block text-xs font-semibold text-cyan-300/70 uppercase mb-1 tracking-widest">
                [ Identification Name ]
              </label>
              <input
                type="text"
                name="name"
                required
                disabled={isSubmitting}
                // Cyber Input Styling
                className="cyber-input w-full px-4 py-3 border-b-2 border-gray-700 rounded-t-md text-cyan-100 placeholder-cyan-800/50 focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                placeholder="Enter full designation..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-300/70 uppercase mb-1 tracking-widest">
                 [ Comms Frequency / Email ]
              </label>
              <input
                type="email"
                name="email"
                required
                disabled={isSubmitting}
                className="cyber-input w-full px-4 py-3 border-b-2 border-gray-700 rounded-t-md text-cyan-100 placeholder-cyan-800/50 focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                placeholder="user@net.node"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-300/70 uppercase mb-1 tracking-widest">
                 [ Contact Uplink / Mobile ]
              </label>
              <input
                type="tel"
                name="phone"
                pattern="[0-9]{10}"
                required
                disabled={isSubmitting}
                className="cyber-input w-full px-4 py-3 border-b-2 border-gray-700 rounded-t-md text-cyan-100 placeholder-cyan-800/50 focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                placeholder="10-digit sequence"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-300/70 uppercase mb-1 tracking-widest">
                 [ Target Protocol / Course ]
              </label>
              <input
                type="text"
                name="course"
                required
                disabled={isSubmitting}
                className="cyber-input w-full px-4 py-3 border-b-2 border-gray-700 rounded-t-md text-cyan-100 placeholder-cyan-800/50 focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                placeholder="e.g. Cyber Hunter Pro"
              />
            </div>

            {/* Cyber Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              // A gradient button that looks like glowing energy
              className="w-full group relative overflow-hidden flex justify-center items-center px-4 py-3 font-bold rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.5)] text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed tracking-widest uppercase"
            >
               {/* A scan line that moves across the button on hover */}
               <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-20"></span>
               <span className="relative z-10">
                 {isSubmitting ? "Initializing Sequence..." : ">> Establish Uplink <<"}
               </span>
            </button>
          </form>
          
          {/* Bottom Corner Decals (Tech decoration) */}
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-500"></div>

        </div>
      </div>
    </>
  );
};