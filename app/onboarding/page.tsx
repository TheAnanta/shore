"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Step1BasicInfo from "@/components/onboarding/Step1BasicInfo";
import Step2SecurityPicture from "@/components/onboarding/Step2SecurityPicture";
import Step3IDCard from "@/components/onboarding/Step3IDCard";
import Step4DigiLocker from "@/components/onboarding/Step4DigiLocker";

function OnboardingSteps() {
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1");

  switch (step) {
    case 1:
      return <Step1BasicInfo />;
    case 2:
      return <Step2SecurityPicture />;
    case 3:
      return <Step3IDCard />;
    case 4:
      return <Step4DigiLocker />;
    default:
      return <Step1BasicInfo />;
  }
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading step...</div>}>
      <OnboardingSteps />
    </Suspense>
  );
}
