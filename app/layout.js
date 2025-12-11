import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./store/Providers";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bayley's Restaurent",
  description: "Developed by Vathila Vidusahan",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="en" className="bg-amber-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-950 flex flex-col min-h-screen`}
      >
        <NavBar />
        <main className="flex-1 bg-amber-950">
          {children}
        </main>
        <Footer />
      </body>
    </html>
    </Providers>
  );
}
