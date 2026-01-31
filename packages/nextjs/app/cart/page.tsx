"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  // Sayfa açılınca localStorage'dan sepeti çek
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("myCart") || "[]");
    setCart(savedCart);
  }, []);

  const clearCart = () => {
    localStorage.removeItem("myCart");
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans flex flex-col">
      {/* Üst Bar */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/market" className="text-2xl">
          🔙
        </Link>
        <h1 className="text-2xl font-black text-gray-800">Sepetim ({cart.length})</h1>
        <button onClick={clearCart} className="text-gray-400 text-sm font-bold hover:text-red-500">
          Temizle🗑️
        </button>
      </div>

      {/* Sepet Listesi */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {cart.length === 0 ? (
          <div className="text-center text-gray-400 mt-20 flex flex-col items-center opacity-60">
            <span className="text-6xl mb-4">🕸️</span>
            <p>Sepetin bomboş...</p>
            {/* HATA DÜZELTİLDİ: Market'e yerine Market&apos;e yazıldı */}
            <Link href="/market" className="mt-4 text-[#ea004b] font-bold">
              Market&apos;e Dön
            </Link>
          </div>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100"
            >
              <div className="text-3xl bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-400">{item.desc}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] bg-pink-100 text-[#ea004b] px-2 py-0.5 rounded font-bold">
                    Sen Ekledin
                  </span>
                </div>
              </div>
              <div className="font-black text-gray-800">{item.price}₺</div>
            </div>
          ))
        )}
      </div>

      {/* Alt Özet ve Buton */}
      {cart.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between mb-2 text-gray-500">
            <span>Ara Toplam</span>
            <span>{cart.reduce((total: any, item: any) => total + item.price, 0)} ₺</span>
          </div>
          <div className="flex justify-between mb-6 text-2xl font-black text-gray-900">
            <span>Ödenecek</span>
            <span className="text-[#ea004b]">{cart.reduce((total: any, item: any) => total + item.price, 0)} ₺</span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full bg-[#ea004b] hover:bg-[#b5003a] text-white font-bold py-5 rounded-2xl text-xl shadow-lg shadow-pink-500/30 transition-transform active:scale-95 flex justify-between px-8 items-center"
          >
            <span>Ödemeye Geç</span>
            <span>➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
