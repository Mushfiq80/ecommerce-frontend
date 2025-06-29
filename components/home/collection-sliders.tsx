"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/shared/product-card"

const newArrivals = [
  {
    id: "7",
    name: "Organic Quinoa Bowl",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Health Foods",
    rating: 4.7,
    reviews: 45,
    badge: "New",
  },
  {
    id: "8",
    name: "Fresh Blueberries",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fruits",
    rating: 4.8,
    reviews: 67,
    badge: "Fresh",
  },
  {
    id: "9",
    name: "Almond Milk",
    price: 4.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "Dairy Alternatives",
    rating: 4.6,
    reviews: 123,
    badge: "Plant-Based",
  },
  {
    id: "10",
    name: "Grass-Fed Beef",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Meat",
    rating: 4.9,
    reviews: 34,
    badge: "Grass-Fed",
  },
  {
    id: "11",
    name: "Organic Kale",
    price: 3.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vegetables",
    rating: 4.5,
    reviews: 89,
    badge: "Organic",
  },
]

const organicProducts = [
  {
    id: "12",
    name: "Organic Tomatoes",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vegetables",
    rating: 4.8,
    reviews: 156,
    badge: "Organic",
  },
  {
    id: "13",
    name: "Organic Honey",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pantry",
    rating: 4.9,
    reviews: 78,
    badge: "Raw",
  },
  {
    id: "14",
    name: "Organic Chicken Breast",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Meat",
    rating: 4.7,
    reviews: 92,
    badge: "Free-Range",
  },
  {
    id: "15",
    name: "Organic Pasta",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pantry",
    rating: 4.6,
    reviews: 134,
    badge: "Whole Grain",
  },
  {
    id: "16",
    name: "Organic Coconut Oil",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Oils",
    rating: 4.8,
    reviews: 67,
    badge: "Virgin",
  },
]

interface CollectionSliderProps {
  title: string
  products: any[]
  autoAdvance?: boolean
}

function CollectionSlider({ title, products, autoAdvance = true }: CollectionSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  useEffect(() => {
    if (!autoAdvance) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - itemsPerView + 1))
    }, 4000)

    return () => clearInterval(timer)
  }, [products.length, itemsPerView, autoAdvance])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - itemsPerView + 1))
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, products.length - itemsPerView + 1)) % Math.max(1, products.length - itemsPerView + 1),
    )
  }

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CollectionSliders() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <CollectionSlider title="New Arrivals" products={newArrivals} />
        <CollectionSlider title="Organic Products" products={organicProducts} />
      </div>
    </section>
  )
}
