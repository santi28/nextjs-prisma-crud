import { Note } from "@prisma/client";
import NotePill from "./NotePill";

interface Props {
  notes: Note[];
}

export default function NotesList({ notes }: Props) {
  return (
    <div className="gap-4 mt-5 grid grid-cols-2 w-full">
      { notes.map((note: Note) => (<NotePill note={note} key={note.id} />)) }
    </div>
  );
}