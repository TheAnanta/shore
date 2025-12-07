import Image from "next/image";
import Link from "next/link";

export default function AboutShoreSection() {
  return (
    <section className="w-full bg-black py-20 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 z-10">
          <h2 className="text-yellow-500 font-bold text-xl mb-2 uppercase tracking-widest">About Shore</h2>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            GITAM UNIVERSITY'S ANNUAL FEST - AN OTHERWORLDLY EXPERIENCE OF CULTURE, CREATIVITY, AND CONNECTION
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed max-w-xl">
            Shore 2025 is the culmination of talent, creativity, and spirit. 
            It brings together students from all over the country to celebrate 
            art, music, technology, and more. Join us for an experience that 
            transcends the ordinary and dives deep into the extraordinary.
          </p>
          
          <div className="flex gap-4">
            <Link href="/login" className="px-8 py-3 bg-white text-black font-bold uppercase hover:bg-gray-200 transition-colors rounded-full">
              Buy Tickets
            </Link>
            <button className="px-8 py-3 border border-white text-white font-bold uppercase hover:bg-white/10 transition-colors rounded-full">
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
                 <div className="absolute top-12 md:top-0 -right-4 md:left-20 w-28 h-28 bg-gray-800 rounded-full border-6 border-black flex items-center justify-center text-xs text-center">Img 1</div>
                 <div className="absolute top-8 md:top-12 left-40 md:left-34 w-32 h-32 bg-gray-800 rounded-full border-6 border-black flex items-center justify-center text-xs text-center">Img 2</div>
                 <div className="absolute top-20 md:top-32 left-16 md:left-46 w-36 h-36 bg-gray-800 rounded-full border-6 border-black flex items-center justify-center text-xs text-center">Img 3</div>
                 <div className="absolute top-48 md:top-60 left-6 md:left-36 w-40 h-40 bg-gray-800 rounded-full border-6 border-black flex items-center justify-center text-xs text-center">Img 4</div>
                 <div className="absolute top-80 left-16 md:left-8 w-44 h-44 bg-gray-800 rounded-full border-6 border-black flex items-center justify-center text-xs text-center">Img 5</div>
                 </div>
                 {/* Mascot Placeholder */}
                 <div className="absolute bottom-0 md:bottom-[2em] left-1/3 -right-24 h-40 flex items-center justify-center">
                    <img src="/images/gitfin-dancing-on-rock.png"/>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}