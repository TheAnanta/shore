export default function Footer() {
  return (
    <footer className="w-full bg-black py-12 text-white border-t border-zinc-800 text-sm">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">SHORE '26</h3>
          <p className="text-gray-500 mb-4">
            GITAM Deemed to be University<br/>
            Visakhapatnam Campus
          </p>
          <p className="text-gray-600 text-xs">
            © 2025 SHORE Fest. All rights reserved.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 uppercase">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Events</a></li>
            <li><a href="#" className="hover:text-white">Sponsors</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
           <h4 className="font-bold mb-4 uppercase">Socials</h4>
           <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Instagram</a></li>
            <li><a href="#" className="hover:text-white">Twitter</a></li>
            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white">YouTube</a></li>
          </ul>
        </div>

        <div>
           <h4 className="font-bold mb-4 uppercase">Legal</h4>
           <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Code of Conduct</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
