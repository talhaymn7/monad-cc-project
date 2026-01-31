"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CreditCard, CheckCircle2, ShoppingBag, ArrowRight, Wallet } from "lucide-react";
import { useCart } from "~~/hooks/useCart";
import { RoomView } from "~~/components/RoomView";
import { useRouter } from "next/navigation";

export default function Home() {
  const { roomId, createRoom, joinRoom, members, cartItems, totalAmount, addItem } = useCart();
  const [joinInput, setJoinInput] = useState("");
  const router = useRouter(); // 2. ROUTER'I BURADA BAŞLAT
  // EĞER ODA VARSA: Alışveriş Odasını Göster
  if (roomId) {
    return (
      <RoomView
        roomId={roomId}
        members={members}
        cartItems={cartItems}
        totalAmount={totalAmount}
        addItem={addItem}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fff0f5] flex items-center justify-center p-6 overflow-hidden relative selection:bg-[#ea004b] selection:text-white">

      {/* Arka Plan Izgarası (Grid) - Profesyonel Zemin */}
      <div className="absolute inset-0 z-0 opacity-[0.4]"
        style={{ backgroundImage: 'radial-gradient(#ea004b 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* SOL TARAFTA: Yazılar (Copy) */}
        <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-pink-200 text-[#ea004b] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              Monad Hackathon 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-4">
              Clear <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea004b] to-[#ff5c8d]">
                Cart.
              </span>
            </h1>
            <p className="text-lg text-gray-600 font-medium max-w-md mx-auto lg:mx-0 leading-relaxed">
              Hesabı kim ödeyecek gerginliği bitti. <br />
              Arkadaşlarınla <b>aynı sepete</b> at, <b>tek tıkla</b> bölüş.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button
              className="bg-[#ea004b] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_10px_30px_-10px_rgba(234,0,75,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(234,0,75,0.6)] transition-all transform hover:-translate-y-1 flex items-center gap-2"
              onClick={() => {
                // Kanka, şimdi bu parametre güvenli bir şekilde Login sayfasına ulaşacak
                router.push("/login?redirect=createRoom");
              }}
            >
              Oda Oluştur
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/register">
              <button className="bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:border-[#ea004b]/30 hover:bg-pink-50 transition-all">
                Nasıl Çalışır?
              </button>
            </Link>
          </motion.div>

          {/* Alt Bilgi */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8 flex items-center gap-6 justify-center lg:justify-start opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              <span className="text-xs font-bold">Monad Destekli</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-bold">Anında Split</span>
            </div>
          </motion.div>
        </div>

        {/* SAĞ TARAFTA: 3D HERO ANIMATION */}
        <div className="order-1 lg:order-2 flex justify-center perspective-1000">
          <TiltCard />
        </div>

      </div>
    </div>
  );
}


// 🔥 İŞTE O PROFESYONEL 3D KART BİLEŞENİ
function TiltCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse hareketini yumuşat (Yay efekti)
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { stiffness: 150, damping: 20 });

  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200); // Hassasiyet ayarı
    y.set(yPct * 200);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-[320px] h-[580px] cursor-pointer"
    >
      {/* 1. KATMAN: Arka Işık (Glow) */}
      <motion.div
        style={{ transform: "translateZ(-50px)" }}
        className="absolute inset-4 bg-[#ea004b] rounded-[3rem] blur-[60px] opacity-40 animate-pulse"
      />

      {/* 2. KATMAN: Ana Telefon Kartı (Glassmorphism) */}
      <motion.div
        style={{ transform: "translateZ(0px)" }}
        className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col"
      >
        {/* Telefon Çentiği */}
        <div className="w-32 h-6 bg-black/5 mx-auto rounded-b-xl backdrop-blur-md mb-6"></div>

        {/* Ekran İçeriği */}
        <div className="px-6 flex-1 flex flex-col relative">

          {/* Bildirim 1 (Aslı) */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white p-3 rounded-2xl shadow-sm mb-3 flex items-center gap-3 border border-gray-100"
          >
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-lg">👩🏻‍💻</div>
            <div>
              <p className="text-xs text-gray-400 font-bold">Aslı</p>
              <p className="text-sm font-bold text-gray-800">Pizza Ekledi 🍕</p>
            </div>
            <div className="ml-auto text-[#ea004b] font-bold">+250₺</div>
          </motion.div>

          {/* Bildirim 2 (Mert) */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-white p-3 rounded-2xl shadow-sm mb-3 flex items-center gap-3 border border-gray-100"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">👨🏻‍🚀</div>
            <div>
              <p className="text-xs text-gray-400 font-bold">Mert</p>
              <p className="text-sm font-bold text-gray-800">Borcunu Ödedi ✅</p>
            </div>
          </motion.div>

          {/* Ortadaki Büyük Kart */}
          <div className="mt-auto mb-8 bg-[#1a1a1a] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ea004b] opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Toplam Sepet</p>
            <h3 className="text-4xl font-black mb-4">450.00₺</h3>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a1a1a] bg-gray-700"></div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#ea004b]">
              <CreditCard size={16} />
              <span>Ödemeye Hazır</span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 3. KATMAN: Havada Uçuşan Objeler (Floating Elements) */}
      {/* Bu elementler karttan daha önde (Z-index yüksek) durarak 3D hissini güçlendirir */}

      <FloatingElement x={220} y={-40} z={60} delay={0}>
        <div className="bg-white p-3 rounded-2xl shadow-xl text-4xl rotate-12">
          🍕
        </div>
      </FloatingElement>

      <FloatingElement x={-40} y={100} z={80} delay={1}>
        <div className="bg-white p-3 rounded-full shadow-xl text-3xl -rotate-12">
          🥤
        </div>
      </FloatingElement>

      <FloatingElement x={240} y={300} z={50} delay={0.5}>
        <div className="bg-[#ea004b] text-white px-4 py-2 rounded-xl shadow-lg font-bold text-sm flex items-center gap-2">
          <CheckCircle2 size={16} />
          Ödendi
        </div>
      </FloatingElement>

      <FloatingElement x={-20} y={400} z={100} delay={1.5}>
        <div className="bg-white p-4 rounded-2xl shadow-2xl">
          <ShoppingBag className="text-[#ea004b] w-8 h-8" />
        </div>
      </FloatingElement>

    </motion.div>
  );
}

// Uçuşan Element Bileşeni
function FloatingElement({ children, x, y, z, delay }: { children: React.ReactNode, x: number, y: number, z: number, delay: number }) {
  return (
    <motion.div
      style={{
        x, y, z,
        position: "absolute",
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: [y, y - 20, y],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
}