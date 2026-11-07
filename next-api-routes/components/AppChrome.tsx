"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const icons = {
  logo: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5.5 7.5H15V24.5H5.5V7.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M17 7.5H26.5V24.5H17V7.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M8.5 12H12.5M8.5 15.5H12.5M8.5 19H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <path d="M20.5 7.5V16L22.5 14.25L24.5 16V7.5" fill="currentColor" />
    </svg>
  ),
  authors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  books: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  ),
};

export function Sidebar() {
  const path = usePathname();
  const onBooks = path.startsWith("/books");
  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <span className="mark">{icons.logo}</span>
        <span className="brand-text">
          <strong>Biblioteca</strong>
          <small>GESTIÓN LITERARIA</small>
        </span>
      </Link>
      <div className="side-group">
        <p className="side-label">Navegación</p>
        <nav className="side-nav">
          <Link href="/" className={`side-link${!onBooks ? " active" : ""}`}>
            {icons.authors}
            <span>Autores</span>
          </Link>
          <Link href="/books" className={`side-link${onBooks ? " active" : ""}`}>
            {icons.books}
            <span>Libros</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}

export function Topbar() {
  const path = usePathname();
  const crumb = path.startsWith("/books") ? ["Libros", "Catálogo"] : path.startsWith("/authors") ? ["Autores", "Perfil"] : ["Autores", "Panel de control"];
  return (
    <header className="topbar">
      <div className="shell topbar-inner">
        <div className="crumbs">
          <span>Biblioteca</span>
          <span className="sep">/</span>
          <span>{crumb[0]}</span>
          <span className="sep">/</span>
          <strong>{crumb[1]}</strong>
        </div>
        <span className="topbar-meta">DAWA / LAB 12</span>
      </div>
    </header>
  );
}
