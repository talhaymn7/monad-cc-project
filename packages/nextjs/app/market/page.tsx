"use client";

import { useRouter } from "next/navigation";
import { useCart } from "~~/hooks/useCart"; // Gerçek zamanlı senkronizasyon beyni
import { notification } from "~~/utils/scaffold-eth";
import { ShoppingCart, ArrowLeft, Plus } from "lucide-react";

const MENU_ITEMS = [
  { id: 1, name: "Süper Karışık Pizza", price: 250, icon: "🍕", desc: "Bol malzemeli" },
  { id: 2, name: "Mega Burger Menü", price: 200, icon: "🍔", desc: "Patates + İçecek" },
  { id: 3, name: "Acılı Kanat (10'lu)", price: 180, icon: "🍗", desc: "Barbekü soslu" },
  { id: 4, name: "Coca-Cola Zero", price: 40, icon: "🥤", desc: "330ml Buz gibi" },
  { id: 5, name: "Çıtır Soğan Halkası", price: 60, icon: "🧅", desc: "8 adet çıtır" },
  { id: 7, name: "San Sebastian", price: 120, icon: "🍰", desc: "Çikolata soslu" },
];

export default function MarketPage() {
  const router = useRouter();
  // Hook'tan gelen tüm kolektif veriler
  const { roomId, addItem, cartItems, totalAmount } = useCart();

  const handleAddToCart = async (item: any) => {
    try {
      // Firebase'e kolektif olarak ekle
      await addItem({ name: item.name, price: item.price });
      notification.success(`${item.name} ortak sepete eklendi! 🍕`);
    } catch (error) {
      notification.error("Ürün eklenirken bir hata oluştu kanka.");
    }
  };

  // Eğer oda oturumu yoksa (F5 sonrası kayıp vb.) lobiden kurtar
  if (!roomId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-10 rounded-[3rem] shadow-xl">
          <p className="text-gray-400 mb-4 italic">Oda oturumu yükleniyor...</p>
          <button onClick={() => router.push("/choice")} className="text-[#ea004b] font-bold underline">
            Oda Seçimine Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24 font-sans relative">
      {/* Üst Header - Kolektif Bilgiler */}
      <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/lobby")} className="p-3 bg-white rounded-2xl shadow-sm hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Ne yiyoruz? 😋</h1>
            <p className="text-[#ea004b] font-mono font-bold tracking-widest text-sm mt-1">
              ODA: #{roomId}
            </p>
          </div>
        </div>

        {/* Canlı Sepet Özeti - Herkesin Eklediklerini Gösterir */}
        <button
          onClick={() => router.push("/cart")}
          className="bg-[#ea004b] text-white px-6 py-4 rounded-[2rem] font-bold shadow-brand-glow flex flex-col items-end transition-all active:scale-95 hover:-translate-y-1"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-lg">Ortak Sepet</span>
            <span className="bg-white text-[#ea004b] text-xs px-2.5 py-1 rounded-full font-black">
              {cartItems.length}
            </span>
          </div>
          <span className="text-xs opacity-90 font-medium mt-1">Toplam: {totalAmount} ₺</span>
        </button>
      </header>

      {/* Ürün Listesi Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {MENU_ITEMS.map(item => (
          <div
            key={item.id}
            className="bg-white p-8 rounded-[3rem] shadow-sm hover:shadow-2xl border-2 border-transparent hover:border-[#ea004b]/20 transition-all flex flex-col items-center text-center group relative overflow-hidden"
          >
            {/* Arka plan süsü */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
              {item.icon}
            </div>
            
            <h3 className="font-black text-gray-800 text-xl mb-2 relative z-10">{item.name}</h3>
            <p className="text-gray-400 text-sm mb-6 font-medium relative z-10">{item.desc}</p>
            
            <div className="flex justify-between items-center w-full mt-auto px-2 relative z-10">
              <span className="text-[#ea004b] font-black text-2xl tracking-tight">{item.price} ₺</span>
              <button 
                onClick={() => handleAddToCart(item)}
                className="bg-gray-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold hover:bg-[#ea004b] shadow-lg shadow-gray-200 hover:shadow-pink-500/30 transition-all active:scale-90"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}