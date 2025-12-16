"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaFilter, FaSearch } from "react-icons/fa";
import { IoMdFootball, IoMdMusicalNote, IoMdFitness, IoMdBrush } from "react-icons/io";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// --- Types ---

type EventCategory = "Sports" | "Wellness" | "Cultural" | "Workshops" | "Pro Night" | "Technical" | "Management";

interface Event {
    id: string;
    title: string;
    description?: string;
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    day: string; // "Day 1", "Day 2", "Day 3"
    date: string; // "Feb 14", "Feb 15", "Feb 16"
    venue: string;
    category: EventCategory;
    image?: string;
}

// --- Mock Data ---

const EVENTS: Event[] = [
    // Day 1
    {
        id: "1",
        title: "Opening Ceremony",
        startTime: "09:00",
        endTime: "10:30",
        day: "Day 1",
        date: "Feb 14",
        venue: "Main Stadium",
        category: "Cultural",
    },
    {
        id: "2",
        title: "Inter-College Football",
        startTime: "11:00",
        endTime: "13:00",
        day: "Day 1",
        date: "Feb 14",
        venue: "Sports Ground A",
        category: "Sports",
    },
    {
        id: "3",
        title: "Yoga for Beginners",
        startTime: "07:00",
        endTime: "08:30",
        day: "Day 1",
        date: "Feb 14",
        venue: "Wellness Center",
        category: "Wellness",
    },
    {
        id: "4",
        title: "Art Workshop",
        startTime: "14:00",
        endTime: "16:00",
        day: "Day 1",
        date: "Feb 14",
        venue: "Art Gallery",
        category: "Workshops",
    },
    {
        id: "5",
        title: "DJ Night",
        startTime: "19:00",
        endTime: "22:00",
        day: "Day 1",
        date: "Feb 14",
        venue: "Main Stage",
        category: "Pro Night",
    },

    // Day 2
    {
        id: "6",
        title: "Marathon",
        startTime: "06:00",
        endTime: "09:00",
        day: "Day 2",
        date: "Feb 15",
        venue: "Campus Loop",
        category: "Sports",
    },
    {
        id: "7",
        title: "Meditation Session",
        startTime: "08:00",
        endTime: "09:00",
        day: "Day 2",
        date: "Feb 15",
        venue: "Wellness Center",
        category: "Wellness",
    },
    {
        id: "8",
        title: "Battle of Bands",
        startTime: "15:00",
        endTime: "18:00",
        day: "Day 2",
        date: "Feb 15",
        venue: "Amphitheater",
        category: "Cultural",
    },
    {
        id: "9",
        title: "Photography Workshop",
        startTime: "11:00",
        endTime: "13:00",
        day: "Day 2",
        date: "Feb 15",
        venue: "Media Hall",
        category: "Workshops",
    },

    // Day 3
    {
        id: "10",
        title: "Finals: Basketball",
        startTime: "10:00",
        endTime: "12:00",
        day: "Day 3",
        date: "Feb 16",
        venue: "Indoor Court",
        category: "Sports",
    },
    {
        id: "11",
        title: "Closing Ceremony",
        startTime: "18:00",
        endTime: "20:00",
        day: "Day 3",
        date: "Feb 16",
        venue: "Main Stadium",
        category: "Cultural",
    },
    {
        id: "12",
        title: "Star Night Concert",
        startTime: "20:30",
        endTime: "23:00",
        day: "Day 3",
        date: "Feb 16",
        venue: "Main Stage",
        category: "Pro Night",
    },
];

const DAYS = ["Day 1", "Day 2", "Day 3"];
const CATEGORIES: EventCategory[] = ["Sports", "Wellness", "Cultural", "Workshops", "Pro Night"];
const VENUES = Array.from(new Set(EVENTS.map((e) => e.venue)));

// --- Components ---

const CategoryIcon = ({ category }: { category: EventCategory }) => {
    switch (category) {
        case "Sports":
            return <IoMdFootball />;
        case "Wellness":
            return <IoMdFitness />;
        case "Cultural":
            return <IoMdMusicalNote />;
        case "Workshops":
            return <IoMdBrush />;
        case "Pro Night":
            return <IoMdMusicalNote />;
        default:
            return <IoMdMusicalNote />;
    }
};


export default function SchedulePage() {
    const [selectedDay, setSelectedDay] = useState<string>("Day 1");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchQuery = searchParams.get("q");
        if (searchQuery) {
            setSelectedCategory(searchQuery);
        }
    }, [searchParams]);

    const filteredEvents = useMemo(() => {
        return EVENTS.filter((event) => {
            const matchesDay = event.day === selectedDay;
            const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
            const matchesVenue = selectedVenue ? event.venue === selectedVenue : true;
            const matchesSearch =
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.venue.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesDay && matchesCategory && matchesVenue && matchesSearch;
        }).sort((a, b) => a.startTime.localeCompare(b.startTime));
    }, [selectedDay, selectedCategory, selectedVenue, searchQuery]);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500/30">
            {/* Header Section */}
            <div className="relative overflow-hidden bg-zinc-900/50 border-b border-white/10 pt-24 pb-12 px-6 sm:px-12">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Schedule
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl">
                        Explore the lineup of events, competitions, and performances happening at Shore.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">

                {/* Day Tabs */}
                <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-4">
                    {DAYS.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={cn(
                                "relative px-6 py-3 text-lg font-medium transition-all duration-300 rounded-full",
                                selectedDay === day
                                    ? "text-black bg-white"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {day}
                            {selectedDay === day && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between">
                    <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
                        {/* Category Filter */}
                        <div className="relative group">
                            <select
                                value={selectedCategory || ""}
                                onChange={(e) => setSelectedCategory(e.target.value || null)}
                                className="appearance-none bg-zinc-900 border border-white/10 text-white px-4 py-2.5 pr-10 rounded-lg focus:outline-none focus:border-orange-500 transition-colors cursor-pointer min-w-[160px]"
                            >
                                <option value="">All Categories</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-xs" />
                        </div>

                        {/* Venue Filter */}
                        <div className="relative group">
                            <select
                                value={selectedVenue || ""}
                                onChange={(e) => setSelectedVenue(e.target.value || null)}
                                className="appearance-none bg-zinc-900 border border-white/10 text-white px-4 py-2.5 pr-10 rounded-lg focus:outline-none focus:border-orange-500 transition-colors cursor-pointer min-w-[160px]"
                            >
                                <option value="">All Venues</option>
                                {VENUES.map((venue) => (
                                    <option key={venue} value={venue}>
                                        {venue}
                                    </option>
                                ))}
                            </select>
                            <FaMapMarkerAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-xs" />
                        </div>

                        {(selectedCategory || selectedVenue) && (
                            <button
                                onClick={() => { setSelectedCategory(null); setSelectedVenue(null) }}
                                className="text-sm text-red-400 hover:text-red-300 underline underline-offset-4"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>

                    {/* Search */}
                    <div className="relative w-full lg:w-80">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600"
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <Link key={event.id} href="/login">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="group relative bg-zinc-900/40 border border-white/5 hover:border-orange-500/30 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-900/60"
                                    >
                                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                            {/* Time Column */}
                                            <div className="flex-shrink-0 flex flex-col items-center justify-center min-w-[100px] text-center">
                                                <span className="text-2xl font-bold text-white tracking-tight">
                                                    {event.startTime}
                                                </span>
                                                <span className="text-sm text-zinc-500 mt-1">
                                                    - {event.endTime}
                                                </span>
                                            </div>
                                            {/* Divider (Desktop) */}
                                            <div className="hidden md:block w-px h-16 bg-white/10" />
                                            {/* Content */}
                                            <div className="flex-grow space-y-2">
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    <span className={cn(
                                                        "px-3 flex gap-2 items-center py-1 rounded-full text-xs font-medium border",
                                                        event.category === "Sports" && "bg-blue-500/10 border-blue-500/20 text-blue-400",
                                                        event.category === "Wellness" && "bg-green-500/10 border-green-500/20 text-green-400",
                                                        event.category === "Cultural" && "bg-purple-500/10 border-purple-500/20 text-purple-400",
                                                        event.category === "Workshops" && "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
                                                        event.category === "Pro Night" && "bg-red-500/10 border-red-500/20 text-red-400",
                                                    )}>
                                                        {<CategoryIcon category={event.category} />}
                                                        {event.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                                                    {event.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                                    <FaMapMarkerAlt className="text-zinc-600" />
                                                    {event.venue}
                                                </div>
                                            </div>
                                            {/* Action / Status (Optional) */}
                                            <div className="flex-shrink-0 mt-4 md:mt-0">
                                                {/* Placeholder for future actions like "Add to Calendar" or "Register" */}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-24 text-zinc-500"
                            >
                                <p className="text-lg">No events found matching your filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setSelectedVenue(null);
                                        setSearchQuery("");
                                    }}
                                    className="mt-4 text-orange-500 hover:text-orange-400 underline underline-offset-4"
                                >
                                    Clear all filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
