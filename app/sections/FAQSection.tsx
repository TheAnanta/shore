"use client";
import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "Where is the venue of SHORE '26?", a: "GITAM Deemed to be University, Visakhapatnam Campus." },
    { q: "Is there an entry fee for the fest?", a: "Entry details will be announced soon on our official channels." },
    { q: "Who can participate in the competitions?", a: "Students from all colleges and universities are welcome to participate." },
    { q: "How do I register for events?", a: "Registration links will be available on this website." },
    { q: "Will accommodation be provided?", a: "Yes, accommodation will be provided for outstation participants." },
    { q: "Is there a dress code?", a: "Specific events may have dress codes, but generally casual wear is fine." },
    { q: "Can I bring my friends?", a: "Absolutely! The more the merrier." },
  ];

  return (
    <section className="w-full bg-yellow-500 py-20 text-black relative">
      <div className="h-64 z-0 absolute w-full bg-linear-to-br from-yellow-600/50 to-yellow-800/50 bottom-0"/>
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-3/4 z-10">
           <div className="bg-yellow-50 rounded-2xl py-12 shadow-lg">
             <h2 className="px-12 text-4xl font-bold mb-6 uppercase">Frequently Asked<br/>Questions</h2>
             <div className="space-y-2">
               {faqs.map((faq, index) => (
                 <div style={{
                  backgroundColor: index == openIndex ? "#fff" : "transparent"
                 }} key={index} className="px-12 border-b border-gray-200 last:border-0">
                   <button 
                     className="w-full text-left py-4 flex justify-between items-center font-medium focus:outline-none"
                     onClick={() => setOpenIndex(openIndex === index ? null : index)}
                   >
                     <span style={{
                      fontWeight: openIndex === index ? "bold" : "normal"
                     }}>{faq.q}</span>
                     <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                       </svg>
                     </span>
                   </button>
                   <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                     <p className="text-[#2C2C2C]/70 text-sm">{faq.a}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center mt-16 md:mt-[unset]">
            {/* Illustration placeholder */}
             <div className="relative h-64 w-64 md:h-96 md:w-96">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                    <img src="/images/gitfin-doubtful.png" className="scale-x-100 object-bottom mt-auto -translate-y-36 md:translate-y-[unset] pointer-events-none z-10"/>
                </div>
             </div>
        </div>
      </div>
    </section>
  );
}
