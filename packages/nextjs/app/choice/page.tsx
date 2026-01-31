"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "~~/hooks/useCart";
import { PlusCircle, Users, ArrowRight, Hash } from "lucide-react";
import { notification } from "~~/utils/scaffold-eth";

export default function ChoicePage() {
  const router = useRouter();
  const { createRoom, joinRoom } = useCart(); //
  const [roomCode, setRoomCode] = useState("");

  const handleCreate = () => {
    createRoom(); //
    notification.success("Oda kuruldu! Lobiye gidiyorsun... 🍕");
    router.push("/lobby"); //
  };

  const handleJoin = () => {
    if (roomCode.length !== 9) {
      notification.error("Kanka oda kodu tam 9 haneli olmalı! 🔢");
      return;
    }
    joinRoom(roomCode); //
    notification.success("Odaya bağlanılıyor... 🚀");
    router.push("/lobby"); //
  };

  return (
    <div className="min-h-screen bg-[#fff0f5] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* SEÇENEK 1: ODA OLUŞTUR */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:scale-[1.02] transition-all">
          <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-[#ea004b] transition-colors">
            <PlusCircle className="w-10 h-10 text-[#ea004b] group-hover:text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-4">Yeni Masa Aç</h2>
          <p className="text-gray-400 mb-8 font-medium">Kaptan sensin! Siparişi başlat ve arkadaşlarını davet et.</p>
          <button 
            onClick={handleCreate}
            className="w-full bg-[#ea004b] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-pink-500/30 flex items-center justify-center gap-2"
          >
            Oda Oluştur <ArrowRight size={20} />
          </button>
        </div>

        {/* SEÇENEK 2: ODAYA KATIL */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:scale-[1.02] transition-all">
          <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
            <Users className="w-10 h-10 text-gray-800 group-hover:text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-4">Masaya Dahil Ol</h2>
          <p className="text-gray-400 mb-6 font-medium">Arkadaşından aldığın 9 haneli kodu aşağıya gir.</p>
          
          <div className="w-full relative mb-4">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            <input 
              type="text" 
              placeholder="Örn: 123456789"
              maxLength={9}
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-gray-200 rounded-2xl px-12 py-4 text-center font-mono text-xl font-bold tracking-widest outline-none transition-all"
            />
          </div>
          
          <button 
            onClick={handleJoin}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all"
          >
            Odaya Katıl
          </button>
        </div>

      </div>
    </div>
  );
}