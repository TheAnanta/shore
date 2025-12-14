"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Sample Data - Replace with your actual team images
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Manas Malla",
    role: "Lead, Technology",
    image: "/images/team/manasmalla.png", // Placeholder
  },
  {
    id: 2,
    name: "Kavya Chandana",
    role: "Lead, Design",
    image: "/images/team/manasmalla.png",
  },
  {
    id: 3,
    name: "Rahul Varma",
    role: "Lead, Operations",
    image: "/images/team/manasmalla.png",
  },
  {
    id: 4,
    name: "Priya Reddy",
    role: "Lead, Marketing",
    image: "/images/team/manasmalla.png",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Lead, Finance",
    image: "/images/team/manasmalla.png",
  }
];


export default function HostsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  };

  const setSlide = (index: any) => {
    setCurrentIndex(index);
  };

  // Calculate position relative to current index for the 3D effect
  const getPosition = (index: any) => {
    const total = TEAM_MEMBERS.length;
    const diff = (index - currentIndex + total) % total;
    
    // 0 is center, 1 is right, total-1 is left
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === 2) return 'far-right';
    if (diff === total - 1) return 'left';
    if (diff === total - 2) return 'far-left';
    return 'hidden';
  };

  return (
    <section className="w-full bg-black py-20 text-white">
      <div className="container relative mx-auto px-4">
        <div className='absolute top-0'>
          <div className='mb-4 flex items-center'>
            <div className="w-5 h-[2px] bg-white mb-2 mr-3"></div>
            <p className='uppercase'>Our Team</p>
          </div>
          <h2 className="text-5xl font-bold mb-2">Meet Your Hosts: The<br/>Visionaries Behind</h2>
          <h2 className="text-5xl font-bold mb-12 text-gray-400">SHORE '26</h2>
          <img src="/images/signature.png" className='h-16'/>
        </div>

        {/* Pagination Dots */}
      <div className="absolute w-full -bottom-8 left-8 z-20 flex items-center gap-4">
        {TEAM_MEMBERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlide(idx)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${
              idx === currentIndex 
                ? 'w-[10px] h-[10px] bg-white' 
                : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
        
        <div className="flex flex-wrap justify-center gap-8">
           {/* Placeholder for hosts */}
           <div className="w-full h-96 relative flex items-end justify-center pb-10">
              <div className="translate-y-56 translate-x-48 w-full lg:w-2/3 h-[500px] relative flex items-center justify-center perspective-1000">
          <div  style={{
            maskImage: "linear-gradient(270deg, rgba(0, 0, 0, 0.00) -30%, #000 56.24%, rgba(0, 0, 0, 0.00) 98.3%)"
          }} className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false}>
              {TEAM_MEMBERS.map((member, index) => {
                const position = getPosition(index);
                
                // Variants define the styles for each position state
                const variants = {
                  'center': { 
                    x: 0, 
                    scale: 1.4, 
                    zIndex: 50, 
                    opacity: 1,
                    filter: "grayscale(0%) brightness(85%)" 
                  },
                  'right': { 
                    x: 250, 
                    scale: 1, 
                    zIndex: 40, 
                    opacity: 0.6,
                    filter: "grayscale(100%) brightness(60%)" 
                  },
                  'far-right': { 
                    x: 400, 
                    scale: 0.7, 
                    zIndex: 30, 
                    opacity: 0.7,
                    filter: "grayscale(100%) brightness(40%)" 
                  },
                  'left': { 
                    x: -200, 
                    scale: 0.9, 
                    zIndex: 40, 
                    opacity: 0.5,
                    filter: "grayscale(100%) brightness(60%)" 
                  },
                  'hidden': { 
                    x: 0, 
                    scale: 0, 
                    zIndex: 0, 
                    opacity: 0 
                  }
                };

                return (
                  <motion.div
                    key={member.id}
                    variants={variants}
                    initial="hidden"
                    animate={position}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom bezier for smooth snapping
                    className="absolute top-1/2 -translate-y-1/2 origin-bottom"
                    style={{ 
                      width: '300px', // Base width of image card
                      height: '300px', // Base height
                    }}
                  >
                    {/* The Image */}
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-contain object-bottom shadow-2xl" 
                    />

                    {/* The Name Label - Only visible if centered */}
                    {position === 'center' && (
                      <motion.div 
                        initial={{ opacity: 0, x: -40, y: -90 }}
                        animate={{ opacity: 1, x: -150, y: -90 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="absolute top-1/2 -right-16 translate-x-full text-left w-48 hidden md:block"
                      >
                        <div className="pl-4 py-1 relative">
                            <div className="absolute top-2 left-1 w-[2px] h-6 bg-white"/>
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <p className="text-gray-400 text-sm">{member.role}</p>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Mobile Only Label (Bottom Overlay) */}
                    {position === 'center' && (
                      <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 md:hidden backdrop-blur-sm">
                         <h3 className="text-lg font-bold text-white">{member.name}</h3>
                         <p className="text-gray-400 text-xs">{member.role}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
    </div>
           </div>
        </div>
      </div>
    </section>
  );
}
