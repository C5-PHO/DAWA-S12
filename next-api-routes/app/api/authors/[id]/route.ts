import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, badRequest, notFound, type RouteContext } from "@/lib/api";

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const author = await prisma.author.findUnique({ where: { id }, include: { books: true, _count: { select: { books: true } } } });
    return author ? NextResponse.json(author) : notFound("Autor no encontrado");
  } catch (error) { return apiError(error); }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const { name, email, bio, nationality, birthYear } = await request.json();
    if ([name, email].some(value => value !== undefined && (typeof value !== "string" || !value.trim()))) return badRequest("Nombre y email deben ser texto no vacío");
    if ([bio, nationality].some(value => value != null && typeof value !== "string") || (birthYear != null && !Number.isInteger(birthYear))) return badRequest("Datos de autor inválidos");
    const author = await prisma.author.update({ where: { id }, data: { name: name?.trim(), email: email?.trim(), bio, nationality, birthYear } });
    return NextResponse.json(author);
  } catch (error) { return apiError(error); }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    await prisma.author.delete({ where: { id } });
    return NextResponse.json({ message: "Autor eliminado correctamente" });
  } catch (error) { return apiError(error); }
}
