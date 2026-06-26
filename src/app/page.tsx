"use client";

import { useState } from "react";
import Preloader from "@/temp-components/Preloader";
import Navbar from "@/temp-components/Navbar";
import SequenceScroll from "@/temp-components/SequenceScroll";
import AboutSection from "@/temp-components/AboutSection";
import BentoCards from "@/temp-components/BentoCards";
import StatsSection from "@/temp-components/StatsSection";
import TestimonialSection from "@/temp-components/TestimonialSection";
import CtaSection from "@/temp-components/CtaSection";
import Footer from "@/temp-components/Footer";

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
