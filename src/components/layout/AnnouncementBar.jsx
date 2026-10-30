import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, ShieldCheck, Tag } from 'lucide-react';

const MESSAGES = [
  { icon: Truck, text: "Complimentary Express Shipping on Orders Above ₹999 across India" },
  { icon: Tag, text: "Use Code NIVARA10 for 10% Off on Your First Order" },
  { icon: ShieldCheck, text: "100% Certified Organic & Cruelty-Free Ayurvedic Formulations" },
  { icon: Sparkles, text: "Complimentary Deluxe Minis with Every Order Today" }
];

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = MESSAGES[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className="bg-forest-900 text-sand-100 text-xs py-2 px-4 border-b border-forest-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-sand-300/80">
          <span>🌿 Pure Botanicals • Cruelty-Free</span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
          <div className="flex items-center gap-2 animate-fadeIn transition-all duration-500">
            <IconComponent size={14} className="text-gold-400 shrink-0" />
            <span className="font-medium tracking-wide">{current.text}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sand-300/80">
          <a href="#newsletter" className="hover:text-gold-400 transition-colors">Newsletter</a>
          <span>•</span>
          <span>INR (₹)</span>
        </div>
      </div>
    </div>
  );
};
