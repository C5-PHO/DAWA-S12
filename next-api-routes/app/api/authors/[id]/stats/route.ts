import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, notFound, type RouteContext } from "@/lib/api";

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const author = await prisma.author.findUnique({ where: { id }, include: { books: true } });
    if (!author) return notFound("Autor no encontrado");
    const byYear = author.books.filter(b => b.publishedYear !== null).sort((a,b) => a.publishedYear! - b.publishedYear!);
    const byPages = author.books.filter(b => b.pages !== null).sort((a,b) => a.pages! - b.pages!);
    const year = (b: typeof byYear[number] | undefined) => b ? { title: b.title, year: b.publishedYear } : null;
    const pages = (b: typeof byPages[number] | undefined) => b ? { title: b.title, pages: b.pages } : null;
    return NextResponse.json({ authorId: author.id, authorName: author.name, totalBooks: author.books.length, firstBook: year(byYear[0]), latestBook: year(byYear.at(-1)), averagePages: byPages.length ? Math.round(byPages.reduce((sum,b) => sum + b.pages!,0)/byPages.length) : null, genres: [...new Set(author.books.map(b => b.genre).filter((g): g is string => !!g))], longestBook: pages(byPages.at(-1)), shortestBook: pages(byPages[0]) });
  } catch (error) { return apiError(error); }
}
