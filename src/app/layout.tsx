import type { Metadata } from "next";
import "./globals.css";
import "./classroom.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "All About Pawz Academy · Powered by UnLeashe",
  description:
    "All About Pawz Academy — a Leashed animal-care learning classroom. Six integrated pathways, AI Professor, real curriculum. Powered by UnLeashe.",
  icons: {
    icon: "/unleashe-logo.png",
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
