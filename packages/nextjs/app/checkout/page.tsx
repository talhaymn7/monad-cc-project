"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "~~/hooks/useCart"; 
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { notification } from "~~/utils/scaffold-eth";

export default function CheckoutPage() {
  const router = useRouter();
  const { address } = useAccount();
  const { individualTotals, roomId, markAsPaid, isAllPaid, paymentStatuses, members } = useCart();
  
  const RECIPIENT_ADDRESS = "0x70B3D3F6141268739860D39734FF83640e12307c";

  const myAmount = individualTotals[address?.toLowerCase() || ""] || 0;
  // Demo kur: 100₺ = 0.01 MON
  const monAmount = (myAmount / 10000).toString(); 

  // --- MONAD TRANSACTION MOTORU (Hata Takibi Eklendi) ---
  const { 
    data: hash, 
    sendTransaction, 
    isPending, // Cüzdan onayı beklenirken true olur
    error: sendError 
  } = useSendTransaction();

  const { 
    isLoading: isConfirming, // Blockchain onayı beklenirken true olur
    isSuccess,
    error: confirmError
  } = useWaitForTransactionReceipt({ hash });

  const handlePay = () => {
    if (!address) return notification.error("Önce cüzdanını bağlamalısın kanka! 🦊");
    
    // Eğer bakiye 0 ise işlem yapma
    if (parseFloat(monAmount) <= 0) {
      return notification.error("Ödenecek tutar 0 olamaz kanka! 🍕");
    }

    sendTransaction({
      to: RECIPIENT_ADDRESS, 
      value: parseEther(monAmount),
    });
  };

  // --- HATA TAKİBİ ---
  useEffect(() => {
    if (sendError) {
      notification.error("Cüzdan Hatası: " + (sendError as any).shortMessage || "İşlem reddedildi.");
    }
  }, [sendError]);

  useEffect(() => {
    if (confirmError) {
      notification.error("Blockchain Hatası: Ödeme onaylanamadı.");
    }
  }, [confirmError]);

  // 1. Blockchain onayı gelince Firebase'e haber ver
  useEffect(() => {
    if (isSuccess) {
      markAsPaid(); 
      notification.success("Ödeme Monad ağında onaylandı! 🚀");
    }
  }, [isSuccess]);

  // 2. HERKES ÖDEDİ Mİ?
  useEffect(() => {
    if (isAllPaid && members.length > 0) {
      router.push("/success");
    }
  }, [isAllPaid, members, router]);

  const hasPaid = paymentStatuses[address?.toLowerCase() || ""];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="bg-white p-8 rounded-[3rem] shadow-2xl w-full max-w-lg border border-white">
        <h1 className="text-3xl font-black text-gray-800 mb-6 text-center">Hesabı Kapatıyoruz 💸</h1>

        <div className="bg-gray-100 p-6 rounded-[2rem] mb-6 space-y-3">
          <div className="flex justify-between font-bold text-gray-500">
            <span>Senin Payın: ({myAmount} ₺)</span>
            <span className="text-xl font-black text-[#ea004b]">{monAmount} MON</span>
          </div>
        </div>

        {/* Canlı Ödeme Takip Çizelgesi */}
        <div className="mb-8">
           <p className="text-xs font-black text-gray-400 uppercase text-center mb-4 tracking-tighter">Masadakilerin Durumu</p>
           <div className="flex justify-center gap-3">
             {members.map((m) => {
               const paid = paymentStatuses[m.toLowerCase()];
               return (
                 <div key={m} className="w-4 h-4 rounded-full transition-all duration-500 shadow-sm border border-white" 
                      style={{ backgroundColor: paid ? '#22c55e' : '#e5e7eb' }}>
                 </div>
               );
             })}
           </div>
        </div>

        <button
          onClick={handlePay}
          // Yükleme sırasında butonu kilitle
          disabled={isPending || isConfirming || hasPaid}
          className="w-full bg-[#ea004b] hover:bg-[#b5003a] text-white font-bold py-5 rounded-2xl text-xl shadow-brand-glow transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {hasPaid ? "Ödemen Alındı ✅" : 
           isPending ? "Cüzdan Onayı Bekleniyor... 🦊" : 
           isConfirming ? "İşlem Onaylanıyor... ⏳" : 
           "💳 Monad ile Öde"}
        </button>

        {/* Sadece ödeyen kişiye bekleme mesajı göster */}
        {hasPaid && !isAllPaid && (
          <p className="text-center text-xs text-orange-500 mt-6 font-bold animate-pulse">
            Diğer arkadaşların ödemesi bekleniyor... 🍕
          </p>
        )}
      </div>
    </div>
  );
}