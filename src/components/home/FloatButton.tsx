"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
}

export default function FloatButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // ✅ just trigger prompt, no await
      setDeferredPrompt(null); // ✅ clear after calling
    }
  };

  if (!deferredPrompt) return null;

  return (
    <div>
      <Button
        onClick={handleInstallClick}
        className="fixed right-5 bottom-5 z-50 bg-primary p-3.5 w-18 h-18 text-white rounded-full"
      >
        <Download className="h-[30px] w-[30px]" />
      </Button>
    </div>
  );
}
