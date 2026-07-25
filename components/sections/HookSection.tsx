"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./HookSection.module.css";

const EASE = [0, 0, 0.58, 1] as const;
const FULL_TEXT = "elderly walkers deserve better than sore, untracked steps.";

const DEVICES = [
  {
    label: "Fitness Band",
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="8" y="2" width="8" height="5" rx="1.5" stroke="#1B1C16" strokeWidth="1.4" />
        <rect x="6" y="7" width="12" height="12" rx="3" stroke="#1B1C16" strokeWidth="1.4" />
        <rect x="8" y="17" width="8" height="5" rx="1.5" stroke="#1B1C16" strokeWidth="1.4" />
        <circle cx="12" cy="13" r="2" stroke="#1B1C16" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Phone Pedometer",
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="#1B1C16" strokeWidth="1.4" />
        <line x1="10" y1="19" x2="14" y2="19" stroke="#1B1C16" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Clip Pedometer",
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="5" y="8" width="14" height="12" rx="2.5" stroke="#1B1C16" strokeWidth="1.4" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="#1B1C16" strokeWidth="1.4" />
        <circle cx="12" cy="14" r="2" stroke="#1B1C16" strokeWidth="1.4" />
      </svg>
    ),
  },
];

export default function HookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const played = useRef(false);

  const [showEyebrow, setShowEyebrow] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [showProblemLine, setShowProblemLine] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || played.current) return;
        played.current = true;

        const timers: ReturnType<typeof setTimeout>[] = [];
        let interval: ReturnType<typeof setInterval> | null = null;

        timers.push(setTimeout(() => setShowEyebrow(true), 200));

        timers.push(setTimeout(() => {
          let count = 0;
          interval = setInterval(() => {
            count++;
            setTypedCount(count);
            if (count >= FULL_TEXT.length) {
              clearInterval(interval!);
              interval = null;
              setTypingDone(true);
              timers.push(setTimeout(() => setShowDevices(true), 300));
              timers.push(setTimeout(() => setShowProblemLine(true), 1000));
              timers.push(setTimeout(() => setLeaving(true), 4200));
              timers.push(setTimeout(() => setShowSolution(true), 4700));
            }
          }, 32);
        }, 500));

        return () => {
          timers.forEach(clearTimeout);
          if (interval) clearInterval(interval);
        };
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hook}>
      {/* Blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />

      {/* Problem */}
      <div className={styles.inner}>
        <motion.div
          className={styles.problemBlock}
          animate={leaving ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ pointerEvents: leaving ? "none" : "auto" }}
        >
          <motion.div
            className={styles.eyebrow}
            animate={{ opacity: showEyebrow ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            built for morning walkers
          </motion.div>

          <h2 className={styles.typedLine}>
            <span>{FULL_TEXT.slice(0, typedCount)}</span>
            {!typingDone && <span className={styles.cursor} aria-hidden="true" />}
          </h2>

          <div className={styles.deviceRow}>
            {DEVICES.map((d, i) => (
              <motion.div
                key={d.label}
                className={styles.deviceCard}
                animate={
                  showDevices
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 24, scale: 0.9 }
                }
                transition={{ duration: 0.5, ease: EASE, delay: showDevices ? i * 0.12 : 0 }}
              >
                <div className={styles.deviceFrame}>{d.svg}</div>
                <div className={styles.deviceLabel}>{d.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className={styles.problemLine}
            animate={showProblemLine ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            None of them do anything about{" "}
            <strong>sore, tired feet</strong> — the actual problem walkers face every single day.
          </motion.p>
        </motion.div>
      </div>

      {/* Solution */}
      <motion.div
        className={styles.solutionBlock}
        animate={showSolution ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ pointerEvents: showSolution ? "auto" : "none" }}
        aria-hidden={!showSolution}
      >
        <div className={styles.solutionInner}>
          <div className={styles.solutionTag}>the idea</div>
          <p className={styles.solutionText}>
            It&apos;s just a shoe, worn normally. It counts your steps as you walk, you
            set a daily goal in the app, and the moment you hit it, the shoe gives
            your feet a{" "}
            <span className={styles.accent}>gentle massage</span>
            , right there — no checking required.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
