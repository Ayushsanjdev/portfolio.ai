'use client'

import React, { useEffect, useState } from 'react'

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

const EasterEgg: React.FC = () => {
  const [triggered, setTriggered] = useState(false)
  const [keySequence, setKeySequence] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.key]
      if (newSequence.length > KONAMI_CODE.length) {
        newSequence.shift()
      }
      setKeySequence(newSequence)

      if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
        setTriggered(true)
        setTimeout(() => setTriggered(false), 5500)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [keySequence])

  if (!triggered) return null

  return (
    <div className="easter-egg">
      <div className="easter-egg-overlay">
        <pre className="ascii-cat">{`
   \\_/
  ( o.o )
   > ^ <
  /|   |\\
   |   |
  /|   |\\
`}</pre>
        <div className="well-found">WELL FOUND.</div>
      </div>
    </div>
  )
}

export default EasterEgg