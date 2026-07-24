"use client";

import { motion } from "framer-motion";
import styles from "./HookSection.module.css";

const problems = [
  {
    name: "FITNESS BAND",
    image: "/assets/fitness-band.jpg",
    alt: "Fitness band / smartwatch on a wrist",
    problem: "Accurate, but it's one more device to charge, wear, and remember.",
  },
  {
    name: "PHONE PEDOMETER",
    image: "/assets/phone-pedometer.jpg",
    alt: "Phone showing step-tracking app",
    problem: "Only counts steps when your phone is actually on you.",
  },
  {
    name: "CLIP PEDOMETER",
    image: "/assets/basic-clip-pedometer.jpg",
    alt: "Basic clip pedometer device",
    problem: "Counts steps but gives nothing back. No goal, no feedback, no reason to look.",
  },
];

const LABEL = "what's already out there";
const TITLE =
  "The problem is there is a lot of option out there, but all has the same problem.";

const typewriterContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const titleTypewriterContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.4 } },
};

const wordVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.14 },
  }),
};

const solveVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HookSection() {
  return (
    <section className={styles.hook}>
      <div className={styles.wrap}>
        <div className={styles.hookHead}>
          <motion.div
            className={styles.hookLabel}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={typewriterContainer}
          >
            {LABEL.split(" ").map((word, i) => (
              <motion.span key={i} variants={wordVariant} style={{ display: "inline-block", marginRight: "0.28em" }}>
                {word}
              </motion.span>
            ))}
          </motion.div>
          <motion.h2
            className={styles.hookTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={titleTypewriterContainer}
          >
            {TITLE.split(" ").map((word, i) => (
              <motion.span key={i} variants={wordVariant} style={{ display: "inline-block", marginRight: "0.28em" }}>
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </div>
        {/* Problem cards */}
        <div className={styles.problemGrid}>
          {problems.map((p, i) => (
            <motion.div
              key={p.name}
              className={styles.pCard}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <img className={styles.pPhoto} src={p.image} alt={p.alt} />
              <div className={styles.pBody}>
                <div className={styles.pName}>
                  {p.name}
                  <span className={styles.xMark} aria-hidden="true" />
                </div>
                <p className={styles.pProblem}>{p.problem}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Solve card */}
        <motion.div
          className={styles.solveCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={solveVariants}
        >
          <div className={styles.solutionRibbon}>The Solution</div>
          <div className={styles.solvePhoto}>
            <img src="/assets/stridex.jpeg" alt="StrideX smart shoe" />
          </div>
          <div>
            <div className={styles.solveLogoMark}>
              <img src="/assets/logo.jpeg" alt="StrideX logo" />
            </div>
            <div className={styles.solveName}>
              STRIDEX
              <span className={styles.checkMark} aria-hidden="true" />
            </div>
            <p className={styles.solveProblem}>
              The sensor lives in the sole. No band, no app-checking, no dead battery to forget.
              Hit your goal, and the shoe tells you instantly — with a massage underfoot.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
