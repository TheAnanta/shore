import Image from "next/image";

export default function UnityInDiversity() {
  return (
    <section className="w-full bg-[#0a192f] py-14 md:py-20 text-white relative">
      <div className="md:container lg:max-w-[1380px] pl-0! ml-0! mx-auto md:px-4 flex flex-col-reverse md:flex-row items-center">
        <div className="w-full md:w-1/2 relative z-12">
          <div className="relative h-64 w-full md:h-96">
            <div className="absolute inset-0 z-10 flex items-center justify-center text-gray-500">
              <img className="w-full md:scale-113 md:translate-x-8 -translate-y-16 z-20" src="/images/gitfins-ethnicity.png" style={{ objectPosition: '0px 0px' }} />
            </div>
          </div>
        </div>
        <div className="w-full pl-4 pr-2 md:w-1/2 text-right z-30 ">
          <h2 className="text-base font-bold bg-orange-500 rounded-full text-white/70 ml-auto px-6 py-3 mb-6 w-max uppercase tracking-widest">Theme of SHOR<span className="lowercase">E</span>'26</h2>
          <h1 className="text-2xl md:text-6xl font-bold mb-6 tracking-wider">UNITY IN DIVERSITY</h1>
          <p className="text-gray-300 mb-4 leading-relaxed">
            We celebrate the beautiful truth that we may come from different cultures, languages, states, interests, and identities yet we stand together as one community.
            <br /><br />
            At SHORE Fest’26, this theme becomes more than just an idea; it becomes an experience. Through music, dance, art, sports, gaming, and creative expression, we bring together students from across the country and allow every voice and culture to shine.
            <br /><br />
            The fest becomes a space where differences are not just accepted, but embraced, appreciated, and celebrated. It’s a reminder that our diversity is our strength and when we come together with all our colors, talents, and stories, we create something truly powerful, vibrant, and unforgettable.
          </p>
          <p className="text-gray-400 text-sm">
            Join us for an unforgettable journey through art, music, and dance.
          </p>
          <div className="block md:hidden h-48" />
          <div className="h-8 md:h-84" />
        </div>
      </div>

      <img className="h-36 z-30 absolute bottom-36 left-[16%] opacity-15" src="https://framerusercontent.com/images/1znVTN5nvGNMwSEuhciArw0b7Jg.png?scale-down-to=512&width=530&height=291" />

      <img className="hidden md:block h-75 z-10 absolute bottom-4 right-48" src="/images/gitfin-crowd.png" />
      <img className="hidden md:block w-86 overflow-clip object-cover h-75 z-10 absolute bottom-4 right-0" src="/images/gitfin-crowd.png" />

      <div className="absolute bottom-0 right-0 w-full h-24 overflow-hidden origin-bottom-right">
        <div className="absolute bottom-0 right-0 w-full h-24 bg-[#4b1611] z-10 overflow-hidden origin-bottom-right"></div>
      </div>
    </section>
  );
}
