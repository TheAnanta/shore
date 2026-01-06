"use client";

import { useState, useEffect, useMemo } from "react";
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
    userProfile?: any;
    minTeamSize?: number;
    maxTeamSize?: number;
    events?: any[]; // For combo logic
}

export default function FormRenderer({
    config = [],
    onSubmit,
    isSubmitting,
    eventSlug,
    userProfile,
    minTeamSize = 1,
    maxTeamSize = 1,
    events = []
}: FormRendererProps) {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [uploading, setUploading] = useState<Record<string, boolean>>({});
    const [currentStep, setCurrentStep] = useState(0);
    const [teamSize, setTeamSize] = useState<number>(minTeamSize);
    const [participation, setParticipation] = useState<Record<string, string[]>>({}); // eventId -> [member_ids/names]

    const rawQuestions = Array.isArray(config) ? config : [];

    // Ensure teamSize is valid
    useEffect(() => {
        if (teamSize < minTeamSize) setTeamSize(minTeamSize);
        if (teamSize > maxTeamSize && maxTeamSize > 0) setTeamSize(maxTeamSize);
    }, [minTeamSize, maxTeamSize]);

    // Separate General vs Template Questions
    const { generalQuestions, templateQuestions } = useMemo(() => {
        const general: Question[] = [];
        const template: Question[] = [];

        rawQuestions.forEach(q => {
            if (q.id.includes("_team.")) {
                template.push(q);
            } else {
                general.push(q);
            }
        });

        return { generalQuestions: general, templateQuestions: template };
    }, [rawQuestions]);

    // Group Questions into Sections
    const sections = useMemo(() => {
        const result = [];

        // 1. Team Details (General Questions)
        if (generalQuestions.length > 0) {
            result.push({ title: "Team Details", questions: generalQuestions, type: "general" });
        }

        // 2. Member Sections (Dynamic)
        if (templateQuestions.length > 0) {
            for (let i = 1; i <= teamSize; i++) {
                const memberQuestions = templateQuestions.map(q => ({
                    ...q,
                    id: `member_${i}_${q.id}`, // Unique ID for this member's answer
                    label: q.label.replace("Team Member", `Member ${i}`).replace("(Team Leader)", i === 1 ? "(Team Leader)" : "")
                }));
                result.push({ title: `Member ${i}`, questions: memberQuestions, type: "member", index: i });
            }
        } else {
            // Fallback for old config style
            const memberSections: Record<number, Question[]> = {};
            const remainingGeneral: Question[] = [];

            generalQuestions.forEach(q => {
                const memberMatch = q.label.match(/Team Member (\d+)/i);
                if (memberMatch) {
                    const index = parseInt(memberMatch[1]);
                    if (index <= teamSize) {
                        if (!memberSections[index]) memberSections[index] = [];
                        memberSections[index].push(q);
                    }
                } else {
                    remainingGeneral.push(q);
                }
            });

            if (Object.keys(memberSections).length > 0) {
                result.length = 0; // Clear initial push
                if (remainingGeneral.length > 0) {
                    result.push({ title: "Team Details", questions: remainingGeneral, type: "general" });
                }
                for (let i = 1; i <= teamSize; i++) {
                    if (memberSections[i]) {
                        result.push({ title: `Member ${i}`, questions: memberSections[i], type: "member", index: i });
                    }
                }
            }
        }

        // 3. Participation Section
        const needsParticipation = events.some(e => e.max_team_size < teamSize);
        if (needsParticipation && events.length > 0) {
            result.push({ title: "Event Participation", questions: [], type: "participation" });
        }

        return result;
    }, [generalQuestions, templateQuestions, teamSize, events]);

    // Prefill Logic
    useEffect(() => {
        console.log("UserProfile for prefill:", userProfile);

        if (userProfile) {
            setFormData((prev) => {
                const newData = { ...prev };
                let changed = false;

                const setIfEmpty = (key: string, val: any) => {
                    if (!newData[key] && val) {
                        newData[key] = val;
                        changed = true;
                    }
                };

                const profileMap: Record<string, any> = {
                    "name": userProfile.name,
                    "email": userProfile.email,
                    "phone": userProfile.phone_number,
                    "college": userProfile.institution,
                    "roll_number": userProfile.roll_number,
                    "year": userProfile.year
                };

                const yearMap: Record<string, string> = { "I Yr": "1st Year", "II Yr": "2nd Year", "III Yr": "3rd Year", "IV Yr": "4th Year", "V Year": "5th Year" };
                if (profileMap["year"] && yearMap[profileMap["year"]]) {
                    profileMap["year"] = yearMap[profileMap["year"]];
                }

                // 1. Prefill Member 1 (Leader) for Template Questions
                templateQuestions.forEach(q => {
                    let matchedKey = null;
                    // Robust matching for keys in ID
                    if (q.id.includes("name")) matchedKey = "name";
                    else if (q.id.includes("email")) matchedKey = "email";
                    else if (q.id.includes("phone")) matchedKey = "phone";
                    else if (q.id.includes("college") || q.id.includes("institution")) matchedKey = "college";
                    else if (q.id.includes("roll_number") || q.id.includes("registration")) matchedKey = "roll_number";
                    else if (q.id.includes("year")) matchedKey = "year";

                    if (matchedKey && profileMap[matchedKey]) {
                        setIfEmpty(`member_1_${q.id}`, profileMap[matchedKey]);
                    }
                });

                // 2. Prefill Explicit _self Questions (General)
                generalQuestions.forEach((q) => {
                    if (q.id === "_self.name") setIfEmpty(q.id, userProfile.name);
                    if (q.id === "_self.email") setIfEmpty(q.id, userProfile.email);
                    if (q.id === "_self.phone") setIfEmpty(q.id, userProfile.phone_number);
                    if (q.id === "_self.college") setIfEmpty(q.id, userProfile.institution);
                    if (q.id === "_self.roll_number") setIfEmpty(q.id, userProfile.roll_number);
                    if (q.id === "_self.year") {
                        const y = yearMap[userProfile.year] || userProfile.year;
                        setIfEmpty(q.id, y);
                    }
                });

                return changed ? newData : prev;
            });
        }
    }, [userProfile, templateQuestions, generalQuestions]);

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

    const validateSection = (sectionIndex: number) => {
        const section = sections[sectionIndex];
        if (section.type === "participation") {
            for (const event of events) {
                if (event.max_team_size < teamSize) {
                    const selected = participation[event.id] || [];
                    if (selected.length === 0) {
                        toast.error(`Please select participants for ${event.name}`);
                        return false;
                    }
                    if (selected.length > event.max_team_size) {
                        toast.error(`Too many participants for ${event.name} (Max ${event.max_team_size})`);
                        return false;
                    }
                }
            }
            return true;
        }

        for (const q of section.questions) {
            if (q.required) {
                const val = formData[q.id];
                if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
                    toast.error(`Please answer "${q.label}"`);
                    return false;
                }
                if (q.validation?.regex) {
                    try {
                        const pattern = q.validation.regex.replace(/^\/|\/$/g, "");
                        const regex = new RegExp(pattern);
                        if (!regex.test(val)) {
                            toast.error(q.validation.errorMessage || `Invalid format for "${q.label}"`);
                            return false;
                        }
                    } catch (e) {
                        console.error("Regex error", e);
                    }
                }
            }
        }
        return true;
    };

    const handleNext = () => {
        if (validateSection(currentStep)) {
            if (currentStep < sections.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                handleSubmit();
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        const finalData = { ...formData, ...participation };
        onSubmit(finalData);
    };

    if (rawQuestions.length === 0) {
        return <div className="text-center p-6 text-gray-500">No questions to display.</div>;
    }

    const currentSection = sections[currentStep];

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            {sections.length > 1 && (
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {sections.map((s, idx) => (
                            <div key={idx} className={`text-xs font-medium ${idx <= currentStep ? "text-blue-500" : "text-gray-500"}`}>
                                {s.title}
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {/* Team Size Selector */}
                {currentStep === 0 && minTeamSize !== maxTeamSize && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Team Size <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full px-4 py-2 rounded-lg border border-gray-200/50 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            value={teamSize}
                            onChange={(e) => setTeamSize(parseInt(e.target.value))}
                        >
                            {Array.from({ length: maxTeamSize - minTeamSize + 1 }, (_, i) => minTeamSize + i).map(size => (
                                <option key={size} value={size}>{size} Members</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Questions */}
                {currentSection.type !== "participation" && currentSection.questions.map((q) => (
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
                                className="w-full px-4 py-2 rounded-lg border border-gray-200/50 bg-gray-300/5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[100px]"
                                placeholder={q.placeholder}
                                value={formData[q.id] || ""}
                                onChange={(e) => handleChange(q.id, e.target.value)}
                            />
                        )}
                        {q.type === "NUMBER" && (
                            <input
                                type="number"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200/50 bg-gray-300/5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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

                {/* Participation Section */}
                {currentSection.type === "participation" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold">Select Participants</h3>
                        <p className="text-sm text-gray-400">
                            Some events in this combo have a maximum team size smaller than your team ({teamSize}).
                            Please select which members will participate in each event.
                        </p>

                        {events.filter(e => e.max_team_size < teamSize).map(event => (
                            <div key={event.id} className="p-4 border border-white/10 rounded-xl bg-white/5">
                                <h4 className="font-bold mb-2">{event.name}</h4>
                                <p className="text-xs text-gray-400 mb-4">Select up to {event.max_team_size} members</p>
                                <div className="space-y-2">
                                    {Array.from({ length: teamSize }, (_, i) => i + 1).map(i => {
                                        const memberSection = sections.find(s => s.index === i);
                                        const nameQ = memberSection?.questions.find(q => q.label.toLowerCase().includes("name") || q.id.includes("name"));
                                        const memberName = nameQ ? formData[nameQ.id] : `Member ${i}`;

                                        const isSelected = (participation[event.id] || []).includes(memberName);

                                        return (
                                            <label key={i} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={(e) => {
                                                        setParticipation(prev => {
                                                            const current = prev[event.id] || [];
                                                            if (e.target.checked) {
                                                                if (current.length >= event.max_team_size) {
                                                                    toast.warning(`Max ${event.max_team_size} members allowed`);
                                                                    return prev;
                                                                }
                                                                return { ...prev, [event.id]: [...current, memberName] };
                                                            } else {
                                                                return { ...prev, [event.id]: current.filter(n => n !== memberName) };
                                                            }
                                                        });
                                                    }}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span>{memberName}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    {currentStep > 0 && (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                        >
                            Back
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Submitting..." : (currentStep === sections.length - 1 ? "Submit & Proceed" : "Next")}
                    </button>
                </div>
            </form>
        </div>
    );
}
