import { Note } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";

async function createNewNote(note: Partial<Note>) {
  try {
    if (!note.title) throw new Error("Note title is required");
    if (!note.content) throw new Error("Note content is required");

    // Realizamos la petición POST a la API
    const response = await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    // Si la petición no fue exitosa, lanzamos un error
    if (!response.ok) throw new Error("Something went wrong");

    // Si la petición fue exitosa, retornamos la nota creada
    return await response.json();
  } catch (error) {
    return error;
  }
}

function NoteForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const note = await createNewNote({
      title,
      content,
    });

    if (note instanceof Error) {
      return toast.error(note.message);
    }

    setTitle("");
    setContent("");
    toast.success("Note created successfully");
  }

  return (
    <form className="flex flex-col gap-2 border border-neutral-800 rounded-lg p-4 w-96" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-neutral-300">Create new note</h2>

      <label className="flex flex-col gap-1">
        <span className="text-neutral-300">Title</span>
        <input
          type="text"
          className="bg-transparent border border-neutral-800 rounded-lg p-2 text-neutral-300 outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My note title"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-neutral-300">Content</span>
        <textarea
          className="bg-transparent border resize-none h-40 border-neutral-800 rounded-lg p-2 text-neutral-300 outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 transition-all"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="My note content"
        />
      </label>
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition-all">
        Create note
      </button>
    </form>
  );
}

export default NoteForm;
