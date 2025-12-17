// app/register/page.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function RegistrationPage() {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // Listen for the message sent from the injected script in step 1
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'PAYMENT_COMPLETE') {
                console.log("Payment detected at:", event.data.url);
                // Handle your logic here (e.g., router.push('/success'))
                alert("Payment URL detected! Logic goes here.");
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className="w-full h-screen bg-gray-100 flex flex-col">
            <h1 className="p-4 font-bold text-xl bg-white shadow">
                Event Registration (Proxied)
            </h1>

            {/* This iframe acts as your InAppWebView */}
            <iframe
                ref={iframeRef}
                src="/api/proxy-event"
                className="w-full h-full border-none"
                title="Event Registration"
            />
        </div>
    );
}