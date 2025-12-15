"use client";
import Image from "next/image";
import LandingSection from "./sections/LandingSection";
import AnnouncementBar from "./sections/AnnouncementsBar";
import AboutShoreSection from "./sections/AboutSHoRE";
import UnityInDiversity from "./sections/UnityInDiversity";
import StatsSection from "./sections/StatsSection";
import PartnersSection from "./sections/PartnersSection";
import WhatToExpect from "./sections/WhatToExpect";
import FAQSection from "./sections/FAQSection";
import MemoriesSection from "./sections/MemoriesSection";
import HostsSection from "./sections/HostsSection";
import Footer from "./sections/Footer";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <LandingSection />
        <AnnouncementBar />
        <AboutShoreSection />
        <UnityInDiversity />
        <StatsSection />
        <PartnersSection />
        <WhatToExpect />
        <FAQSection />
        <MemoriesSection />
        <HostsSection />
        <Footer />
      </main>
    </div>
  );
}
