"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Greenfields is the only fresh milk we trust for our specialty lattes. Its consistent fat profile and natural sweetness steam beautifully at 65°C, creating a velvety microfoam that holds latte art perfectly.",
    author: "Chef Daniel Tan",
    role: "Founder & Head Barista, Brew & Co.",
    rating: 5
  },
  {
    quote: "As a clinical nutritionist, I always advocate for single-source dairy. Greenfields manages their own farms, which means no cross-contamination, no hormones, and a clean pasteurization that keeps nutrients intact.",
    author: "Dr. Amanda Clara",
    role: "Clinical Nutritionist & Author",
    rating: 5
  },
  {
    quote: "My kids absolutely adore the rich, fresh taste of Greenfields milk. Knowing it reaches shelves within 48 hours of milking without any reconstituted powders gives me total peace of mind.",
    author: "Sarah Jenkins",
    role: "Mother of Two & Food Blogger",
    rating: 5
  }
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay functionality
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000); // 6 seconds per slide
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section 
      className="relative min-h-[85vh] flex flex-col justify-center px-6 py-28 md:px-24 bg-white z-10 border-b border-[#C8E1F5]/30 overflow-hidden"
      id="reviews"
    >
      {/* Decorative layout elements */}
      <div className="absolute top-12 left-6 md:left-24 flex items-center gap-3">
        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#4A7BB0]">
          Reviews • What they say
        </span>
      </div>

      {/* Background Quotes Watermark */}
      <div className="absolute right-12 top-10 font-serif text-[180px] md:text-[280px] text-[#E1EDF7] opacity-40 select-none font-bold pointer-events-none leading-none">
        “
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col justify-between min-h-[350px]">
        {/* Slider Window */}
        <div className="relative flex-grow flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col justify-center"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[#F3C178] text-[#F3C178]" />
                ))}
              </div>

              {/* Bold Quote Text */}
              <blockquote className="text-xl md:text-3xl font-black text-[#1C4E80] tracking-tight leading-snug font-sans mb-8">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              {/* Author Details */}
              <div>
                <cite className="not-italic text-md font-bold text-[#1C4E80] block">
                  {testimonials[activeIndex].author}
                </cite>
                <span className="text-xs text-[#5D8EB9] font-medium block mt-0.5">
                  {testimonials[activeIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls / Progress */}
        <div className="mt-12 flex items-center justify-between border-t border-[#C8E1F5]/40 pt-8">
          
          {/* Slider Progress Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className="group relative py-2"
              >
                <div className="w-8 h-1 rounded-full bg-[#E1EDF7] overflow-hidden transition-all duration-300 group-hover:bg-[#C8E1F5]">
                  {idx === activeIndex && (
                    <motion.div
                      layoutId="active-dot"
                      className="h-full bg-[#3E92CC] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-[#C8E1F5]/60 flex items-center justify-center text-[#1C4E80] hover:bg-[#EBF5FF] hover:border-[#3E92CC] transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-[#C8E1F5]/60 flex items-center justify-center text-[#1C4E80] hover:bg-[#EBF5FF] hover:border-[#3E92CC] transition-all duration-300 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
