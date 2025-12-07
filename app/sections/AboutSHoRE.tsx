import Image from "next/image";

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
            <button className="px-8 py-3 bg-white text-black font-bold uppercase hover:bg-gray-200 transition-colors rounded-full">
              Buy Tickets
            </button>
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
                 {/* Placeholder for the curved path graphic */}
                 <div className="absolute top-1/4 right-1/4 w-64 h-64 border-4 border-dashed border-gray-700 rounded-full opacity-50"></div>
                 
                 {/* Circular Image Placeholders */}
                 <div className="absolute top-10 right-20 w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center text-xs text-center">Img 1</div>
                 <div className="absolute top-32 right-40 w-28 h-28 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center text-xs text-center">Img 2</div>
                 <div className="absolute top-60 right-20 w-32 h-32 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center text-xs text-center">Img 3</div>
                 <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center text-xs text-center">Img 4</div>
                 
                 {/* Mascot Placeholder */}
                 <div className="absolute bottom-0 right-1/3 w-40 h-40 flex items-center justify-center">
                    <span className="text-yellow-500 font-bold">[Mascot]</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}