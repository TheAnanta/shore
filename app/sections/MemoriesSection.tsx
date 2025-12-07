export default function MemoriesSection() {
  return (
    <section className="w-full bg-zinc-900 py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 uppercase">Memories & Clicks from the Past</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video bg-zinc-800 relative group overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                  [Gallery Image {i}]
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
