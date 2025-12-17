"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const useKeyPress = (targetKey: string, callback: () => void) => {
  const handleKeyPress = useCallback((event: { key: string; }) => {
    if (event.key === targetKey) {
      callback();
    }
  }, [targetKey, callback]);

  useEffect(() => {
    // Attach the event listener to the document
    document.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
}

export default function AboutShoreSection() {
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);
  useKeyPress("Escape", () => {
    setShowVideoOverlay(false);
  });
  return (
    <section id="about-shore" className="w-full bg-black py-20 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 z-10">
          <h2 className="text-yellow-500 font-bold text-xl mb-2 uppercase tracking-widest">About Shore</h2>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            GITAM UNIVERSITY'S ANNUAL FEST - AN OTHERWORLDLY EXPERIENCE OF CULTURE, CREATIVITY, AND CONNECTION
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed max-w-xl">
            Shore 2026 is the culmination of talent, creativity, and spirit.
            It brings together students from all over the country to celebrate
            art, music, technology, and more. Join us for an experience that
            transcends the ordinary and dives deep into the extraordinary.
          </p>

          <div className="flex gap-4 mb-16">
            <Link href="/login" className="px-8 py-3 bg-white text-black font-bold uppercase hover:bg-gray-200 transition-colors rounded-full">
              Buy Tickets
            </Link>
            <button onClick={() => setShowVideoOverlay(true)} className="px-8 py-3 border border-white text-white font-bold uppercase hover:bg-white/10 transition-colors rounded-full">
              Watch Video
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
          {/* Decorative Path and Images */}
          <div className="relative h-[500px] w-full">
            {/* This is a simplified representation of the curved path with circles */}
            <div className="absolute top-0 right-0 w-full h-full">
              {/* Circular Image Placeholders */}
              <div className="relative z-10 -translate-x-6">
                <div className="absolute top-12 md:top-0 -right-4 md:left-20 w-28 h-28 bg-gray-800 rounded-full  overflow-hidden border-6 border-black flex items-center justify-center text-xs text-center"><Image width={512} height={512} alt="Ethnic day" src={"/images/past-shore-photos/shore_25_58.jpg"} className="w-full h-full object-cover" /></div>
                <div className="absolute top-8 md:top-12 left-40 md:left-34 w-32 h-32 bg-gray-800 rounded-full  overflow-hidden border-6 border-black flex items-center justify-center text-xs text-center"><Image width={512} height={512} alt="Ethnic day" src={"/images/past-shore-photos/shore_25_34.jpg"} className="w-full h-full object-cover" /></div>
                <div className="absolute top-20 md:top-32 left-16 md:left-46 w-36 h-36 bg-gray-800 rounded-full  overflow-hidden border-6 border-black flex items-center justify-center text-xs text-center"><Image width={512} height={512} alt="Ethnic day" src={"/images/past-shore-photos/shore_25_55.jpg"} className="w-full h-full object-cover" /></div>
                <div className="absolute top-48 md:top-60 left-6 md:left-36 w-40 h-40 bg-gray-800 rounded-full  overflow-hidden border-6 border-black flex items-center justify-center text-xs text-center"><Image width={512} height={512} alt="Ethnic day" src={"/images/past-shore-photos/shore_25_2.jpg"} className="w-full h-full object-cover" /></div>
                <div className="absolute top-80 left-16 md:left-8 overflow-hidden w-44 h-44 bg-gray-800 rounded-full border-6 border-black flex items-center justify-center text-xs text-center"><Image width={512} height={512} alt="Ethnic day" src={"/images/IMG_0258.jpg"} className="w-full h-full object-cover" /></div>
              </div>
              {/* Mascot Placeholder */}
              <div className="absolute bottom-0 md:bottom-[2em] left-1/3 -right-24 h-40 flex items-center justify-center">
                <img src="/images/gitfin-dancing-on-rock.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background decorative elements matching the wave/curve in the design */}
      {/* bg-[#0a192f] */}
      <div className="absolute md:-bottom-18 -bottom-24 -right-8 md:right-0 w-[60%] md:w-[30%] h-28 bg-[#0a192f] transform skew-y-8 origin-bottom-right"></div>
      <div className="absolute -bottom-12 md:bottom-0 -left-18 md:left-0 w-[70%] h-24 bg-[#0a192f] transform -skew-y-5 origin-bottom-right"></div>
      {
        showVideoOverlay && (
          <div className="fixed inset-0 bg-[#161616]/40 bg-opacity-50 flex items-center justify-center z-50">
            <div onClick={() => {
              setShowVideoOverlay(false);
            }} className="fixed inset-0 bg-[#161616]/40 bg-opacity-50 flex items-center justify-center -z-10"></div>
            <iframe className=" w-3/4 rounded-3xl border-gray-700/60 border-3" width="1440" height="560" src="https://www.youtube.com/embed/yCc6-IktJxU" title="" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
          </div>
        )
      }
    </section>
  );
}