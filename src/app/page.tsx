"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import BentoCards from "@/components/BentoCards";
import StatsSection from "@/components/StatsSection";
import TestimonialSection from "@/components/TestimonialSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[] | null>(null);

  const handlePreloadComplete = (images: HTMLImageElement[]) => {
    setPreloadedImages(images);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#f5f9fd]">
      {/* Dynamic Preloader */}
      <Preloader onComplete={handlePreloadComplete} />

      {/* Main content renders only after successful asset preload to prevent layout flash */}
      {preloadedImages && (
        <>
          {/* Transparent high-end navigation */}
          <Navbar />

          {/* Sticky sequence canvas section (400vh) */}
          <SequenceScroll images={preloadedImages} />

          {/* Subsequent sections scrolling up over the hero canvas */}
          <div className="-mt-[100vh] relative z-10 w-full overflow-hidden bg-white shadow-2xl shadow-blue-900/10">
            <AboutSection />
            <BentoCards />
            <StatsSection />
            <TestimonialSection />
            <CtaSection />
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}
