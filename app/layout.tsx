import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";

export const metadata: Metadata = {
  title: "SHORe'26 | GITAM Annual Flagship Fest",
  description: "Shore'26 | GITAM UNIVERSITY'S ANNUAL FEST - AN OTHERWORLDLY EXPERIENCE OF CULTURE, CREATIVITY, AND CONNECTION | Shore 2026 is the culmination of talent, creativity, and spirit. It brings together students from all over the country to celebrate art, music, technology, and more. Join us for an experience that transcends the ordinary and dives deep into the extraordinary.",
};

import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="use-credentials"
        />
      </head>
      <body
        className={`antialiased`}
      >
        <AuthContextProvider>
          {children}
          <ToastProvider />
        </AuthContextProvider>
      </body>
    </html>
  );
}
