"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "~~/hooks/useCart"; // Multiplayer beynimiz
import { useAccount } from "wagmi";
import { ref, onValue } from "firebase/database";
import { database } from "~~/services/firebaseConfig";

export default function CartPage() {
  const router = useRouter();
  const { address } = useAccount();
  const { roomId, cartItems, totalAmount, individualTotals, members } = useCart();
  const [memberNames, setMemberNames] = useState<Record<string, string>>({});

  // 1. Üye isimlerini cüzdan adresleriyle eşleştir
  useEffect(() => {
    if (members.length === 0) return;
    const unsubscribes = members.map((addr) => {
      const userRef = ref(database, `users_by_address/${addr.toLowerCase()}`);
      return onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setMemberNames(prev => ({ ...prev, [addr.toLowerCase()]: snapshot.val().fullName }));
        }
      });
    });
    return () => unsubscribes.forEach(unsub => unsub());
  }, [members]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans flex flex-col">
      {/* Üst Bar */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/market" className="text-2xl bg-white p-2 rounded-full shadow-sm active:scale-90 transition-transform">
          🔙
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-black text-gray-800">Ortak Sepet</h1>
          <p className="text-[10px] text-[#ea004b] font-mono font-bold tracking-widest">#{roomId}</p>
        </div>
        <div className="w-10"></div> {/* Denge için boşluk */}
      </div>

      {/* Ortak Sepet Listesi */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-400 mt-20 flex flex-col items-center opacity-60">
            <span className="text-6xl mb-4">🕸️</span>
            <p>Sepet henüz bomboş...</p>
            <Link href="/market" className="mt-4 text-[#ea004b] font-bold">Menüye Dön</Link>
          </div>
        ) : (
          cartItems.map((item, index) => {
            const addedByMe = item.whoAdded?.toLowerCase() === address?.toLowerCase();
            const adderName = memberNames[item.whoAdded?.toLowerCase()] || "Yükleniyor...";
            
            return (
              <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 animate-slide-up">
                <div className="text-3xl bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                  {/* Icon yerine name'e göre emoji atayabiliriz veya menüden çekebilirsin */}
                  🍕
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${addedByMe ? "bg-pink-100 text-[#ea004b]" : "bg-gray-100 text-gray-400"}`}>
                      {addedByMe ? "Sen Ekledin" : `${adderName} ekledi`}
                    </span>
                  </div>
                </div>
                <div className="font-black text-gray-800">{item.price}₺</div>
              </div>
            );
          })
        )}
      </div>

      {/* Hesap Bölüştürme Paneli */}
      {cartItems.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-[2rem] shadow-deep space-y-4">
          <h2 className="font-black text-gray-800 border-b border-gray-50 pb-2">Hesap Dökümü</h2>
          <div className="space-y-2">
            {Object.entries(individualTotals).map(([userAddr, amount]) => (
              <div key={userAddr} className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">
                  {memberNames[userAddr.toLowerCase()] || userAddr.slice(0, 6)}:
                </span>
                <span className="font-bold text-gray-800">{amount} ₺</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-400">Toplam</span>
              <span className="text-3xl font-black text-[#ea004b]">{totalAmount} ₺</span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-[#ea004b] hover:bg-[#b5003a] text-white font-bold py-5 rounded-2xl text-xl shadow-brand-glow transition-all active:scale-95 flex justify-between px-8 items-center"
            >
              <span>Ödemeye Geç</span>
              <span className="bg-white/20 px-3 py-1 rounded-lg">➔</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}