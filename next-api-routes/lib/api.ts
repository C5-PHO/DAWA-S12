import { Prisma } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

export function apiError(error: unknown) {
  if (error instanceof SyntaxError) return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") return NextResponse.json({ error: "Ya existe un registro con ese valor único" }, { status: 409 });
    if (error.code === "P2025" || error.code === "P2003") return NextResponse.json({ error: "Registro relacionado no encontrado" }, { status: 404 });
  }
  console.error("Error en la API:", error);
  return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
}

export const badRequest = (message: string) => NextResponse.json({ error: message }, { status: 400 });
export const notFound = (message: string) => NextResponse.json({ error: message }, { status: 404 });
export type RouteContext = { params: Promise<{ id: string }> };
