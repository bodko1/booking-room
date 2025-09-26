import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import MeetingRoomCard, { Room } from "@/components/MeetingRoomCard";

interface Props {
 params: { id: string };
}

export default async function MeetingRoomDetailsPage({ params }: Props) {
 const roomRef = doc(db, "meeting-rooms", params.id);
 const roomSnap = await getDoc(roomRef);

 if (!roomSnap.exists()) return <p>Кімната не знайдена</p>;

 const roomData = roomSnap.data();

 const room: Room = {
  id: roomSnap.id,
  name: roomData?.name || "Без назви",
  description: roomData?.description || "",
  capacity: roomData?.capacity || 0,
 };

 return (
   <div className="px-6 py-10 max-w-md mx-auto">
    <MeetingRoomCard
      room={room}
      showBookButton={true}
      showDetailsButton={false}
    />
   </div>
 );
}
