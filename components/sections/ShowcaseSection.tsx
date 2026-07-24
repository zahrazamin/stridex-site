"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./ShowcaseSection.module.css";

export default function ShowcaseSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  const handlePause = () => setPlaying(false);

  return (
    <motion.section
      className={styles.showcase}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0, 0, 0.58, 1] }}
    >
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          poster="/assets/showcase-poster.jpg"
          playsInline
          onPause={handlePause}
          onEnded={handlePause}
        >
          <source src="/assets/3rd-section-video.mp4" type="video/mp4" />
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
      </div>
    </motion.section>
  );
}
