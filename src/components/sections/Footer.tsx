import React from 'react'

const Footer: React.FC = () => {
  return (
    <>
      <div className="footer-marquee" aria-hidden="true">
        <div className="track">
          <span>Available August 2026 ↗</span>
          <span>Available August 2026 ↗</span>
          <span>Available August 2026 ↗</span>
          <span>Available August 2026 ↗</span>
        </div>
      </div>

      <footer className="footer">
        <div>© 2026 Ayush Sanj</div>
        <div>Crafted in TypeScript & GLSL · v3.4</div>
        <a href="#">↑ Back to top</a>
      </footer>
    </>
  )
}

export default Footer
