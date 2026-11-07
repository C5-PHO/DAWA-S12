import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, badRequest } from "@/lib/api";

export async function GET(request: Request) {
  try {
    const genre = new URL(request.url).searchParams.get("genre");
    const books = await prisma.book.findMany({ where: genre ? { genre } : {}, include: { author: true }, orderBy: { title: "asc" } });
    return NextResponse.json(books);
  } catch (error) { return apiError(error); }
}

export async function POST(request: Request) {
  try {
    const { title, description, isbn, publishedYear, genre, pages, authorId } = await request.json();
    if (typeof title !== "string" || !title.trim() || typeof authorId !== "string" || !authorId.trim()) return badRequest("Título y autor son requeridos");
    if ([description, isbn, genre].some(value => value != null && typeof value !== "string") || [publishedYear, pages].some(value => value != null && !Number.isInteger(value))) return badRequest("Datos del libro inválidos");
    const book = await prisma.book.create({ data: { title: title.trim(), description, isbn, publishedYear, genre, pages, authorId }, include: { author: true } });
    return NextResponse.json(book, { status: 201 });
  } catch (error) { return apiError(error); }
}
