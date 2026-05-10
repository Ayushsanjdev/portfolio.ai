import { useEffect, useState } from 'react'

export const useLiveTime = (updateInterval: number = 1000) => {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      setTime(formatter.format(new Date()))
    }
    updateTime()
    const interval = setInterval(updateTime, updateInterval)
    return () => clearInterval(interval)
  }, [updateInterval])

  return time
}