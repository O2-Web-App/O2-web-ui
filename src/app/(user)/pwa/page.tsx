"use client";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallMessage, setShowInstallMessage] = useState(false);
  const [isPwa, setIsPwa] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    console.log("Mounted Home component");

    // Detect if already running in standalone (PWA) mode
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsPwa(true);
    }

    // Detect iOS (for manual instructions)
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setIsIOS(true);
    }

    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      console.log("beforeinstallprompt event captured");
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallMessage(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return alert("Install not available");
    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log("Install result:", result.outcome);
    setDeferredPrompt(null);
    setShowInstallMessage(false);
  };

  return (
    <div className="w-full mx-auto text-center items-center h-screen flex flex-col justify-center p-4">
      <p className="text-2xl mb-5">Install our app</p>

      {isPwa && <p className="text-green-500">App already installed</p>}

      {!isPwa && showInstallMessage && (
        <div>
          <p className="mb-4">Install our app for a better experience!</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleInstallClick}>
            Install App
          </button>
        </div>
      )}

      {!isPwa && isIOS && (
        <div className="mt-10 bg-yellow-100 p-4 rounded-lg max-w-md text-sm text-left">
          <p className="font-bold mb-2">How to install on iOS:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Open this site in Safari.</li>
            <li>Tap the <strong>Share</strong> icon at the bottom of the screen.</li>
            <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
            <li>Tap <strong>"Add"</strong> in the top right corner.</li>
          </ol>
        </div>
      )}
    </div>
  );
}
