import type { Metadata } from "next";
import { Pacifico, Fredoka } from "next/font/google";
import "./globals.css";
import Provider from "./components/Provider";
import Appbar from "./components/Appbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/Bottom";

const pacifico = Pacifico({
  subsets: ["vietnamese"],
  display: "block",
  weight: "400",
});

const fredola = Fredoka({
  subsets: ["latin-ext"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "_Automator",
  description: "makes your life easy by automate everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"bg-[#181818] text-white min-h-screen " + fredola.className}
      >
        <Provider>
          <div className="flex flex-col min-h-screen">
            <Appbar />
            {children}
            <Footer/>
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
