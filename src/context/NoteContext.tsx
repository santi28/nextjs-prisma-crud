'use client';
import { Note } from "@prisma/client";
import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode
}

interface NoteContext {
  notes: Note[]
  loadNotes: () => Promise<void>
  deleteNote: (noteId: number) => Promise<void>
}

const NoteContext = createContext<NoteContext>({ 
  notes: [], 
  loadNotes: () => Promise.resolve(), 
  deleteNote: () => Promise.resolve()
});

function NotesProvider({ children }: Props) {
  async function loadNotes() {
    const response = await fetch("http://localhost:3000/api/notes");
    const notes = await response.json();
    setNotes(notes);
  }

  async function deleteNote(noteId: number) {
    try {
      const deletedNoteResponse = await fetch(`http://localhost:3000/api/notes/${noteId}`, { method: "DELETE" });

      if (!deletedNoteResponse.ok) throw new Error("Something went wrong");
      const deletedNote = await deletedNoteResponse.json() as Note;

      const updatedNotes = notes.filter((note) => note.id !== deletedNote.id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  }

  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <NoteContext.Provider value={{ notes, loadNotes, deleteNote }}>
      {children}
    </NoteContext.Provider>
  )
}

export { NoteContext, NotesProvider }