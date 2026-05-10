import React from 'react'
import { WRITING } from '@/data/writing'

const Writing: React.FC = () => {
  return (
    <section id="writing" className="section">
      <div className="container">
        <div className="section-hd" data-reveal>
          <div className="num">/05 — writing</div>
          <div>
            <h2 className="mask-line"><span>Things I&apos;ve <em className="italic text-c-coral">written</em>.</span></h2>
          </div>
        </div>

        <div className="writing-list" data-reveal>
          {WRITING.map((article, idx) => (
            <a key={idx} href={article.href} className="writing-card" data-cursor="Read">
              <div className="meta">
                {article.tag} · {article.time}
              </div>
              <h4>{article.title}</h4>
              <div className="read">Read essay →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Writing
