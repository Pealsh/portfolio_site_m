"use client";

import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorksSection from "@/components/WorksSection";
import SkillsSection from "@/components/SkillsSection";
import CareerSection from "@/components/CareerSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <SkillsSection />
      <CareerSection />
      <ContactSection />
    </>
  );
}
