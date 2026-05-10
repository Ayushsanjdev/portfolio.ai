import React, { useEffect, useRef } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  [key: string]: any
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.35, className = "", as = "div", ...rest }) => {
  const ref = useRef<HTMLElement>(null)
  const apply = useMagnetic(strength)
  useEffect(() => {
    if (ref.current) {
      return apply(ref.current)
    }
  }, [apply])
  const Tag = as as any
  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>
}

export default Magnetic