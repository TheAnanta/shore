"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OnboardingContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1");
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header / Progress */}
      <div className="w-full h-2 bg-zinc-900 fixed top-0 left-0 z-50">
        <div 
          className="h-full bg-red-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2">Step {step} of {totalSteps}</p>
            <h2 className="text-3xl font-bold">
              {step === 1 && "Basic Information"}
              {step === 2 && "Security Verification"}
              {step === 3 && "College ID Verification"}
              {step === 4 && "DigiLocker Verification"}
            </h2>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <OnboardingContent>{children}</OnboardingContent>
    </Suspense>
  );
}
