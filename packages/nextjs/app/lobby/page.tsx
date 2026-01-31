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
  const { roomId, members, admin, roomStatus, startOrder, joinRoom } = useCart(); // useCart'tan gerekli her şeyi aldık
  const [memberNames, setMemberNames] = useState<Record<string, string>>({});

  // Giriş yapan kişi oda yöneticisi mi? (Küçük harf standardıyla kontrol)
  const isAdmin = address?.toLowerCase() === admin?.toLowerCase();

  // --- 1. OTOMATİK YÖNLENDİRME ---
  // Admin başlattığında Firebase'deki status "shopping" olur ve bu efekt herkesi markete uçurur.
  useEffect(() => {
    if (roomStatus === "shopping") {
      router.push("/market");
    }
  }, [roomStatus, router]);

  // --- 2. SESSION KURTARMA ---
  useEffect(() => {
    const savedRoomId = localStorage.getItem("active_session_id");
    if (!roomId && savedRoomId) {
      joinRoom(savedRoomId);
    }
  }, [roomId, joinRoom]);

  // --- 3. İSİM SENKRONİZASYONU ---
  useEffect(() => {
    if (members.length === 0) return;

    const unsubscribes = members.map((addr) => {
      const normalizedAddr = addr.toLowerCase();
      const userRef = ref(database, `users_by_address/${normalizedAddr}`);

      return onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setMemberNames(prev => ({
            ...prev,
            [addr]: userData.fullName
          }));
        }
      });
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, [members]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg">
        
        {/* Oda Kodu Bölümü */}
        <div className="text-center mb-8">
          <span className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide ${roomStatus === "waiting" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
            {roomStatus === "waiting" ? "🟢 ODA AKTİF" : "🚀 SİPARİŞ BAŞLIYOR..."}
          </span>
          <h1 className="text-4xl font-black text-gray-800 mt-4">Pizzacılar Kulübü 🍕</h1>
          <p className="text-gray-400 mt-2">
            Oda Kodu: <span className="text-[#ea004b] font-mono font-bold text-xl tracking-widest">#{roomId || "YÜKLENİYOR"}</span>
          </p>
        </div>

        {/* Katılımcılar Kartı */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 bg-[#ea004b]">
            <h2 className="text-white font-bold text-lg">Katılımcılar ({members.length}/4)</h2>
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
                    {/* Admin Rozeti */}
                    {memberAddr.toLowerCase() === admin?.toLowerCase() && (
                      <span className="text-[10px] bg-gray-900 text-white px-2 py-1 rounded-md font-bold uppercase tracking-tighter">Yönetici</span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* KOLEKTİF AKSİYON BUTONU */}
        {isAdmin ? (
          <button
            onClick={startOrder} // startOrder direkt Firebase status'u günceller
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-5 rounded-2xl text-xl shadow-lg transition-all flex items-center justify-center gap-3 group"
          >
            Siparişi Başlat (Yönetici) ➔
          </button>
        ) : (
          <div className="w-full bg-white border border-gray-100 text-gray-400 font-bold py-5 rounded-2xl text-xl text-center shadow-sm italic">
            Yöneticinin başlatması bekleniyor... ⏳
          </div>
        )}
      </div>
    </div>
  );
}