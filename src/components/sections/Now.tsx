'use client'

import React from 'react'
import { useLiveTime } from '@/hooks/useLiveTime'

const Now: React.FC = () => {
  const time = useLiveTime(1000)

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
            <p>Building <em>clinical tooling at Kraftbase</em> — EEG dashboards, HLS video sync, and a payment system that has to be right.</p>
            <div className="row"><span className="l">{'// Reading'}</span><span>The Pragmatic Programmer</span></div>
            <div className="row"><span className="l">{'// Listening'}</span><span>Floating Points — Cascade</span></div>
            <div className="row"><span className="l">{'// Local time'}</span><span className="mono">{time || '••:••:••'} IST</span></div>
            <div className="row"><span className="l">{'// Coffee'}</span><span>Filter · Black</span></div>
          </div>

          <div className="now-card">
            <h5>{'// Open to'}</h5>
            <p>Frontend roles, contract gigs, and any product where UI quality is non-negotiable.</p>
            <div className="row"><span className="l">{'// Capacity'}</span><span>Open to full-time</span></div>
            <div className="row"><span className="l">{'// Geo'}</span><span>Remote · IST friendly</span></div>
            <div className="row"><span className="l">{'// Stack'}</span><span>React · Next.js · RN</span></div>
            <div className="row"><span className="l">{'// Contact'}</span><span>ayushsanjpro@gmail.com</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Now
