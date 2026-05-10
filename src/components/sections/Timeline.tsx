import React from 'react'
import { TIMELINE } from '@/data/timeline'

const Timeline: React.FC = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-hd" data-reveal>
          <div className="num">/04 — timeline</div>
          <div>
            <h2 className="mask-line"><span>A short <em className="italic history-emphasis">history</em>.</span></h2>
          </div>
        </div>

        <div className="timeline" data-reveal>
          {TIMELINE.map((entry, idx) => (
            <div key={idx} className="tl-row">
              <div className="yr">
                {entry.years}
              </div>
              <div className="role">
                {entry.role}<br />
                <span className="at">@ {entry.company}</span>
              </div>
              <div className="desc">
                {entry.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
