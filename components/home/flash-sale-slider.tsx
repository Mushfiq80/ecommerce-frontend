"use client"

import { ChevronLeft, ChevronRight, Flame } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/shared/product-card"

interface Product {
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
}

interface FlashSaleSliderProps {
  products: Product[]
  navPrevId: string
  navNextId: string
}

export function FlashSaleSlider({ products, navPrevId, navNextId }: FlashSaleSliderProps) {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        navigation={{
          prevEl: `#${navPrevId}`,
          nextEl: `#${navNextId}`,
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="flash-sale-swiper !pb-1"
        watchSlidesProgress={true}
      >
        {products.map((product: Product, idx: number) => (
          <SwiperSlide key={`flash-sale-product-${product.id}-${idx}`} className="!h-auto !flex lg:!block">
            <div className="relative w-full">
              {/* Flash Sale Badge */}
              <div className="absolute top-1 sm:top-2 right-1 sm:right-2 z-10">
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Flame className="h-3 w-3" />
                  <span className="hidden sm:inline">FLASH</span>
                </div>
              </div>
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-1 sm:top-2 left-1 sm:left-2 z-10">
                  <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    -{product.discount}%
                  </div>
                </div>
              )}
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center gap-2 mt-6">
        <Button variant="outline" size="icon" id={`${navPrevId}-mobile`} className="hover:bg-muted border-border">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" id={`${navNextId}-mobile`} className="hover:bg-muted border-border">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
