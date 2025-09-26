"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {auth} from "@/lib/firebase";
import {useEffect, useState} from "react";
import {onAuthStateChanged, signOut, User} from "firebase/auth";
import {Button} from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };
  if (!user) return null;

  return (
    <header className="bg-gray-600 text-white shadow !p-4 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">Meeting Rooms</h1>
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <span className=" text-yellow-300 !px-2 !py-1 rounded">
              {user.email}
            </span>
          )}

          <Link
            href="/my-bookings" passHref
          >
            <Button className="text-white-700 !px-3  rounded">
              Мої бронювання
            </Button>
          </Link>

          {user && (

            <Button className="bg-red-500 text-white !px-3 py-1 rounded hover:bg-red-700"
                    onClick={handleLogout}
            >
              Logout
            </Button>


          )}
        </div>
      </div>
    </header>
  );
}
