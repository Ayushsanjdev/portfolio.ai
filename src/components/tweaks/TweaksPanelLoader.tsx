'use client'
import dynamic from 'next/dynamic'

const TweaksPanel = dynamic(() => import('./TweaksPanel'), { ssr: false })

export default function TweaksPanelLoader() {
  return <TweaksPanel />
}
