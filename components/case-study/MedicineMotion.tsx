"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
const mobileQuery = "(max-width: 700px)";

function subscribe(query: string, callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function subscribeMotion(callback: () => void) { return subscribe(motionQuery, callback); }
function subscribeMobile(callback: () => void) { return subscribe(mobileQuery, callback); }
function noSubscription() { return () => {}; }
function onClient() { return true; }
function onServer() { return false; }
function motionOnServer() { return true; }
function prefersReducedMotion() { return window.matchMedia(motionQuery).matches; }
function isMobile() { return window.matchMedia(mobileQuery).matches; }

type MedicineMotionProps = {
  name: string;
  description: string;
  video: string;
  poster: string;
  width?: number;
  height?: number;
  mobileVideo?: string;
  mobilePoster?: string;
  priority?: boolean;
  autoPlay?: boolean;
};

export function MedicineMotion({ name, description, video, poster, width = 540, height = 900, mobileVideo, mobilePoster, priority = false, autoPlay = true }: MedicineMotionProps) {
  const hydrated = useSyncExternalStore(noSubscription, onClient, onServer);
  const reduceMotion = useSyncExternalStore(subscribeMotion, prefersReducedMotion, motionOnServer);
  const mobile = useSyncExternalStore(subscribeMobile, isMobile, onServer);
  const [override, setOverride] = useState<boolean | null>(null);
  const playing = hydrated && (override ?? (autoPlay && !reduceMotion));
  const chosenVideo = mobile && mobileVideo ? mobileVideo : video;
  const chosenPoster = mobile && mobilePoster ? mobilePoster : poster;

  return <div className="lf-motion">
    <div className="lf-motion-visual" role="img" aria-label={description}>
      {playing ? <video key={chosenVideo} autoPlay loop muted playsInline preload="metadata" poster={chosenPoster} aria-hidden="true">
        <source src={chosenVideo} type="video/mp4" />
      </video> : <picture>
        {mobilePoster && <source media={mobileQuery} srcSet={mobilePoster} width="540" height="900" />}
        <Image src={poster} alt="" width={width} height={height} sizes={mobilePoster ? "(max-width: 700px) 100vw, 65vw" : "(max-width: 700px) 100vw, 33vw"} preload={priority} />
      </picture>}
    </div>
    {hydrated && <button className="lf-motion-toggle" type="button" onClick={() => setOverride(!playing)} aria-label={`${playing ? "Pause" : "Play"} ${name} animation`}>
      {playing ? "Pause" : "Play"}
    </button>}
  </div>;
}
