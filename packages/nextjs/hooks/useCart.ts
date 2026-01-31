// hooks/useCart.ts

import { useState, useEffect } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { database } from "../services/firebaseConfig";
import { useAccount } from "wagmi";

export const useCart = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [members, setMembers] = useState<string[]>([]);
  const [admin, setAdmin] = useState<string | null>(null);
  const [roomStatus, setRoomStatus] = useState<string>("waiting");
  // Yeni: Her cüzdanın kendi borç toplamı
  const [individualTotals, setIndividualTotals] = useState<Record<string, number>>({});

  const { address } = useAccount();

  const createRoom = async () => {
    const newRoomId = Math.floor(100000000 + Math.random() * 900000000).toString();
    const creatorAddress = address?.toLowerCase();
    if (creatorAddress) {
      await set(ref(database, `rooms/${newRoomId}/metadata`), {
        admin: creatorAddress,
        status: "waiting",
      });
    }
    setRoomId(newRoomId);
    localStorage.setItem("active_session_id", newRoomId);
    return newRoomId;
  };

  const startOrder = async () => {
    if (roomId && address?.toLowerCase() === admin) {
      await set(ref(database, `rooms/${roomId}/metadata/status`), "shopping");
    }
  };

  const joinRoom = (id: string) => {
    setRoomId(id);
    localStorage.setItem("active_session_id", id);
  };

  useEffect(() => {
    const savedSession = localStorage.getItem("active_session_id");
    if (savedSession && !roomId) {
      setRoomId(savedSession);
    }
  }, []);

  // Sepete ürün eklerken kimin eklediğini (whoAdded) mühürlüyoruz
  const addItem = async (item: { name: string; price: number }) => {
    if (!roomId || !address) return;
    const itemRef = ref(database, `orders/${roomId}/items`);
    const newItemRef = push(itemRef);
    await set(newItemRef, { 
      ...item, 
      whoAdded: address.toLowerCase(), 
      timestamp: Date.now() 
    });
  };

  useEffect(() => {
    if (!roomId) return;

    const metaRef = ref(database, `rooms/${roomId}/metadata`);
    const unsubscribeMeta = onValue(metaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAdmin(data.admin);
        setRoomStatus(data.status);
      }
    });

    if (address) {
      const memberRef = ref(database, `rooms/${roomId}/members/${address.toLowerCase()}`);
      set(memberRef, true);
    }

    const membersRef = ref(database, `rooms/${roomId}/members`);
    const unsubscribeMembers = onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setMembers(Object.keys(data));
    });

    const cartRef = ref(database, `orders/${roomId}/items`);
    const unsubscribeCart = onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.values(data) as any[];
        setCartItems(itemsArray);

        // KOLEKTİF HESAPLAMA: Herkesin ne kadar ödeyeceğini bul
        const totals: Record<string, number> = {};
        let grandTotal = 0;
        
        itemsArray.forEach((item) => {
          const user = item.whoAdded;
          totals[user] = (totals[user] || 0) + Number(item.price);
          grandTotal += Number(item.price);
        });

        setIndividualTotals(totals);
        setTotalAmount(grandTotal);
      } else {
        setCartItems([]);
        setIndividualTotals({});
        setTotalAmount(0);
      }
    });

    return () => {
      unsubscribeMeta();
      unsubscribeMembers();
      unsubscribeCart();
    };
  }, [roomId, address]);

  return { 
    roomId, cartItems, totalAmount, members, admin, 
    roomStatus, individualTotals, createRoom, joinRoom, addItem, startOrder 
  };
};