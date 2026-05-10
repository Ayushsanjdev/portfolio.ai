import React from 'react'
import { SKILLS, SKILL_CATEGORIES } from '@/data/skills'

const Skills: React.FC = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-hd" data-reveal>
          <div className="num">/03 — skills</div>
          <div>
            <h2 className="mask-line"><span>The <em className="italic text-c-cobalt">toolbox</em>.</span></h2>
            <p className="lead lead-spaced">Tools I reach for daily. Levels are honest, not aspirational.</p>
          </div>
        </div>

        <div className="skills-cloud" data-reveal>
          {SKILLS.map((skill, idx) => (
            <span key={idx} className="skill-chip" style={{"--lvl": skill.lvl} as React.CSSProperties}>
              {skill.name}
              <span className="lvl"><i></i></span>
            </span>
          ))}
        </div>

        <div className="skills-grid" data-reveal>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx}>
              <h5>{`// ${cat.title}`}</h5>
              <ul>
                {cat.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
