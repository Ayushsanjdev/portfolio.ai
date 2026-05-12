import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Palette = 'voltage' | 'inkwell' | 'sunburn'
export type TypePairing = 'classic' | 'editorial' | 'brutal'
export type HeroVariant = 'warp' | 'blobs' | 'grid'
export type WorkLayout = 'rows' | 'grid' | 'stack'

interface TweaksState {
  palette: Palette
  typePairing: TypePairing
  motion: number
  cursorEnabled: boolean
  heroVariant: HeroVariant
  workLayout: WorkLayout
  easterEggTrigger: number
  setPalette: (v: Palette) => void
  setTypePairing: (v: TypePairing) => void
  setMotion: (v: number) => void
  setCursorEnabled: (v: boolean) => void
  setHeroVariant: (v: HeroVariant) => void
  setWorkLayout: (v: WorkLayout) => void
  triggerEasterEgg: () => void
}

export const useTweaks = create<TweaksState>()(
  persist(
    (set) => ({
      palette: 'voltage',
      typePairing: 'classic',
      motion: 1,
      cursorEnabled: true,
      heroVariant: 'warp',
      workLayout: 'rows',
      easterEggTrigger: 0,
      setPalette: (palette) => set({ palette }),
      setTypePairing: (typePairing) => set({ typePairing }),
      setMotion: (motion) => set({ motion }),
      setCursorEnabled: (cursorEnabled) => set({ cursorEnabled }),
      setHeroVariant: (heroVariant) => set({ heroVariant }),
      setWorkLayout: (workLayout) => set({ workLayout }),
      triggerEasterEgg: () => set((s) => ({ easterEggTrigger: s.easterEggTrigger + 1 })),
    }),
    { name: 'ayush-portfolio-tweaks' }
  )
)
