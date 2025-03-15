import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/QueryProvider";
import { FilterProvider } from "@/context/FilterContext";

export const metadata: Metadata = {
  title: "Todo List",
  description: "Todo List App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <FilterProvider>
            <main className="max-w-4xl mx-auto mt-5">{children}</main>
          </FilterProvider>
        </Providers>
      </body>
    </html>
  );
}
