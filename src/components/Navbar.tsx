"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "Home", href: "#home" },
  { title: "Our Story", href: "#about" },
  { title: "The Range", href: "#range" },
  { title: "Farm to Glass", href: "#stats" },
  { title: "Reviews", href: "#reviews" },
];

const socials = [
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "YouTube", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Stop/Start Lenis scroll when menu open/closes
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) {
      if (isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [isOpen]);

  // Magnetic effect calculations
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Reduce displacement to 35% for subtle magnetic pull
    setMagneticPos({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  const menuVariants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      duration: 0.75,
      delay: 0.1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
} as const;

  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const linkVariants = {
    initial: {
      y: 80,
      rotate: 5,
    },
    animate: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.5,
       ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
    exit: {
      y: 60,
      rotate: 5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto"
        >
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tighter text-[#1C4E80] font-sans flex items-center gap-1">
              Green
              <span className="text-[#3E92CC] font-light">fields</span>
            </span>
            <div className="w-2 h-2 rounded-full bg-[#82C09A] group-hover:scale-150 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* Magnetic Hamburger Button */}
        <motion.button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsOpen(!isOpen)}
          animate={{ x: magneticPos.x, y: magneticPos.y }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          className="pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-md border border-[#C8E1F5] shadow-lg shadow-blue-900/5 text-[#1C4E80] hover:text-[#3E92CC] cursor-pointer relative z-50 overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-[#EBF5FF]"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </span>
        </motion.button>
      </header>

      {/* Fullscreen Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-30 origin-top bg-gradient-to-b from-[#F5F9FD] to-[#E6F0FA] flex flex-col justify-between px-8 py-20 md:p-24"
          >
            {/* Background design lines */}
            <div className="absolute inset-0 pointer-events-none flex justify-between px-16 opacity-10">
              <div className="w-[1px] h-full bg-[#1C4E80]" />
              <div className="w-[1px] h-full bg-[#1C4E80] hidden md:block" />
              <div className="w-[1px] h-full bg-[#1C4E80]" />
            </div>

            {/* Menu Links */}
            <div className="mt-12 md:mt-16 relative z-10 flex flex-col justify-center flex-grow">
              <span className="text-xs uppercase tracking-widest text-[#4A7BB0] font-semibold mb-6 block">
                Navigation
              </span>
              <motion.ul
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-1 md:gap-2 align-start"
              >
                {navLinks.map((link, idx) => (
                  <li key={idx} className="overflow-hidden">
                    <motion.div variants={linkVariants}>
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-block text-2xl md:text-4xl font-bold tracking-tight text-[#1C4E80] hover:text-[#3E92CC] transition-colors duration-300 relative group py-1"
                      >
                        {/* Hover effect text reveal */}
                        <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-1">
                          {link.title}
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] md:h-[3px] bg-[#82C09A] group-hover:w-full transition-all duration-300" />
                      </a>
                    </motion.div>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Menu Footer */}
            <div className="relative z-10 border-t border-[#C8E1F5]/60 pt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              {/* Contact Information */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#5D8EB9] font-medium block mb-2">
                  Get in touch
                </span>
                <a
                  href="mailto:fresh@greenfields.co"
                  className="text-md font-medium text-[#1C4E80] hover:text-[#3E92CC] transition-colors duration-300"
                >
                  fresh@greenfields.co
                </a>
              </div>

              {/* Social links */}
              <div className="flex gap-6">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="text-sm font-semibold tracking-tight text-[#1C4E80] hover:text-[#3E92CC] transition-colors duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>

              {/* Farm Coordinate Info */}
              <div className="text-right hidden md:block">
                <span className="text-[10px] uppercase tracking-wider text-[#5D8EB9] font-medium block mb-1">
                  Established Farms
                </span>
                <span className="text-xs text-[#1C4E80] font-mono">
                  -6.5944° S, 106.7892° E • Bogor, Wast Java, Indonesia
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}