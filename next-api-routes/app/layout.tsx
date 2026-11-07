import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = { title: "Biblioteca | DAWA", description: "Gestión de autores y libros" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><header className="topbar"><div className="shell nav"><Link href="/" className="brand"><span className="mark">B</span><span>Biblioteca<small>GESTIÓN LITERARIA</small></span></Link><nav><Link href="/">Autores</Link><Link href="/books">Libros</Link></nav><span className="nav-note">DAWA / LAB 12</span></div></header><main className="shell">{children}</main><footer className="shell footer">BIBLIOTECA <span>·</span> Gestión de autores y libros</footer></body></html>;
}
