import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

// Tints the mobile browser chrome / status bar to match the blue urgency bar.
export const viewport: Viewport = {
  themeColor: "#2a62ff",
};

export const metadata: Metadata = {
  title: "Bull Run 2027 — Live Event | Trade With Suli",
  description:
    "Suli bedah cara siap-siap sebelum bullrun berikutnya, live selama 4 malam. Tanpa pengalaman, tanpa modal besar, tanpa bayar.",
};

// Desktop (≥1024px) keeps the 1440px design and scales it to the viewport via --zoom (see .page-zoom).
// Runs before paint so laptops never flash the unscaled layout.
const ZOOM_SCRIPT = `(function(){var d=document.documentElement;d.classList.add("reveal-ready");function s(){d.style.setProperty("--scrollbar",innerWidth-d.clientWidth+"px")}s();addEventListener("resize",s)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ZOOM_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
