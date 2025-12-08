'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CountdownModal({ isOpen, onClose, blocking = false }: { isOpen: boolean; onClose: () => void; blocking?: boolean }) {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        const target = new Date('2025-12-10T20:00:00');
        
        const timer = setInterval(() => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();
            
            if (diff <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
                if (blocking) onClose(); // Auto close/proceed when time is up
            } else {
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft({ hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [blocking, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('submitting');
        try {
            await addDoc(collection(db, 'notifications'), {
                email,
                timestamp: new Date()
            });
            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 z-10000 flex items-center justify-center ${blocking ? 'bg-black' : 'bg-black/80 backdrop-blur-sm'}`}
                onClick={blocking ? undefined : onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-2">Coming Soon</h2>
                    <p className="text-zinc-400 text-center mb-8">We are launching in</p>

                    <div className="flex justify-center gap-4 mb-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#B62507]">{String(timeLeft.hours).padStart(2, '0')}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Hours</div>
                        </div>
                        <div className="text-4xl font-bold text-white">:</div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#B62507]">{String(timeLeft.minutes).padStart(2, '0')}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Mins</div>
                        </div>
                        <div className="text-4xl font-bold text-white">:</div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#B62507]">{String(timeLeft.seconds).padStart(2, '0')}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Secs</div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Get notified when we launch</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#B62507] transition-all"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'submitting' || status === 'success'}
                            className="w-full py-3 bg-[#B62507] hover:bg-[#a02006] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? 'Submitting...' : status === 'success' ? 'You are on the list!' : 'Notify Me'}
                        </button>
                        {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
