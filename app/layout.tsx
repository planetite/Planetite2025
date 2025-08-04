import type { Metadata } from "next";
import { Geist, Geist_Mono,IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import ClickSpark from '@/components/custom/clickSpark';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["100","200","300","400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Mountain Dew",
  description: "Project Mountain Dew - An Indie Game in the making",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${ibmPlexMono.className} font-thin antialiased dark min-h-screen h-screen flex flex-col`}
      >
        <ClickSpark
          sparkColor='#1e9ffe'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Navbar />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </ClickSpark>
      </body>
    </html>
  );
}
