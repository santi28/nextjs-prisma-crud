"use client";

import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Note } from "@prisma/client";

import NotesList from "@/components/NoteList";
import NoteForm from "@/components/NoteForm";
import { NoteContext } from "@/context/NoteContext";

function Home() {
  const { notes, loadNotes } = useContext(NoteContext);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

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
