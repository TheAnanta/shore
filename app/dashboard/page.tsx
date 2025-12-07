"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold">
              U
            </div>
            <Link href="/" className="text-gray-400 hover:text-white">Logout</Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Profile Status</h2>
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Verified
            </div>
            <p className="text-gray-400 text-sm">Your profile is complete and verified via DigiLocker.</p>
          </div>

          {/* Events Card */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">My Events</h2>
            <p className="text-gray-400 text-sm mb-4">You haven't registered for any events yet.</p>
            <button className="text-red-500 hover:text-red-400 font-bold text-sm">Browse Events →</button>
          </div>

          {/* Tickets Card */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">My Tickets</h2>
            <p className="text-gray-400 text-sm">No active tickets found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
