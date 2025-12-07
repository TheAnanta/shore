"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdCloudUpload, MdCheckCircle, MdDelete } from "react-icons/md";

export default function Step3IDCard() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // TODO: Check size > 5MB and compress if needed
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = () => {
    if (!file) return;
    // TODO: Upload to Firebase Storage
    console.log("Step 3 File Uploaded:", file.name);
    router.push("/onboarding?step=4");
  };

  const handleSkip = () => {
    // Logic to skip if user is GITAMite? 
    // Requirement says "For non-gitamites only". 
    // Ideally this step shouldn't be shown to GITAMites, but if it is, they can skip or it auto-skips.
    // For now, let's assume this component is only rendered for Non-GITAMites or logic handles it.
    router.push("/onboarding?step=4");
  };

  return (
    <div className="space-y-6 text-center">
      <p className="text-gray-400">
        Please upload a clear image of your College ID Card (PNG, JPEG).
      </p>

      <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 hover:border-red-500 transition-colors relative">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={!!file}
        />
        
        {preview ? (
          <div className="relative">
            <img src={preview} alt="ID Preview" className="max-h-64 mx-auto rounded-lg" />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors z-10"
            >
              <MdDelete />
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-green-500">
              <MdCheckCircle /> <span>Ready to upload</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-gray-500">
            <MdCloudUpload size={48} />
            <div>
              <p className="font-bold text-white">Click or Drag to Upload</p>
              <p className="text-sm">Max size 5MB</p>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 flex gap-4">
        <button
            type="button"
            onClick={handleSkip}
             className="w-1/3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
            Skip (If GITAMite)
        </button>
        <button
          onClick={handleSubmit}
          disabled={!file}
          className="w-2/3 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}
