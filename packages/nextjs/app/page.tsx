"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { RoomManager } from "~~/components/RoomManager";
import { useCart } from "~~/hooks/useCart";
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { cartItems, totalAmount, roomId, addItem } = useCart();
  const { address } = useAccount();
  const [customAmount, setCustomAmount] = useState<string>("");

  const { data: orderInfo } = useScaffoldReadContract({
    contractName: "MultiplayerPayment",
    functionName: "orders",
    args: [roomId ? BigInt(roomId) : BigInt(0)],
  });

  const targetAmount = orderInfo ? parseFloat(formatEther(orderInfo[0])) : totalAmount;
  const currentBalance = orderInfo ? parseFloat(formatEther(orderInfo[1])) : 0;

  const { writeContractAsync: payToPool } = useScaffoldWriteContract("MultiplayerPayment");

  return (
    <div className="flex items-center flex-col flex-grow pt-10 px-4">
      <h1 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        CLEAR CART
      </h1>
      
      <RoomManager />

      {roomId && (
        <>
          {/* Ürün Ekleme Test Butonları */}
          <div className="mt-8 flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={() => addItem({ name: "🍕 Pizza", price: 0.01 })}>🍕 Pizza Ekle</button>
            <button className="btn btn-outline btn-sm" onClick={() => addItem({ name: "🥤 Kola", price: 0.005 })}>🥤 Kola Ekle</button>
          </div>

          <div className="mt-8 p-6 bg-base-200 rounded-3xl shadow-2xl border border-primary/10 w-full max-w-md">
            <div className="mb-6 space-y-1">
              <p className="text-sm opacity-60 text-center">Havuz Hedefi: {targetAmount} MON</p>
              <progress className="progress progress-success w-full" value={currentBalance} max={targetAmount}></progress>
            </div>

            <div className="max-h-40 overflow-y-auto mb-4 space-y-2">
              {cartItems.map((item, i) => (
                <div key={i} className={`flex justify-between p-2 rounded-lg text-sm ${item.addedBy === address ? 'bg-primary/10' : 'bg-base-100'}`}>
                  <span>{item.name} {item.addedBy === address && "⭐"}</span>
                  <span className="font-bold">{item.price} MON</span>
                </div>
              ))}
            </div>

            <div className="join w-full mb-4">
              <input 
                type="number" 
                placeholder="Payını Gir" 
                className="input input-bordered join-item w-full" 
                value={customAmount} 
                onChange={(e) => setCustomAmount(e.target.value)} 
              />
              <button className="btn btn-secondary join-item" onClick={() => payToPool({
                functionName: "contribute",
                args: [BigInt(roomId)],
                value: parseEther(customAmount)
              })}>Öde</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;