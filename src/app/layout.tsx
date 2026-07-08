import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import CanvasBackground from "@/components/CanvasBackground";
import CommandPalette from "@/components/CommandPalette";
import Navbar from "@/components/Navbar";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rajuri Likhitha | Portfolio & AI Engineer",
  description: "Personal portfolio website of Rajuri Likhitha, a Computer Science and Engineering student at RIT, AI/ML Researcher, and Software Developer.",
  keywords: [
    "Rajuri Likhitha",
    "Likhitha Rajuri",
    "Portfolio",
    "AI/ML Engineer",
    "Software Engineer",
    "Computer Science",
    "Ramaiah Institute of Technology",
    "SafeUpload",
    "HelixDB",
    "IEEE SIGHT-RIT"
  ],
  authors: [{ name: "Rajuri Likhitha" }],
  openGraph: {
    title: "Rajuri Likhitha | Portfolio & AI Engineer",
    description: "Personal portfolio website of Rajuri Likhitha. Discover AI/ML, databases, and software engineering projects.",
    url: "https://likhitha.me", // Placeholder portfolio URL
    siteName: "Rajuri Likhitha Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajuri Likhitha | Portfolio & AI Engineer",
    description: "Personal portfolio website of Rajuri Likhitha. Discover AI/ML, databases, and software engineering projects.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans cursor-none select-none md:select-auto">
        <AppProvider>
          {/* Introductory loading sequence */}
          <Loader />

          {/* Interactive background particle elements */}
          <CanvasBackground />

          {/* Custom Dual-Ring cursor */}
          <CustomCursor />

          {/* Ctrl+K Command Palette */}
          <CommandPalette />

          {/* Floating Navigation Header */}
          <Navbar />

          {/* Main Layout body */}
          <div className="flex-1 flex flex-col relative z-10">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
