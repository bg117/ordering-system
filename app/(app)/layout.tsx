import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.scss";
import Page from "@/components/Page";
import { AuthContextProvider } from "@/components/AuthContextProvider";
import QueryClientProvider from "@/components/QueryClientProvider";

const font = Afacad({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SRSTHS Online Ordering System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <QueryClientProvider>
        <html lang="en">
          <body className={`${font.className}`}>
            <Page>{children}</Page>
          </body>
        </html>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
