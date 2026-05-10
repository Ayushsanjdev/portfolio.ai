'use client'

import React from 'react'
import { useLiveTime } from '@/hooks/useLiveTime'

const Nav: React.FC = () => {
  const time = useLiveTime(30000) // Update every 30s

  return (
    <nav className="nav">
      <div className="nav-logo">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="1" y="1" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M6 10L16 10M11 6L11 14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>AYUSH SANJ</span>
      </div>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#cv">CV</a>
        <a href="#writing">Writing</a>
        <a href="#lab">Lab</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nav-meta">
        <div className="dot"></div>
        <div className="time">{time || '••:••'}</div>
      </div>
    </nav>
  )
}

export default Nav