"use client";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function SignInButton() {
    const user = useAuthContext();

    if (user) {
        return (
            <Link href="/profile">
                <img
                    src={user.photoURL || "/placeholder-user.jpg"}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border border-gray-300"
                />
            </Link>
        );
    }

    return (
        <Link
            href="/login"
            className="bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
            Sign In
        </Link>
    );
}
