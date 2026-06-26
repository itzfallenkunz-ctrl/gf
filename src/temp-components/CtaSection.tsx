"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function CtaSection() {
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setMagneticPos({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  // SVG wave path configurations for fluid milk splash loop
  const wavePath1 = "M0 60 C 150 100, 350 20, 500 60 C 650 100, 850 20, 1000 60 L 1000 200 L 0 200 Z";
  const wavePath2 = "M0 60 C 150 20, 350 100, 500 60 C 650 20, 850 100, 1000 60 L 1000 200 L 0 200 Z";

  return (
    <section 
      className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 py-24 text-center z-10 bg-gradient-to-b from-[#F5F9FD] to-[#3E92CC] overflow-hidden"
      id="cta"
    >
      {/* Animated fluid milk waves in background */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-none z-0">
        {/* Layer 1 (Creamy white) */}
        <svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full text-white fill-current opacity-70 scale-x-110 translate-y-4"
        >
          <motion.path
            d={wavePath1}
            animate={{ d: [wavePath1, wavePath2, wavePath1] }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
          />
        </svg>

        {/* Layer 2 (Pure White) */}
        <svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full text-white fill-current translate-y-1"
        >
          <motion.path
            d={wavePath2}
            animate={{ d: [wavePath2, wavePath1, wavePath2] }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      {/* Floating particles/bubbles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/25 border border-white/10"
            style={{
              width: Math.random() * 40 + 20,
              height: Math.random() * 40 + 20,
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 60 + 20}%`
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 4 + 4,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-3xl relative z-10 flex flex-col items-center">
        <span className="text-xs uppercase tracking-widest font-extrabold text-[#1C4E80] bg-[#E1EDF7]/80 backdrop-blur-sm px-3.5 py-1 rounded-full mb-6">
          Freshness Delivered Cold
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-[#1C4E80] tracking-tight leading-[0.95] font-sans mb-6">
          Experience the <br className="hidden md:block"/>
          Highland Difference
        </h2>
        <p className="text-xs md:text-sm font-semibold text-[#1C4E80]/80 max-w-lg mb-10 leading-relaxed">
          From lush 1,200m pastures to cold-chain packing, we guarantee milk of unparalleled flavor and active nutrients. Pure dairy goodness, just as nature intended.
        </p>

        {/* Interactive Magnetic CTA Button */}
        <motion.button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ x: magneticPos.x, y: magneticPos.y }}
          transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.1 }}
          className="px-10 py-5 bg-[#1C4E80] hover:bg-[#82C09A] text-white text-md font-bold tracking-tight rounded-full shadow-2xl shadow-blue-900/10 cursor-pointer flex items-center justify-center gap-3 relative overflow-hidden group border border-white/20"
        >
          {/* Internal bubble hover animation */}
          <span className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 origin-center transition-transform duration-500 ease-out z-0 opacity-15" />
          
          <span className="relative z-10 flex items-center gap-2">
            Locate Nearest Retailer
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </motion.button>
      </div>
    </section>
  );
}
