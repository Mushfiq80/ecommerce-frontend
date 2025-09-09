"use client"

import { ChevronLeft, ChevronRight, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FlashSaleHeaderProps {
  title: string
  navPrevId: string
  navNextId: string
  countdownComponent: React.ReactNode
}

export function FlashSaleHeader({ title, navPrevId, navNextId, countdownComponent }: FlashSaleHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center md:justify-between lg:gap-4 mb-8">
      {/* Mobile: Stacked layout, Large: Horizontal layout */}

      {/* Title Section - Always first */}
      <div className="flex items-center gap-3 min-w-0 mb-4 lg:mb-0">
        <div className="p-2 bg-primary rounded-full flex-shrink-0">
          <Flame className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">Limited time offers!</p>
        </div>
      </div>

      {/* Countdown Section - Center on large, start-aligned on mobile */}
      <div className="w-full lg:w-auto flex justify-start lg:justify-center lg:mx-6 mb-4 lg:mb-0">
        {countdownComponent}
      </div>

      {/* Navigation Section - Right on large, start-aligned on mobile */}
      <div className="hidden md:flex gap-2 flex-shrink-0 lg:ml-auto">
        <Button variant="outline" size="icon" id={navPrevId} className="hover:bg-muted border-border">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" id={navNextId} className="hover:bg-muted border-border">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
