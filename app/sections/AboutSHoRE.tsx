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
                 <div className="absolute top-12 md:top-0 -right-4 md:left-20 w-28 h-28 bg-gray-800 rounded-full  overflow-hidden border-6 border-black flex items-center justify-center text-xs text-center"><img src={"https://assets.thehansindia.com/h-upload/2024/02/04/1420510-gitam.jpg"} className="w-full h-full object-cover"/></div>
                 <div className="absolute top-8 md:top-12 left-40 md:left-34 w-32 h-32 bg-gray-800 rounded-full  overflow-hidden border-6 border-black flex items-center justify-center text-xs text-center"><img src={"https://scontent-maa3-2.xx.fbcdn.net/v/t39.30808-6/484002091_1088829606620103_813826115086043683_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=EczuRm3KB6MQ7kNvwF_bcnb&_nc_oc=Adnzxh_cRZQxZRi9NL5WaXZol83i3TahKBCWeZAlsjhHhCpFO9JTwuZYirw9IqaCyJA&_nc_zt=23&_nc_ht=scontent-maa3-2.xx&_nc_gid=TgxaRlI4D9bbJU7vhco4Vw&oh=00_AflIkvVpC2xY37GtWzuYag1Pt3_nzkSf0dlzodkQdRTyTw&oe=693C6459"} className="w-full h-full object-cover"/></div>
                 <div className="absolute top-20 md:top-32 left-16 md:left-46 w-36 h-36 bg-gray-800 rounded-full  overflow-hidden border-6 border-black flex items-center justify-center text-xs text-center"><img src={"https://scontent-maa3-3.xx.fbcdn.net/v/t39.30808-6/484065454_1088829383286792_720438377320774246_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=kRmDYvIp5wsQ7kNvwHLy0R4&_nc_oc=AdlMAV3hhyTyf7FXlEn_ToXMuQvJO984s2Vs2aw6df3hXmJUIYpvFbMFf4V_1FnjQIU&_nc_zt=23&_nc_ht=scontent-maa3-3.xx&_nc_gid=Y-DmTC5m8zVkHx5E9Fc9uw&oh=00_AfkBZga-jWeGH0XDJgrfAHsydNJ5SsdYN49Z-qOB_HBlSA&oe=693C9B08"} className="w-full h-full object-cover"/></div>
                 <div className="absolute top-48 md:top-60 left-6 md:left-36 w-40 h-40 bg-gray-800 rounded-full  overflow-hidden border-6 border-black flex items-center justify-center text-xs text-center"><img src={"https://scontent-maa2-1.cdninstagram.com/v/t39.30808-6/471160565_18142976983366139_979899702924516449_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzQ1OTgxMDUzMzk4MzUyMzc1Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=KwcBFhsRcF4Q7kNvwFNL8VU&_nc_oc=AdnUgX8PkInUqTtl8KK1TApicwNCyJPD8Ak1J1F4Q2TMXpw1vH80QOzxagJTd_VCR48&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-maa2-1.cdninstagram.com&_nc_gid=90fYZCTO097WJDf7Vj825w&oh=00_AfkkzwJBjyzkNBDfcj7_SGXkbel1FYyIoxz5qI4wYozsHA&oe=693C6FD3"} className="w-full h-full object-cover"/></div>
                 <div className="absolute top-80 left-16 md:left-8 overflow-hidden w-44 h-44 bg-gray-800 rounded-full border-6 border-black flex items-center justify-center text-xs text-center"><img src={"/images/IMG_0258.jpg"} className="w-full h-full object-cover"/></div>
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