import { Note } from "@prisma/client";
import { IconTrashFilled } from "@tabler/icons-react";
import dayjs from "dayjs";

interface Props {
  note: Note;
}

export default function NotePill({ note }: Props) {
  return (
    <div
      key={note.id}
      className="bg-neutral-900 p-4 rounded-lg text-neutral-300 border border-neutral-800 min-h-32">
      <header className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-bold">{note.title}</h2>
        <button className="p-2 rounded-lg hover:bg-neutral-800 hover:text-red-500">
          <IconTrashFilled size={16} />
        </button>
      </header>
      <p>{note.content}</p>
    </div>
  )
}