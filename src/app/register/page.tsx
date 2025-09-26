"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        role: "user",
        createdAt: serverTimestamp(),
      });

      router.push("/meeting-rooms");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        console.error("Невідома помилка:", err);
      }
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        Зареєструватися
      </button>
      <p className="text-center text-gray-700 mt-4">
        Вже маєте акаунт?{" "}
        <Link href="/login" passHref>
          <span className="text-blue-500 hover:underline cursor-pointer">
            Увійти
          </span>
        </Link>
      </p>
    </form>
  );
}
