'use client'

import React from 'react'
import Magnetic from '@/components/primitives/Magnetic'

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact" data-reveal>
          <div className="contact-bg" aria-hidden="true"></div>

          <h2>
            Let&apos;s <em className="it">build</em> something ↘
          </h2>

          <div className="right">
            <p className="lead">
              Interested in collaboration, mentoring, or just geeking out about motion design? Get in touch.
            </p>

            <Magnetic strength={0.4} as="a" href="mailto:hi@ayush.dev" className="contact-cta" data-cursor="Email">
              hi@ayush.dev <span className="arr">→</span>
            </Magnetic>

            <div className="contact-links">
              {[
                { label: 'Twitter', href: '#' },
                { label: 'GitHub', href: '#' },
                { label: 'LinkedIn', href: '#' },
                { label: 'Dribbble', href: '#' },
                { label: 'Email', href: 'mailto:hi@ayush.dev' },
                { label: 'CV', href: '#cv' }
              ].map((link, i) => (
                <a key={i} href={link.href}>{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
