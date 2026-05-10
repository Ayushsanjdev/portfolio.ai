import { useCallback } from 'react'

export const useMagnetic = (strength: number = 0.35) => {
  return useCallback((node: HTMLElement | null) => {
    if (!node) return
    let raf = 0
    let target = { x: 0, y: 0 }
    let curr = { x: 0, y: 0 }
    const tick = () => {
      curr.x += (target.x - curr.x) * 0.18
      curr.y += (target.y - curr.y) * 0.18
      node.style.transform = `translate(${curr.x}px, ${curr.y}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const onMove = (e: MouseEvent) => {
      const r = node.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      target.x = (e.clientX - cx) * strength
      target.y = (e.clientY - cy) * strength
    }
    const onLeave = () => { target.x = 0; target.y = 0 }
    node.addEventListener("mousemove", onMove)
    node.addEventListener("mouseleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      node.removeEventListener("mousemove", onMove)
      node.removeEventListener("mouseleave", onLeave)
    }
  }, [strength])
}