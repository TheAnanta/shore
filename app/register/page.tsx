'use client';

import { useState, useRef } from 'react';

export default function RegistrationPage() {
    // 0 = Initial, 1 = Proxy Loaded, 2 = Paytm Loaded, 3 = Success Page
    const [loadCount, setLoadCount] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleIframeLoad = () => {
        // Increment the counter every time the iframe finishes loading a new page
        setLoadCount((prev) => {
            const newCount = prev + 1;
            console.log(`Iframe navigation detected. New Count: ${newCount}`);
            if (newCount === 5) {
                // We assume 3rd load is the return from Paytm
                handleSuccess();
            }
            return newCount;
        });
    };

    const handleSuccess = () => {
        alert("Payment Flow Completed! (Detected via navigation count)");
        console.log("iframeRef.current?.contentWindow?.document.body.innerHTML", iframeRef.current?.contentWindow?.document.body.innerHTML);
        console.log("Payment Failed:", iframeRef.current?.contentWindow?.document.body.innerHTML.includes("payment_failed.png"));
        // You can redirect the main user now
        // router.push('/dashboard');
    };

    return (
        <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl h-[80vh] bg-white shadow-lg overflow-hidden flex flex-col">
                <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                    <h1 className="font-bold">Event Registration</h1>
                    <span className="text-xs bg-blue-800 px-2 py-1 rounded">
                        Step: {loadCount === 1 ? 'Fill Form' : loadCount === 2 ? 'Payment' : loadCount === 3 ? 'Success' : loadCount === 4 ? 'Redirect' : loadCount === 5 ? 'Complete' : 'Unknown'}
                    </span>
                </div>

                {/* The Iframe */}
                <iframe
                    ref={iframeRef}
                    src="/api/proxy-event"
                    onLoad={handleIframeLoad}
                    className="w-full flex-1 border-none"
                    title="Event Registration"
                    // Sandbox is optional but can sometimes prevent unwanted top-level redirects
                    sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                />
            </div>
        </div>
    );
}