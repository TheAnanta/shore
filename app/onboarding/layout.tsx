"use client";

import { auth } from "@/lib/firebase";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useMemo } from "react";

function AccountHeader() {
  // 1. Create the Promise ONCE using useMemo
  const userPromise = useMemo(async () => {
    await auth.authStateReady();
    return auth.currentUser;
  }, []); // Empty dependency array = runs once on mount

  // 2. Pass the cached Promise to use()
  const accountData = use(userPromise);
  return (
    <div className="flex items-center gap-4 mt-4 mr-8">
      <img src={accountData?.photoURL || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} className="size-10 rounded-full ml-auto" />
      <div className="mt-2">
        <p className="font-bold">{accountData?.displayName}</p>
        <p className="text-sm opacity-50">{accountData?.email}</p>
      </div>
    </div>
  )
}

function OnboardingContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1");
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col">
      {/* Header / Progress */}
      <div className="w-full h-2 bg-zinc-900 fixed top-0 left-0 z-50">
        <div
          className="h-full bg-red-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        <Suspense fallback={<div className="flex items-center gap-4 mt-4 mr-8">
          <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" className="size-10 rounded-full ml-auto" />
          <div className="mt-2">
            <p className="font-bold">User</p>
            <p className="text-sm opacity-50">Guest</p>
          </div>
        </div>}>
          <AccountHeader />
        </Suspense>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2">Step {step} of {totalSteps}</p>
            <h2 className="text-3xl font-bold">
              {step === 1 && "Basic Information"}
              {step === 2 && "College ID Verification"}
              {step === 3 && "Security Verification"}
              {step === 4 && "DigiLocker Verification"}
            </h2>
          </div>

          <div className="bg-[#161616]/70 border-2 border-zinc-800/60 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
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
