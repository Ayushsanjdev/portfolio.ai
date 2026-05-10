import React from 'react'
import HeroShader from './HeroShader'

const HERO_PALETTE = {
  c1: [0.254, 0.16, 0.98], // cobalt
  c2: [0.7, 1, 0.15], // lime
  c3: [1, 0.24, 0.08], // coral
  c4: [0.95, 0.92, 0.85] // cream
}

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <HeroShader palette={HERO_PALETTE} intensity={1} variant="warp" />
      <div className="hero-grain"></div>
      <div className="hero-overlay"></div>
      <div className="hero-inner">
        <div className="hero-meta">
          <div className="col">
            <div className="val">{'// Portfolio · v3.4'}</div>
          </div>
          <div className="col right">
            <div className="val">
              <span className="desktop-copy">{'// 12.97°N · 77.59°E · BANGALORE, IN'}</span>
              <span className="mobile-copy">{'// BANGALORE · IN'}</span>
            </div>
          </div>
          <div className="col right">
            <div className="val">
              <span className="desktop-copy">{'// Status · ↗ Booking Aug \'26'}</span>
              <span className="mobile-copy">{'// Booking Aug \'26'}</span>
            </div>
          </div>
        </div>
        <h1 className="hero-title">
          <span className="ln">AYUSH</span>
          <span className="ln"><span className="it accent">Sanj.</span></span>
          <span className="ln stroke">Frontend</span>
          <span className="ln"><span className="it">Engineer</span><span className="star">*</span></span>
        </h1>
        <div className="hero-roles">
          <span className="role-pill">React · TS</span>
          <span className="role-pill">WebGL</span>
          <span className="role-pill solid">Design Eng</span>
          <span className="role-pill">Node · Edge</span>
          <span className="arrow">→</span>
        </div>
        <div className="hero-marquee">
          <div className="track">
            <span>Available August 2026 ↗ Available August 2026 ↗ Available August 2026 ↗ Available August 2026 ↗ Available August 2026 ↗</span>
            <span>Available August 2026 ↗ Available August 2026 ↗ Available August 2026 ↗ Available August 2026 ↗ Available August 2026 ↗</span>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        SCROLL <span className="arr">↘</span>
      </div>
    </section>
  )
}

export default Hero
