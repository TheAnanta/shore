"use client";
import { motion } from "framer-motion";

export default function MemoriesSection() {
  return (
    <section className="w-full bg-zinc-950 py-20 text-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tight">Memories & Clicks</h2>
        <p className="text-gray-400">Relive the best moments from the past years.</p>
      </div>
      
      <div className="flex flex-col gap-6">
        {/* Row 1 - Left to Right */}
        <motion.div 
          className="flex gap-4 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`row1-${i}`} className="w-80 h-48 bg-zinc-900 rounded-xl flex-shrink-0 border border-zinc-800 overflow-hidden relative group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                 <span className="text-sm font-bold">Concert Night 2024</span>
               </div>
               <div className="w-full h-full flex items-center justify-center text-zinc-700 font-bold text-4xl bg-zinc-900">
                  {i + 1}
               </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2 - Right to Left */}
        <motion.div 
          className="flex gap-4 whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`row2-${i}`} className="w-80 h-48 bg-zinc-900 rounded-xl flex-shrink-0 border border-zinc-800 overflow-hidden relative group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                 <span className="text-sm font-bold">Dance Performance</span>
               </div>
               <div className="w-full h-full flex items-center justify-center text-zinc-700 font-bold text-4xl bg-zinc-900">
                  {i + 11}
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
