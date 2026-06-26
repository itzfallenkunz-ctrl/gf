"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Char({ children, progress, range }: CharProps) {
  // Map progress to character opacity for smooth fade-in reveal
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="relative inline-block text-[#1C4E80]">
      {children}
    </motion.span>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  startIndex: number;
  totalChars: number;
}

function Word({ children, progress, startIndex, totalChars }: WordProps) {
  const chars = children.split("");

  return (
    <span className="inline-block mr-3 whitespace-nowrap">
      {chars.map((char, i) => {
        const charIndex = startIndex + i;
        // Calculate the active scroll range for this specific character
        const start = charIndex / totalChars;
        const end = (charIndex + 0.8) / totalChars; // 0.8 makes them transition a bit faster
        return (
          <Char key={i} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
}

export default function AboutSection() {
  const elementRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the About section container
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start 0.8", "start 0.25"], // Trigger reveal as section enters viewport
  });

  const paragraph = "At Greenfields, we believe the best milk comes from the happiest cows. Nestled high in the cool, clean mountain highlands, our state-of-the-art integrated farms manage everything from planting fresh green grass to packing our creamy milk within hours. Our farm-to-glass story guarantees 100% pure dairy goodness, untouched by human hands, rich in calcium, and naturally full cream.";

  const words = paragraph.split(" ");

  // Pre-calculate character indexes to keep range calculations aligned
  let totalChars = 0;
  const wordData = words.map((word) => {
    const startIndex = totalChars;
    totalChars += word.length;
    return { word, startIndex };
  });

  return (
    <section
      ref={elementRef}
      className="relative min-h-[90vh] flex flex-col justify-center px-6 py-24 md:px-24 bg-gradient-to-b from-[#E6F0FA] to-white z-10 border-b border-[#C8E1F5]/40"
      id="about"
    >
      {/* Decorative farm coordinates indicator */}
      <div className="absolute top-12 left-6 md:left-24 flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#82C09A]" />
        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#4A7BB0]">
          Integrated Dairy Farm • Origin
        </span>
      </div>

      <div className="max-w-5xl mt-8">
        <h3 className="text-xs uppercase tracking-widest font-extrabold text-[#3E92CC] mb-6 block">
          Our Farm-to-Table Story
        </h3>

        {/* Reveal Paragraph */}
        <p className="text-2xl md:text-2xl font-black tracking-tight leading-[1.1] font-sans flex flex-wrap">
          {wordData.map((data, idx) => (
            <Word
              key={idx}
              progress={scrollYProgress}
              startIndex={data.startIndex}
              totalChars={totalChars}
            >
              {data.word}
            </Word>
          ))}
        </p>
      </div>

      {/* Brand values grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8 rounded-3xl bg-[#F0F6FC] border border-[#C8E1F5]/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#E1EDF7] text-[#1C4E80] flex items-center justify-center font-bold font-sans text-lg mb-6 group-hover:bg-[#1C4E80] group-hover:text-white transition-colors duration-300">
            01
          </div>
          <h4 className="text-lg font-bold text-[#1C4E80] tracking-tight">Single-Source Sourcing</h4>
          <p className="text-xs text-[#5D8EB9] leading-relaxed mt-2">
            Every drop is sourced entirely from our own herds, ensuring 100% traceabilty and strict quality control.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 rounded-3xl bg-[#F0F6FC] border border-[#C8E1F5]/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#E1EDF7] text-[#1C4E80] flex items-center justify-center font-bold font-sans text-lg mb-6 group-hover:bg-[#82C09A] group-hover:text-white transition-colors duration-300">
            02
          </div>
          <h4 className="text-lg font-bold text-[#1C4E80] tracking-tight">Zero Additives</h4>
          <p className="text-xs text-[#5D8EB9] leading-relaxed mt-2">
            Naturally rich and creamy. Our milk contains absolutely no reconstituted milk powder, water, or chemical preservatives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 rounded-3xl bg-[#F0F6FC] border border-[#C8E1F5]/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#E1EDF7] text-[#1C4E80] flex items-center justify-center font-bold font-sans text-lg mb-6 group-hover:bg-[#3E92CC] group-hover:text-white transition-colors duration-300">
            03
          </div>
          <h4 className="text-lg font-bold text-[#1C4E80] tracking-tight">Cold-Chain logistics</h4>
          <p className="text-xs text-[#5D8EB9] leading-relaxed mt-2">
            Maintained at a constant 4°C from milking to bottling, safeguarding active nutrients and fresh natural flavor.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
