"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MdCameraAlt, MdCheck, MdRefresh } from "react-icons/md";

import { uploadImage } from "@/lib/firebase";
import { updateProfile } from "@/lib/api";

export default function Step2SecurityPicture() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err) {
      setError("Unable to access camera. Please allow camera permissions.");
      console.error(err);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const dataUrl = canvasRef.current.toDataURL("image/jpeg");
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const retake = () => {
    setImage(null);
    startCamera();
  };

  const handleSubmit = async () => {
    if (!image) return;
    setUploading(true);
    try {
      // Convert base64 to blob
      const res = await fetch(image);
      const blob = await res.blob();
      const file = new File([blob], "security_picture.jpg", { type: "image/jpeg" });

      // Upload to Firebase
      const email = sessionStorage.getItem("onboarding_email");
      if (!email) throw new Error("No email found in session");

      const url = await uploadImage(file, `security/${email}_${Date.now()}.jpg`);
      console.log("Uploaded Security Pic:", url);

      // Update Profile
      await updateProfile(email, { security_picture: url });
      
      router.push("/onboarding?step=3");
    } catch (error) {
      console.error("Failed to upload/update", error);
      alert("Failed to save. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 text-center">
      <p className="text-gray-400">
        Please take a well-lit, centered photo of yourself for security verification.
      </p>

      <div className="relative w-full max-w-md mx-auto aspect-video bg-black rounded-lg overflow-hidden border-2 border-zinc-700 flex items-center justify-center">
        {error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : image ? (
          <img src={image} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <>
            {!stream && (
              <button 
                onClick={startCamera}
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-white"
              >
                <MdCameraAlt size={48} />
                <span>Click to Start Camera</span>
              </button>
            )}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className={`w-full h-full object-cover ${!stream ? 'hidden' : ''}`} 
            />
          </>
        )}
        <canvas ref={canvasRef} width="640" height="480" className="hidden" />
      </div>

      <div className="flex justify-center gap-4">
        {stream && (
          <button
            onClick={captureImage}
            className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <MdCameraAlt /> Capture
          </button>
        )}
        {image && (
          <button
            onClick={retake}
            className="px-6 py-2 bg-zinc-700 text-white font-bold rounded-full hover:bg-zinc-600 transition-colors flex items-center gap-2"
          >
            <MdRefresh /> Retake
          </button>
        )}
      </div>

      <div className="pt-4">
        <button
          onClick={handleSubmit}
          disabled={!image}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}
