import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, badRequest } from "@/lib/api";

export async function GET() {
  try {
    const authors = await prisma.author.findMany({ include: { books: true, _count: { select: { books: true } } }, orderBy: { name: "asc" } });
    return NextResponse.json(authors);
  } catch (error) { return apiError(error); }
}

export async function POST(request: Request) {
  try {
    const { name, email, bio, nationality, birthYear } = await request.json();
    if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim()) return badRequest("Nombre y email son requeridos");
    if (birthYear != null && !Number.isInteger(birthYear)) return badRequest("El año de nacimiento debe ser un número entero");
    if ([bio, nationality].some(value => value != null && typeof value !== "string")) return badRequest("Los campos de texto deben ser válidos");
    const author = await prisma.author.create({ data: { name: name.trim(), email: email.trim(), bio, nationality, birthYear } });
    return NextResponse.json(author, { status: 201 });
  } catch (error) { return apiError(error); }
}
