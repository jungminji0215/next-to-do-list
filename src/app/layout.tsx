import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "투두 리스트",
  description: "투두 리스트 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-yellow-200">
        <Providers>
          <main className="min-h-screen flex flex-col justify-center items-center">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
