import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, badRequest, notFound, type RouteContext } from "@/lib/api";

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const book = await prisma.book.findUnique({ where: { id }, include: { author: true } });
    return book ? NextResponse.json(book) : notFound("Libro no encontrado");
  } catch (error) { return apiError(error); }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const { title, description, isbn, publishedYear, genre, pages, authorId } = await request.json();
    if ([title, authorId].some(value => value !== undefined && (typeof value !== "string" || !value.trim()))) return badRequest("Título y autor deben ser texto no vacío");
    if ([description, isbn, genre].some(value => value != null && typeof value !== "string") || [publishedYear, pages].some(value => value != null && !Number.isInteger(value))) return badRequest("Datos del libro inválidos");
    const book = await prisma.book.update({ where: { id }, data: { title: title?.trim(), description, isbn, publishedYear, genre, pages, authorId }, include: { author: true } });
    return NextResponse.json(book);
  } catch (error) { return apiError(error); }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    await prisma.book.delete({ where: { id } });
    return NextResponse.json({ message: "Libro eliminado correctamente" });
  } catch (error) { return apiError(error); }
}
