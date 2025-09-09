"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  endTime: string
  onExpired: () => void
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ endTime, onExpired }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const difference = end - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        onExpired()
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime, onExpired])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-background border border-border rounded-lg p-2 min-w-[50px] md:min-w-[60px]">
      <span className="text-lg md:text-xl font-bold text-foreground">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs text-muted-foreground uppercase">{label}</span>
    </div>
  )

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2 hidden sm:inline">
        Ends in:
      </span>
      <div className="flex gap-1 md:gap-2">
        {timeLeft.days > 0 && <TimeUnit value={timeLeft.days} label="Days" />}
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  )
}
