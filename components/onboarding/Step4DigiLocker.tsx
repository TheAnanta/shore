"use client";

import { useRouter } from "next/navigation";
import { MdVerifiedUser } from "react-icons/md";

import { updateDigiLocker } from "@/lib/api";

export default function Step4DigiLocker() {
  const router = useRouter();

  const handleDigiLockerConnect = async () => {
    try {
      console.log("Connecting to DigiLocker...");
      // Simulate DigiLocker API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const uid = sessionStorage.getItem("onboarding_uid");
      if (!uid) throw new Error("No uid found in session");

      // Mock Data from DigiLocker
      const digilockerData = {
        name: "Verified Name",
        dob: "2000-01-01",
        gender: "M",
        aadhar_last_4: "1234"
      };

      await updateDigiLocker(uid, {
        digilocker_verified: true,
        digilocker_data: digilockerData,
      });

      console.log("DigiLocker Connected & Profile Updated");
      router.push("/dashboard");
    } catch (error) {
      console.error("DigiLocker verification failed", error);
      alert("Verification failed. Please try again.");
    }
  };

  return (
    <div className="space-y-8 text-center">
      <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
        <h3 className="text-xl font-bold text-blue-400 mb-2 flex items-center justify-center gap-2">
            <MdVerifiedUser /> Mandatory Verification
        </h3>
        <p className="text-gray-300 text-sm">
          We need to verify your identity using DigiLocker. This ensures a secure environment for everyone at Shore '26.
        </p>
      </div>

      <div className="flex justify-center">
        {/* Placeholder for DigiLocker Logo/Branding */}
        <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">DigiLocker</span>
        </div>
      </div>

      <p className="text-gray-400 text-sm">
        You will be redirected to DigiLocker to authorize sharing your Aadhar card details (Name, Photo).
      </p>

      <div className="pt-4">
        <button
          onClick={handleDigiLockerConnect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Connect DigiLocker & Finish
        </button>
      </div>
    </div>
  );
}
