import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.fullName }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
};

// Only the families/weights the UI actually renders. Inter was loaded but never
// referenced (--font-sans is JetBrains Mono), so dropping it removes a whole
// font family from the critical path.
const FONTS = "/fonts/fonts.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Self-hosted fonts (public/fonts). Kept local so first paint never
            waits on an external request — Google Fonts was taking 20s+ here. */}
        <link rel="preload" href="/fonts/SZc83FzrJKuqFbwMKk6EhUXz7Q.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}