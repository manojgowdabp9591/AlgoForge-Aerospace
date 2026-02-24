import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Orbitron, Rajdhani } from "next/font/google"; 
import "./globals.css";

// 1. COMPONENTS
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";

// 2. FONTS
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

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

// 3. ENHANCED METADATA
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Define the base URL dynamically or hardcode it for production stability
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://algoForge-aerospace.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AlgoForge Aerospace | Defying Gravity",
    template: "%s | AlgoForge Aerospace",
  },
  description: "Engineering the future of hypersonic travel. AlgoForge Aerospace builds reusable launch vehicles powered by proprietary Rotary Detonation Engines (RDE).",
  keywords: ["AlgoForge", "Aerospace", "RDE", "Hypersonic", "Spaceflight", "Reusable Rockets", "Tech", "Propulsion", "Space Tourism"],
  authors: [{ name: "AlgoForge Aerospace Engineering Team" }],
  creator: "AlgoForge Aerospace",
  
  // OPEN GRAPH (Facebook, LinkedIn, Discord, WhatsApp)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "AlgoForge Aerospace | The Speed of Tomorrow",
    description: "Building the infrastructure for the next century of human history with detonation-based propulsion.",
    siteName: "AlgoForge Aerospace",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "AlgoForge Aerospace Orbiton Vehicle",
      },
    ],
  },
  
  // TWITTER / X CARD
  twitter: {
    card: "summary_large_image",
    title: "AlgoForge Aerospace",
    description: "Advancing Humanity through reusable hypersonic spaceflight.",
    images: ["/social-preview.png"], 
    creator: "@AlgoForgeAero",
  },
  
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${spaceGrotesk.variable} 
          ${inter.variable} 
          ${orbitron.variable} 
          ${rajdhani.variable} 
          antialiased 
          bg-black 
          text-white 
          selection:bg-cyan-500/30 selection:text-cyan-100 
          font-sans 
          overflow-x-hidden
        `}
      >
        <Preloader />
        <div className="relative z-10 flex flex-col min-h-screen">
           {children}
           <Footer />
        </div>
      </body>
    </html>
  );
}