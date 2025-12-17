"use client";

import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Loader from "@/components/LoadingAnimation/page";
import { getProfile } from "@/lib/api";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

function ProfileCard() {

  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      await auth.authStateReady();
      const uid = auth.currentUser?.uid;
      if (!uid) {
        toast.error("Session expired. Please login again.", {
          hideProgressBar: true
        });
        router.push("/login");
        return;
      }
      await getProfile(uid).then((profile) => {
        console.log("Profile:", profile);
        if (profile.status && profile.data) {
          setProfile(profile.data);
        }
      });
    }
    fetchProfile().catch((error) => {
      if (error.error_code === 'auth/user-not-found') {
        router.push("/onboarding?step=1");
        return;
      }
      console.error("Failed to get profile", error);
      toast.error(error.message || "Google login failed. Please try again.", {
        hideProgressBar: true
      });
    });
  }, []);
  return (profile == null ? <p>Loading...</p> : <div className="flex flex-col items-center gap-4 p-8 border-2 border-zinc-800/60 rounded-2xl shadow-lg bg-[#161616] max-w-md w-full text-zinc-100">

    {/* Profile Image with Verified Badge Logic */}
    <div className="relative">
      <img
        src={profile.display_picture || "/placeholder-user.jpg"}
        alt={profile.name}
        referrerPolicy="no-referrer"
        className="w-24 h-24 rounded-full object-cover border-2 border-zinc-700"
      />
      {profile.is_verified && (
        <div className="absolute -bottom-1 -right-1 bg-[#161616] text-white p-1 rounded-full border-2 border-[#161616]" title="Verified">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="oklch(62.3% 0.214 259.815)"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z" /></svg>
        </div>
      )}
    </div>

    {/* Name and Role */}
    <div className="text-center">
      <h2 className="text-2xl font-bold">{profile.name}</h2>
      <div className="flex items-center justify-center gap-2 mt-1">
        <p className="text-zinc-400 text-sm">{profile.email}</p>
        {profile.role_slug === 'admin' && (
          <span className="bg-gray-700/50 border-gray-500/20 border text-gray-200/50 text-xs px-3 py-1 pt-1.5 rounded-full font-bold uppercase">
            {profile.role_slug}
          </span>
        )}
      </div>
    </div>

    <div className="w-full h-px bg-zinc-800 my-2"></div>

    {/* Details Section Grid */}
    <div className="w-full grid grid-cols-2 gap-y-4 gap-x-2 text-sm">

      {/* Roll Number */}
      <div className="flex flex-col">
        <span className="text-zinc-500 text-xs uppercase tracking-wider">Roll Number</span>
        <span className="font-mono font-medium">{profile.roll_number}</span>
      </div>

      {/* Year & Campus */}
      <div className="flex flex-col">
        <span className="text-zinc-500 text-xs uppercase tracking-wider">Year / Campus</span>
        <span className="font-medium">{profile.year} — {profile.campus}</span>
      </div>

      {/* Department - Spanning full width */}
      <div className="col-span-2 flex flex-col">
        <span className="text-zinc-500 text-xs uppercase tracking-wider">Department</span>
        <span className="font-medium truncate" title={profile.department}>{profile.department}</span>
      </div>

      {/* Institution - Spanning full width */}
      <div className="col-span-2 flex flex-col">
        <span className="text-zinc-500 text-xs uppercase tracking-wider">Institution</span>
        <span className="font-medium truncate">{profile.institution}</span>
      </div>

      {/* Phone */}
      <div className="col-span-2 flex flex-col">
        <span className="text-zinc-500 text-xs uppercase tracking-wider">Contact</span>
        <span className="font-medium">{profile.phone_number}</span>
      </div>

    </div>
  </div>);
}

export default function DashboardPage() {

  const user = useAuthContext();
  const [loading, setLoading] = useState(true);
  const items = [
    { title: "ETHNIC FEST", desc: "Celebrate diverse cultures with traditional music, dance, and food.", img: "/images/past-shore-photos/shore_25_27.jpg" },
    { title: "PRO NIGHTS", desc: "A night filled with electrifying DJ sets and non-stop dancing.", img: "/images/past-shore-photos/shore_25_34.jpg", q: "Pro Night" },
    { title: "CELEBRITY MEET", desc: "An exclusive opportunity to interact with celebrity legends.", img: "/images/past-shore-photos/shore_25_22.jpg" },
    { title: "CULTURAL EXTRAVAGANZA", desc: "Experience the best of dance, music, and art.", img: "/images/past-shore-photos/shore_25_6.jpg", q: "Cultural" },
    { title: "TECHNICAL TREVOR", desc: "Showcase your technical skills and innovation.", img: "/images/past-shore-photos/shore_25_55.jpg", q: "Technical" },
    { title: "MANAGEMENT SUMMIT", desc: "Test your management and leadership abilities.", img: "/images/past-shore-photos/categories/management.png", q: "Management" },
    { title: "WELLNESS WAVE", desc: "Focus on health, wellness and mindfulness.", img: "/images/past-shore-photos/categories/wellness_gemini.png", q: "Wellness" },
    { title: "SPORTS AVALANCHE", desc: "Compete in various sports and athletic events.", img: "/images/past-shore-photos/shore_25_57.jpg", q: "Sports" },
    { title: "RECREATIONAL REALM", desc: "Fun and engaging recreational activities for all.", img: "/images/past-shore-photos/shore_25_48.jpg", q: "Wellness" },
  ];

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#090909] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold overflow-hidden">
              <img src={user!.photoURL?.replaceAll("=s96-c", "") || "/placeholder-user.jpg"} referrerPolicy="no-referrer" />
            </div>
            <button onClick={async () => {
              await auth.signOut();
              window.location.href = "/";
            }} className="text-gray-400 hover:text-white">Logout</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <ProfileCard />
          {/* Events Card */}
          {/* <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">My Events</h2>
            <p className="text-gray-400 text-sm mb-4">You haven't registered for any events yet.</p>
            <button className="text-red-500 hover:text-red-400 font-bold text-sm">Browse Events →</button>
          </div> */}

          {/* Tickets Card */}
          {/* <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 -960 960 960" width="72px" fill="#FFFFFF" className="opacity-20 mb-4"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z" /></svg>
            <h2 className="text-xl font-bold mb-2">My Tickets</h2>
            <p className="text-gray-400 text-sm text-center">No active tickets found.<br />You can purchase tickets from below.</p>
          </div> */}
        </div>
        <section className="w-full py-10 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.filter((e) => e.q && e.q == 'Pro Night').map((item, index) => (
                <Link aria-disabled={!item.q} href={`/events?q=` + item.q} key={index} className={!item.q ? 'pointer-events-none' : 'cursor-pointer'}>
                  <div className="relative h-64 w-full bg-gray-200 mb-4 overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <Image width={512} height={512} src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute flex items-center gap-2 top-4 right-4 bg-black/50 p-2 px-4 rounded-full transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                      <p className="font-bold text-sm">Buy Pass</p>
                    </div>
                    <div className="absolute bottom-0 p-6 pt-16 bg-linear-to-t from-black to-transparent">
                      <h3 className="text-xl font-bold uppercase mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-300/80">{item.desc}</p>
                    </div>
                  </div>

                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
