"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdPerson, MdSchool, MdEmail, MdNumbers, MdBusiness, MdLocationCity, MdCalendarToday } from "react-icons/md";

import { createProfile } from "@/lib/api";

export default function Step1BasicInfo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    institution: "",
    department: "",
    campus: "",
    year: "",
    email: "",
    role_slug: "guest", // Default or derived
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createProfile({
        name: formData.name,
        email: formData.email,
        roll_number: formData.rollNumber,
        institution: formData.institution,
        department: formData.department,
        campus: formData.campus,
        year: formData.year,
        display_picture: "", // TODO: Add DP upload if needed in Step 1
        role_slug: formData.role_slug,
      });
      console.log("Step 1 Data Saved:", response);
      
      sessionStorage.setItem("onboarding_email", formData.email);
      router.push("/onboarding?step=2");
    } catch (error) {
      console.error("Failed to save profile", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdPerson /> Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdEmail /> Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdNumbers /> Roll Number</label>
          <input
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdSchool /> Institution</label>
          <input
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdBusiness /> Department</label>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdLocationCity /> Campus</label>
          <input
            name="campus"
            value={formData.campus}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdCalendarToday /> Year of Study</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors appearance-none"
            required
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">5th Year</option>
          </select>
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Save & Next
        </button>
      </div>
    </form>
  );
}
