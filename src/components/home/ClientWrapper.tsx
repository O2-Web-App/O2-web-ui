'use client';

import { useEffect, useState } from "react";
import NoInternetPage from "@/app/no-internet/page";
import StoreProvider from "@/app/StoreProvider";
import FloatButton from "@/components/home/FloatButton";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [isOnline, setIsOnline] = useState(true);
    const [isPwa, setIsPwa] = useState(false);
    const [hasMounted, setHasMounted] = useState(false); // NEW

    useEffect(() => {
        setHasMounted(true); // Mark component as mounted
        setIsOnline(navigator.onLine);

        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsPwa(true);
        }

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (!hasMounted) return null; // Prevent mismatched render

    return (
        <StoreProvider>
            {isOnline ? (
                <>
                    {children}
                    {!isPwa && (
                        <div className="fixed bottom-5 right-5 z-50">
                            <FloatButton />
                        </div>
                    )}
                </>
            ) : (
                <NoInternetPage />
            )}
        </StoreProvider>
    );
}
