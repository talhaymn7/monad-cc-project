"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "~~/hooks/useCart";
import { useAccount } from "wagmi";
import { ref, onValue } from "firebase/database";
import { database } from "~~/services/firebaseConfig";

export default function LobbyPage() {
  const router = useRouter();
  const { address } = useAccount();
  const { roomId, members, admin, roomStatus, startOrder } = useCart(); // Yeni alanları aldık
  const [memberNames, setMemberNames] = useState<Record<string, string>>({});

  const isAdmin = address?.toLowerCase() === admin; // Giriş yapan kişi admin mi?

  // --- OTOMATİK YÖNLENDİRME ---
  useEffect(() => {
    if (roomStatus === "shopping") {
      router.push("/market"); // Admin başlattığı an herkes gider!
    }
  }, [roomStatus, router]);

  const { joinRoom } = useCart();

  useEffect(() => {
    // Eğer roomId yoksa ama biz Lobby sayfasındaysak, 
    // URL'den veya localStorage'dan id'yi geri getirebiliriz.
    const savedRoomId = localStorage.getItem("lastRoomId");
    if (!roomId && savedRoomId) {
      joinRoom(savedRoomId);
    }
  }, [roomId]);

  // Cüzdan adreslerini isimlere dönüştür
  useEffect(() => {
    // Eğer odada kimse yoksa işlem yapma
    if (members.length === 0) return;

    const unsubscribes = members.map((addr) => {
      // KRİTİK: Database'e küçük harfle kaydettiğimiz için burada da küçük harfle arıyoruz
      const normalizedAddr = addr.toLowerCase();
      const userRef = ref(database, `users_by_address/${normalizedAddr}`);

      return onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          // State'i güncelle: Adres -> İsim eşleşmesi
          setMemberNames(prev => ({
            ...prev,
            [addr]: userData.fullName
          }));
        }
      });
    });

    // Temizlik: Bileşen kapandığında veya members değiştiğinde eski dinleyicileri kapat
    return () => unsubscribes.forEach(unsub => unsub());
  }, [members]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg">
        {/* Oda Kodu Bölümü */}
        <div className="text-center mb-8">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
            🟢 ODA AKTİF
          </span>
          <h1 className="text-4xl font-black text-gray-800 mt-4">Yemek Odası 🍕</h1>
          <p className="text-gray-400 mt-2">
            Oda Kodu: <span className="text-[#ea004b] font-mono font-bold text-xl tracking-widest">#{roomId || "YÜKLENİYOR"}</span>
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 bg-[#ea004b]">
            <h2 className="text-white font-bold text-lg">Katılımcılar: ({members.length})</h2>
          </div>

          <div className="p-2">
            {members.length === 0 ? (
              <div className="p-8 text-center text-gray-400 italic">Cüzdan bağlanıyor...</div>
            ) : (
              members.map((memberAddr, i) => {
                const isMe = memberAddr.toLowerCase() === address?.toLowerCase();
                const name = memberNames[memberAddr] || `${memberAddr.slice(0, 6)}...`;

                return (
                  <div key={i} className="flex items-center p-4 border-b last:border-0 border-gray-100">
                    <div className="text-3xl bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                      {isMe ? "👩🏻‍💻" : "👨🏻‍🚀"}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">
                        {name} {isMe && "(Sen)"}
                      </h3>
                      <p className="text-sm font-bold text-green-500">Hazır</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <button
          onClick={() => router.push("/market")}
          className="w-full bg-gray-900 hover:bg-black text-white font-bold py-5 rounded-2xl text-xl shadow-lg transition-all flex items-center justify-center gap-3 group"
        >
          Siparişi Başlat ➔
        </button>
      </div>
    </div>
  );
}