import React, { useState } from "react";
import { useCart } from "../hooks/useCart";

export const RoomManager = () => {
  const { roomId, createRoom, joinRoom } = useCart();
  const [inputRoomId, setInputRoomId] = useState("");

  if (roomId) {
    return (
      <div className="p-4 bg-base-200 rounded-lg">
        <h2 className="text-xl font-bold">Oda Kodu: <span className="text-primary">{roomId}</span></h2>
        <p className="text-sm">Arkadaşlarınla bu kodu paylaş!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6 bg-base-100 shadow-xl rounded-2xl">
      <button className="btn btn-primary" onClick={createRoom}>
        Yeni Oda Oluştur
      </button>
      <div className="divider">VEYA</div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="4 Haneli Kod Gir"
          className="input input-bordered w-full"
          value={inputRoomId}
          onChange={(e) => setInputRoomId(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={() => joinRoom(inputRoomId)}>
          Katıl
        </button>
      </div>
    </div>
  );
};