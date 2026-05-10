'use client'

import React from 'react'
import { useLiveTime } from '@/hooks/useLiveTime'

const Now: React.FC = () => {
  const time = useLiveTime(1000) // Update every 1s

  return (
    <section id="now" className="section">
      <div className="container">
        <div className="section-hd" data-reveal>
          <div className="num">/07 — now</div>
          <div>
            <h2 className="mask-line"><span>What I&apos;m <em className="italic now-emphasis">doing</em> now.</span></h2>
          </div>
        </div>

        <div className="now" data-reveal>
          <div className="now-card">
            <h5>{'// In hand'}</h5>
            <p>Building <em>Forma 2.0</em> — a full rewrite with concurrent rendering across the canvas.</p>
            <div className="row"><span className="l">{'// Reading'}</span><span>Refactoring UI · 2nd ed.</span></div>
            <div className="row"><span className="l">{'// Listening'}</span><span>Floating Points — Cascade</span></div>
            <div className="row"><span className="l">{'// Local time'}</span><span className="mono">{time || '••:••:••'} IST</span></div>
            <div className="row"><span className="l">{'// Coffee'}</span><span>Filter · Black</span></div>
          </div>

          <div className="now-card">
            <h5>{'// Open to'}</h5>
            <p>Senior / Staff frontend roles, design-engineering rotations, and short consulting gigs.</p>
            <div className="row"><span className="l">{'// Capacity'}</span><span>~10 hrs/wk through Jul</span></div>
            <div className="row"><span className="l">{'// Geo'}</span><span>Remote · IST friendly</span></div>
            <div className="row"><span className="l">{'// Equity'}</span><span>Open</span></div>
            <div className="row"><span className="l">{'// Speaking'}</span><span>Render ATL · Aug 2026</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Now
