"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SPLASH_MS = 1300;

/**
 * Branded intro shown on the first page load of a browser session.
 * The overlay is server-rendered so there is no flash of content before it appears;
 * the inline script in the root layout hides it for repeat loads in the same session.
 */
export function Splash({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"showing" | "leaving" | "done">("showing");

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-splash-seen")) {
      setPhase("done");
      return;
    }
    const leave = window.setTimeout(() => setPhase("leaving"), SPLASH_MS);
    const done = window.setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("airban-splash", "1");
      } catch {}
    }, SPLASH_MS + 450);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, []);

  return (
    <>
      {phase !== "done" && (
        <div
          aria-hidden="true"
          className={`splash-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-airbanBlue transition-opacity duration-450 ease-out ${
            phase === "leaving" ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src="/assets/airbanWhiteLogo.png"
            alt=""
            width={180}
            height={180}
            priority
            unoptimized
            className="animate-splash-logo"
          />
          <div className="mt-6 h-0.5 w-28 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-full origin-left animate-splash-bar rounded-full bg-white" />
          </div>
        </div>
      )}
      <div
        className={`splash-content flex min-h-screen flex-col transition-opacity duration-500 ${
          phase === "showing" ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
