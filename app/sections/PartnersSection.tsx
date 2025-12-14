"use client";
import { motion } from "framer-motion";

export default function PartnersSection() {
  const partners = [
    "Google Developers", "Waze", "Uber", "Spotify", "Red Bull", "Coca Cola", 
    "Amazon", "Microsoft", "Intel", "AMD"
  ];

  return (
    <section id="partners" className="w-full bg-black py-10 text-white overflow-hidden border-t border-zinc-900">
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-400">Our Partners</h2>
      </div>
      
      <div className="relative flex overflow-hidden mask-linear-gradient">
        <motion.div 
          className="flex gap-16 whitespace-nowrap py-4 items-center"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
        >
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <span key={index} className="text-2xl font-bold text-zinc-600 hover:text-white transition-colors cursor-pointer">
              {partner}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
