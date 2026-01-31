"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = () => {
    setIsPaying(true);
    // 2 saniye bekle sonra success'e git
    setTimeout(() => {
      router.push("/success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-lg border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Hesabı Kapatıyoruz 💸</h1>

        {/* Özet Kartı */}
        <div className="bg-gray-50 p-6 rounded-2xl mb-6 border border-gray-200">
          <div className="flex justify-between mb-2 text-gray-500">
            <span>Senin Payın</span>
            <span>250.00 ₺</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-500">
            <span>Hizmet Bedeli</span>
            <span>10.00 ₺</span>
          </div>
          <div className="h-px bg-gray-200 my-3"></div>
          <div className="flex justify-between text-xl font-black text-[#ea004b]">
            <span>Toplam</span>
            <span>260.00 ₺</span>
          </div>
        </div>

        {/* Öde Butonu */}
        <button
          onClick={handlePay}
          disabled={isPaying}
          className="w-full bg-[#ea004b] hover:bg-[#b5003a] text-white font-bold py-5 rounded-2xl text-xl shadow-lg shadow-pink-500/30 transition-all active:scale-95 flex justify-center items-center gap-2"
        >
          {isPaying ? "İşleniyor..." : "💳 Ödemeyi Tamamla"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">Monad Ağı ile güvenli ödeme.</p>
      </div>
    </div>
  );
}
