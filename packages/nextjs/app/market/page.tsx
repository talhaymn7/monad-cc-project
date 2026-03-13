"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "~~/hooks/useCart";
import { ShoppingCart, ArrowLeft, Plus, Loader2 } from "lucide-react";

export default function MarketPage() {
  const router = useRouter();
  const { roomId, addItem, cartItems, totalAmount } = useCart();
  
  // STATİK DİZİ YERİNE STATE KULLANIYORUZ
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- DATABASE'DEN MENÜYÜ ÇEK ---
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const loadMenu = async () => {
      try {
        const firebase = await import("firebase/database");
        const firebaseConfig = await import("~~/services/firebaseConfig");
        const database = firebaseConfig.database;
        const { ref, onValue } = firebase;

        if (!database) throw new Error("Firebase database not initialized");

        const menuRef = ref(database, "menu");
        unsubscribe = onValue(menuRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const menuList = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setMenuItems(menuList);
          }
          setLoading(false);
        });
        return;
      } catch {
        // Firebase yoksa fallback olarak statik menü göster
      }

      setMenuItems([
        { id: "1", name: "Margherita Pizza", price: 120, category: "Pizza" },
        { id: "2", name: "Pepperoni Pizza", price: 140, category: "Pizza" },
        { id: "3", name: "Coca Cola", price: 15, category: "İçecek" },
        { id: "4", name: "Burger", price: 80, category: "Burger" },
        { id: "5", name: "Fries", price: 25, category: "Yan Ürün" },
      ]);
      setLoading(false);
    };

    loadMenu();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleAddToCart = async (item: any) => {
    await addItem({ name: item.name, price: item.price });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="w-10 h-10 text-[#ea004b] animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24 font-sans">
      <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/lobby")} className="p-3 bg-white rounded-2xl shadow-sm">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Menü 😋</h1>
            <p className="text-[#ea004b] font-mono font-bold tracking-widest text-sm">#{roomId}</p>
          </div>
        </div>

        <button onClick={() => router.push("/cart")} className="bg-[#ea004b] text-white px-6 py-4 rounded-[2rem] font-bold shadow-lg flex flex-col items-end">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5" />
            <span className="bg-white text-[#ea004b] text-xs px-2 py-1 rounded-full">{cartItems.length}</span>
          </div>
          <span className="text-xs opacity-90 mt-1">Toplam: {totalAmount} ₺</span>
        </button>
      </header>

      {/* DİNAMİK MENÜ LİSTESİ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white p-8 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all flex flex-col items-center text-center group relative overflow-hidden">
            <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="font-black text-gray-800 text-xl mb-2">{item.name}</h3>
            <p className="text-gray-400 text-sm mb-6 font-medium">{item.desc}</p>
            <div className="flex justify-between items-center w-full mt-auto px-2">
              <span className="text-[#ea004b] font-black text-2xl">{item.price} ₺</span>
              <button onClick={() => handleAddToCart(item)} className="bg-gray-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-[#ea004b] transition-all">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}