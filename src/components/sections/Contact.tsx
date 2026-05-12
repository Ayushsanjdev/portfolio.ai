'use client'

import React from 'react'
import Magnetic from '@/components/primitives/Magnetic'

const CONTACT_EMAIL = 'ayushsanjpro@gmail.com'

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
              Interested in working together, have a project in mind, or just want to talk frontend? I&apos;m always up for a good conversation.
            </p>

            <Magnetic strength={0.4} as="a" href={`mailto:${CONTACT_EMAIL}`} className="contact-cta" data-cursor="Email">
              {CONTACT_EMAIL} <span className="arr">→</span>
            </Magnetic>

            <div className="contact-links">
              {[
                { label: 'Twitter', href: 'https://twitter.com/ayushsanj' },
                { label: 'GitHub', href: 'https://github.com/ayushsanjdev' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/ayushsanj' },
                { label: 'Email', href: `mailto:${CONTACT_EMAIL}` },
                { label: 'Resume', href: '/AYUSHSANJ_FE_2026_CV.pdf' },
                { label: 'Phone', href: 'tel:+918595720727' },
              ].map((link, i) => (
                <a key={i} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
