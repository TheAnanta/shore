"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUserGraduate, FaUser } from "react-icons/fa";
import { mockAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"gitamite" | "non-gitamite" | null>(null);
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGitamLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await mockAuth.loginGitamite(rollNumber, password);
      // In a real app, store token/user in context/cookie
      console.log("Logged in:", user);
      if (user.isOnboarded) {
        router.push("/dashboard");
      } else {
        // For GITAMites, skip step 1 (basic info) as it's fetched from DB? 
        // Requirement says: "ask him to sign up... which goes to the onboarding page but directly to step 2"
        router.push("/onboarding?step=2");
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await mockAuth.loginGoogle();
      console.log("Logged in:", user);
      if (user.isOnboarded) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding?step=1");
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-red-900/20 to-black z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl border border-zinc-800 shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Shore '26</h1>
          <p className="text-gray-400">Please select your login type</p>
        </div>

        {!userType ? (
          <div className="space-y-4">
            <button
              onClick={() => setUserType("gitamite")}
              className="w-full flex items-center justify-between p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all border border-zinc-700 hover:border-red-500 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-full text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <FaUserGraduate size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">GITAMite</h3>
                  <p className="text-sm text-gray-400">Student or Faculty</p>
                </div>
              </div>
              <span className="text-zinc-500 group-hover:text-white">→</span>
            </button>

            <button
              onClick={() => setUserType("non-gitamite")}
              className="w-full flex items-center justify-between p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all border border-zinc-700 hover:border-blue-500 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-full text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FaUser size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Non-GITAMite</h3>
                  <p className="text-sm text-gray-400">Guest or Visitor</p>
                </div>
              </div>
              <span className="text-zinc-500 group-hover:text-white">→</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button 
              onClick={() => setUserType(null)}
              className="text-sm text-gray-500 hover:text-white mb-6 flex items-center gap-2"
            >
              ← Back
            </button>

            {userType === "gitamite" ? (
              <form onSubmit={handleGitamLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Enter your roll number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Password (G-Learn)</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">Already have a profile?</p>
                    <button type="button" onClick={handleGoogleLogin} className="text-red-400 text-sm hover:underline">Sign in with Google</button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-gray-400 mb-6">
                  Register or sign in with your Google account to continue.
                </p>
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-3"
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
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
