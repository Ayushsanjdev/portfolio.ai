'use client'
import React, { useEffect } from 'react'
import type Lenis from 'lenis'

interface SmoothScrollProps {
  children: React.ReactNode
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    let lenis: Lenis | undefined
    let rafId = 0
    let cancelled = false

    const setupSmoothScroll = async () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      // Wait for the page-load curtain to finish (4 panels × 80ms stagger + 900ms transition)
      await new Promise<void>((resolve) => setTimeout(resolve, 1200))
      if (cancelled) return

      const [{ default: LenisClass }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)
      lenis = new LenisClass({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      })

      lenis.on('scroll', ScrollTrigger.update)

      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    }

    // Set up scroll reveals via IntersectionObserver
    const revealEls = document.querySelectorAll('[data-reveal]')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    revealEls.forEach((el, index) => {
      ;(el as HTMLElement).style.setProperty('--rd', `${Math.min(index % 4, 3) * 70}ms`)
      revealObserver.observe(el)
    })

    setupSmoothScroll()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      revealObserver.disconnect()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
