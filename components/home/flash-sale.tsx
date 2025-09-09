"use client"

import { CountdownTimer } from "./countdown-timer"
import { FlashSaleHeader } from "./flash-sale-header"
import { FlashSaleSlider } from "./flash-sale-slider"
import { useId, useState } from "react"

interface FlashSaleType {
  id: number
  name: string
  ends_at: string
  products: Array<{
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    rating?: number
    reviews?: number
    badge?: string
    inStock?: boolean
    stockCount?: number
    flashSalePrice?: number
    discount?: number
    variants?: Array<{
      id: number
      name: string
      options: string[]
    }>
  }>
}

const FlashSale = ({ item }: { item: FlashSaleType }) => {
  const [isVisible, setIsVisible] = useState(true)

  // Hide component when countdown expires
  const handleExpired = () => {
    setIsVisible(false)
  }

  const id = useId()
  const navPrev = id + `-prev`
  const navNext = id + `-next`
  
  return (
    isVisible && (
      <div className="mb-8">
        <FlashSaleHeader
          title={item.name}
          navPrevId={navPrev}
          navNextId={navNext}
          countdownComponent={<CountdownTimer endTime={item.ends_at} onExpired={handleExpired} />}
        />
        <FlashSaleSlider products={item.products} navPrevId={navPrev} navNextId={navNext} />
      </div>
    )
  )
}

export default FlashSale
