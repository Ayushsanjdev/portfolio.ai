'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTweaks } from '@/hooks/useTweaks'

const Cursor: React.FC = () => {
  const cursorEnabled = useTweaks((s) => s.cursorEnabled)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!cursorEnabled) {
      document.body.classList.add('no-cursor')
      return () => document.body.classList.remove('no-cursor')
    }
    document.body.classList.remove('no-cursor')
  }, [cursorEnabled])

  useEffect(() => {
    if (!cursorEnabled) return
    const pointerQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    if (pointerQuery.matches) return

    let raf = 0
    let idleTimer = 0
    let running = false
    let scrolling = false
    let primed = false

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
      if (!primed) {
        ringPosRef.current.x = e.clientX
        ringPosRef.current.y = e.clientY
        primed = true
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY + 30}px,0) translate(-50%,0)`
      }
      if (!running && !scrolling) {
        running = true
        raf = requestAnimationFrame(tick)
      }
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(stop, 320)
    }

    const tick = () => {
      ringPosRef.current.x += (targetRef.current.x - ringPosRef.current.x) * 0.18
      ringPosRef.current.y += (targetRef.current.y - ringPosRef.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px,${ringPosRef.current.y}px,0) translate(-50%,-50%)`
      }
      if (running && !scrolling) raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      scrolling = true
      stop()
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => { scrolling = false }, 160)
    }

    const onOver = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return
      const link = e.target.closest('a, button, input, textarea, [contenteditable], [data-cursor]')
      if (link) {
        const cursorAttr = link.getAttribute('data-cursor')
        const isText = link.matches('input, textarea, [contenteditable]')
        dotRef.current?.classList.toggle('is-link', !isText)
        ringRef.current?.classList.toggle('is-link', !isText)
        dotRef.current?.classList.toggle('is-text', isText)
        ringRef.current?.classList.toggle('is-text', isText)
        setLabel(cursorAttr || '')
      } else {
        dotRef.current?.classList.remove('is-link', 'is-text')
        ringRef.current?.classList.remove('is-link', 'is-text')
        setLabel('')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseover', onOver)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(idleTimer)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseover', onOver)
    }
  }, [cursorEnabled])

  if (!cursorEnabled) return null

  return (
    <>
      <div className="cursor-ring" ref={ringRef}></div>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className={`cursor-label${label ? ' show' : ''}`} ref={labelRef}>{label}</div>
    </>
  )
}

export default Cursor
