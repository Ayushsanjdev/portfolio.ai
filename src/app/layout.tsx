import {
  Instrument_Serif,
  Space_Grotesk,
  JetBrains_Mono,
  DM_Serif_Display,
  Inter_Tight,
  IBM_Plex_Mono,
  Bricolage_Grotesque,
} from 'next/font/google'
import './globals.css'
import Cursor from '@/components/chrome/Cursor'
import Nav from '@/components/chrome/Nav'
import Curtain from '@/components/chrome/Curtain'
import EasterEgg from '@/components/chrome/EasterEgg'
import SmoothScroll from '@/components/chrome/SmoothScroll'
import TweaksApplier from '@/components/tweaks/TweaksApplier'
import TweaksPanelLoader from '@/components/tweaks/TweaksPanelLoader'

// Default pairing: Classic
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ui',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
})

// Editorial pairing
const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display-editorial',
})
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ui-editorial',
})
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-editorial',
})

// Brutal pairing
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display-brutal',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    instrumentSerif.variable,
    spaceGrotesk.variable,
    jetbrainsMono.variable,
    dmSerifDisplay.variable,
    interTight.variable,
    ibmPlexMono.variable,
    bricolageGrotesque.variable,
  ].join(' ')

  return (
    <html lang="en" className={fontVars}>
      <body>
        <TweaksApplier />
        <SmoothScroll>
          <Cursor />
          <Nav />
          <Curtain />
          <EasterEgg />
          {children}
        </SmoothScroll>
        <TweaksPanelLoader />
      </body>
    </html>
  )
}
