import Image from "next/image";

export default function UnityInDiversity() {
  return (
    <section className="w-full bg-[#0a192f] py-14 md:py-20 text-white relative overflow-hidden">
      <div className="container lg:max-w-[1380px] pl-0! ml-0! mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        <div className="w-full md:w-1/2 relative z-12">
           {/* Placeholder for illustration */}
           <div className="relative h-64 w-full md:h-96">
             {/* Replace with actual image asset */}
             <div className="absolute inset-0 z-10 flex items-center justify-center text-gray-500">
               <img className="scale-120 translate-x-8" src="/images/gitfin-ethnicity.png" style={{ objectPosition: '0px 0px'}}/>
             </div>
           </div>
        </div>
        <div className="w-full pl-4 pr-2 md:w-1/2 text-right z-10 ">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">2025 Theme</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wider">UNITY IN DIVERSITY</h1>
          <p className="text-gray-300 mb-4 leading-relaxed">
            We celebrate the beautiful truth that we may come from different cultures, languages, states, interests, and identities yet we stand together as one community. 
<br/><br/>
At SHORE Fest’26, this theme becomes more than just an idea; it becomes an experience. Through music, dance, art, sports, gaming, and creative expression, we bring together students from across the country and allow every voice and culture to shine. 
<br/><br/>
The fest becomes a space where differences are not just accepted, but embraced, appreciated, and celebrated. It’s a reminder that our diversity is our strength and when we come together with all our colors, talents, and stories, we create something truly powerful, vibrant, and unforgettable.
          </p>
          <p className="text-gray-400 text-sm">
            Join us for an unforgettable journey through art, music, and dance.
          </p>
          <div className="block md:hidden h-48"/>
          <img className="hidden md:block mt-16" src="/images/gitfin-crowd.png"/>
        </div>
      </div>
      
      {/* Background decorative elements matching the wave/curve in the design */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-red-700 transform -skew-y-2 origin-bottom-right"></div>
    </section>
  );
}
