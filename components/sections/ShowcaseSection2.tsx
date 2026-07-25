"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ShowcaseSection.module.css";

export default function ShowcaseSection2() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const isInView = useInView(sectionRef, { amount: 0.7 });

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.muted = true;
      video.play().then(() => {
        video.muted = false;
        setMuted(false);
        setPlaying(true);
      }).catch(() => {
        setPlaying(false);
      });
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [isInView]);

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  const handlePause = () => setPlaying(false);

  return (
    <motion.section
      ref={sectionRef}
      className={styles.showcase}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0, 0, 0.58, 1] }}
    >
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          playsInline
          muted
          onPause={handlePause}
          onEnded={handlePause}
        >
          <source src="/assets/4th-section-video.mp4" type="video/mp4" />
        </video>

        <div
          className={`${styles.playOverlay} ${playing ? styles.hidden : ""}`}
          onClick={handlePlay}
          role="button"
          aria-label="Play video"
        >
          <div className={styles.playBtn}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 4l14 8-14 8V4z" fill="#14150F" />
            </svg>
          </div>
        </div>

        {playing && (
          <button
            className={styles.muteBtn}
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="#F3F0E7" strokeWidth="1.6" strokeLinejoin="round"/>
                <line x1="23" y1="9" x2="17" y2="15" stroke="#F3F0E7" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="17" y1="9" x2="23" y2="15" stroke="#F3F0E7" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="#F3F0E7" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#F3F0E7" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#F3F0E7" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        )}
      </div>
    </motion.section>
  );
}
