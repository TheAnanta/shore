import Image from "next/image";
import Link from "next/link";

export default function WhatToExpect() {
  /**
   * "Sports" | "Wellness" | "Cultural" | "Workshops" | "Pro Night" | "Technical" | "Management"
   */
  const items = [
    { title: "ETHNIC FEST", desc: "Celebrate diverse cultures with traditional music, dance, and food.", img: "/images/past-shore-photos/shore_25_27.jpg" },
    { title: "PRO NIGHTS", desc: "A night filled with electrifying DJ sets and non-stop dancing.", img: "/images/past-shore-photos/shore_25_34.jpg", q: "Pro Night" },
    { title: "CELEBRITY MEET", desc: "An exclusive opportunity to interact with celebrity legends.", img: "/images/past-shore-photos/shore_25_22.jpg" },
    { title: "CULTURAL EXTRAVAGANZA", desc: "Experience the best of dance, music, and art.", img: "/images/past-shore-photos/shore_25_6.jpg", q: "Cultural" },
    { title: "TECHNICAL TREVOR", desc: "Showcase your technical skills and innovation.", img: "/images/past-shore-photos/shore_25_55.jpg", q: "Technical" },
    { title: "MANAGEMENT SUMMIT", desc: "Test your management and leadership abilities.", img: "/images/past-shore-photos/categories/management.png", q: "Management" },
    // { title: "WELLNESS WAVE", desc: "Focus on health, wellness and mindfulness.", img: "/images/past-shore-photos/categories/wellness_gemini.png", q: "Wellness" },
    { title: "SPORTS AVALANCHE", desc: "Compete in various sports and athletic events.", img: "/images/past-shore-photos/shore_25_57.jpg", q: "Sports" },
    { title: "RECREATIONAL REALM", desc: "Fun and engaging recreational activities for all.", img: "/images/past-shore-photos/shore_25_48.jpg", q: "Wellness" },
  ];

  return (
    <><section className="w-full bg-white py-20 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 uppercase">What to Expect at Shore '26</h2>
        <p className="text-gray-500 mb-12">Get ready for an immersive experience like never before.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index}>
              <div className="relative h-64 w-full bg-gray-200 mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <Image width={512} height={512} src={item.img} alt={item.title} className="w-full h-full object-cover" />
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
        {/* <div className="mt-12">
          <Link href="/schedule" className="px-8 py-3 bg-black cursor-pointer hover:shadow text-white font-bold uppercase hover:bg-[#B62507] transition-colors rounded-full">
            View All Events
          </Link>
        </div> */}
      </div>
    </section>
      <section className="w-full bg-black py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 uppercase">Register now</h2>
          <p className="text-gray-500 mb-12">Get ready for an immersive experience like never before.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.filter((e) => e.q && e.q == 'Pro Night').map((item, index) => (
              <Link aria-disabled={!item.q} href={`/login`} key={index} className={!item.q ? 'pointer-events-none' : 'cursor-pointer'}>
                <div className="relative h-64 w-full bg-gray-200 mb-4 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <Image width={512} height={512} src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 p-6 pt-16 bg-linear-to-t from-black to-transparent">
                    <h3 className="text-xl font-bold uppercase mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-300/80">{item.desc}</p>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
