import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-display",
});
const sans = Inter({ subsets: ["latin"], variable: "--ff-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-mono" });

export const metadata: Metadata = {
  title: "Ellison Oil Field Services | Gas Compression & By-Product Recovery",
  description:
    "Ellison Oil Field Services Pvt. Ltd. engineers low-to-high pressure gas compression, hydrocarbon by-product extraction and dew point conditioning solutions. Ahmedabad, India.",
};

export const viewport: Viewport = {
  themeColor: "#F7F9FC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-ink font-sans text-fg antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
