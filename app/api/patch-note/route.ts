import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const newNote = await prisma.patchNote.create({
      data: {
        version: body.version,
        text: body.text,
        releaseDate: new Date(body.releaseDate),
      },
    });
    return NextResponse.json(newNote);
  }
  
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  await prisma.patchNote.delete({ where: { id }});
  return new NextResponse("Deleted", { status: 200 });
}
  