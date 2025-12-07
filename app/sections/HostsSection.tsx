export default function HostsSection() {
  return (
    <section className="w-full bg-black py-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-2">Meet Your Hosts: The</h2>
        <h2 className="text-4xl font-bold mb-12 text-gray-400">Visionaries Behind SHORE '26</h2>
        
        <div className="flex flex-wrap justify-center gap-8">
           {/* Placeholder for hosts */}
           <div className="w-full h-96 bg-zinc-900 relative flex items-end justify-center pb-10">
              <span className="text-zinc-500">[Hosts Group Photo]</span>
           </div>
        </div>
      </div>
    </section>
  );
}
