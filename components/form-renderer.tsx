"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "@/lib/firebase";

export type QuestionType = "TEXT" | "TEXTAREA" | "NUMBER" | "SELECT" | "RADIO" | "CHECKBOX" | "FILE";

export interface Question {
    id: string;
    label: string;
    type: QuestionType;
    required: boolean;
    options?: string[];
    placeholder?: string;
    description?: string;
    validation?: {
        min?: number;
        max?: number;
        regex?: string;
        errorMessage?: string;
        minSelect?: number;
        maxSelect?: number;
        allowedTypes?: string[];
        maxSizeMB?: number;
    };
}

interface FormRendererProps {
    config: Question[];
    onSubmit: (data: any) => void;
    isSubmitting: boolean;
    eventSlug: string;
}

export default function FormRenderer({ config, onSubmit, isSubmitting, eventSlug }: FormRendererProps) {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [uploading, setUploading] = useState<Record<string, boolean>>({});

    const handleChange = (id: string, value: any) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleCheckboxChange = (id: string, option: string, checked: boolean) => {
        setFormData((prev) => {
            const current = prev[id] || [];
            if (checked) {
                return { ...prev, [id]: [...current, option] };
            } else {
                return { ...prev, [id]: current.filter((item: string) => item !== option) };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        for (const q of config) {
            if (q.required) {
                const val = formData[q.id];
                if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
                    toast.error(`Please answer "${q.label}"`);
                    return;
                }
            }
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
            {config.map((q) => (
                <div key={q.id} className="space-y-2">
                    <label className="block text-sm font-medium">
                        {q.label} {q.required && <span className="text-red-500">*</span>}
                    </label>
                    {q.description && <p className="text-xs text-gray-500">{q.description}</p>}

                    {q.type === "TEXT" && (
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200/50 bg-gray-300/5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder={q.placeholder}
                            value={formData[q.id] || ""}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                        />
                    )}

                    {q.type === "TEXTAREA" && (
                        <textarea
                            className="w-full px-4 py-2 rounded-lg border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[100px]"
                            placeholder={q.placeholder}
                            value={formData[q.id] || ""}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                        />
                    )}

                    {q.type === "NUMBER" && (
                        <input
                            type="number"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder={q.placeholder}
                            value={formData[q.id] || ""}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                        />
                    )}

                    {q.type === "SELECT" && (
                        <select
                            className="w-full px-4 py-2 rounded-lg border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/5"
                            value={formData[q.id] || ""}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                        >
                            <option value="">Select an option</option>
                            {q.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    )}

                    {q.type === "RADIO" && (
                        <div className="space-y-2">
                            {q.options?.map((opt) => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={opt}
                                        checked={formData[q.id] === opt}
                                        onChange={(e) => handleChange(q.id, e.target.value)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-400">{opt}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {q.type === "CHECKBOX" && (
                        <div className="space-y-2">
                            {q.options?.map((opt) => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={opt}
                                        checked={(formData[q.id] || []).includes(opt)}
                                        onChange={(e) => handleCheckboxChange(q.id, opt, e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-400">{opt}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {q.type === "FILE" && (
                        <input
                            type="file"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200/50 bg-gray-300/5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    // Validation
                                    if (q.validation?.maxSizeMB && file.size > q.validation.maxSizeMB * 1024 * 1024) {
                                        toast.error(`File size exceeds ${q.validation.maxSizeMB}MB`);
                                        e.target.value = "";
                                        return;
                                    }
                                    if (q.validation?.allowedTypes && q.validation.allowedTypes.length > 0) {
                                        const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
                                        if (!q.validation.allowedTypes.some(t => t.toLowerCase() === ext || t.toLowerCase() === file.type)) {
                                            toast.error(`Allowed file types: ${q.validation.allowedTypes.join(", ")}`);
                                            e.target.value = "";
                                            return;
                                        }
                                    }

                                    // Upload
                                    try {
                                        setUploading(prev => ({ ...prev, [q.id]: true }));
                                        const path = `events/${eventSlug}/form/files/${q.id}/${Date.now()}_${file.name}`;
                                        const url = await uploadImage(file, path);
                                        handleChange(q.id, url);
                                        toast.success("File uploaded successfully");
                                    } catch (error) {
                                        console.error("Upload error:", error);
                                        toast.error("Failed to upload file");
                                        e.target.value = "";
                                    } finally {
                                        setUploading(prev => ({ ...prev, [q.id]: false }));
                                    }
                                } else {
                                    handleChange(q.id, null);
                                }
                            }}
                        />
                    )}
                    {q.type === "FILE" && uploading[q.id] && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
                </div>
            ))}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Submitting..." : "Submit & Proceed to Payment"}
            </button>
        </form>
    );
}
