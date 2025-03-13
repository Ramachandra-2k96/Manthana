"use client";

import NavbarSection from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* <WebsiteReveal/> */}
      <NavbarSection />
      <HeroSection />
      <TimelineSection />
      <Footer />
    </div>
  );
}