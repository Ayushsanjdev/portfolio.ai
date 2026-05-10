import React from 'react'

const LAB_ITEMS = [
  { name: "01 / fluid type", c1: "#2540F2", c2: "#6B2EFF" },
  { name: "02 / particle sketches", c1: "#0D0D0B", c2: "#FF4A1F" },
  { name: "03 / shader playground", c1: "#D4FF3D", c2: "#0D0D0B" },
  { name: "04 / motion studies", c1: "#FF4A1F", c2: "#FFB199" },
  { name: "05 / generative art", c1: "#6B2EFF", c2: "#D4FF3D" },
  { name: "06 / webgl experiments", c1: "#0D0D0B", c2: "#2540F2" }
]

const Lab: React.FC = () => {
  return (
    <section id="lab" className="section">
      <div className="container">
        <div className="section-hd" data-reveal>
          <div className="num">/06 — lab</div>
          <div>
            <h2 className="mask-line"><span>The <em className="italic text-c-cobalt">messy</em> drawer.</span></h2>
            <p className="lead lead-spaced">Experiments. Most do not ship. A few become products.</p>
          </div>
        </div>

        <div className="lab-grid" data-reveal>
          {LAB_ITEMS.map((item, idx) => (
            <a
              key={idx}
              href="#contact"
              className="lab-card"
              data-cursor="Open"
              style={{"--lab-c1": item.c1, "--lab-c2": item.c2} as React.CSSProperties}
            >
              <span className="vis" aria-hidden="true">
                <svg width="100%" height="100%" preserveAspectRatio="none">
                  <defs>
                    <pattern id={`lab-pattern-${idx}`} width="14" height="14" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="0.6" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#lab-pattern-${idx})`} />
                </svg>
              </span>
              <span className="name">{item.name} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Lab
