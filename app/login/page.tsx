"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUserGraduate, FaUser } from "react-icons/fa";
import { getProfile } from "@/lib/api";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in:", user);

      sessionStorage.setItem("onboarding_uid", user.uid);
      sessionStorage.setItem("onboarding_email", user.email || "");

      try {
        console.log("Checking profile for uid:", user.uid);
        const profile = await getProfile(user.uid);
        if (profile.status && profile.data) {
          // User exists
          if (profile.data.is_verified) {
            router.push("/dashboard");
          } else {
            // Check which step they are at? For now just go to dashboard or step 1 if incomplete?
            // If they exist but not verified, maybe they need to complete onboarding.
            // But for non-gitamite, step 1 creates the profile.
            // If profile exists, maybe they are done with step 1.
            router.push("/onboarding?step=2");
          }
        }
      } catch (error) {
        // Profile doesn't exist, go to step 1
        router.push("/onboarding?step=1");
      }
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error(error.message || "Google login failed. Please try again.", {
        hideProgressBar: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-red-900/20 to-black z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-[#161616] backdrop-blur-md p-3 rounded-4xl border-2 border-zinc-800/60 shadow-2xl z-10"
      >
        <img className="w-full h-56 mb-8 rounded-3xl object-cover" src="/images/past-shore-photos/shore_25_27.jpg" />
        <div className="text-center mb-2 px-6 pb-8 pt-0">
          <h1 className="text-3xl mb-2">Welcome to SHORe '26</h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-4 text-center">
              <p className="text-white/30 mb-6">
                Register or sign in with your <br />Google account to continue.
              </p>
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-max px-8 mx-auto bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-2xl transition-colors flex items-center justify-center gap-3"
              >
                {/* Google Icon SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
