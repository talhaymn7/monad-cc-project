"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Wallet, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl text-center space-y-8">

        {/* Başlık */}
        <div className="space-y-4">
          <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-600 text-xs font-bold tracking-widest uppercase">
            Monad Hackathon 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
            Clear <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-400">
              Cart.
            </span>
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Hesabı kim ödeyecek gerginliği bitti. <br />
            Arkadaşlarınla aynı sepete at, tek tıkla bölüş.
          </p>
        </div>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2 justify-center"
            onClick={() => router.push("/login?redirect=createRoom")}
          >
            Oda Oluştur
            <ArrowRight className="w-5 h-5" />
          </button>
          <Link href="/market">
            <button className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-pink-300 hover:bg-pink-50 transition-all">
              Market'e Göz At
            </button>
          </Link>
        </div>

        {/* Özellikler */}
        <div className="pt-8 flex items-center gap-8 justify-center opacity-75">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-pink-600" />
            <span className="text-sm font-semibold">Monad Destekli</span>
          </div>
          <div className="h-4 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold">Anında Split</span>
          </div>
        </div>

      </div>
    </div>
  );
}