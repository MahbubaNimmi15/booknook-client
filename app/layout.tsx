
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://booknook-client-zbaq.vercel.app"
  ),

  title: {
    default: "BookNook | Your Digital Library",
    template: "%s | BookNook",
  },

  description:
    "Discover, explore, borrow, and manage your favorite books with BookNook, your online digital library.",

  applicationName: "BookNook",

  keywords: [
    "BookNook",
    "Online Library",
    "Digital Library",
    "Book Borrowing",
    "Book Collection",
    "Read Books",
  ],

  openGraph: {
    title: "BookNook | Your Digital Library",
    description:
      "Explore, borrow, and manage your favorite books online with BookNook.",
    url: "https://booknook-client-zbaq.vercel.app",
    siteName: "BookNook",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
