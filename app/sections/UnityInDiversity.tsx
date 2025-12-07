import Image from "next/image";

export default function UnityInDiversity() {
  return (
    <section className="w-full bg-[#0a192f] py-20 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 relative z-10">
           {/* Placeholder for illustration */}
           <div className="relative h-64 w-full md:h-96">
             {/* Replace with actual image asset */}
             <div className="absolute inset-0 flex items-center justify-center text-gray-500">
               [Illustration of People]
             </div>
           </div>
        </div>
        <div className="w-full md:w-1/2 text-right z-10 mt-10 md:mt-0">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">2025 Theme</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wider">UNITY IN DIVERSITY</h1>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Experience the vibrant tapestry of cultures coming together. 
            A celebration of our differences and our shared humanity.
          </p>
          <p className="text-gray-400 text-sm">
            Join us for an unforgettable journey through art, music, and dance.
          </p>
        </div>
      </div>
      
      {/* Background decorative elements matching the wave/curve in the design */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-red-700 transform -skew-y-2 origin-bottom-right"></div>
    </section>
  );
}
