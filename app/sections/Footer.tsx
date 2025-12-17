import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black py-12 pb-24 text-white border-t border-zinc-800 text-sm">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          {/* <h3 className="text-2xl font-bold mb-4">SHORE '26</h3> */}
          <img src="/images/shore-logo-footer.png" className="h-20 mb-4" />
          <p className="text-gray-500 mb-4">
            GITAM University's Annual Cultural Festival celebrating creativity, culture, and connection.
          </p>
          <p className="text-gray-600 text-xs">© 2026 The Ananta Studio. All rights reserved.</p>
        </div>

        <div className="md:ml-8">
          <h4 className="font-bold mb-4 uppercase">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/#about-shore" className="hover:text-white">About</Link></li>
            {/* <li><Link href="/schedule" className="hover:text-white">Schedule</Link></li> */}
            <li><Link href="/login" className="hover:text-white">Register</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">My SHORe Dashboard</Link></li>
            <li><Link href="/#partners" className="hover:text-white">Sponsors</Link></li>
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

        <div>
          <h4 className="font-bold mb-4 uppercase">Contact Us</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="mailto:unifest_cc@gitam.in" className="text-white font-semibold hover:text-[#F5A41C]">unifest_cc@gitam.in</a></li>
            <li><p>GITAM (Deemed to be University)<br />Gandhi Nagar, Rushikonda, Visakhapatnam, Andhra Pradesh 530045</p></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
