import React, { useState } from "react";
import { toast } from "sonner";
import { dbService } from "@/services/database";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal = ({ isOpen, onClose }: BookDemoModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "" });

  if (!isOpen) return null;

  const cyberStyles = `
    @keyframes border-pulse {
        0%, 100% { box-shadow: 0 0 5px #06b6d4, inset 0 0 5px #06b6d4; border-color: #06b6d4; }
        50% { box-shadow: 0 0 20px #06b6d4, inset 0 0 10px #06b6d4; border-color: #22d3ee; }
    }
    .cyber-border-animate { animation: border-pulse 3s infinite ease-in-out; }
    .cyber-input { background: rgba(17, 24, 39, 0.8); transition: all 0.3s ease; }
    .cyber-input:focus { box-shadow: 0 0 10px #06b6d4; background: rgba(6, 182, 212, 0.1); }
  `;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    setIsSubmitting(true);
    try {
      await dbService.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Course Interest: ${formData.course}`,
        source: 'book_demo',
      });
      toast.success("Demo booked! Our team will contact you soon.");
      setFormData({ name: "", email: "", phone: "", course: "" });
      onClose();
    } catch (error) {
      console.error("Book demo error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{cyberStyles}</style>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md" onClick={onClose}>
        <div className="relative bg-gray-900 border-2 border-cyan-500 cyber-border-animate shadow-[0_0_30px_rgba(6,182,212,0.3)] rounded-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-90 duration-300" onClick={(e) => e.stopPropagation()}>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 animate-pulse"></div>
          <div className="flex justify-between items-center p-5 border-b border-cyan-900/50 bg-gray-900/50">
            <h3 className="text-xl font-bold text-cyan-400 uppercase tracking-wider drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">
               Generate Access Key // Demo
            </h3>
            <button onClick={onClose} className="text-cyan-600 hover:text-cyan-300 transition p-1 rounded hover:bg-cyan-900/30">✕</button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-cyan-300/70 uppercase mb-1 tracking-widest">[ Name ]</label>
              <input type="text" required disabled={isSubmitting} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="cyber-input w-full px-4 py-3 border-b-2 border-gray-700 rounded-t-md text-cyan-100 placeholder-cyan-800/50 focus:outline-none focus:border-cyan-400 disabled:opacity-50" placeholder="Enter full name..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cyan-300/70 uppercase mb-1 tracking-widest">[ Email ]</label>
              <input type="email" required disabled={isSubmitting} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="cyber-input w-full px-4 py-3 border-b-2 border-gray-700 rounded-t-md text-cyan-100 placeholder-cyan-800/50 focus:outline-none focus:border-cyan-400 disabled:opacity-50" placeholder="user@email.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cyan-300/70 uppercase mb-1 tracking-widest">[ Phone ]</label>
              <input type="tel" pattern="[0-9]{10}" required disabled={isSubmitting} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} className="cyber-input w-full px-4 py-3 border-b-2 border-gray-700 rounded-t-md text-cyan-100 placeholder-cyan-800/50 focus:outline-none focus:border-cyan-400 disabled:opacity-50" placeholder="10-digit number" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cyan-300/70 uppercase mb-1 tracking-widest">[ Course ]</label>
              <input type="text" required disabled={isSubmitting} value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} className="cyber-input w-full px-4 py-3 border-b-2 border-gray-700 rounded-t-md text-cyan-100 placeholder-cyan-800/50 focus:outline-none focus:border-cyan-400 disabled:opacity-50" placeholder="e.g. Cyber Hunter Pro" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full group relative overflow-hidden flex justify-center items-center px-4 py-3 font-bold rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.5)] text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-400 focus:outline-none transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed tracking-widest uppercase">
               <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-20"></span>
               <span className="relative z-10">{isSubmitting ? "Submitting..." : ">> Book Demo <<"}</span>
            </button>
          </form>
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-500"></div>
        </div>
      </div>
    </>
  );
};
