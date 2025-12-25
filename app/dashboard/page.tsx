"use client";

import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Loader from "@/components/LoadingAnimation/page";
import { getEventCategories, getMyRegistrations, getProfile } from "@/lib/api";
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

function PassesList() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const options = {
    day: '2-digit',
    month: 'short', // 'short' gives 'Jan', 'Feb', etc.
    year: 'numeric' // 'numeric' gives '2025'
  };

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        await auth.authStateReady();
        if (auth.currentUser) {
          const data = await getMyRegistrations();
          setRegistrations(data);
        }
      } catch (error) {
        console.error("Failed to fetch registrations", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  if (loading) return <p className="text-gray-400">Loading passes...</p>;

  if (registrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 -960 960 960" width="72px" fill="#FFFFFF" className="opacity-20 mb-4"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z" /></svg>
        <h2 className="text-xl font-bold mb-2">My Passes</h2>
        <p className="text-gray-400 text-sm">No active passes found.<br />You can purchase passes from below.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 h-full max-h-[500px] overflow-y-auto pr-2">
      <h2 className="text-xl font-bold mb-2 sticky top-0 bg-zinc-900 py-2 z-10">My Passes</h2>
      {registrations.map((reg) => (
        <Link href={"/profile"} key={reg.id}><div key={reg.id} className="flex gap-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-zinc-600 transition-colors">
          <div className="w-16 h-16 bg-zinc-700 rounded-lg overflow-hidden shrink-0">
            {reg.event.banner_image ? (
              <img src={reg.event.banner_image} alt={reg.event.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">No Img</div>
            )}
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <h3 className="font-bold truncate" title={reg.event.name}>{reg.event.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${reg.status === 'REGISTERED' ? 'bg-green-500/20 text-green-400 border border-green-500/20' :
                reg.status === 'PENDING_PAYMENT' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20' :
                  'bg-zinc-700 text-zinc-400'
                }`}>
                {reg.status.replace('_', ' ')}
              </span>
            </div>

            <span className="text-xs text-zinc-500 mt-2">
              Purchased on {new Date(reg.created_at).toLocaleDateString('en-IN', (options as any))}
            </span>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );


}

export default function DashboardPage() {

  const user = useAuthContext();
  const [loading, setLoading] = useState(true);
  // const items = [
  //   { title: "ETHNIC FEST", desc: "Celebrate diverse cultures with traditional music, dance, and food.", img: "/images/past-shore-photos/shore_25_27.jpg" },
  //   { title: "PRO NIGHTS", desc: "A night filled with electrifying DJ sets and non-stop dancing.", img: "/images/past-shore-photos/shore_25_34.jpg", q: "pro-night" },
  //   { title: "CELEBRITY MEET", desc: "An exclusive opportunity to interact with celebrity legends.", img: "/images/past-shore-photos/shore_25_22.jpg" },
  //   { title: "CULTURAL EXTRAVAGANZA", desc: "Experience the best of dance, music, and art.", img: "/images/past-shore-photos/shore_25_6.jpg", q: "cultural" },
  //   { title: "TECHNICAL TREVOR", desc: "Showcase your technical skills and innovation.", img: "/images/past-shore-photos/shore_25_55.jpg", q: "technical" },
  //   { title: "MANAGEMENT SUMMIT", desc: "Test your management and leadership abilities.", img: "/images/past-shore-photos/categories/management.png", q: "management" },
  //   { title: "WELLNESS WAVE", desc: "Focus on health, wellness and mindfulness.", img: "/images/past-shore-photos/categories/wellness_gemini.png", q: "wellness" },
  //   { title: "SPORTS AVALANCHE", desc: "Compete in various sports and athletic events.", img: "/images/past-shore-photos/shore_25_57.jpg", q: "sports" },
  //   { title: "RECREATIONAL REALM", desc: "Fun and engaging recreational activities for all.", img: "/images/past-shore-photos/shore_25_48.jpg", q: "wellness" },
  // ];
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getEventCategories();
      setCategories(res);
    };
    fetchCategories();
  }, []);

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

          {/* Passes Card */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col items-center justify-center min-h-[300px]">
            <PassesList />
          </div>
        </div>
        <section className="w-full py-10 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.filter((e) => e.slug).map((item, index) => (
                <Link aria-disabled={!item.slug} href={`/events?q=` + item.slug} key={index} className={!item.slug ? 'pointer-events-none' : 'cursor-pointer'}>
                  <div className="relative h-64 w-full bg-gray-200 mb-4 overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <Image width={512} height={512} src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute flex items-center gap-2 top-4 right-4 bg-black/50 p-2 px-4 rounded-full transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                      <p className="font-bold text-sm">Buy Pass</p>
                    </div>
                    <div className="absolute bottom-0 p-6 pt-16 bg-linear-to-t from-black to-transparent w-full">
                      <h3 className="text-xl font-bold uppercase mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-300/80">{item.description}</p>
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
