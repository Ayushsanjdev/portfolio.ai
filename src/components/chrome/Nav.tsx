'use client'
import React from 'react'
import { useLiveTime } from '@/hooks/useLiveTime'

const Nav: React.FC = () => {
  const time = useLiveTime(30000)

  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-logo">
        {/* Monogram: rectangle + A glyph */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="20" height="20" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <path d="M7 16L11 7L15 16M9.2 13H12.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
        <div className="dot" aria-hidden="true"></div>
        <div className="time" aria-live="off" aria-label="Current time in Bangalore">{time || '••:••'}</div>
      </div>
    </nav>
  )
}

export default Nav
