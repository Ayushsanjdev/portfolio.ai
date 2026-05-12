'use client'
import React, { useState } from 'react'
import { useTweaks, type Palette, type TypePairing, type HeroVariant, type WorkLayout } from '@/hooks/useTweaks'

const PALETTE_OPTIONS: { id: Palette; label: string }[] = [
  { id: 'voltage', label: 'Voltage' },
  { id: 'inkwell', label: 'Inkwell' },
  { id: 'sunburn', label: 'Sunburn' },
]

const TYPE_OPTIONS: { id: TypePairing; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'brutal', label: 'Brutal' },
]

const HERO_OPTIONS: { id: HeroVariant; label: string }[] = [
  { id: 'warp', label: 'Warp' },
  { id: 'blobs', label: 'Blobs' },
  { id: 'grid', label: 'Grid' },
]

const WORK_OPTIONS: { id: WorkLayout; label: string }[] = [
  { id: 'rows', label: 'Rows' },
  { id: 'grid', label: 'Grid' },
  { id: 'stack', label: 'Stack' },
]

const TweaksPanel: React.FC = () => {
  const [open, setOpen] = useState(false)

  const palette = useTweaks((s) => s.palette)
  const setPalette = useTweaks((s) => s.setPalette)
  const typePairing = useTweaks((s) => s.typePairing)
  const setTypePairing = useTweaks((s) => s.setTypePairing)
  const motion = useTweaks((s) => s.motion)
  const setMotion = useTweaks((s) => s.setMotion)
  const cursorEnabled = useTweaks((s) => s.cursorEnabled)
  const setCursorEnabled = useTweaks((s) => s.setCursorEnabled)
  const heroVariant = useTweaks((s) => s.heroVariant)
  const setHeroVariant = useTweaks((s) => s.setHeroVariant)
  const workLayout = useTweaks((s) => s.workLayout)
  const setWorkLayout = useTweaks((s) => s.setWorkLayout)
  const triggerEasterEgg = useTweaks((s) => s.triggerEasterEgg)

  return (
    <div className="tweaks-panel">
      {open && (
        <div className="tweaks-body">
          <div className="tweaks-section">
            <div className="tweaks-section-label">{'// Theme'}</div>
            <div className="tweaks-group">
              {PALETTE_OPTIONS.map((p) => (
                <button
                  key={p.id}
                  className={`tweaks-btn${palette === p.id ? ' active' : ''}`}
                  onClick={() => setPalette(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tweaks-divider" />

          <div className="tweaks-section">
            <div className="tweaks-section-label">{'// Type'}</div>
            <div className="tweaks-group">
              {TYPE_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  className={`tweaks-btn${typePairing === t.id ? ' active' : ''}`}
                  onClick={() => setTypePairing(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tweaks-divider" />

          <div className="tweaks-section">
            <div className="tweaks-toggle-row">
              <span className="tweaks-section-label">{'// Cursor'}</span>
              <button
                className={`tweaks-switch${cursorEnabled ? ' on' : ''}`}
                onClick={() => setCursorEnabled(!cursorEnabled)}
                aria-label="Toggle cursor"
              />
            </div>
          </div>

          <div className="tweaks-section">
            <div className="tweaks-section-label">{`// Motion ${motion.toFixed(2)}×`}</div>
            <input
              type="range"
              min={0}
              max={2}
              step={0.05}
              value={motion}
              onChange={(e) => setMotion(parseFloat(e.target.value))}
              className="tweaks-slider"
              aria-label="Motion intensity"
            />
          </div>

          <div className="tweaks-divider" />

          <div className="tweaks-section">
            <div className="tweaks-section-label">{'// Hero Shader'}</div>
            <div className="tweaks-group">
              {HERO_OPTIONS.map((h) => (
                <button
                  key={h.id}
                  className={`tweaks-btn${heroVariant === h.id ? ' active' : ''}`}
                  onClick={() => setHeroVariant(h.id)}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tweaks-section">
            <div className="tweaks-section-label">{'// Work View'}</div>
            <div className="tweaks-group">
              {WORK_OPTIONS.map((w) => (
                <button
                  key={w.id}
                  className={`tweaks-btn${workLayout === w.id ? ' active' : ''}`}
                  onClick={() => setWorkLayout(w.id)}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tweaks-divider" />

          <div className="tweaks-section">
            <div className="tweaks-section-label">{'// Easter Egg'}</div>
            <button className="tweaks-trigger-btn" onClick={triggerEasterEgg}>
              ↑↑↓↓←→←→BA → trigger
            </button>
          </div>
        </div>
      )}

      <button
        className={`tweaks-toggle${open ? ' open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close tweaks panel' : 'Open tweaks panel'}
      >
        {open ? '✕' : '⚙'}
      </button>
    </div>
  )
}

export default TweaksPanel
