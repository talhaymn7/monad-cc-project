"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#ea004b] flex flex-col items-center justify-center p-6 text-white text-center font-sans">
      {/* Animasyonlu Tik */}
      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce">
        <span className="text-6xl">✅</span>
      </div>

      <h1 className="text-5xl font-black mb-4 tracking-tight">Sipariş Onaylandı!</h1>
      <p className="text-white/90 text-xl max-w-md mx-auto mb-10 font-medium leading-relaxed">
        Pizzalar fırına verildi bile! Afiyet olsun 🍕🔥
      </p>

      <Link href="/">
        <button className="bg-white text-[#ea004b] font-bold py-4 px-12 rounded-xl hover:bg-gray-100 transition-colors shadow-xl text-lg">
          🏠 Ana Sayfaya Dön
        </button>
      </Link>
    </div>
  );
}
