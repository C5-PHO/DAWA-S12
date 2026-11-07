import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, notFound, type RouteContext } from "@/lib/api";

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const author = await prisma.author.findUnique({ where: { id }, include: { books: { orderBy: { title: "asc" } } } });
    if (!author) return notFound("Autor no encontrado");
    return NextResponse.json(author.books);
  } catch (error) { return apiError(error); }
}
