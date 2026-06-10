// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "A marketplace for unique handcrafted items",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("RootLayout rendered"); // Replace this console message with actual layout code
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}

