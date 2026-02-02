"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { database } from "~~/services/firebaseConfig"; 
import { notification } from "~~/utils/scaffold-eth";
import { useAccount } from "wagmi"; // 1. Cüzdan kütüphanesi

export default function RegisterPage() {
  const router = useRouter();
  const { address } = useAccount(); // ✅ DOĞRU YER: Bileşenin içinde
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // 1. Cüzdan Bağlantısı Kontrolü
    if (!address) {
      notification.error("Kanka önce cüzdanını bağlaman lazım! Sağ üstten 'Connect Wallet' yap. 🦊");
      return;
    }

    if (!fullName || !email || !password) {
      notification.error("Kanka tüm boşlukları doldurman lazım!");
      return;
    }

    setLoading(true);
    const auth = getAuth();

    try {
      // 2. Firebase Auth ile Kullanıcı Oluştur
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullName });

      // 3. Database Kaydı (ÇİFT YÖNLÜ MANTIK)

      // A. UID üzerinden kayıt
      await set(ref(database, `users/${user.uid}`), {
        fullName: fullName,
        email: email,
        walletAddress: address, 
        createdAt: Date.now()
      });

      // B. Cüzdan Adresi üzerinden kayıt (LOBİ İÇİN KRİTİK)
      // Burayı küçük harfe (toLowerCase) çeviriyoruz ki lobide ararken hata çıkmasın.
      await set(ref(database, `users_by_address/${address.toLowerCase()}`), {
        fullName: fullName,
        uid: user.uid
      });

      notification.success("Aramıza hoş geldin! Giriş yapabilirsin. 🚀");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      notification.error("Kayıt sırasında bir hata oluştu. Şifre en az 6 karakter mi?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4">
      <div className="bg-white p-10 rounded-[2rem] shadow-xl w-full max-w-md border border-gray-100 relative">
        <Link href="/" className="absolute top-6 left-6 text-gray-400 hover:text-black text-2xl">🔙</Link>

        <h1 className="text-4xl font-extrabold text-[#ea004b] mb-2 text-center">Aramıza Katıl</h1>
        <p className="text-gray-400 text-center mb-8">Hesabı ödemekten kaçamazsın 😉</p>

        <div className="space-y-4">
          {/* Cüzdan Durum Göstergesi (UX için iyi olur kanka) */}
          <div className={`p-3 rounded-xl text-xs font-bold text-center ${address ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {address ? `Bağlı Cüzdan: ${address.slice(0,6)}...${address.slice(-4)}` : "⚠️ Cüzdan Bağlı Değil"}
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 ml-1">Adın Soyadın</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Aslı Nur"
              className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#ea004b]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 ml-1">E-Posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="asli@mail.com"
              className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#ea004b]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 ml-1">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#ea004b]"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full bg-[#ea004b] hover:bg-[#b5003a] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] mt-4 text-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
          </button>
        </div>
      </div>
    </div>
  );
}