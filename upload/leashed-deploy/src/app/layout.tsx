import type { Metadata } from "next";
import "./globals.css";
import "./public-site.css";
import "./auth.css";
import "./onboarding.css";
import "./public-interiors.css";
import "./learner-portal.css";
import "./institution-portal.css";

export const metadata: Metadata = {
  title: "Leashed Learning Academy",
  description: "Integrated pet-care career education, AI teaching, and progress tracking."
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}