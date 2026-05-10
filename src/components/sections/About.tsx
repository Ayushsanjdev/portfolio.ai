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
              Frontend engineer based in <em>Bangalore</em>, four years deep — split between shipping production React, scaling design systems, and breaking things in WebGL on weekends.
            </p>
            <p>
              I obsess about the <em>millisecond</em> a button feels right. About the kerning of a numerical input. About the line where motion stops decorating and starts <em>communicating</em>.
            </p>
            <p>
              Currently building tools that make engineers feel like designers, and designers feel like engineers.
            </p>
          </div>
          <div className="about-card">
            <h4>{'// Stats'}</h4>
            <dl className="kv">
              <dt>Based</dt><dd>Bangalore, IN</dd>
              <dt>Years</dt><dd>4 (since 2021)</dd>
              <dt>Stack</dt><dd>TS · React · Three · Node</dd>
              <dt>Available</dt><dd className="text-c-cobalt">Aug 2026 →</dd>
              <dt>Type</dt><dd>FT · Contract · Advisory</dd>
              <dt>Refs</dt><dd>on request</dd>
            </dl>
            <div className="about-note">
              Previously at Razorpay, Postman, and a stealth design tools co.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
