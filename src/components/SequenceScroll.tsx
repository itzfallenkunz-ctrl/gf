"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface SequenceScrollProps {
  images: HTMLImageElement[];
}

export default function SequenceScroll({ images }: { images: HTMLImageElement[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Monitor scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to image frame indexes (0 to 191)
  const frameIndex = useTransform(scrollYProgress, [0, 0.98], [0, 191]);

  // Handle magnetic CTA positioning
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const ctaRef = useRef<HTMLButtonElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setMagneticPos({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  // Map scroll progress to text overlay opacities and offsets (Y translation)
  const opacity1 = useTransform(scrollYProgress, [0, 0.08, 0.15, 0.22], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.08, 0.15, 0.22], [30, 0, 0, -30]);

  const opacity2 = useTransform(scrollYProgress, [0.24, 0.32, 0.44, 0.52], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.24, 0.32, 0.44, 0.52], [30, 0, 0, -30]);

  const opacity3 = useTransform(scrollYProgress, [0.54, 0.62, 0.74, 0.82], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.54, 0.62, 0.74, 0.82], [30, 0, 0, -30]);

  const opacity4 = useTransform(scrollYProgress, [0.84, 0.9, 0.96, 0.99], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.84, 0.9, 0.96, 0.99], [30, 0, 0, -30]);

  // Scale canvas context and draw current frame
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const img = images[index];
    if (!ctx || !img) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cover scale calculation
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    // Dynamic background sampling at top-left pixel (10, 10)
    try {
      const pixelData = ctx.getImageData(10, 10, 1, 1).data;
      const rgbStr = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      document.documentElement.style.setProperty("--sequence-bg", rgbStr);
    } catch (e) {
      // Fallback color if cross-origin or canvas read fails
      document.documentElement.style.setProperty("--sequence-bg", "#f5f9fd");
    }
  };

  // Re-draw on frame index update
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const nextFrame = Math.min(191, Math.max(0, Math.round(latest)));
    if (nextFrame !== currentFrame) {
      setCurrentFrame(nextFrame);
      drawFrame(nextFrame);
    }
  });

  // Handle canvas sizing and initial render
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Set canvas size to screen size
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
      
      // Redraw current frame
      drawFrame(currentFrame);
    };

    window.addEventListener("resize", handleResize);
    // Initial size trigger
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images, currentFrame]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full" id="home">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--sequence-bg)] transition-colors duration-500">
        <canvas ref={canvasRef} className="block w-full h-full object-cover" />

        {/* Text Overlays - Centered / Left / Right */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-24 pointer-events-none">
          
          {/* Overlay 1: 0% Scroll - Centered */}
          <motion.div
            style={{ opacity: opacity1, y: y1 }}
            className="absolute text-center max-w-4xl flex flex-col items-center justify-center"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-widest font-extrabold text-[#4A7BB0] bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 mb-6">
              Greenfields Fresh Dairy
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-[#1C4E80] tracking-tight leading-[0.95] font-sans">
              Greenfields — 100% Fresh Milk, <br />
              <span className="text-[#3E92CC]">Naturally Full Cream</span>
            </h1>
            <p className="mt-6 text-sm md:text-lg text-[#5D8EB9] font-medium max-w-xl">
              Straight from our high-altitude highland farms, bringing pure, untouched nutrition to your family.
            </p>
          </motion.div>

          {/* Overlay 2: 30% Scroll - Left Aligned */}
          <motion.div
            style={{ opacity: opacity2, y: y2 }}
            className="absolute left-6 md:left-24 max-w-xl text-left"
          >
            <span className="text-xs uppercase tracking-wider font-bold text-[#82C09A] block mb-3">
              Pure Farm Sourcing
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1C4E80] tracking-tight leading-[1] font-sans">
              From Pasture to Pack, <br />
              <span className="text-[#3E92CC]">Pure Goodness in Every Drop</span>
            </h2>
            <p className="mt-4 text-xs md:text-sm text-[#5D8EB9] font-medium">
              We manage everything ourselves — our grass, our cows, and our state-of-the-art processing facility — delivering farm fresh milk within hours.
            </p>
          </motion.div>

          {/* Overlay 3: 60% Scroll - Right Aligned */}
          <motion.div
            style={{ opacity: opacity3, y: y3 }}
            className="absolute right-6 md:right-24 max-w-xl text-right flex flex-col items-end"
          >
            <span className="text-xs uppercase tracking-wider font-bold text-[#3E92CC] block mb-3">
              Unrivaled Quality
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1C4E80] tracking-tight leading-[1] font-sans">
              Rich, Creamy, <br />
              <span className="text-[#82C09A]">and Always Fresh</span>
            </h2>
            <p className="mt-4 text-xs md:text-sm text-[#5D8EB9] font-medium max-w-md">
              No additives, no preservatives. Just the pure, velvety creaminess of real pasteurized milk, packed with calcium, vitamins, and high protein.
            </p>
          </motion.div>

          {/* Overlay 4: 90% Scroll - Centered CTA */}
          <motion.div
            style={{ opacity: opacity4, y: y4 }}
            className="absolute text-center max-w-3xl flex flex-col items-center pointer-events-auto"
          >
            <h2 className="text-4xl md:text-6xl font-black text-[#1C4E80] tracking-tight leading-[0.95] font-sans mb-8">
              Taste the <span className="text-[#3E92CC]">Freshness</span> Today
            </h2>
            
            {/* Magnetic CTA button */}
            <motion.button
              ref={ctaRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: magneticPos.x, y: magneticPos.y }}
              transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.1 }}
              className="px-10 py-5 bg-[#1C4E80] hover:bg-[#3E92CC] text-white text-md font-bold tracking-tight rounded-full shadow-xl shadow-blue-900/10 cursor-pointer flex items-center justify-center gap-3 relative overflow-hidden group border border-white/20"
            >
              {/* Internal bubble hover animation */}
              <span className="absolute inset-0 bg-[#82C09A] rounded-full scale-0 group-hover:scale-100 origin-center transition-transform duration-500 ease-out z-0" />
              
              <span className="relative z-10 flex items-center gap-2">
                Discover Freshness
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
          </motion.div>

        </div>
      </div>
    </div>
  );
}
