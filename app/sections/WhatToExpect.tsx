import Image from "next/image";

export default function WhatToExpect() {
  const items = [
    { title: "CULTURAL EXTRAVAGANZA", desc: "Experience the best of dance, music, and art.", img: "https://nfpexplore.com/wp-content/uploads/2023/08/1-1.jpg" },
    { title: "TECHNICAL TREVOR", desc: "Showcase your technical skills and innovation.", img: "https://images.squarespace-cdn.com/content/v1/63d40fe2cbd65e16cb8098b6/1703717561610-67A1NAXA7N6Q40D9SIHG/Wikimedia_Hackathon_San_Francisco_107.jpg" },
    { title: "MANAGEMENT LUMBERJACK", desc: "Test your management and leadership abilities.", img: "https://images.yourstory.com/cs/2/ba6b0930e8cd11edbf1c2f9de7fdeb77/Addasubheading4-1719265454127.png?mode=crop&crop=faces&ar=16%3A9&format=auto&w=1920&q=75" },
    { title: "WELLNESS LONG FORMAT", desc: "Focus on health, wellness and mindfulness.", img: "https://images.ctfassets.net/hjcv6wdwxsdz/4aoQh9QkgvbzIcrEntwiLk/b982dd5dad0573a07dd06d2decf247c3/iStock-1202729719.jpg?w=2121&h=1414&fl=progressive&q=90&fm=jpg" },
    { title: "SPORTS LONG FORMAT", desc: "Compete in various sports and athletic events.", img: "https://www.gitam.edu/sites/default/files/styles/webp/public/2024-09/sportsquota.jpg.webp?itok=GSBO834O" },
    { title: "RECREATIONAL LONG FORMAT", desc: "Fun and engaging recreational activities for all.", img: "https://www.vitsdpr.ac.in/images/events/creativity1.jpg" },
  ];

  return (
    <section className="w-full bg-white py-20 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 uppercase">What to Expect at Shore '26</h2>
        <p className="text-gray-500 mb-12">Get ready for an immersive experience like never before.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-64 w-full bg-gray-200 mb-4 overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover"/>
                 </div>
                 <div className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                 </div>
              </div>
              <h3 className="text-xl font-bold uppercase mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
         <div className="mt-12">
            <button className="px-8 py-3 border border-red-500 text-red-500 font-bold uppercase hover:bg-red-50 transition-colors rounded-full">
                View All Events
            </button>
        </div>
      </div>
    </section>
  );
}
