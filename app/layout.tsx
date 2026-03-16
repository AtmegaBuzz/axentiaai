import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NavbarWrapper } from "@/components/NavbarWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Axentia.AI — Capability Platform for the AI Era",
  description: "Enterprise consulting education built on 25+ years of real SAP project delivery experience. Prepare for the AI era with AxentiaAI.",
  icons: {
    icon: [
      { url: "/brand/favicon_io/favicon.ico", sizes: "any" },
      { url: "/brand/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/brand/favicon_io/apple-touch-icon.png",
  },
  manifest: "/brand/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans`}>
        <NavbarWrapper>
          {children}
        </NavbarWrapper>
      </body>
    </html>
  );
}
