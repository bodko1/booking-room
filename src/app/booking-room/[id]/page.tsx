"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BookingForm {
  name: string;
  date: string;
  time: string;
}

export default function BookingRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id;

  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<BookingForm>({ name: "", date: "", time: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      const roomRef = doc(db, "meeting-rooms", roomId);
      const roomSnap = await getDoc(roomRef);
      if (!roomSnap.exists()) {
        setError("Кімната не знайдена");
        setLoading(false);
        return;
      }
      const data = roomSnap.data();
      setRoom({ id: roomSnap.id, ...data });
      setLoading(false);
    };

    fetchRoom();
  }, [roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!roomId) {
      setError("Невірний шлях кімнати");
      return;
    }

    if (!form.name || !form.date || !form.time) {
      setError("Заповніть усі поля");
      return;
    }

    // Перевірка зайнятості
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("roomId", "==", roomId),
      where("date", "==", form.date),
      where("time", "==", form.time)
    );
    const existing = await getDocs(q);
    if (!existing.empty) {
      setError("Ця кімната вже зайнята на обрану дату та час");
      return;
    }

    // Додаємо бронювання
    await addDoc(bookingsRef, {
      roomId,
      roomName: room.name,
      ...form,
      createdAt: new Date(),
    });

    setSuccess(true);
    setForm({ name: "", date: "", time: "" });
  };

  if (loading) return <p className="text-center mt-10">Завантаження кімнати...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!room) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
      <p className="text-gray-700 mb-6">{room.description}</p>

      {success && <p className="text-green-600 mb-4">Бронювання успішне!</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Ваше ім'я"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Забронювати
        </button>
      </form>
    </div>
  );
}
