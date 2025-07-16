import Hero from "@/components/Hero";
import PlanSection from "@/components/Plan";
import Features from "@/components/Features";
import Resellers from "@/components/Resellers";
import SmoothScroll from "@/components/Smoothscroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative text-gray-800">
        <Hero />
        <Features />
        <PlanSection />
        <Resellers />
      </main>
    </SmoothScroll>
  );
}
