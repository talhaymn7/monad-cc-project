"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4">
      <div className="bg-white p-10 rounded-[2rem] shadow-xl w-full max-w-md border border-gray-100 relative">
        {/* Geri Dön Butonu */}
        <Link href="/" className="absolute top-6 left-6 text-gray-400 hover:text-black text-2xl">
          🔙
        </Link>

        <h1 className="text-4xl font-extrabold text-[#ea004b] mb-2 text-center">Aramıza Katıl</h1>
        <p className="text-gray-400 text-center mb-8">Hesabı ödemekten kaçamazsın 😉</p>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2 ml-1">Adın Soyadın</label>
            <input
              type="text"
              placeholder="Aslı Nur"
              className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#ea004b]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 ml-1">E-Posta</label>
            <input
              type="email"
              placeholder="asli@mail.com"
              className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#ea004b]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 ml-1">Şifre</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#ea004b]"
            />
          </div>

          <button
            onClick={() => router.push("/login")}
            className="w-full bg-[#ea004b] hover:bg-[#b5003a] text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-500/30 transition-all transform hover:scale-[1.02] mt-4 text-lg"
          >
            Kayıt Ol
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Zaten hesabın var mı?{" "}
          <Link href="/login" className="text-[#ea004b] font-bold hover:underline">
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}
