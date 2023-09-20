import { NoteContext } from "@/context/NoteContext";
import { Note } from "@prisma/client";
import { IconTrashFilled } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useContext } from "react";
import toast from "react-hot-toast";

interface Props {
  note: Note;
}

export default function NotePill({ note }: Props) {
  const { deleteNote } = useContext(NoteContext);
  const date = dayjs(note.createdAt).format("MMMM D, YYYY");

  const handleDelete = async () => {
    try {
      await deleteNote(note.id);
      toast.success("Note deleted");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      key={note.id}
      className="bg-neutral-900 p-4 rounded-lg text-neutral-300 border border-neutral-800 min-h-32">
      <header className="flex justify-between items-start mb-1">
        <div>
          <h2 className="text-lg font-bold">{note.title}</h2>
          <span className="text-xs italic text-neutral-400 leading-1">{date}</span>
        </div>
        <button className="p-2 rounded-lg hover:bg-neutral-800 hover:text-red-500" onClick={handleDelete}>
          <IconTrashFilled size={16} />
        </button>
      </header>
      <p>{note.content}</p>
    </div>
  )
}