"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Note } from "@prisma/client";

import NotesList from "@/components/NoteList";
import NoteForm from "@/components/NoteForm";

async function loadNotes() {
  const response = await fetch("http://localhost:3000/api/notes");
  const notes = await response.json();
  return notes;
}

function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showNoteForm, setShowNoteForm] = useState<boolean>(false);

  useEffect(() => {
    loadNotes()
      .then((notes) => setNotes(notes))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex justify-center gap-10 mt-10">
      <div className="flex flex-col w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-neutral-300">Notes</h1>
        <NotesList notes={notes} />
      </div>
      <NoteForm />
      <Toaster position="bottom-right" />
    </main>
  );
}

export default Home;
