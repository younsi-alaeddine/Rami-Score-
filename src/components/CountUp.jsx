import React, { useEffect, useState } from 'react'

/**
 * Affiche un nombre avec animation count-up.
 */
export default function CountUp({ value, duration = 600 }) {
  const [display, setDisplay] = useState(0)
  const num = Number(value) || 0

  useEffect(() => {
    let start = 0
    const startTime = performance.now()

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - (1 - progress) ** 2
      setDisplay(Math.round(num * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [num, duration])

  return <span>{display}</span>
}
