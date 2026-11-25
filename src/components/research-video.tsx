"use client";

import { useEffect, useRef } from "react";

export function ResearchVideo({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let active = true;

    // Muted inline playback is the browser-compatible path for autoplay.
    // Re-assert the properties and call play() as a fallback after hydration.
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.controls = false;

    const play = () => {
      void video.play().catch((error: unknown) => {
        if (
          active &&
          video.paused &&
          error instanceof DOMException &&
          error.name === "NotAllowedError"
        ) {
          // Let the user start playback when browser policy blocks autoplay.
          video.controls = true;
        }
      });
    };
    const hideControls = () => {
      video.controls = false;
    };
    const replay = () => {
      video.currentTime = 0;
      play();
    };
    const retryVisiblePlayback = () => {
      if (!active || document.hidden || !video.paused) return;

      const bounds = video.getBoundingClientRect();
      if (
        bounds.bottom > 0 &&
        bounds.top < window.innerHeight &&
        bounds.right > 0 &&
        bounds.left < window.innerWidth
      ) {
        play();
      }
    };
    // Browsers may defer autoplay while a video is off-screen or in a hidden tab.
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) retryVisiblePlayback();
          })
        : null;

    play();
    observer?.observe(video);
    document.addEventListener("visibilitychange", retryVisiblePlayback);
    video.addEventListener("canplay", play);
    video.addEventListener("playing", hideControls);
    video.addEventListener("ended", replay);
    return () => {
      active = false;
      observer?.disconnect();
      document.removeEventListener("visibilitychange", retryVisiblePlayback);
      video.removeEventListener("canplay", play);
      video.removeEventListener("playing", hideControls);
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
    />
  );
}
