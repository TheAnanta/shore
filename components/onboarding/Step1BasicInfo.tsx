"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdPerson, MdSchool, MdEmail, MdNumbers, MdBusiness, MdLocationCity, MdCalendarToday, MdPhone } from "react-icons/md";

import { createProfileNonGitamite, getProfile } from "@/lib/api";
import { getToken, isSupported } from "firebase/messaging";
import { auth, messaging } from "@/lib/firebase";
import { toast } from "react-toastify";

export default function Step1BasicInfo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    institution: "",
    department: "",
    campus: "",
    year: "",
    phone_number: "",
    email: "",
    role_slug: "attendee", // Default or derived
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    isSupported().then((supported) => {
      if (supported) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
          }
        });
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uid = sessionStorage.getItem("onboarding_uid");
    if (!uid) {
      alert("Session expired. Please login again.");
      router.push("/login");
      return;
    }

    try {
      const response = await createProfileNonGitamite({
        firebase_uuid: uid,
        name: formData.name,
        email: formData.email,
        roll_number: formData.rollNumber,
        institution: formData.institution,
        department: formData.department,
        campus: formData.campus,
        year: formData.year,
        phone_number: formData.phone_number,
        display_picture: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png", // TODO: Add DP upload if needed in Step 1
        role_slug: "attendee",
        fcm_token: await isSupported() ? Notification.permission === 'granted' ? await getToken(messaging, { vapidKey: "BATu1uBPbu0PNys6M8PDNKpg70QwedX6XmYDCID1pcJQSWOTbld1BqCafSodMdlK3X5KFv2UdXiS55CB1S_wzNQ" }) : "" : "", // TODO: Add FCM token if needed in Step 1
      });
      console.log("Step 1 Data Saved:", response);

      router.push("/onboarding?step=2");
    } catch (error: any) {
      console.error("Failed to save profile", error);
      if (error.code === 'messaging/permission-blocked') {
        toast.error("Notification permission blocked. Please allow notifications.", {
          hideProgressBar: true
        });
        return;
      }
      toast.error(error.message || "Failed to save profile. Please try again.", {
        hideProgressBar: true
      });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      await auth.authStateReady();
      const uid = auth.currentUser?.uid;
      if (!uid) {
        toast.error("Session expired. Please login again.", {
          hideProgressBar: true
        });
        router.push("/login");
        return;
      }
      await getProfile(uid).then((profile) => {
        console.log("Profile:", profile);
        if (profile.status && profile.data) {
          setFormData({
            name: profile.data.name,
            rollNumber: profile.data.roll_number,
            institution: profile.data.institution,
            department: profile.data.department,
            campus: profile.data.campus,
            year: profile.data.year,
            phone_number: profile.data.phone_number,
            email: profile.data.email,
            role_slug: profile.data.role_slug,
          });
        }
      });
    }
    fetchProfile().catch((error) => {
      console.error("Failed to get profile", error);
      // toast.error(error.message || "Google login failed. Please try again.", {
      //   hideProgressBar: true
      // });
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdPerson /> Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-zinc-800/50 border border-zinc-700/40 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
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
            className="w-full bg-zinc-800/50 border border-zinc-700/40 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdPhone /> Phone</label>
          <input
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full bg-zinc-800/50 border border-zinc-700/40 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdNumbers /> Roll Number</label>
          <input
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className="w-full bg-zinc-800/50 border border-zinc-700/40 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdSchool /> Institution</label>
          <input
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="w-full bg-zinc-800/50 border border-zinc-700/40 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdBusiness /> Department</label>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full bg-zinc-800/50 border border-zinc-700/40 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdLocationCity /> Campus</label>
          <input
            name="campus"
            value={formData.campus}
            onChange={handleChange}
            className="w-full bg-zinc-800/50 border border-zinc-700/40 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MdCalendarToday /> Year of Study</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full bg-zinc-800/50 border border-zinc-700/40 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors appearance-none"
            required
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">5th Year</option>
            <option value="alumni">Alumni</option>
            <option value="staff">Staff</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="cursor-pointer w-full bg-red-700/90 hover:bg-red-800 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Save & Next
        </button>
      </div>
    </form>
  );
}
