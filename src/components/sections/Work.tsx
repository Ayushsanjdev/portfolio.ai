'use client'

import React, { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '@/data/projects'

const Work: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const hoveredRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!previewRef.current) return
      previewRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${hoveredRef.current === null ? 0.94 : 1})`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const showPreview = (idx: number) => {
    hoveredRef.current = idx
    setHoveredProject(idx)
  }

  const hidePreview = () => {
    hoveredRef.current = null
    setHoveredProject(null)
  }

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-hd" data-reveal>
          <div className="num">/01 — work</div>
          <div>
            <h2 className="mask-line"><span>Things I built that <em className="italic text-c-cobalt">shipped</em>.</span></h2>
            <p className="lead">Five core projects showcasing design-engineering fusion.</p>
          </div>
        </div>

        <div className="work-list" data-reveal>
          {PROJECTS.map((project, idx) => (
            <button
              key={idx}
              type="button"
              className="work-row"
              onMouseEnter={() => showPreview(idx)}
              onMouseLeave={hidePreview}
              data-cursor="View case"
            >
              <div className="num">({project.n})</div>
              <h3>{project.name}</h3>
              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
              <div className="yr">— {project.yr}</div>
            </button>
          ))}
        </div>

        <div
          ref={previewRef}
          className={`work-preview ${hoveredProject !== null ? 'show' : ''}`}
          style={{
            backgroundColor: hoveredProject !== null ? PROJECTS[hoveredProject].color : 'var(--ink)',
            color: hoveredProject !== null ? PROJECTS[hoveredProject].accent : 'var(--bg)',
          }}
        >
          {hoveredProject !== null && (
            <div className="work-preview-inner">
              <div className="preview-title">{PROJECTS[hoveredProject].name}</div>
              <div className="preview-meta">
                [{PROJECTS[hoveredProject].role} · {PROJECTS[hoveredProject].yr}]
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Work
