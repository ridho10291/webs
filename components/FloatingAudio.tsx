"use client";
import { useCallback, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getAmbient } from "@/lib/ambient";

const PREF_KEY = "ridho:audio";

export function FloatingAudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const engine = getAmbient();
    const unsubscribe = engine.subscribe(setIsPlaying);

    let pref: string | null = null;
    try {
      pref = localStorage.getItem(PREF_KEY);
    } catch {
      pref = null;
    }

    // Browsers only allow audio after a user gesture, so start the ambient
    // track on the visitor's first interaction — unless they muted it before.
    const onFirstGesture = () => {
      removeListeners();
      if (pref !== "off") void engine.start();
    };
    const removeListeners = () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
    };

    if (pref !== "off") {
      window.addEventListener("pointerdown", onFirstGesture);
      window.addEventListener("keydown", onFirstGesture);
      window.addEventListener("touchstart", onFirstGesture);
    }

    return () => {
      unsubscribe();
      removeListeners();
    };
  }, []);

  const toggleSound = useCallback(() => {
    const engine = getAmbient();
    if (engine.isPlaying()) {
      engine.stop();
      try {
        localStorage.setItem(PREF_KEY, "off");
      } catch {
        // storage blocked — ignore
      }
    } else {
      void engine.start();
      try {
        localStorage.setItem(PREF_KEY, "on");
      } catch {
        // storage blocked — ignore
      }
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={isPlaying}
      title={isPlaying ? "Mute ambient music" : "Play ambient music"}
      className="group relative flex items-center gap-2 rounded border border-[#1d2a24] bg-[#05060a]/70 px-3 py-1.5 text-xs text-[#5f6f66] backdrop-blur-md transition-all duration-300 hover:border-[#8fff4a]/50 hover:text-[#8fff4a]"
    >
      {isPlaying ? (
        <>
          <div className="flex h-3 items-end gap-0.5" aria-hidden="true">
            <span className="h-full w-0.5 animate-[pulse_0.8s_ease-in-out_infinite] rounded-none bg-[#8fff4a]" />
            <span className="h-2/3 w-0.5 animate-[pulse_0.6s_ease-in-out_infinite] rounded-none bg-[#56e8ff]" />
            <span className="h-4/5 w-0.5 animate-[pulse_0.9s_ease-in-out_infinite] rounded-none bg-[#8fff4a]" />
            <span className="h-1/2 w-0.5 animate-[pulse_0.5s_ease-in-out_infinite] rounded-none bg-[#56e8ff]" />
          </div>
          <Volume2 className="h-3.5 w-3.5 text-[#8fff4a]" />
          <span className="hidden font-mono text-[10px] sm:inline">AUDIO:ON</span>
        </>
      ) : (
        <>
          <VolumeX className="h-3.5 w-3.5" />
          <span className="hidden font-mono text-[10px] sm:inline">AUDIO:OFF</span>
        </>
      )}
    </button>
  );
}