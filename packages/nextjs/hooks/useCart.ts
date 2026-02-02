"use client";

import { useState, useEffect } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { database } from "../services/firebaseConfig";
import { useAccount } from "wagmi";

export const useCart = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [members, setMembers] = useState<string[]>([]);
  const [memberNames, setMemberNames] = useState<Record<string, string>>({}); // 🔥 Adres-İsim Eşleşmesi
  const [admin, setAdmin] = useState<string | null>(null);
  const [roomStatus, setRoomStatus] = useState<string>("waiting");
  const [individualTotals, setIndividualTotals] = useState<Record<string, number>>({});
  const [paymentStatuses, setPaymentStatuses] = useState<Record<string, boolean>>({});
  const [isAllPaid, setIsAllPaid] = useState(false);

  const { address } = useAccount();

  // --- ODA YÖNETİMİ ---

  const createRoom = async () => {
    if (!address) return;
    const newRoomId = Math.floor(100000000 + Math.random() * 900000000).toString();
    const creatorAddress = address.toLowerCase();

    await set(ref(database, `rooms/${newRoomId}/metadata`), {
      admin: creatorAddress,
      status: "waiting",
      createdAt: Date.now()
    });

    setRoomId(newRoomId);
    localStorage.setItem("active_session_id", newRoomId);
    return newRoomId;
  };

  const startOrder = async () => {
    if (roomId && address?.toLowerCase() === admin?.toLowerCase()) {
      await set(ref(database, `rooms/${roomId}/metadata/status`), "shopping");
    }
  };

  const joinRoom = (id: string) => {
    setRoomId(id);
    localStorage.setItem("active_session_id", id);
  };

  const markAsPaid = async () => {
    if (!roomId || !address) return;
    const paymentRef = ref(database, `rooms/${roomId}/payments/${address.toLowerCase()}`);
    await set(paymentRef, true);
  };

  const addItem = async (item: { name: string; price: number }) => {
    if (!roomId || !address) return;
    const itemRef = ref(database, `orders/${roomId}/items`);
    await push(itemRef, { 
      ...item, 
      whoAdded: address.toLowerCase(), 
      timestamp: Date.now() 
    });
  };

  // --- REAL-TIME SENKRONİZASYON ---

  useEffect(() => {
    const savedSession = localStorage.getItem("active_session_id");
    if (savedSession && !roomId) setRoomId(savedSession);
  }, []);

  useEffect(() => {
    if (!roomId) return;

    // A. Metadata (Admin & Durum)
    const unsubscribeMeta = onValue(ref(database, `rooms/${roomId}/metadata`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAdmin(data.admin);
        setRoomStatus(data.status);
      }
    });

    // B. Üyeleri Kaydet ve Dinle
    if (address) {
      // Sadece gerçek cüzdan bağlandığında üye olarak kaydet
      set(ref(database, `rooms/${roomId}/members/${address.toLowerCase()}`), true);
    }
    const unsubscribeMembers = onValue(ref(database, `rooms/${roomId}/members`), (snapshot) => {
      const data = snapshot.val();
      if (data) setMembers(Object.keys(data));
    });

    // C. Sepet ve Borç Hesaplama
    const unsubscribeCart = onValue(ref(database, `orders/${roomId}/items`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.values(data) as any[];
        setCartItems(itemsArray);

        const totals: Record<string, number> = {};
        let grandTotal = 0;
        itemsArray.forEach((item) => {
          const user = item.whoAdded.toLowerCase();
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

    // D. Ödemeleri Dinle
    const unsubscribePayments = onValue(ref(database, `rooms/${roomId}/payments`), (snapshot) => {
      setPaymentStatuses(snapshot.val() || {});
    });

    return () => {
      unsubscribeMeta();
      unsubscribeMembers();
      unsubscribeCart();
      unsubscribePayments();
    };
  }, [roomId, address]);

  // 🔥 E. İSİM MOTORU: Üyelerin isimlerini profillerden çek
  useEffect(() => {
    if (members.length === 0) return;

    const unsubscribes = members.map((memberAddr) => {
      const addr = memberAddr.toLowerCase();
      const userRef = ref(database, `users_by_address/${addr}`);
      
      return onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setMemberNames(prev => ({ ...prev, [addr]: userData.fullName }));
        }
      });
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, [members]);

  // F. Global Ödeme Bariyeri
  useEffect(() => {
    if (members.length > 0) {
      const allPaid = members.every(member => paymentStatuses[member.toLowerCase()] === true);
      setIsAllPaid(allPaid);
    }
  }, [paymentStatuses, members]);

  return { 
    roomId, cartItems, totalAmount, members, memberNames, admin, 
    roomStatus, individualTotals, paymentStatuses, 
    isAllPaid, createRoom, joinRoom, addItem, startOrder, markAsPaid 
  };
};