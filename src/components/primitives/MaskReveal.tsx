'use client'

import React from 'react'

interface MaskRevealProps {
  children: string
  className?: string
}

const MaskReveal: React.FC<MaskRevealProps> = ({ children, className = '' }) => {
  return (
    <div className={`mask-line ${className}`}>
      <span>{children}</span>
    </div>
  )
}

export default MaskReveal