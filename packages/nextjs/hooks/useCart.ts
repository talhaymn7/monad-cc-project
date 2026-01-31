import { useState, useEffect } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { database } from "../services/firebaseConfig";
import { useAccount } from "wagmi"; // Kullanıcı adresini çekmek için

export const useCart = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [members, setMembers] = useState<string[]>([]); // Odadaki cüzdanlar

  const { address } = useAccount(); // Giriş yapmış cüzdan adresi

  // 1. 9 Haneli Rastgele Oda Kodu Üretme
  const createRoom = () => {
    const newRoomId = Math.floor(100000000 + Math.random() * 900000000).toString();
    setRoomId(newRoomId);
    return newRoomId;
  };

  // 2. Mevcut Bir Odaya Katılma
  const joinRoom = (id: string) => {
    setRoomId(id);
  };

  // 3. Sepete Ürün Ekleme (Firebase'e Yazma)
  const addItem = async (item: { name: string; price: number }) => {
    if (!roomId || !address) return;

    const itemRef = ref(database, `orders/${roomId}/items`);
    const newItemRef = push(itemRef);
    
    await set(newItemRef, {
      ...item,
      addedBy: address,
      timestamp: Date.now(),
    });
  };

  // 4. Üye Takibi ve Sepet Senkronizasyonu
  useEffect(() => {
    if (!roomId) return;

    // --- A. ODAYA ÜYE OLARAK KAYDOL ---
    if (address) {
      const memberRef = ref(database, `rooms/${roomId}/members/${address}`);
      set(memberRef, true); // Odaya girdiğini işaretle
    }

    // --- B. ÜYELERİ CANLI DİNLE ---
    const membersRef = ref(database, `rooms/${roomId}/members`);
    const unsubscribeMembers = onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMembers(Object.keys(data)); // Cüzdan adreslerini listeye çek
      }
    });

    // --- C. SEPETİ CANLI DİNLE ---
    const cartRef = ref(database, `orders/${roomId}/items`);
    const unsubscribeCart = onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.values(data);
        setCartItems(itemsArray);
        const total = itemsArray.reduce((acc: number, curr: any) => acc + Number(curr.price), 0);
        setTotalAmount(total);
      } else {
        setCartItems([]);
        setTotalAmount(0);
      }
    });

    // Temizlik: Dinleyicileri durdur
    return () => {
      unsubscribeMembers();
      unsubscribeCart();
    };
  }, [roomId, address]);

  return {
    roomId,
    cartItems,
    totalAmount,
    members, // Yeni: Odadaki üyelerin listesi
    createRoom,
    joinRoom,
    addItem,
  };
};