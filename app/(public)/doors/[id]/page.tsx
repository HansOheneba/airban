import { notFound } from "next/navigation";
import { DoorDetail } from "@/components/door-detail";
import { getDoor } from "@/lib/db";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const door = getDoor(id);
  if (!door) notFound();
  return { title: door.name };
}

export default async function DoorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const door = getDoor(id);
  if (!door) notFound();

  return <DoorDetail door={door} />;
}
