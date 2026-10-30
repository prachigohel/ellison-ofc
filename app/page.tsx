import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Solutions from "@/components/sections/Solutions";
import ProcessFlow from "@/components/sections/ProcessFlow";
import Equipment from "@/components/sections/Equipment";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Solutions />
        <ProcessFlow />
        <Equipment />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
