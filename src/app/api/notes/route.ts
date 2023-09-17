import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET () {
  try {
    const notes = await prisma?.note.findMany()
    return NextResponse.json(notes)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      )
    }

  }
}

export async function POST (req: Request) {
  try {
    const notePayload = await req.json()

    const note = await prisma.note.create({
      data: {
        title: notePayload.title,
        content: notePayload.content,
      }
    })

    return NextResponse.json(note)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      )
    }
  }
}