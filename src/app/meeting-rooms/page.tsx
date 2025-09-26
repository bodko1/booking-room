import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

interface Room {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
  createdBy?: string;
}

const MeetingRoomsPage = async () => {
  const roomsRef = collection(db, "meeting-rooms");
  const snapshot = await getDocs(roomsRef);

  const rooms: Room[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Room, "id">),
  }));

  return (
    <div className="flex flex-col items-center !px-6 !py-10">
      <h1 className="text-3xl font-bold mb-8">Список кімнат</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <CardHeader className="!px-3 !mt-3">
              <CardTitle>{room.name}</CardTitle>
            </CardHeader>
            <CardContent className="!px-3">
              <p className="text-gray-600">{room.description}</p>
              {room.capacity && (
                <p className="text-sm text-gray-500 mt-2">
                  Вміщує: {room.capacity} людей
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Link href={`/meeting-rooms/${room.id}`} className="w-full">
                <Button className="w-full">Відкрити</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MeetingRoomsPage;
