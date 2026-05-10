'use client'

import React from 'react'
import { useReveal } from '@/hooks/useReveal'

interface RevealProps {
  children: React.ReactNode
  className?: string
}

const Reveal: React.FC<RevealProps> = ({ children, className = '' }) => {
  useReveal()
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  )
}

export default Reveal