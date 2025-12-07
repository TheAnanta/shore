export default function PartnersSection() {
  return (
    <section className="w-full bg-black py-10 text-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest">Our Partners</h2>
      </div>
      
      {/* Scrolling marquee placeholder */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap py-4 flex items-center gap-12 opacity-50">
          <span className="text-xl font-bold">Google Developers</span>
          <span className="text-xl font-bold">Waze</span>
          <span className="text-xl font-bold">Uber</span>
          <span className="text-xl font-bold">Google Developers</span>
          <span className="text-xl font-bold">Waze</span>
          <span className="text-xl font-bold">Uber</span>
           <span className="text-xl font-bold">Google Developers</span>
          <span className="text-xl font-bold">Waze</span>
          <span className="text-xl font-bold">Uber</span>
        </div>
      </div>
    </section>
  );
}
