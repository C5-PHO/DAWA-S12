import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { apiError, badRequest } from "@/lib/api";

export async function GET(request: Request) {
  try {
    const q = new URL(request.url).searchParams;
    const page = Number(q.get("page") ?? 1), limit = Number(q.get("limit") ?? 10);
    const sortBy = q.get("sortBy") ?? "createdAt", order = q.get("order") ?? "desc";
    if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 50 || !["title", "publishedYear", "createdAt"].includes(sortBy) || !["asc", "desc"].includes(order)) return badRequest("Parámetros de paginación u orden inválidos");
    const where: Prisma.BookWhereInput = {
      ...(q.get("search") ? { title: { contains: q.get("search")!, mode: "insensitive" } } : {}),
      ...(q.get("genre") ? { genre: q.get("genre")! } : {}),
      ...(q.get("authorName") ? { author: { name: { contains: q.get("authorName")!, mode: "insensitive" } } } : {}),
      ...(q.get("authorId") ? { authorId: q.get("authorId")! } : {}),
    };
    const [data, total] = await prisma.$transaction([
      prisma.book.findMany({ where, include: { author: true }, orderBy: [{ [sortBy]: order }, { id: "asc" }], skip: (page - 1) * limit, take: limit }),
      prisma.book.count({ where }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return NextResponse.json({ data, pagination: { page, limit, total, totalPages, hasNext: page < totalPages, hasPrev: page > 1 } });
  } catch (error) { return apiError(error); }
}
