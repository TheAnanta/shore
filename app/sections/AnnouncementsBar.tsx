"use client";
import { motion } from "framer-motion";

export default function AnnouncementBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black py-3 overflow-hidden uppercase z-50 border-t border-zinc-800">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-8 text-sm font-medium tracking-wider text-white"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 80,
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>SHORE '26 IS COMING SOON</span>
              <span className="text-red-500">•</span>
              <span>GET READY FOR THE WAVE</span>
              <span className="text-red-500">•</span>
              <span>REGISTER NOW</span>
              <span className="text-red-500">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}