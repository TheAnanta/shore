"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/LoadingAnimation/page";
import SignInButton from "@/components/sign_in_button";
import { useAuthContext } from "@/context/AuthContext";
import { getEvent, registerForEvent } from "@/lib/api";
import { toast } from "react-toastify";

export default function EventPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const router = useRouter();

    const user = useAuthContext();
    const [eventData, setEventData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);

    useEffect(() => {
        async function fetchEvent() {
            try {
                const data = await getEvent(slug);
                setEventData(data);
            } catch (error) {
                console.error("Error fetching event data:", error);
                toast.error("Failed to load event details");
            } finally {
                setLoading(false);
            }
        }
        if (slug) {
            fetchEvent();
        }
    }, [slug]);

    const handleRegister = async () => {
        if (!user) {
            toast.info("Please sign in to register");
            return;
        }

        try {
            setRegistering(true);
            // For now, we send empty form data. 
            // TODO: Implement dynamic form filling if event.current_form_version is present
            // const response = await registerForEvent(eventData.id, {});
            // console.log(eventData);
            window.location.href = eventData.gevents_url;
            // if (response.redirect_url) {
            //     window.location.href = response.redirect_url;
            // } else {
            //     toast.success("Registration successful!");
            //     // Refresh or redirect to profile
            //     router.push("/profile");
            // }
        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.message || "Registration failed");
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col place-items-center place-content-center h-[80vh] m-0 w-full">
                <Loader />
            </div>
        );
    }

    if (!eventData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Event not found</h1>
                <Link href="/events" className="text-blue-500 hover:underline mt-4">
                    Back to Events
                </Link>
            </div>
        );
    }

    const options = {
        day: '2-digit',
        month: 'short', // 'short' gives 'Jan', 'Feb', etc.
        year: 'numeric' // 'numeric' gives '2025'
    };

    return (
        <div className="px-6 md:px-12 py-6">
            <nav className="p-4 flex justify-between">
                <div className="flex gap-4 items-center flex-row-reverse w-max">
                    <span className="material-symbols-outlined !text-2xl">menu</span>
                    <SignInButton />
                </div>
                <div className="flex items-center">
                    <Link href="/" className="absolute right-40">
                        <img src="/badge.png" className="h-16" />
                    </Link>
                    <img src="/theananta.png" className="h-8 mr-3" />
                </div>
            </nav>
            <main className="mt-2 md:px-4 gap-8 relative flex flex-col md:flex-row grow items-start overflow-hidden">
                <>
                    <div className="md:w-[60%] w-full md:aspect-[3.6] shrink-0">
                        <img
                            className="aspect-[1.6] md:aspect-auto object-cover rounded-2xl w-full h-full object-bottom"
                            src={eventData.banner_image || "/placeholder.jpg"}
                        />
                        <div className="flex items-end">
                            <div className="grow">
                                <h1 className="mt-8 text-5xl font-bold whitespace-pre-wrap leading-[150%]">
                                    {eventData.name}
                                </h1>
                                <h3 className="mt-2 text-xl max-w-[42ch] font-medium">
                                    {eventData.venue?.name} | {new Date(eventData.start_time).toLocaleString('en-GB', options)}
                                </h3>
                                <p
                                    className="max-w-[48ch] mt-4"
                                    dangerouslySetInnerHTML={{
                                        __html: eventData.description,
                                    }}
                                ></p>
                            </div>
                            <button
                                onClick={handleRegister}
                                disabled={registering}
                                className="border-2 border-[var(--android-primary-color)] hover:bg-[var(--android-primary-color)] hover:text-white text-[var(--android-primary-color)] py-2 px-6 rounded-full font-medium disabled:opacity-50"
                            >
                                {registering ? "Registering..." : "Register Now"}
                            </button>
                        </div>

                        {/* Additional Sections like Organizers, etc. can be added here */}
                        {eventData.event_organizers && eventData.event_organizers.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-2xl font-medium mb-4">Organizers</h3>
                                <div className="flex gap-4 flex-wrap">
                                    {eventData.event_organizers.map((org: any) => (
                                        <div key={org.id} className="flex items-center gap-2">
                                            <img src={org.user.display_picture} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-medium">{org.user.name}</p>
                                                <p className="text-sm opacity-60">{org.user.roll_number}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Sidebar / Extra Info */}
                    <div className="grow">
                        <div
                            className=" -translate-y-[1px] relative z-5 p-[32px] md:px-[64px] md:py-[56px] rounded-2xl mt-4 bg-blue-50 text-blue-900"
                        >
                            <h3 className="font-medium text-4xl mb-8">Details</h3>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h4 className="font-bold">Category</h4>
                                    <p>{eventData.category?.name}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold">Type</h4>
                                    <p>{eventData.event_type?.name}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold">Price</h4>
                                    <p className={eventData.gitam_price > 0 ? "" : "hidden"}>GITAM: ₹{eventData.gitam_price}</p>
                                    <p className={eventData.general_price > 0 ? "" : "hidden"}>General: ₹{eventData.general_price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </main>
        </div>
    );
}
