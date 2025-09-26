"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useUserWithRole } from "@/hooks/useUserWithRole";

export default function AddRoomPage() {
  const router = useRouter();
  const { userData, loading } = useUserWithRole();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState<number>(1);
  const [error, setError] = useState("");

  if (loading) return <p>Завантаження...</p>;
  if (!userData) return <p>Ви не авторизовані</p>;
  if (userData.role !== "admin") return <p>У вас немає доступу</p>;

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return setError("Вкажіть назву кімнати");

    try {
      await addDoc(collection(db, "meeting-rooms"), {
        name,
        description,
        capacity,
        createdBy: userData.email,
        createdAt: new Date(),
      });
      router.push("/meeting-rooms");
    } catch (err) {
      console.error(err);
      setError("Помилка додавання кімнати");
    }
  };

  return (
    <form onSubmit={handleAddRoom} className="max-w-md mx-auto mt-10 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center mb-4">Додати кімнату</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Назва кімнати"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Кількість місць"
        value={capacity}
        onChange={(e) => setCapacity(Number(e.target.value))}
        className="border p-2 rounded"
        min={1}
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        Додати кімнату
      </button>
    </form>
  );
}
