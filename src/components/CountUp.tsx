"use client"
import { useEffect, useRef, useState } from "react"

interface Props {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
}

export default function CountUp({ end, prefix = "", suffix = "", duration = 1500 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(rafRef.current)
        if (entry.isIntersecting) {
          setCount(0)
          const startTime = performance.now()
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) rafRef.current = requestAnimationFrame(animate)
            else setCount(end)
          }
          rafRef.current = requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [end, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}
