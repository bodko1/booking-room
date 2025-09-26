"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {onAuthStateChanged} from "@firebase/auth";


export default function HomeRedirect() {
  const router = useRouter();
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth,user=>{
      if(user){
        router.replace("/meeting-rooms")
      }
      else {
        router.replace("/login")
      }
    });

    return ()=> unsubscribe();
  }, [router]);
  return <p>Перевірка</p>
}
