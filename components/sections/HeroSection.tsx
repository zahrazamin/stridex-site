import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>

      {/* Video background */}
      <div className={styles.videoBg}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/logo.jpeg"
        >
          <source src="/assets/hero-section-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.videoScrim} />

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logoMark} aria-label="StrideX">
          <img src="/assets/logo.jpeg" alt="StrideX logo" />
        </div>
        <div className={styles.navRight}>
          <button className={styles.pillCta}>Get In Touch</button>
        </div>
      </nav>

      {/* Soft overlay behind headline */}
      <div className={styles.heroCopyBg} aria-hidden="true" />

      {/* Headline copy */}
      <div className={styles.heroCopy}>
        <h1 className={styles.headline}>
          meet<br />
          <span className={styles.accent}>stridex</span>
        </h1>
        <p className={styles.heroSub}>
          A shoe that counts your steps and rewards you for hitting them, no wearable, no app-checking required.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint} aria-hidden="true" />

    </section>
  );
}
