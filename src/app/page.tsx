import Origin from "@/components/sections/Origin";
import Brahma from "@/components/sections/Brahma";
import Vishnu from "@/components/sections/Vishnu";
import Mahesh from "@/components/sections/Mahesh";
import Hub from "@/components/sections/Hub";
import FutureLab from "@/components/sections/FutureLab";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import SmoothScrolling from "@/components/SmoothScrolling";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <SmoothScrolling>
      <Preloader />
      <ThemeToggle />
      <main className="relative flex flex-col min-h-screen bg-background text-foreground transition-colors duration-700">
        <Origin />
        <Brahma />
        <Vishnu />
        <Mahesh />
        <Hub />
        <FutureLab />
        <Footer />
      </main>
    </SmoothScrolling>
  );
}
