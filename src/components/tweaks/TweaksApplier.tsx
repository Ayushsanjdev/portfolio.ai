'use client'
import { useEffect } from 'react'
import { useTweaks } from '@/hooks/useTweaks'
import { PALETTES } from '@/data/palettes'

const CSS_VAR_MAP: Record<string, string> = {
  bg: '--bg',
  ink: '--ink',
  ink2: '--ink-2',
  muted: '--muted',
  rule: '--rule',
  ruleStrong: '--rule-strong',
  c1: '--c-cobalt',
  c2: '--c-lime',
  c3: '--c-coral',
  c4: '--c-plum',
  c5: '--c-peach',
}

export default function TweaksApplier() {
  const palette = useTweaks((s) => s.palette)
  const motion = useTweaks((s) => s.motion)
  const typePairing = useTweaks((s) => s.typePairing)

  useEffect(() => {
    const p = PALETTES[palette]
    const root = document.documentElement
    ;(Object.entries(p) as [string, string][]).forEach(([key, value]) => {
      const varName = CSS_VAR_MAP[key]
      if (varName) root.style.setProperty(varName, value)
    })
  }, [palette])

  useEffect(() => {
    document.documentElement.style.setProperty('--motion', String(motion))
  }, [motion])

  useEffect(() => {
    document.documentElement.dataset.type = typePairing
  }, [typePairing])

  return null
}
