'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTweaks } from '@/hooks/useTweaks'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

const EasterEgg: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const seqRef = useRef<string[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const easterEggTrigger = useTweaks((s) => s.easterEggTrigger)

  const trigger = useCallback(() => {
    setVisible(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setVisible(false), 5500)
  }, [])

  useEffect(() => {
    if (easterEggTrigger === 0) return
    trigger()
  }, [easterEggTrigger, trigger])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      seqRef.current = [...seqRef.current, e.key].slice(-KONAMI.length)
      if (seqRef.current.join(',') === KONAMI.join(',')) {
        trigger()
        seqRef.current = []
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(timerRef.current)
    }
  }, [trigger])

  if (!visible) return null

  return (
    <div className="easter-egg" onClick={() => setVisible(false)} role="dialog" aria-modal="true">
      <div className="easter-egg-overlay">
        <pre className="ascii-cat">{`   \\_/\n  ( o.o )\n   > ^ <\n  /|   |\\\n   |   |\n  /|   |\\`}</pre>
        <div className="well-found">WELL FOUND.</div>
      </div>
    </div>
  )
}

export default EasterEgg
