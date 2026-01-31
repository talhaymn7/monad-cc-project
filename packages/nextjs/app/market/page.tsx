"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MENU_ITEMS = [
  { id: 1, name: "Süper Karışık Pizza", price: 250, icon: "🍕", desc: "Bol malzemeli" },
  { id: 2, name: "Mega Burger Menü", price: 200, icon: "🍔", desc: "Patates + İçecek" },
  { id: 3, name: "Acılı Kanat (10'lu)", price: 180, icon: "🍗", desc: "Barbekü soslu" },
  { id: 4, name: "Coca-Cola Zero", price: 40, icon: "🥤", desc: "330ml Buz gibi" },
  { id: 5, name: "Çıtır Soğan Halkası", price: 60, icon: "🧅", desc: "8 adet çıtır" },
  { id: 6, name: "San Sebastian", price: 120, icon: "🍰", desc: "Çikolata soslu" },
];

export default function MarketPage() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  // Sayfa açılınca sepette kaç ürün var bak
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("myCart") || "[]");
    setCartCount(savedCart.length);
  }, []);

  const addToCart = (item: any) => {
    // Mevcut sepeti al, yenisini ekle, kaydet
    const currentCart = JSON.parse(localStorage.getItem("myCart") || "[]");
    const newItem = { ...item, user: "Ben" };
    const newCart = [...currentCart, newItem];

    localStorage.setItem("myCart", JSON.stringify(newCart));
    setCartCount(newCart.length);

    // Ufak bir bildirim (Alert yerine daha şık olabilir ama şimdilik alert)
    // alert(`${item.name} eklendi!`); // İstersen açabilirsin
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24 font-sans relative">
      {/* Üst Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Ne yiyoruz? 😋</h1>
          <p className="text-gray-400 text-sm">Oda: #X92F</p>
        </div>

        {/* Sepetim Butonu (Sağ Üst) */}
        <button
          onClick={() => router.push("/cart")}
          className="bg-[#ea004b] text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-pink-500/30 flex items-center gap-2 transition-transform active:scale-95"
        >
          <span>🛒 Sepetim</span>
          <span className="bg-white text-[#ea004b] text-xs px-2 py-1 rounded-full">{cartCount}</span>
        </button>
      </header>

      {/* Ürün Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MENU_ITEMS.map(item => (
          <div
            key={item.id}
            onClick={() => addToCart(item)}
            className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl border-2 border-transparent hover:border-[#ea004b] cursor-pointer transition-all flex flex-col items-center text-center group"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
            <p className="text-gray-400 text-xs mb-3">{item.desc}</p>
            <div className="flex justify-between items-center w-full mt-2 px-4">
              <span className="text-[#ea004b] font-extrabold text-xl">{item.price} ₺</span>
              <span className="bg-gray-100 text-gray-400 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                +
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
