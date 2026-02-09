import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google"; 
import "./globals.css";

// 1. COMPONENTS (Global UI)
import Galaxy from "./components/Galaxy";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";

// 2. LOAD MODERN AEROSPACE FONTS
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vortex Aerospace | Defying Gravity",
  description: "Vortex Aerospace is an aerospace manufacturer building the next generation of reusable rockets powered by Rotary Detonation Engines (RDE).",
  keywords: ["Vortex", "Aerospace", "RDE", "Rocket", "Space", "India", "Tech", "Startup", "Propulsion"],
  openGraph: {
    title: "Vortex Aerospace | Advancing Humanity",
    description: "Building the infrastructure for the next century of human history with detonation-based propulsion.",
    url: "https://vortex-aerospace.vercel.app", 
    siteName: "Vortex Aerospace",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Vortex Aerospace Launch Vehicle",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex Aerospace",
    description: "Advancing Humanity through reusable spaceflight.",
    images: ["/social-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-100 font-sans`}
      >
        {/* 1. Global Backgrounds (Persistent across routes) */}
        <Galaxy />
        
        {/* 2. Loading State */}
        <Preloader />

        {/* 3. Main Page Content */}
        {children}

        {/* 4. Footer */}
        <Footer />

      </body>
    </html>
  );
}