"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export interface Room {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
}

interface MeetingRoomCardProps {
  room: Room;
  showBookButton?: boolean;
  showDetailsButton?: boolean;
}

export default function MeetingRoomCard({ room, showBookButton = false,showDetailsButton= true }: MeetingRoomCardProps) {
  const router = useRouter();

  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow !p-3 !mt-3" >
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{room.description}</p>
        {room.capacity && <p className="text-sm text-gray-500 mt-2">Вміщує: {room.capacity} людей</p>}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {showDetailsButton &&<Button onClick={() => router.push(`/meeting-rooms/${room.id}`)} className="w-full">
          Деталі
        </Button>}
        {showBookButton && (
          <Button onClick={() => router.push(`/booking-room/${room.id}`)} className="w-full bg-blue-500 hover:bg-blue-600">
            Забронювати
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
