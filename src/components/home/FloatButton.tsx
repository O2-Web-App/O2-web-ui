"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function FloatButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallMessage(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("✅ User accepted the PWA installation");
      } else {
        console.log("❌ User dismissed the PWA installation");
      }
      setDeferredPrompt(null);
      setShowInstallMessage(false);
    } else {
      alert("Installation is not available.");
    }
  };

  if (!showInstallMessage) {
    return null; // ❗ Don't show button if no install available
  }

  return (
    <div>
      <Button
        onClick={handleInstallClick}
        className="fixed right-5 bottom-5 z-50 bg-primary p-3.5 w-18 h-18 text-white rounded-full"
      >
        <Download className="h-[30px] w-[30px] font-semibold" />
      </Button>
    </div>
  );
}
