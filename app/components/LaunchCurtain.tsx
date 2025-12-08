'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LaunchCurtain() {
  const [show, setShow] = useState<boolean | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const check = () => {
        // Target: 8 December 2025 8PM
        const targetDate = new Date('2025-12-10T20:00:00');
        const now = new Date();
        const isLaunched = localStorage.getItem('isLaunched');

        // If current time is BEFORE target date AND not launched yet
        if (now < targetDate && !isLaunched) {
            setShow(true);
        } else {
            setShow(false);
        }
    };
    check();
  }, []);

  const handleLaunch = () => {
    setShowFireworks(true);
    setTimeout(() => {
        localStorage.setItem('isLaunched', 'true');
        setShow(false);
    }, 5000); // Show fireworks for 5 seconds
  };

  // Don't render anything until we've checked logic
  if (show === null) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
            key="curtain-container"
            className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
            // Keep container in DOM while children animate out
            exit={{ transition: { duration: 1.5 } }} 
        >
            {showFireworks && (
                <motion.img 
                    src="/images/fireworks.gif" 
                    className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none mix-blend-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
            {/* Left Curtain Panel */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-1/2 z-0"
                style={{ 
                    backgroundImage: "url('/images/landing/curtain.png')",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 0%"
                }}
                initial={{ x: 0 }}
                exit={{ x: '-100%', transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
            />
            {/* Right Curtain Panel */}
            <motion.div
                className="absolute right-0 top-0 bottom-0 w-1/2 z-0"
                style={{ 
                    backgroundImage: "url('/images/landing/curtain.png')",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "100% 0%"
                }}
                initial={{ x: 0 }}
                exit={{ x: '100%', transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center gap-8"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
            >
                 <img
                    src="/images/landing/shore-logo.svg"
                    alt="Shore Logo"
                    className="h-32 md:h-48 w-auto"
                 />
                 <div className="text-white text-center space-y-2">
                    <p className="text-lg md:text-xl font-light opacity-80">Welcome to Shore '26</p>
                 </div>
                 <motion.button
                    onClick={handleLaunch}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-[#B62507] text-white text-xl font-bold rounded-full shadow-2xl hover:bg-[#a02006] transition-colors cursor-pointer"
                >
                    Launch
                </motion.button>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
