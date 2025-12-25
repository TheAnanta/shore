import { useState } from "react";
import { toast } from "react-toastify";

interface ComboSelectionModalProps {
    events: any[];
    onClose: () => void;
    onProceed: (selectedEvents: any[]) => void;
}

export default function ComboSelectionModal({ events, onClose, onProceed }: ComboSelectionModalProps) {
    const [selectedEvents, setSelectedEvents] = useState<any[]>([]);

    const toggleEvent = (event: any) => {
        if (selectedEvents.find(e => e.id === event.id)) {
            setSelectedEvents(selectedEvents.filter(e => e.id !== event.id));
        } else {
            if (selectedEvents.length >= 2) {
                toast.info("You can only select 2 events for the combo");
                return;
            }
            // Check form compatibility
            if (selectedEvents.length === 1) {
                if (selectedEvents[0].current_form_version_id !== event.current_form_version_id) {
                    toast.error("These events cannot be paired (incompatible forms)");
                    return;
                }
            }
            setSelectedEvents([...selectedEvents, event]);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-[#161616] border-2 border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b-2 border-white/10 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold">Select 2 Events</h2>
                        <p className="opacity-60">Pick any two compatible events for ₹199</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.filter((e: any) => e.can_combo).map((event: any) => {
                        const isSelected = selectedEvents.find(e => e.id === event.id);
                        const isDisabled = selectedEvents.length === 1 && !isSelected && selectedEvents[0].current_form_version_id !== event.current_form_version_id;

                        return (
                            <div
                                key={event.id}
                                onClick={() => !isDisabled && toggleEvent(event)}
                                className={`
                                    relative p-4 rounded-xl border-2 cursor-pointer transition-all
                                    ${isSelected ? "border-red-600 bg-red-900/20" : "border-white/10 bg-white/5 hover:border-white/30"}
                                    ${isDisabled ? "opacity-30 cursor-not-allowed" : ""}
                                `}
                            >
                                <div className="flex gap-4">
                                    <img
                                        src={event.banner_image || "/placeholder.jpg"}
                                        className="w-24 h-24 object-cover rounded-lg shrink-0"
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight">{event.name}</h3>
                                        <p className="text-sm opacity-60 mt-1">{event.event_type?.name}</p>
                                        {isDisabled && <p className="text-xs text-red-400 mt-2">Incompatible with selection</p>}
                                    </div>
                                </div>
                                {isSelected && (
                                    <div className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-1">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="p-6 border-t-2 border-white/10 flex justify-between items-center shrink-0">
                    <p className="opacity-60">{selectedEvents.length} of 2 selected</p>
                    <button
                        onClick={() => onProceed(selectedEvents)}
                        disabled={selectedEvents.length !== 2}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
                    >
                        Proceed to Registration
                    </button>
                </div>
            </div>
        </div>
    );
}
