'use client'

import React, { useEffect, useState } from 'react'

const Curtain: React.FC = () => {
  const [isOpening, setIsOpening] = useState(false)

  useEffect(() => {
    // Delay the opening animation by 50ms
    const timer = setTimeout(() => setIsOpening(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`curtain ${isOpening ? 'opening' : ''}`}>
      <div className="curtain-panel panel-1"></div>
      <div className="curtain-panel panel-2"></div>
      <div className="curtain-panel panel-3"></div>
      <div className="curtain-panel panel-4"></div>
    </div>
  )
}

export default Curtain