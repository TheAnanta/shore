import { useState } from "react";
import { toast } from "react-toastify";
import FormRenderer from "@/components/form-renderer";
import { registerForCombo } from "@/lib/api";

interface ComboRegistrationModalProps {
    events: any[];
    onClose: () => void;
}

export default function ComboRegistrationModal({ events, onClose }: ComboRegistrationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegistrationSubmit = async (formData: any) => {
        try {
            setIsSubmitting(true);
            const eventIds = events.map(e => e.id);
            const response = await registerForCombo(eventIds, formData);

            if (response.redirect_url) {
                window.location.href = response.redirect_url;
            } else {
                toast.success("Combo registration initiated!");
                onClose();
            }
        } catch (error: any) {
            console.error("Combo registration error:", error);
            toast.error(error.message || "Registration failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Assuming both events share the same form config, we use the first one
    const formConfig = events[0]?.current_form_version?.config;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-[#161616] border-2 border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative flex flex-col">
                <div className="p-6 border-b-2 border-white/10 sticky top-0 bg-[#161616] z-10 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-xl font-bold">Combo Registration</h2>
                        <p className="text-sm opacity-60">Registering for: {events.map(e => e.name).join(" + ")}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-6">
                    <FormRenderer
                        config={formConfig}
                        onSubmit={handleRegistrationSubmit}
                        isSubmitting={isSubmitting}
                        eventSlug={events[0].slug} // Just for context, though it's a combo
                    />
                </div>
            </div>
        </div>
    );
}
