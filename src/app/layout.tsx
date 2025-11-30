import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AuthGate } from "./AuthGate";

export const metadata: Metadata = {
  title: "XXL Mebel",
  description: "Интернет-магазин мебели",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="ru">
      <body>
        <Providers>
          <AuthGate>
            {children}
          </AuthGate>
        </Providers>
      </body>
    </html>
  );
}
