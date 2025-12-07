"use client";

import { useRouter } from "next/navigation";
import { MdVerifiedUser } from "react-icons/md";

export default function Step4DigiLocker() {
  const router = useRouter();

  const handleDigiLockerConnect = () => {
    // TODO: Integrate DigiLocker API
    // This would typically redirect to DigiLocker auth page
    console.log("Connecting to DigiLocker...");
    
    // Simulate success after delay
    setTimeout(() => {
        console.log("DigiLocker Connected");
        router.push("/dashboard");
    }, 1500);
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
