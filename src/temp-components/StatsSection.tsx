"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function Counter({ value, suffix = "", prefix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const roundedValue = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString());

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest).toLocaleString());
        }
      });
      return controls.stop;
    }
  }, [isInView, value, duration, motionValue]);

  return (
    <span ref={ref} className="font-mono text-5xl md:text-8xl font-black text-[#1C4E80] tracking-tighter">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(containerRef, { once: true });

  const stats = [
    { value: 100, suffix: "%", title: "Pure Fresh Milk", desc: "Straight from our highlands, zero reconstitutes." },
    { value: 12000, suffix: "+", title: "Liters Daily Yield", desc: "Produced under strict organic and hygienic checks." },
    { value: 48, suffix: " hrs", title: "Farm to Shelf Speed", desc: "Rapid processing ensuring raw nutrient integrity." },
    { value: 9000, suffix: "+", title: "Happy Holstein Cows", desc: "Raised with customized nutritionist diets and care." }
  ];

  return (
    <section
      ref={containerRef}
      className="relative px-6 py-28 md:px-24 bg-[#F5F9FD] border-b border-[#C8E1F5]/30 z-10"
      id="stats"
    >
      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <div className="max-w-3xl mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest font-extrabold text-[#3E92CC] block mb-3"
          >
            Greenfields in Numbers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-[#1C4E80] tracking-tight leading-[1] font-sans"
          >
            Setting the Standard in <br className="hidden md:block" />
            <span className="text-[#82C09A]">Modern Dairy Farming</span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              className="flex flex-col gap-3 p-6 rounded-3xl bg-white/40 border border-[#C8E1F5]/20"
            >
              {/* Animated counter */}
              <Counter value={stat.value} suffix={stat.suffix} />

              <div className="mt-2">
                <h4 className="text-md font-bold text-[#1C4E80] tracking-tight font-sans">
                  {stat.title}
                </h4>
                <p className="text-xs text-[#5D8EB9] leading-relaxed mt-1">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
