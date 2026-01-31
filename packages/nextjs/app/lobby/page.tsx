"use client";

import { useRouter } from "next/navigation";

export default function LobbyPage() {
  const router = useRouter();

  const friends = [
    { name: "Sen (Aslı)", status: "Hazır", avatar: "👩🏻‍💻" },
    { name: "Mert", status: "Bekleniyor...", avatar: "👨🏻‍🚀" },
    { name: "Ayşe", status: "Hazır", avatar: "👩🏻‍🎨" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
            🟢 ODA AKTİF
          </span>
          <h1 className="text-4xl font-black text-gray-800 mt-4">Pizzacılar Kulübü 🍕</h1>
          <p className="text-gray-400 mt-2">
            Oda Kodu: <span className="text-black font-mono font-bold text-xl tracking-widest">#X92F</span>
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 bg-[#ea004b]">
            <h2 className="text-white font-bold text-lg">Katılımcılar ({friends.length}/4)</h2>
          </div>
          <div className="p-2">
            {friends.map((friend, i) => (
              <div key={i} className="flex items-center p-4 border-b last:border-0 border-gray-100">
                <div className="text-3xl bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                  {friend.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">{friend.name}</h3>
                  <p
                    className={`text-sm font-bold ${friend.status === "Hazır" ? "text-green-500" : "text-orange-400"}`}
                  >
                    {friend.status}
                  </p>
                </div>
              </div>
            ))}
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
