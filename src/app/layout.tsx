import type { Metadata } from "next";
import "./globals.css";
import "./classroom.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "UNLEASHED · The Classroom",
  description:
    "One school day. One classroom. Led by Professor — a unified classroom product with Gemini + ZAI.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
