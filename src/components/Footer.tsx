"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-white z-10 px-6 pt-20 pb-10 md:px-24 border-t border-[#C8E1F5]/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Info */}
          <div className="md:col-span-2">
            <span className="text-xl font-black tracking-tighter text-[#1C4E80] font-sans flex items-center gap-1 mb-4">
              Green
              <span className="text-[#3E92CC] font-light">fields</span>
            </span>
            <p className="text-xs text-[#5D8EB9] leading-relaxed max-w-sm">
              We manage everything from grass to glass. Our commitment to single-source dairy farming guarantees milk of exceptional quality and freshness.
            </p>
            <span className="text-[10px] text-[#5D8EB9]/60 font-mono mt-6 block">
              -6.5944° S, 106.7892° E • Bogor, West Java, Indonesia
            </span>
          </div>

          {/* Site Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#3E92CC] mb-4">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5">
              {["Our Story", "Product Range", "Our Farm", "Health & Safety", "Locate Store"].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-xs font-semibold text-[#1C4E80] hover:text-[#3E92CC] transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details / Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#3E92CC] mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-[#5D8EB9] mb-4">
              Subscribe to get dairy recipe guides and fresh farm updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-[#C8E1F5] rounded-full text-xs font-semibold text-[#1C4E80] bg-[#F5F9FD] focus:outline-none focus:border-[#3E92CC]"
              />
              <button className="px-5 py-2 bg-[#1C4E80] text-white text-xs font-bold rounded-full hover:bg-[#3E92CC] transition-colors duration-200 cursor-pointer">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Big brand title watermark */}
        <div className="border-t border-[#C8E1F5]/40 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xs text-[#5D8EB9] font-medium order-2 md:order-1">
            © {new Date().getFullYear()} Greenfields Dairy. All rights reserved.
          </span>
          <div className="flex gap-6 order-1 md:order-2">
            <a href="#" className="text-[11px] font-semibold text-[#5D8EB9] hover:text-[#3E92CC]">Privacy Policy</a>
            <a href="#" className="text-[11px] font-semibold text-[#5D8EB9] hover:text-[#3E92CC]">Terms of Service</a>
            <a href="#" className="text-[11px] font-semibold text-[#5D8EB9] hover:text-[#3E92CC]">Contact Info</a>
          </div>
        </div>

        {/* Large stylized watermark at bottom */}
        <div className="mt-16 text-center select-none pointer-events-none opacity-[0.04]">
          <h1 className="text-[10vw] font-black text-[#1C4E80] tracking-tighter leading-none font-sans uppercase">
            Greenfields
          </h1>
        </div>

      </div>
    </footer>
  );
}
