"use client";

import { useEffect, useRef } from "react";

export function ResearchVideo({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Muted inline playback is the browser-compatible path for autoplay.
    // Re-assert the properties and call play() as a fallback after hydration.
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;

    const play = () => {
      void video.play().catch(() => {
        // A browser/user policy may still override autoplay. The HTML autoplay
        // attributes remain in place, and playback is retried when media is ready.
      });
    };
    const replay = () => {
      video.currentTime = 0;
      play();
    };

    play();
    video.addEventListener("canplay", play);
    video.addEventListener("ended", replay);
    return () => {
      video.removeEventListener("canplay", play);
      video.removeEventListener("ended", replay);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className="research-media-element"
      src={src}
      aria-label={alt}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls
    />
  );
}
