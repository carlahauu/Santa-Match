import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './ui/Navbar';
import { inter } from './ui/fonts';
import Footer from './ui/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SantaMatch',
  description: 'Secret Santa made easy! Add participants, set a budget, share the link, and let the gifting begin! No accounts required.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <div className="fixed min-h-screen -z-10 w-full bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:25px_25px]" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
