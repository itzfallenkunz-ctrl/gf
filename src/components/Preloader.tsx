"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: (images: HTMLImageElement[]) => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const totalFrames = 192;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const checkLoad = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalFrames) * 100);
      setProgress(currentProgress);

      if (loadedCount === totalFrames) {
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            onComplete(loadedImages);
          }, 800); // Allow fade-out animation to finish
        }, 500); // Small pause at 100% for smooth pacing
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Pad index with leading zeros to match ezgif-frame-001.jpg format
      const frameNum = String(i).padStart(3, "0");
      img.src = `/sequences/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedImages[i - 1] = img; // Store in correct order
        checkLoad();
      };
      img.onerror = () => {
        // Fallback in case of individual frame load failure to prevent freezing
        console.error(`Failed to load frame ${frameNum}`);
        checkLoad();
      };
    }
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#E6F0FA] to-[#C8E1F5]"
        >
          {/* Liquid droplet container */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Ambient pulse shadow */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute w-40 h-40 rounded-full bg-white/20 blur-xl"
            />

            {/* Teardrop SVG */}
            <svg
              viewBox="0 0 24 24"
              className="w-32 h-32 relative z-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Droplet outline / background */}
              <path
                d="M12 2.69C12 2.69 5.5 11.25 5.5 15.02C5.5 18.88 8.41 22 12 22C15.59 22 18.5 18.88 18.5 15.02C18.5 11.25 12 2.69 12 2.69Z"
                fill="#B3D5F2"
                className="opacity-40"
              />

              {/* Dynamic filling clipping path */}
              <clipPath id="droplet-clip">
                <path d="M12 2.69C12 2.69 5.5 11.25 5.5 15.02C5.5 18.88 8.41 22 12 22C15.59 22 18.5 18.88 18.5 15.02C18.5 11.25 12 2.69 12 2.69Z" />
              </clipPath>

              {/* Filled milk path from bottom up */}
              <g clipPath="url(#droplet-clip)">
                {/* Simulated wavy cream milk layer */}
                <motion.rect
                  x="0"
                  width="24"
                  fill="#FFFFFF"
                  initial={{ y: 24 }}
                  animate={{ y: 24 - (progress / 100) * 20 }}
                  transition={{ ease: "easeInOut", duration: 0.1 }}
                  height="24"
                />
                
                {/* Wavy liquid accent */}
                <motion.path
                  d="M 0 15 Q 6 13, 12 15 T 24 15 L 24 24 L 0 24 Z"
                  fill="#F5F9FD"
                  className="opacity-70"
                  animate={{
                    x: [-3, 3, -3],
                    y: [24 - (progress / 100) * 20, 23.8 - (progress / 100) * 20, 24 - (progress / 100) * 20]
                  }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </g>
            </svg>

            {/* Percentage text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 mt-8">
              <span className="text-xl font-bold tracking-tighter text-[#1C4E80]">
                {progress}%
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#4A7BB0] mt-1">
                Preloading
              </span>
            </div>
          </div>

          {/* Loading status bar */}
          <div className="mt-8 text-center">
            <h2 className="text-[#1C4E80] text-sm uppercase tracking-widest font-semibold font-sans">
              Greenfields
            </h2>
            <p className="text-xs text-[#5D8EB9] tracking-wider mt-1">
              Sourcing Pure Farm Goodness...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
