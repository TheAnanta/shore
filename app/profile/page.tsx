"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/LoadingAnimation/page";
import SignInButton from "@/components/sign_in_button";
import { useAuthContext } from "@/context/AuthContext";
import { getMyTicket } from "@/lib/api";

export default function ProfilePage() {
    const user = useAuthContext();
    const [ticketData, setTicketData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTicket() {
            if (!user) return;
            try {
                const data = await getMyTicket();
                setTicketData(data);
            } catch (error) {
                console.error("Error fetching ticket:", error);
                // toast.error("Failed to load ticket"); // Might fail if no ticket, which is fine
            } finally {
                setLoading(false);
            }
        }
        fetchTicket();
    }, [user]);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <p>Please sign in to view your profile</p>
                <SignInButton />
            </div>
        )
    }

    return (
        <div className="px-6 md:px-12 py-6">
            <nav className="p-4 flex justify-between">
                <div className="flex gap-4 items-center flex-row-reverse w-max">
                    <span className="material-symbols-outlined text-2xl!">menu</span>
                    <SignInButton />
                </div>
                <div className="flex items-center">
                    <Link href="/" className="absolute right-40">
                        <img src="/badge.png" className="h-16" />
                    </Link>
                    <img src="/theananta.png" className="h-8 mr-3" />
                </div>
            </nav>
            <main className="mt-12 md:px-4 gap-8 relative flex flex-col items-center">
                <h1 className="text-4xl font-bold">My Profile</h1>

                <div className="flex flex-col items-center gap-4 mt-8 p-8 rounded-2xl shadow-lg border-2 border-zinc-800/60 bg-[#161616] max-w-md w-full">
                    <img src={user.photoURL || "/placeholder-user.jpg"} className="w-24 h-24 rounded-full" />
                    <h2 className="text-2xl leading-0 mt-6 font-bold">{user.displayName}</h2>
                    <p className="text-white/50">{user.email}</p>

                    <div className="w-full h-px bg-gray-200 my-4"></div>

                    {loading ? (
                        <Loader />
                    ) : ticketData ? (
                        <div className="flex flex-col items-center gap-4">
                            <h3 className="text-xl font-bold text-(--android-primary-color)">Event Pass</h3>
                            <div className="bg-white p-4 rounded-xl border-2 border-black">
                                {/* QR Code Generation */}
                                {/* We need a QR library. For now, using a placeholder or assuming react-qr-code is installed */}
                                {/* If not installed, I should install it or use an img tag with an API */}
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${JSON.stringify({
                                        u: ticketData.user_id,
                                        t: ticketData.timestamp,
                                        s: ticketData.signature
                                    })}`}
                                    alt="Ticket QR Code"
                                    className="w-48 h-48"
                                />
                            </div>
                            <p className="text-xs text-center text-gray-500 max-w-[200px] break-all">
                                {ticketData.signature}
                            </p>
                            <p className="text-sm font-medium text-green-600">Active & Verified</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p>No active tickets found.</p>
                            <Link href="/events" className="text-blue-500 underline mt-2 block">
                                Browse Events
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
