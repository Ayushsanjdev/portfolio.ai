'use client'

import React from 'react'

interface MarqueeProps {
  children: React.ReactNode
  duration?: number
  className?: string
}

const Marquee: React.FC<MarqueeProps> = ({ children, duration = 36, className = '' }) => {
  return (
    <div className={`marquee ${className}`} style={{ '--duration': `${duration}s` } as React.CSSProperties}>
      <div className="marquee-track">
        <span>{children}</span>
        <span>{children}</span>
      </div>
    </div>
  )
}

export default Marquee