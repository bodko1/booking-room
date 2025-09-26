import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import MeetingRoomDetails from "@/components/MeetingRoomDetails";

interface Props {
 params: { id: string };
}

export default async function DetailsMeetingRoomPage({ params }: Props) {
 const { id } = params;

 const roomRef = doc(db, "meeting-rooms", id);
 const roomSnap = await getDoc(roomRef);

 if (!roomSnap.exists()) return <p>Room not found</p>;

 const roomData = roomSnap.data();

 const room = {
  ...roomData,
  createdAt: roomData.createdAt?.toDate().toISOString(),
 };

 return <MeetingRoomDetails room={room} id={id} />;
}
