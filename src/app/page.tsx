import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Writing from "@/components/sections/Writing";
import Lab from "@/components/sections/Lab";
import Now from "@/components/sections/Now";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Ayush Sanj - Frontend Engineer",
  description: "Portfolio of Ayush Sanj, frontend engineer based in Bangalore",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <About />
      <Skills />
      <Timeline />
      <Writing />
      <Lab />
      <Now />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
