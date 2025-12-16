"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/LoadingAnimation/page";
import { getEvents } from "@/lib/api";
import { toast } from "react-toastify";
import SignInButton from "@/components/sign_in_button";

export default function EventsPage() {
    const [allEvents, setEvents] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
                toast.error("Failed to load events");
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);


    return (
        <div className="px-6 md:px-12 py-6">
            <nav className="p-4 flex justify-between">
                <div className="flex gap-4 items-center flex-row-reverse w-max">
                    <span className="material-symbols-outlined text-2xl!">menu</span>
                    <SignInButton />
                </div>
            </nav>
            <main className="mt-2 md:px-4 gap-8 relative flex flex-col items-start overflow-hidden">
                <p className="text-5xl font-bold ml-6 mt-12">Events</p>
                {!loading && allEvents ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 py-12 pt-6 gap-8 w-full">
                        {allEvents.sort((a: any, b: any) => (b.slug.includes("gitam") ? 1 : -1) - (a.slug.includes("gitam") ? 1 : -1)).map((event: any) => (
                            <div
                                key={event.id}
                                className="shadow-md border-2 border-zinc-800/60 bg-[#161616] p-6 rounded-3xl flex flex-col h-full"
                            >
                                <div className="w-full h-full shrink-0 flex flex-col">
                                    <img
                                        className="aspect-[2] object-cover rounded-2xl w-full object-bottom"
                                        src={event.banner_image || "/placeholder.jpg"}
                                    />
                                    <h1 className="mt-4 text-3xl font-bold whitespace-pre-wrap leading-[150%] max-w-[22ch]">
                                        {event.name}
                                    </h1>
                                    <div className="mb-4 mt-2 flex flex-wrap gap-2 text-xs font-medium">
                                        <p className="py-2 px-6 border rounded-full w-max">
                                            {event.category?.name || "Event"}
                                        </p>
                                        <p className="py-2 px-6 border rounded-full w-max">
                                            {event.event_type?.name || "General"}
                                        </p>
                                    </div>
                                    <p
                                        className="max-w-[48ch] mb-auto line-clamp-4 overflow-ellipsis"
                                        dangerouslySetInnerHTML={{
                                            __html: event.description,
                                        }}
                                    ></p>
                                    <Link
                                        href={"/events/" + event.slug}
                                        className="flex mt-4 w-max text-(--android-primary-color) font-bold px-4 py-2 items-center gap-2 hover:bg-(--android-primary-color)/20 rounded-full"
                                    >
                                        View Details{" "}
                                        <span className="material-symbols-outlined text-[20px]! font-bold!">
                                            arrow_forward
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col place-items-center place-content-center h-[80vh] m-0 w-full">
                        <Loader />
                    </div>
                )}
            </main>
        </div>
    );
}
