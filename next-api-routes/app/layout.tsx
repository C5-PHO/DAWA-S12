import type { Metadata } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { Sidebar, Topbar } from "@/components/AppChrome";
import "./globals.css";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans-ui", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif-ui", display: "swap" });

export const metadata: Metadata = { title: "Biblioteca | DAWA", description: "Gestión de autores y libros" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <div className="app">
          <Sidebar />
          <div className="content">
            <Topbar />
            <main className="shell">{children}</main>
            <footer className="shell footer">
              <span>Biblioteca — Gestión de autores y libros</span>
              <span>DAWA / LAB 12</span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
