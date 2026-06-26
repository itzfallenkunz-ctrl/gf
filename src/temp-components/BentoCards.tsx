"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BentoCardProps {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}

function BentoCard({ className = "", delay = 0.1, children }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={`rounded-3xl p-8 overflow-hidden relative border border-[#C8E1F5]/30 bg-white/70 backdrop-blur-md hover:shadow-2xl hover:shadow-blue-900/5 hover:border-[#3E92CC]/30 transition-all duration-500 group ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function BentoCards() {
  return (
    <section className="relative px-6 py-24 md:px-24 bg-gradient-to-b from-white to-[#F5F9FD]" id="range">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#3E92CC] block mb-2">
            The Greenfields Range
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1C4E80] tracking-tight font-sans">
            Crafted by Nature, <span className="text-[#82C09A]">Perfected by Farms</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:grid-rows-2">

          {/* Card 1: Main Product (Full Cream UHT) */}
          <BentoCard className="md:col-span-2 flex flex-col md:flex-row items-center justify-between min-h-[350px]" delay={0.1}>
            <div className="max-w-sm relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#82C09A] bg-[#EAF7EE] px-2.5 py-1 rounded-full">
                  Our Flagship
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-[#1C4E80] tracking-tight font-sans mt-4">
                  Full Cream Fresh Milk
                </h3>
                <p className="text-xs text-[#5D8EB9] mt-3 leading-relaxed">
                  Pure milk containing all the natural fat, vitamins, and minerals that give it its signature velvety richness. Perfect for drinking, baking, or foaming in your morning coffee.
                </p>
              </div>
              <div className="mt-8 md:mt-0">
                <span className="text-xs font-mono text-[#4A7BB0] block">Origin: Malang Highlands</span>
                <span className="text-md font-bold text-[#1C4E80]">100% Pasteurized Dairy</span>
              </div>
            </div>

            {/* Product image container */}
            <div className="relative w-44 h-64 md:w-56 md:h-72 mt-8 md:mt-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/assets/full_cream_pack.webp"
                alt="Greenfields Full Cream Pack"
                fill
                sizes="(max-width: 768px) 176px, 224px"
                className="object-contain"
              />
            </div>
          </BentoCard>

          {/* Card 2: Nutrition Stats */}
          <BentoCard className="flex flex-col justify-between min-h-[350px]" delay={0.25}>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#3E92CC] bg-[#E8F3FA] px-2.5 py-1 rounded-full">
                Nutrition Facts
              </span>
              <h3 className="text-xl font-black text-[#1C4E80] tracking-tight font-sans mt-4">
                Unyielding Pure Health
              </h3>

              {/* Nutrient list */}
              <div className="mt-6 flex flex-col gap-3">
                {[
                  { name: "Calcium", val: "300mg", pct: "30%", color: "bg-[#3E92CC]" },
                  { name: "Protein", val: "8.0g", pct: "16%", color: "bg-[#82C09A]" },
                  { name: "Vitamin D", val: "2.4mcg", pct: "15%", color: "bg-[#F3C178]" },
                  { name: "Phosphorus", val: "240mg", pct: "24%", color: "bg-[#A78BFA]" },
                ].map((nut, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex justify-between items-center text-xs font-bold text-[#1C4E80]">
                      <span>{nut.name}</span>
                      <span className="font-mono">{nut.val} ({nut.pct} DV)</span>
                    </div>
                    {/* Tiny visual bar */}
                    <div className="w-full h-1.5 bg-[#E1EDF7] rounded-full mt-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: nut.pct }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                        className={`h-full rounded-full ${nut.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Highland Farm */}
          <BentoCard className="flex flex-col justify-between min-h-[350px] bg-gradient-to-t from-[#EBF5FF] to-white" delay={0.15}>
            <div className="absolute inset-0 z-0 opacity-20 group-hover:scale-105 transition-transform duration-700">
              <Image
                src="/assets/greenfields_farm.png"
                alt="Greenfields farm pastures"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#4A7BB0] bg-white/70 border border-white/20 px-2.5 py-1 rounded-full">
                Pris-tine Climate
              </span>
              <h3 className="text-xl font-black text-[#1C4E80] tracking-tight font-sans mt-4">
                Raised at 1,200m
              </h3>
              <p className="text-xs text-[#5D8EB9] mt-2 leading-relaxed">
                Cool temperatures keep our herds comfortable, resulting in happier cows and superior milk quality.
              </p>
            </div>

            <div className="relative z-10 border-t border-[#C8E1F5]/40 pt-4 mt-6">
              <span className="text-[10px] uppercase tracking-wider text-[#5D8EB9] font-medium block">
                Farm Temperature
              </span>
              <span className="text-xl font-bold font-mono text-[#1C4E80]">15°C – 22°C</span>
            </div>
          </BentoCard>

          {/* Card 4: Variant Showcase (Strawberry) */}
          <BentoCard className="md:col-span-2 flex flex-col md:flex-row items-center justify-between min-h-[350px]" delay={0.2}>
            <div className="max-w-sm relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#EC4899] bg-[#FCE7F3] px-2.5 py-1 rounded-full">
                  Fruity Delight
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-[#1C4E80] tracking-tight font-sans mt-4">
                  Strawberry Fresh Milk
                </h3>
                <p className="text-xs text-[#5D8EB9] mt-3 leading-relaxed">
                  Infused with natural strawberry extract for a delicious, refreshing taste that kids and adults love. Experience the perfect harmony of sweet berries and creamy highland dairy.
                </p>
              </div>
              <div className="mt-8 md:mt-0 flex gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-[#5D8EB9] font-medium">Other variants:</span>
                  <span className="text-xs font-bold text-[#1C4E80]">Choco, Low Fat, Skimmed</span>
                </div>
              </div>
            </div>

            {/* Product image container */}
            <div className="relative w-44 h-64 md:w-56 md:h-72 mt-8 md:mt-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/assets/strawberry_pack1.png"
                alt="Greenfields Strawberry Pack"
                fill
                sizes="(max-width: 768px) 176px, 224px"
                className="object-contain"
              />
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
