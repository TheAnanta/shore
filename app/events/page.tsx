"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/LoadingAnimation/page";
import { getEventCategories, getEvents } from "@/lib/api";
import { toast } from "react-toastify";
import SignInButton from "@/components/sign_in_button";
import { useSearchParams } from "next/navigation";
import ComboSelectionModal from "@/components/combo-selection-modal";
import ComboRegistrationModal from "@/components/combo-registration-modal";

export default function EventsPage() {
    const [allEvents, setEvents] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const q_slug = useSearchParams().get("q");
    const [categories, setCategories] = useState<any[]>([]);
    const [showComboSelection, setShowComboSelection] = useState(false);
    const [showComboRegistration, setShowComboRegistration] = useState(false);
    const [comboEvents, setComboEvents] = useState<any[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getEventCategories();
            setCategories(res);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        async function fetchEvents(slug: string | null) {
            try {
                const data = (await getEvents()).filter((r: any) => slug ? r.category?.slug === slug : true);
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
                toast.error("Failed to load events");
            } finally {
                setLoading(false);
            }
        }
        fetchEvents(q_slug);
    }, [q_slug]);

    const category = categories.find((c: any) => c.slug === q_slug);

    const handleBannerClick = (e: React.MouseEvent) => {
        // Check if the clicked element or any parent is a button with "Shop Now" text
        const target = e.target as HTMLElement;
        const button = target.closest("button");

        if (button && button.innerText.includes("Register Now")) {
            e.preventDefault();
            setShowComboSelection(true);
        }
    };

    const handleComboProceed = (selectedEvents: any[]) => {
        setComboEvents(selectedEvents);
        setShowComboSelection(false);
        setShowComboRegistration(true);
    };

    return (
        <div className="bg-[#090909] text-white px-6 md:px-12 py-6">
            <nav className="p-4 flex justify-between">
                <div className="flex gap-4 items-center flex-row-reverse w-max">
                    <SignInButton />
                    <Link href="/dashboard"><span className="material-symbols-outlined text-2xl!">arrow_back</span></Link>
                </div>
            </nav>
            <main className="mt-2 md:px-4 gap-2 relative flex flex-col items-start overflow-hidden">
                {!loading && allEvents.length > 0 && category?.promotion_carousel.length <= 0 && <><p className="text-xl font-medium mt-12 leading-8 opacity-60">{category?.name ?? q_slug ?? "404 Not Found"}</p>
                    <p className="text-5xl font-bold">Events</p></>}

                {!loading && allEvents.length > 0 ? (
                    <>
                        {category?.promotion_carousel.length > 0 &&
                            <><div className="md:block hidden mt-8 w-full h-[240px] relative rounded-3xl overflow-clip">
                                <div className="pb-8 flex flex-col justify-end top-0 left-0 w-full h-full bg-red-800">
                                    <p className="text-xl font-medium ml-6 mt-12 leading-4 opacity-60">{category?.name ?? q_slug ?? "404 Not Found"}</p>
                                    <p className="text-5xl font-bold ml-6 mt-4">Events</p>
                                    <div onClick={handleBannerClick}>
                                        <div dangerouslySetInnerHTML={{ __html: category?.promotion_carousel[0] }}></div>
                                        <div className="size-14 bg-black absolute right-[460px] -top-7 rounded-full" />
                                        <div className="size-14 bg-black absolute right-[460px] -bottom-7 rounded-full" />
                                        <div className="w-[488px] pointer-events-none absolute right-0 border-l-2 border-dashed border-white/20 h-[184px] top-7" />
                                        <img src="https://dholkalive.com/wp-content/uploads/2023/01/Discounts-removebg-preview.png" className="h-48 absolute right-4 z-10 bottom-0" />
                                        <div className="h-24 w-72 bg-red-900 absolute rounded-full -right-10 -bottom-16" />
                                    </div>
                                </div>
                            </div><div className="md:hidden mt-8 w-full">
                                    <p className="text-xl font-medium leading-4 opacity-60">{category?.name ?? q_slug ?? "404 Not Found"}</p>
                                    <p className="text-5xl font-bold mt-4">Events</p>
                                    <div className="mt-6 relative rounded-3xl overflow-clip pb-8 flex flex-col justify-end top-0 left-0 w-full h-[240px] bg-red-800">
                                        <div>
                                            <div className="right-52 top-4 ml-6 mt-4">
                                                <p className="text-5xl font-bold">BUY ONE<br />GET ONE</p>
                                                <p className="opacity-50">Get two events for ₹199 FLAT.</p>
                                                <button className="shadow-md cursor-pointer bg-white text-red-800 font-bold mt-4 px-6 py-2 rounded-full">Shop Now</button>
                                            </div>
                                            <img src="https://dholkalive.com/wp-content/uploads/2023/01/Discounts-removebg-preview.png" className="h-48 absolute right-4 z-10 bottom-0" />
                                            <div className="h-24 w-72 bg-red-900 absolute rounded-full -right-10 -bottom-16" />
                                        </div>
                                    </div>
                                </div></>}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 px-0 py-12 pt-6 gap-8 w-full">
                            {allEvents.sort((a: any, b: any) => (b.slug.includes("gitam") ? 1 : -1) - (a.slug.includes("gitam") ? 1 : -1)).map((event: any) => (
                                <Link
                                    href={"/events/" + event.slug}
                                    key={event.id}
                                    className="shadow-md border-2 border-zinc-800/60 bg-[#161616] p-6 rounded-3xl flex flex-col h-full"
                                >
                                    <div className="w-full h-full shrink-0 flex flex-col">
                                        <img
                                            className="aspect-[1.8] object-cover rounded-xl w-full object-bottom"
                                            src={event.banner_image || "/placeholder.jpg"}
                                        />
                                        <h1 className="mt-4 text-3xl font-bold whitespace-pre-wrap leading-[150%] max-w-[22ch]">
                                            {event.name}
                                        </h1>
                                        <div className="mb-4 mt-2 flex flex-wrap gap-2 text-xs font-medium">
                                            <p className="py-2 px-6 border-[1.5px] text-white/50 border-white/20 rounded-full w-max">
                                                {event.event_type?.name || "General"}
                                            </p>
                                            <p className="py-2 px-6 bg-white/5 rounded-full w-max">
                                                {event.category?.name || "Event"}
                                            </p>
                                        </div>
                                        <p
                                            className="max-w-[48ch] mb-auto line-clamp-4 overflow-ellipsis opacity-60"
                                            dangerouslySetInnerHTML={{
                                                __html: event.description,
                                            }}
                                        ></p>
                                        <div
                                            className="flex mt-4 w-max bg-[#b32b0f] font-bold px-4 py-2 items-center gap-2 hover:bg-[#ad2406]/70 rounded-full"
                                        >
                                            View Details{" "}
                                            <span className="material-symbols-outlined text-[20px]! font-bold!">
                                                arrow_forward
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div></>
                ) : !loading && allEvents.length == 0 ? <div className="flex flex-col place-items-center place-content-center h-[80vh] m-0 w-full"><img src="https://images.squarespace-cdn.com/content/v1/5e6a7ab5992a417f3a08b6a4/6402690b-81c9-4a7c-b3ea-6c2d3f39a1a0/blog+-+TMW+contributor+.png" className="h-[50vh] mix-blend-luminosity opacity-30" /><p className="text-2xl font-bold text-center">No Events Yet</p><p className="text-center opacity-50 text-lg">We're planning for an amazing set of events ahead.<br />Please check back soon!</p></div> : <Loader />}
            </main>
            {showComboSelection && (
                <ComboSelectionModal
                    events={allEvents}
                    onClose={() => setShowComboSelection(false)}
                    onProceed={handleComboProceed}
                />
            )}
            {showComboRegistration && (
                <ComboRegistrationModal
                    events={comboEvents}
                    onClose={() => setShowComboRegistration(false)}
                />
            )}
        </div >
    );
}
