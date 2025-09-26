import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import MeetingRoomCard, { Room } from "@/components/MeetingRoomCard";

export default async function MeetingRoomsPage() {
  const snapshot = await getDocs(collection(db, "meeting-rooms"));
  const rooms: Room[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      capacity: data.capacity,
      createdBy: data.createdBy,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null, // рядок ISO
    }
  });

  return (
    <div className="flex flex-col items-center !px-6 !py-10">
      <h1 className="text-3xl font-bold mb-8">Список кімнат</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl">
        {rooms.map(room => (
          <MeetingRoomCard key={room.id} room={room}  />
        ))}
      </div>
    </div>
  );
}
