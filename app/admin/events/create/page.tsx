"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext"; // Assuming this exists
// We need an API function to create events. I'll add it to api.ts later or inline it for now if I can't edit api.ts easily.
// Actually I should add createEvent to api.ts.

export default function CreateEventPage() {
    const router = useRouter();
    const user = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        slug: "",
        name: "",
        description: "",
        banner_image: "",
        category_id: "",
        event_type_id: "",
        venue_id: "",
        start_time: "",
        end_time: "",
        gitam_price: 0,
        general_price: 0,
        gevents_url: "",
        gevents_id: "",
        gevents_name: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // TODO: Move this to api.ts
            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
            const token = await user?.getIdToken();

            const response = await fetch(`${BASE_URL}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    gitam_price: Number(formData.gitam_price),
                    general_price: Number(formData.general_price),
                    // Add defaults or handle missing IDs
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to create event");
            }

            toast.success("Event created successfully!");
            router.push("/events");
        } catch (error: any) {
            console.error("Error creating event:", error);
            toast.error(error.message || "Failed to create event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Create Event</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    name="name"
                    placeholder="Event Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    name="slug"
                    placeholder="Slug (URL friendly)"
                    value={formData.slug}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 rounded h-32"
                    required
                />
                <input
                    name="banner_image"
                    placeholder="Banner Image URL"
                    value={formData.banner_image}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="start_time"
                        type="datetime-local"
                        value={formData.start_time}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        name="end_time"
                        type="datetime-local"
                        value={formData.end_time}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="gitam_price"
                        type="number"
                        placeholder="GITAM Price"
                        value={formData.gitam_price}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        name="general_price"
                        type="number"
                        placeholder="General Price"
                        value={formData.general_price}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>

                <h3 className="font-bold mt-4">G-Events Integration</h3>
                <input
                    name="gevents_url"
                    placeholder="G-Events Payment URL"
                    value={formData.gevents_url}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="gevents_id"
                    placeholder="G-Events ID"
                    value={formData.gevents_id}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                {/* IDs for relations - In a real app these would be dropdowns */}
                <input
                    name="category_id"
                    placeholder="Category ID"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    name="event_type_id"
                    placeholder="Event Type ID"
                    value={formData.event_type_id}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    name="venue_id"
                    placeholder="Venue ID"
                    value={formData.venue_id}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Create Event"}
                </button>
            </form>
        </div>
    );
}
