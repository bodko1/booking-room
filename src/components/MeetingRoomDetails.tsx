"use client"

import {useRouter} from "next/navigation"
import {DocumentData} from "@firebase/firestore";

interface MeetingRoomDetailsProps {
  id:string,
  room:DocumentData;
}

export default function MeetingRoomDetails({room,id} : MeetingRoomDetailsProps ) {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
      <p>{room.description}</p>
      <button
        onClick={() => router.push(`/booking-room/${id}`)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Забронювати
      </button>
    </div>
  );
}