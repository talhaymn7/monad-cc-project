import { Pizza, Users, Wallet } from "lucide-react";

export const RoomView = ({ roomId, members, cartItems, totalAmount, addItem }: any) => {
  return (
    <div className="min-h-screen bg-[#fff0f5] p-8 flex flex-col items-center">
      {/* Üst Bilgi Paneli */}
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 border border-white/60 shadow-xl mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-[#ea004b] font-black text-2xl uppercase">Oda: {roomId}</h2>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <Users size={16} /> {members.length} Arkadaşın Burada
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-400">TOPLAM HAVUZ</p>
          <p className="text-3xl font-black text-gray-900">{totalAmount} MON</p>
        </div>
      </div>

      {/* Sepet İçeriği (Madde 2 & 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Pizza className="text-[#ea004b]" /> Ortak Sepet
          </h3>
          <div className="space-y-3">
            {cartItems.map((item: any, i: number) => (
              <div key={i} className="flex justify-between bg-pink-50/50 p-3 rounded-xl border border-pink-100">
                <span className="font-medium">{item.name}</span>
                <span className="font-bold text-[#ea004b]">{item.price} MON</span>
              </div>
            ))}
          </div>
        </div>

        {/* Aksiyon Paneli (Madde 5) */}
        <div className="bg-[#1a1a1a] rounded-3xl p-6 text-white shadow-2xl flex flex-col justify-between">
           <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Ödeme Havuzu</p>
           <button onClick={() => addItem({name: "🍕 Pizza", price: 0.01})} className="btn btn-outline border-white/20 text-white mt-4">
             Test: Pizza Ekle
           </button>
           <button className="bg-[#ea004b] w-full py-4 rounded-2xl font-bold mt-6 shadow-[0_10px_20px_rgba(234,0,75,0.4)]">
             PAYINI ÖDE
           </button>
        </div>
      </div>
    </div>
  );
};