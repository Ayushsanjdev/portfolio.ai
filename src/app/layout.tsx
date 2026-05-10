import {
  Instrument_Serif,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Cursor from "@/components/chrome/Cursor";
import Nav from "@/components/chrome/Nav";
import Curtain from "@/components/chrome/Curtain";
import EasterEgg from "@/components/chrome/EasterEgg";
import SmoothScroll from "@/components/chrome/SmoothScroll";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScroll>
          <Cursor />
          <Nav />
          <Curtain />
          <EasterEgg />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
