import React from 'react'

const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-hd" data-reveal>
          <div className="num">/02 — about</div>
          <div>
            <h2 className="mask-line"><span>Hi, I&apos;m <em className="italic text-c-coral">Ayush</em>.</span></h2>
          </div>
        </div>
        <div className="about" data-reveal>
          <div>
            <p>
              Frontend developer based in <em>Vadodara, Gujarat</em>, four years in — building production React and Next.js apps, shipping cross-platform mobile with React Native, and obsessing over the details that separate good UIs from great ones.
            </p>
            <p>
              I care deeply about the <em>millisecond</em> an interface responds. About the gap between what a designer intended and what a developer shipped. About closing that gap to <em>zero</em>.
            </p>
            <p>
              Currently engineering medical dashboards and payment systems at Kraftbase — the kind of work where a rendering glitch isn&apos;t just ugly, it costs someone.
            </p>
          </div>
          <div className="about-card">
            <h4>{'// Stats'}</h4>
            <dl className="kv">
              <dt>Based</dt><dd>Vadodara, Gujarat</dd>
              <dt>Years</dt><dd>4 (since 2021)</dd>
              <dt>Stack</dt><dd>TS · React · Next · RN</dd>
              <dt>Available</dt><dd className="text-c-cobalt">Open to work →</dd>
              <dt>Type</dt><dd>FT · Contract · Remote</dd>
              <dt>Refs</dt><dd>on request</dd>
            </dl>
            <div className="about-note">
              Previously at Team Geek Solutions Pvt Ltd and Mera Farmhouse.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
