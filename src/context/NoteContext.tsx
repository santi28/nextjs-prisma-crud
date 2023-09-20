'use client';
import { Note } from "@prisma/client";
import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode
}

interface NoteContext {
  notes: Note[]
  loadNotes: () => Promise<void>
}

const NoteContext = createContext<NoteContext>({ notes: [], loadNotes: () => Promise.resolve() });

function NotesProvider({ children }: Props) {
  async function loadNotes() {
    const response = await fetch("http://localhost:3000/api/notes");
    const notes = await response.json();
    setNotes(notes);
  }

  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <NoteContext.Provider value={{ notes, loadNotes }}>
      {children}
    </NoteContext.Provider>
  )
}

export { NoteContext, NotesProvider }