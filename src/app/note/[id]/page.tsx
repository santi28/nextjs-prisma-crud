import GoBackButton from "@/components/GoBackButton";
import { IconArrowLeft, IconFileBroken } from "@tabler/icons-react";
import dayjs from "dayjs";

const getNote = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/notes/${id}`);
    const note = await response.json();
    return note;
  } catch (error) {
    console.error(error);
  }
}

interface Props {
  params: { id: string }
}

async function NotePage({ params } : Props) {
  const note = await getNote(params.id);
  const date = dayjs(note.createdAt).format("MMMM D, YYYY");

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="flex justify-between items-center p-4 mb-6 border-b border-neutral-800">
        <div className="flex items-center gap-4">
          <GoBackButton />
          <h1 className="text-2xl font-bold text-neutral-300">
            {note.title || note.message }
          </h1>
        </div>
        {
          note?.message ? null : (
            <span className="text-xs italic text-neutral-400 leading-1">{date}</span>
          )
        }
      </header>
      <div className="flex flex-col h-full w-full px-16">
        {
          note?.message ? (
            <div className="flex flex-row justify-center items-center w-full gap-6">
              <IconFileBroken size={52} className="text-neutral-300" />
              <p className="text-xl font-bold text-neutral-300">Ups, something went wrong</p>
            </div>
          ) : (
            <p>{note.content}</p>
          )
        }
      </div>
    </div>
  )
}

export default NotePage