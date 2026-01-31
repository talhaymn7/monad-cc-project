"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FoodCharacter } from "~~/components/FoodCharacter";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-brand-light selection:bg-brand selection:text-white animate-fade-in">
      
      {/* ARKA PLAN DOKUSU */}
      <div className="absolute inset-0 opacity-[0.05] bg-dot-pattern bg-dot-size pointer-events-none"></div>

      {/* --- YAN YANA DEV KARAKTERLER (YEMEK KONSEYİ) --- */}
      {/* flex-row ile yan yana dizdik, scale ile büyüttük */}
      <div className="absolute top-[5%] md:top-[10%] w-full flex justify-center items-center gap-4 md:gap-16 pointer-events-none z-0">
        
        {/* Pizza (Solda) */}
        <div className="animate-float transform scale-[1.8] md:scale-[2.5]">
          <FoodCharacter emoji="🍕" mouseX={mousePos.x} mouseY={mousePos.y} isShy={isPasswordFocus} />
        </div>

        {/* Burger (Ortada - En Büyük) */}
        <div className="animate-float-slow transform scale-[2.2] md:scale-[3] z-10 mx-4">
          <FoodCharacter emoji="🍔" mouseX={mousePos.x} mouseY={mousePos.y} isShy={isPasswordFocus} />
        </div>

        {/* Donut (Sağda) */}
        <div className="animate-float-delayed transform scale-[1.8] md:scale-[2.5]">
          <FoodCharacter emoji="🍩" mouseX={mousePos.x} mouseY={mousePos.y} isShy={isPasswordFocus} />
        </div>

      </div>
      {/* ------------------------------------------------ */}


      {/* ANA FORM KARTI (Biraz aşağı ittik margin-top ile) */}
      <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] shadow-deep w-full max-w-md border border-white relative z-10 animate-slide-up mt-32 md:mt-48">
        
        <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-brand transition-colors p-2 rounded-full hover:bg-pink-50 active:scale-90">
          <span className="text-xl">🔙</span>
        </Link>

        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
            Giriş Yap
          </h1>
          <p className="text-gray-500 font-medium">
            Konsey seni izliyor... 👀
          </p>
        </div>

        <div className="space-y-6">
          
          <div className="group">
            <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-4">E-Posta</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com"
              className="w-full bg-white border-2 border-transparent text-gray-900 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10 transition-all font-bold placeholder:text-gray-300 shadow-sm group-hover:shadow-md relative z-20"
            />
          </div>

          <div className="group relative z-20">
            <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-4">Şifre</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // Focus olunca karakterler döner
              onFocus={() => setIsPasswordFocus(true)}
              onBlur={() => setIsPasswordFocus(false)}
              placeholder="••••••••"
              className="w-full bg-white border-2 border-transparent text-gray-900 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10 transition-all font-bold placeholder:text-gray-300 shadow-sm group-hover:shadow-md"
            />
            <p className="text-[10px] text-gray-400 mt-2 ml-4 font-medium text-right animate-pulse">
              {isPasswordFocus ? "Arkalarını döndüler, rahat ol 🙈" : "Şifreni yazarken bakmayacaklar."}
            </p>
          </div>

          <button 
            onClick={() => router.push('/lobby')} 
            className="w-full bg-brand hover:bg-brand-dark text-white font-black py-5 rounded-2xl text-xl shadow-brand-glow transition-all duration-300 transform active:scale-95 hover:-translate-y-1 relative overflow-hidden group mt-4 z-20">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Giriş Yap 🚀
            </span>
          </button>

        </div>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-gray-400 text-sm font-medium">
            Hesabın yok mu?
            <Link href="/register" className="text-brand font-black hover:underline transition-all ml-1">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}