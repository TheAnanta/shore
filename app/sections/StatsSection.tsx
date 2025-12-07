export default function StatsSection() {
  return (
    <section className="w-full bg-red-700 py-12 text-white border-t-4 border-orange-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-red-500/50">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold font-serif">1000+</span>
            <span className="text-sm md:text-base uppercase tracking-widest mt-2">Events</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold font-serif">XYZA+</span>
            <span className="text-sm md:text-base uppercase tracking-widest mt-2">Artists</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold font-serif">300+</span>
            <span className="text-sm md:text-base uppercase tracking-widest mt-2">Colleges</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold font-serif">XXXXX</span>
            <span className="text-sm md:text-base uppercase tracking-widest mt-2">City</span>
          </div>
        </div>
      </div>
    </section>
  );
}
