import type { Metadata } from "next";
import { StyledComponentsRegistry, ThemeProvider } from "aurigami";
import { Providers } from "./providers";
import "aurigami/styles/fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CMS Dashboard",
  description: "Content Management System Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <Providers>{children}</Providers>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
