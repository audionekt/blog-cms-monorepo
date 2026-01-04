import type { Metadata } from "next";
import { Layout } from "aurigami";
import { Providers } from "./providers";
import { Navigation } from "../components/navigation";
import "aurigami/styles/fonts.css";

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
    <Layout>
      <Providers>
        <Navigation />
        {children}
      </Providers>
    </Layout>
  );
}
