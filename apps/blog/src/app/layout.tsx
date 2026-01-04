import type { Metadata } from "next";
import { StyledComponentsRegistry, ThemeProvider } from "aurigami";
import { Providers } from "./providers";
import { Navigation } from "../components/navigation";
import "aurigami/styles/fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Dev - Freelance Web Developer",
  description: "Crafting digital experiences that matter. Freelance web developer and software engineer building minimalist, high-performance interfaces.",
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
            <Providers>
              <Navigation />
              {children}
            </Providers>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
