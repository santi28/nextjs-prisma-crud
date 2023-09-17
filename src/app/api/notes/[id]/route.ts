import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const note = await prisma?.note.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const notePayload = await req.json();

    console.log(notePayload)

    const note = await prisma?.note.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title: notePayload.title,
        content: notePayload.content,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const note = await prisma?.note.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Note not found" }, { status: 404 });
      }
      
      console.log(error)
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
