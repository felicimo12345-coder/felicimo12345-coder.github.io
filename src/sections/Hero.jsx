import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { profile } from '../data/site.js'

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.18])
  const bodyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70])
  const bodyFade = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0])

  return (
    <section className="hero" id="top" ref={ref} aria-label="首屏">
      <motion.video
        className="hero__video"
        style={{ scale: videoScale }}
        src="./assets/hero-reel.mp4"
        poster="./assets/hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero__scrim" />
      <div className="hero__mesh" aria-hidden="true" />

      <span className="hero__corner hero__corner--tl" aria-hidden="true" />
      <span className="hero__corner hero__corner--tr" aria-hidden="true" />
      <span className="hero__corner hero__corner--bl" aria-hidden="true" />
      <span className="hero__corner hero__corner--br" aria-hidden="true" />

      <span className="hero__edge hero__edge--l">Scroll to explore</span>
      <span className="hero__edge hero__edge--r">{profile.location} — {profile.year}</span>

      <motion.div className="wrap hero__body" style={{ y: bodyY, opacity: bodyFade }}>
        <div className="hero__lead">
          <p className="label hero__kicker">Portfolio 2026 × Product Design</p>

          <div className="lockup skew">
            <div className="lockup__cjk" aria-hidden="true">
              <span>张</span>
              <span>哲</span>
            </div>
            <h1 className="lockup__latin">
              <span className="lockup__cap">Z</span>
              <span className="lockup__l1">HANG</span>
              <span className="lockup__l2">ZHE</span>
            </h1>
          </div>

          <div className="hero__meta">
            <span className="hero__hatch" aria-hidden="true" />
            <span className="hero__roles">
              {profile.roles.map((r) => (
                <i key={r}>{r}</i>
              ))}
            </span>
            <a className="hero__badge" href="#profile">
              <span>简介 / Profile</span>
              <span className="hero__badge-dot" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <p className="hero__straight">{profile.tagline}</p>
        </div>
      </motion.div>

      <div className="wrap hero__foot">
        <span className="dot" aria-hidden="true" />
        <span>{profile.latin}</span>
        <span className="right">
          <span>{profile.kicker}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            Scroll
            <span className="hero__scroll" aria-hidden="true" />
          </span>
        </span>
      </div>
    </section>
  )
}
