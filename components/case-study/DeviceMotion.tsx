"use client";

import { useEffect, useRef, useState } from "react";
import { DeviceFrame, type DeviceVariant } from "./DeviceFrame";
import styles from "./device-mockup.module.css";

type Props = {
  id: string;
  label: string;
  src: string;
  poster: string;
  gif: string;
  variant?: DeviceVariant;
  tone?: "paper" | "ink";
  loop?: boolean;
};

export function DeviceMotion({ id, label, src, poster, gif, variant = "laptop", tone = "paper", loop = true }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const node = root.current, media = video.current;
    if (!node || !media) return;
    node.dataset.enhanced = "true";
    media.controls = false;
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) media.pause();
    });
    const updateFullscreen = () => { media.controls = document.fullscreenElement === media; };
    const mobileFullscreenEnd = () => { media.controls = false; };
    document.addEventListener("fullscreenchange", updateFullscreen);
    media.addEventListener("webkitendfullscreen", mobileFullscreenEnd);
    observer.observe(media);
    return () => {
      observer.disconnect(); media.pause();
      document.removeEventListener("fullscreenchange", updateFullscreen);
      media.removeEventListener("webkitendfullscreen", mobileFullscreenEnd);
    };
  }, []);

  async function play(restart = false) {
    const media = video.current;
    if (!media) return;
    setError("");
    if (restart) media.currentTime = 0;
    try { await media.play(); }
    catch { setError("Playback could not start. Open the recording to watch it."); }
  }

  async function fullscreen() {
    const media = video.current;
    if (!media) return;
    try {
      media.controls = true;
      if (media.requestFullscreen) await media.requestFullscreen();
      else {
        const mobile = media as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
        if (mobile.webkitEnterFullscreen) mobile.webkitEnterFullscreen();
        else { media.controls = false; setError("Open the recording to view it at full size."); }
      }
    } catch { media.controls = false; setError("Open the recording to view it at full size."); }
  }

  return <div ref={root} className={styles.motion} data-device-motion={id} data-tone={tone}>
    <div className={styles.scene} data-device-scene>
      <DeviceFrame variant={variant}>
        <video ref={video} controls muted loop={loop} playsInline preload="none" poster={poster} aria-label={label} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}>
          <source src={src} type="video/mp4" />
          <a href={gif}>Open the animated GIF</a>
        </video>
      </DeviceFrame>
    </div>
    <div className={styles.toolbar}>
      <div className={styles.controls}>
        <button type="button" onClick={() => playing ? video.current?.pause() : void play()} aria-label={(playing ? "Pause " : "Play ") + label}>{playing ? "Pause" : "Play animation"}</button>
        <button type="button" onClick={() => void play(true)} aria-label={"Restart " + label}>Restart</button>
        <button type="button" onClick={() => void fullscreen()} aria-label={"View " + label + " fullscreen"}>Fullscreen</button>
      </div>
      <a href={gif} download>Save GIF</a>
      <a href={src}>Open recording</a>
    </div>
    <p className={styles.error} role="status">{error}</p>
  </div>;
}
