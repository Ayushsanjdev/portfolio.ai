'use client'
import React, { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '@/data/projects'
import { useTweaks } from '@/hooks/useTweaks'

const Work: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const hoveredRef = useRef<number | null>(null)
  const workLayout = useTweaks((s) => s.workLayout)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!previewRef.current) return
      // Position via left/top (no transition) so tracking is instant.
      // Scale/opacity are handled by CSS via the .show class.
      previewRef.current.style.left = `${e.clientX}px`
      previewRef.current.style.top = `${e.clientY}px`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
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

        {workLayout === 'rows' && (
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
        )}

        {workLayout === 'grid' && (
          <div className="work-grid in" data-reveal>
            {PROJECTS.map((project, idx) => (
              <a
                key={idx}
                href="#"
                className="work-grid-card"
                style={{ background: project.color, color: project.accent }}
                data-cursor="View case"
              >
                <div className="grid-num">({project.n})</div>
                <div className="grid-name">{project.name}</div>
                <div className="grid-meta">{project.role} · {project.yr}</div>
              </a>
            ))}
          </div>
        )}

        {workLayout === 'stack' && (
          <div className="work-stack in" data-reveal>
            {PROJECTS.map((project, idx) => (
              <a
                key={idx}
                href="#"
                className="work-stack-item"
                style={{ '--stack-color': project.color } as React.CSSProperties}
                data-cursor="View case"
              >
                <div className="stack-num">{project.n}</div>
                <div className="stack-name">{project.name}</div>
                <div className="stack-right">
                  <div className="stack-tags">
                    {project.tags.map((t, i) => <span key={i}>{t}</span>)}
                  </div>
                  <div className="stack-yr">— {project.yr}</div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Follow-cursor preview card — only shown in rows layout */}
        {workLayout === 'rows' && (
          <div
            ref={previewRef}
            className={`work-preview${hoveredProject !== null ? ' show' : ''}`}
            style={{
              backgroundColor: hoveredProject !== null ? PROJECTS[hoveredProject].color : 'var(--ink)',
              color: hoveredProject !== null ? PROJECTS[hoveredProject].accent : 'var(--bg)',
            }}
            aria-hidden="true"
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
        )}
      </div>
    </section>
  )
}

export default Work
