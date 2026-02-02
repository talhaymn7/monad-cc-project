"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FoodCharacterProps {
  emoji: string;
  mouseX: number;
  mouseY: number;
  isShy: boolean; // Şifre giriliyor mu?
  className?: string;
}

export const FoodCharacter: React.FC<FoodCharacterProps> = ({ emoji, mouseX, mouseY, isShy, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  // Mouse hareketine göre göz bebeklerinin pozisyonunu hesapla
  useEffect(() => {
    if (!ref.current || isShy) return; // Utanıyorsa hesaplama yapma

    const rect = ref.current.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 2;

    // Mouse ile karakterin merkezi arasındaki mesafe
    const deltaX = mouseX - charCenterX;
    const deltaY = mouseY - charCenterY;

    // Göz bebeğinin hareket sınırı (çok dışarı taşmasın)
    const maxMove = 10; 
    // Mesafeyi normalize et ve sınırla
    const moveX = Math.min(Math.max(deltaX / 20, -maxMove), maxMove);
    const moveY = Math.min(Math.max(deltaY / 20, -maxMove), maxMove);

    setEyePosition({ x: moveX, y: moveY });
  }, [mouseX, mouseY, isShy]);

  return (
    <div ref={ref} className={`relative select-none ${className}`} style={{ perspective: "1000px" }}>
      {/* Framer Motion ile 3D Dönüş Efekti */}
      <motion.div
        className="relative w-32 h-32 flex items-center justify-center text-8xl drop-shadow-2xl"
        animate={{ rotateY: isShy ? 180 : 0 }} // Utanıyorsa 180 derece dön
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ÖN YÜZ (Gözler burada) */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
          {emoji}
          
          {/* Gözler Container */}
          {!isShy && (
             <div className="absolute top-[30%] left-0 w-full flex justify-center gap-4 pointer-events-none">
             {/* Sol Göz */}
             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden border-2 border-gray-100">
               <motion.div 
                 className="w-4 h-4 bg-black rounded-full"
                 animate={{ x: eyePosition.x, y: eyePosition.y }}
                 transition={{ type: "tween", ease: "linear", duration: 0.1 }}
               />
             </div>
             {/* Sağ Göz */}
             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden border-2 border-gray-100">
               <motion.div 
                 className="w-4 h-4 bg-black rounded-full"
                 animate={{ x: eyePosition.x, y: eyePosition.y }}
                 transition={{ type: "tween", ease: "linear", duration: 0.1 }}
               />
             </div>
           </div>
          )}
        </div>

        {/* ARKA YÜZ (Dönünce burası görünecek) */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-brand/10 rounded-full blur-md scale-90 text-6xl opacity-50" 
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          🙈
        </div>
      </motion.div>
    </div>
  );
};