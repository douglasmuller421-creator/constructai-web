import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth";

export const metadata: Metadata = {
  title: "ConstructAI — Construction Project Management",
  description: "AI-powered construction project management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#f1f5f9" }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
