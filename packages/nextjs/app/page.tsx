"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative">
      {/* Süsleme */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea004b] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full text-center z-10">
        <h1 className="text-7xl font-black text-[#ea004b] tracking-tighter mb-2">Clear Cart</h1>
        <p className="text-gray-500 text-lg mb-12 font-medium">Hesabı bölüş, dostluğu pekiştir. 🍕</p>

        {/* Buton Kutusu */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100">
          <Link href="/login" className="block w-full">
            <button className="w-full bg-[#ea004b] hover:bg-[#b5003a] text-white font-bold py-5 rounded-2xl text-xl shadow-lg shadow-pink-500/30 transition-transform transform hover:scale-[1.02] mb-4">
              🚀 Giriş Yap
            </button>
          </Link>

          <Link href="/register" className="block w-full">
            <button className="w-full bg-white border-2 border-[#ea004b] text-[#ea004b] font-bold py-4 rounded-2xl text-lg hover:bg-pink-50 transition-colors">
              Hesap Oluştur
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
