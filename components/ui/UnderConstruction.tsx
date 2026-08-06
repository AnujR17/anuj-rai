"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function UnderConstruction() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock body scroll when overlay is visible
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  // Configurations for the 3D gyroscope rings
  const rings = [
    { rx: 360, ry: 180, rz: 0, duration: 15, border: "border-stone-900" },
    { rx: -180, ry: 360, rz: 90, duration: 20, border: "border-stone-400" },
    { rx: 90, ry: -180, rz: -360, duration: 25, border: "border-stone-300" },
    { rx: -360, ry: -90, rz: 180, duration: 30, border: "border-stone-200" },
    { rx: 180, ry: 270, rz: -180, duration: 35, border: "border-stone-200 opacity-50" },
    { rx: -90, ry: -360, rz: 270, duration: 40, border: "border-stone-200 opacity-30" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] bg-[#fafaf9] flex flex-col justify-between p-6 md:p-8 overflow-hidden"
        >
          {/* Subtle architectural dot grid background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{ 
              backgroundImage: 'radial-gradient(#d6d3d1 1px, transparent 1px)', 
              backgroundSize: '32px 32px' 
            }}
          />

          {/* Top Bar: Close Button & Meta */}
          <div className="relative z-10 flex justify-between items-start w-full">
            <button
              onClick={() => setIsVisible(false)}
              className="flex items-center gap-4 text-stone-400 hover:text-stone-900 transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-stone-900 group-hover:scale-105 transition-all duration-300 bg-[#fafaf9]">
                <X className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest hidden md:block">
                Close to browse
              </span>
            </button>

            <div className="text-right flex flex-col items-end">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-1">
                Project Archive
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-900">
                2025 // IN PROGRESS
              </span>
            </div>
          </div>

          {/* Center Kinetic Sculpture */}
          <div className="relative z-10 flex-1 flex items-center justify-center w-full h-full">
            <div 
              style={{ perspective: "1000px" }} 
              className="relative flex items-center justify-center w-[280px] h-[280px] md:w-[600px] md:h-[600px]"
            >
              {rings.map((ring, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotateX: [0, ring.rx], 
                    rotateY: [0, ring.ry], 
                    rotateZ: [0, ring.rz] 
                  }}
                  transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`absolute inset-0 rounded-full border-[1px] ${ring.border}`}
                />
              ))}

              {/* Core Badge */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute z-20 flex flex-col items-center justify-center bg-[#fafaf9]/80 backdrop-blur-md px-6 py-4 rounded-full border border-stone-200 shadow-sm"
              >
                <motion.span 
                  animate={{ opacity: [1, 0.2, 1] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-1.5 h-1.5 rounded-full bg-stone-900 mb-2"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-900 text-center leading-relaxed">
                  Under <br /> Construction
                </span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex justify-between items-end w-full">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                L: 23.2156 N
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                L: 72.6369 E
              </span>
            </div>
            
            <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400 border-b border-stone-200 pb-1 w-32 text-right">
              SYSTEM_BOOT
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
