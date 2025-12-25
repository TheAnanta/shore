"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/LoadingAnimation/page";
import SignInButton from "@/components/sign_in_button";
import { useAuthContext } from "@/context/AuthContext";
import { getEvent, getEvents, registerForEvent } from "@/lib/api";
import { toast } from "react-toastify";

import FormRenderer from "@/components/form-renderer";
import ComboSelectionModal from "@/components/combo-selection-modal";
import ComboRegistrationModal from "@/components/combo-registration-modal";

export default function EventPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const router = useRouter();

    const user = useAuthContext();
    const [eventData, setEventData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showComboSelection, setShowComboSelection] = useState(false);
    const [showComboRegistration, setShowComboRegistration] = useState(false);
    const [comboEvents, setComboEvents] = useState<any[]>([]);


    const [allEvents, setEvents] = useState<any>(null);
    const q_slug = eventData?.category?.slug;
    useEffect(() => {
        async function fetchEvents(slug: string | null) {
            try {
                const data = (await getEvents()).filter((r: any) => slug ? r.category?.slug === slug : true);
                setEvents(data);
                // setEvents(data.filter((r: any) => r.slug !== params?.slug));
            } catch (error) {
                console.error("Error fetching events:", error);
                toast.error("Failed to load events");
            } finally {
                setLoading(false);
            }
        }
        if (eventData?.can_combo) {
            fetchEvents(q_slug);
        }
    }, [eventData?.can_combo]);

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

    const handleRegisterClick = () => {
        if (!user) {
            toast.info("Please sign in to register");
            return;
        }

        if (!eventData.current_form_version) {
            // No form version: Redirect directly to gevents_url
            if (eventData.gevents_url) {
                window.location.href = eventData.gevents_url;
            } else {
                toast.error("Registration URL not configured");
            }
            return;
        }

        const config = eventData.current_form_version.config;
        const hasQuestions = config && Array.isArray(config) && config.length > 0;

        if (hasQuestions) {
            setShowForm(true);
        } else {
            // Form version exists but empty: Register then redirect (Old behavior)
            handleRegistrationSubmit({});
        }
    };

    const handleRegistrationSubmit = async (formData: any) => {
        try {
            setRegistering(true);
            const response = await registerForEvent(eventData.id, formData);

            if (response.redirect_url) {
                window.location.href = response.redirect_url;
            } else if (eventData.gevents_url) {
                window.location.href = eventData.gevents_url;
            } else {
                toast.success("Registration successful!");
                router.push("/profile");
            }
        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.message || "Registration failed");
        } finally {
            setRegistering(false);
        }
    };

    const handlePairClick = (otherEvent: any) => {
        if (!user) {
            toast.info("Please sign in to pair events");
            return;
        }
        if (eventData.current_form_version_id !== otherEvent.current_form_version_id) {
            toast.error("These events cannot be paired (incompatible forms)");
            return;
        }
        setComboEvents([eventData, otherEvent]);
        setShowComboRegistration(true);
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
                <Link href={`/events?q=${eventData.category.slug}`}><span className="material-symbols-outlined !text-2xl">arrow_back</span></Link>
                <SignInButton />
            </nav>
            <main className="mt-2 md:px-4 gap-8 relative flex flex-col md:flex-row grow items-start overflow-hidden">
                <>
                    <div className="md:w-[60%] w-full md:aspect-[3.6] shrink-0">
                        <img
                            className="aspect-[2.4] object-cover rounded-2xl w-full object-bottom"
                            src={eventData.banner_image || "/placeholder.jpg"}
                        />
                        <div className="flex items-end">
                            <div className="grow">
                                <h1 className="mt-8 text-5xl font-bold whitespace-pre-wrap leading-[150%]">
                                    {eventData.name}
                                </h1>
                                <h3 className="mt-2 text-xl max-w-[42ch] font-medium">
                                    {eventData.venue?.name} | {new Date(eventData.start_time).toLocaleString('en-GB', options as any)}
                                </h3>
                                <p
                                    className="max-w-[48ch] mt-4"
                                    dangerouslySetInnerHTML={{
                                        __html: eventData.description,
                                    }}
                                ></p>
                                {eventData.rulebook_html && (
                                    <div className="mt-8">
                                        <h3 className="text-2xl font-bold mb-4">Rulebook</h3>
                                        <div
                                            className="prose prose-invert max-w-[48ch]"
                                            dangerouslySetInnerHTML={{ __html: eventData.rulebook_html }}
                                        />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleRegisterClick}
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
                            className=" -translate-y-[1px] relative z-5 p-12 rounded-2xl bg-white/3 text-white"
                        >
                            <h3 className="text-4xl mb-4 font-bold">More about<br />the event</h3>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h4 className="font-bold text-xl opacity-70">Category</h4>
                                    <p className="opacity-40">{eventData.category?.name}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl opacity-70">Type</h4>
                                    <p className="opacity-40">{eventData.event_type?.name}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl opacity-70">Price</h4>
                                    <p className={eventData.gitam_price > 0 ? "opacity-40" : "hidden"}>₹{eventData.gitam_price}</p>
                                    <p className={eventData.general_price > 0 ? "opacity-40" : "hidden"}>General: ₹{eventData.general_price}</p>
                                </div>
                            </div>
                        </div>
                        {eventData.can_combo && <div
                            className="mt-4 relative z-5 p-12 rounded-2xl bg-white/5 text-white"
                        >
                            <h3 className="text-2xl mb-4 font-bold opacity-70">or pair at ₹199 flat both with...</h3>
                            <div className="flex gap-4 overflow-scroll w-full max-w-[460px] pr-8">
                                {allEvents?.map((event: any) => (
                                    <div
                                        key={event.id}
                                        className="shrink-0 w-[380px] shadow-md border-2 border-zinc-800/60 bg-[#161616] p-6 rounded-3xl flex flex-col h-full"
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
                                            <button
                                                onClick={() => handlePairClick(event)}
                                                className="flex mt-4 w-max bg-[#b32b0f] font-bold px-4 py-2 items-center gap-2 hover:bg-[#ad2406]/70 rounded-full cursor-pointer"
                                            >
                                                Pair{" "}
                                                <span className="material-symbols-outlined text-[20px]! font-bold!">
                                                    arrow_forward
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>
                </>
            </main>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                    <div className="bg-[#161616] border-2 border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        <div className="p-6 border-b-2 border-white/10 sticky top-0 bg-[#161616] z-10 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Registration Form</h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="p-2 hover:bg-[#161616] rounded-full"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6">
                            <FormRenderer
                                config={eventData.current_form_version.config}
                                onSubmit={handleRegistrationSubmit}
                                isSubmitting={registering}
                                eventSlug={eventData.slug}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showComboRegistration && (
                <ComboRegistrationModal
                    events={comboEvents}
                    onClose={() => setShowComboRegistration(false)}
                />
            )}
        </div>
    );
}
