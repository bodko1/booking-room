"use client";
import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/lib/firebase";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/meeting-rooms")
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        console.log("Unknown err", err)
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800" >Login</h2>
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
        Увійти
      </button>
      <p className="text-center text-gray-700 mt-4">
        Ще не маєте акаунту?{" "}
        <Link href="/register" passHref>
    <span className="text-blue-500 hover:underline cursor-pointer">
      Зареєструватись
    </span>
        </Link>
      </p>
    </form>
  );
}
