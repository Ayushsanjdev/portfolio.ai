import React from 'react'
import { TESTIMONIALS } from '@/data/testimonials'

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="section-hd" data-reveal>
          <div className="num">/08 — testimonials</div>
          <div>
            <h2 className="mask-line"><span>Kind words</span></h2>
          </div>
        </div>

        <div className="testimonials" data-reveal>
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className="testimonial">
              <blockquote>{testimonial.quote}</blockquote>
              <div className="who">
                <b>{testimonial.author}</b>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
