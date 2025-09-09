"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const categories = [
  {
    id: 1,
    name: "Fresh Fruits",
    itemCount: 45,
    image: "/food1.jpg",
    href: "/category/fruits",
    children: [
      { id: 11, name: "Apples", href: "/category/apples" },
      { id: 12, name: "Bananas", href: "/category/bananas" },
      { id: 13, name: "Berries", href: "/category/berries" },
      { id: 14, name: "Citrus", href: "/category/citrus" },
    ]
  },
  {
    id: 2,
    name: "Vegetables",
    itemCount: 62,
    image: "/vegetable.jpg",
    href: "/category/vegetables",
    children: [
      { id: 21, name: "Leafy Greens", href: "/category/leafy-greens" },
      { id: 22, name: "Root Vegetables", href: "/category/root-vegetables" },
      { id: 23, name: "Peppers", href: "/category/peppers" },
      { id: 24, name: "Tomatoes", href: "/category/tomatoes" },
    ]
  },
  {
    id: 3,
    name: "Dairy Products",
    itemCount: 28,
    image: "/dairy.jpg",
    href: "/category/dairy",
    children: [
      { id: 31, name: "Milk", href: "/category/milk" },
      { id: 32, name: "Cheese", href: "/category/cheese" },
      { id: 33, name: "Yogurt", href: "/category/yogurt" },
      { id: 34, name: "Butter", href: "/category/butter" },
    ]
  },
  {
    id: 4,
    name: "Meat & Seafood",
    itemCount: 34,
    image: "/fish.jpg",
    href: "/category/meat",
    children: [
      { id: 41, name: "Fresh Fish", href: "/category/fish" },
      { id: 42, name: "Chicken", href: "/category/chicken" },
      { id: 43, name: "Beef", href: "/category/beef" },
      { id: 44, name: "Seafood", href: "/category/seafood" },
    ]
  },
  {
    id: 5,
    name: "Beverages",
    itemCount: 56,
    image: "/beverage.jpg",
    href: "/category/beverages",
    children: [
      { id: 51, name: "Juices", href: "/category/juices" },
      { id: 52, name: "Soft Drinks", href: "/category/soft-drinks" },
      { id: 53, name: "Water", href: "/category/water" },
      { id: 54, name: "Coffee & Tea", href: "/category/coffee-tea" },
    ]
  },
  {
    id: 6,
    name: "Bakery",
    itemCount: 23,
    image: "/bakery.jpg",
    href: "/category/bakery",
    children: [
      { id: 61, name: "Bread", href: "/category/bread" },
      { id: 62, name: "Pastries", href: "/category/pastries" },
      { id: 63, name: "Cakes", href: "/category/cakes" },
      { id: 64, name: "Cookies", href: "/category/cookies" },
    ]
  },
]

export function CategoriesSection() {
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({})

  const handleImageLoad = (categoryId: number) => {
    setImageLoadStates(prev => ({ ...prev, [categoryId]: true }))
  }

  const handleImageError = (categoryId: number) => {
    setImageLoadStates(prev => ({ ...prev, [categoryId]: true }))
  }

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="md:container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Product Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Explore our wide range of high-quality products organized by category for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-lg bg-muted hover:shadow-lg transition-all duration-300 block"
            >
              <div className="aspect-square relative">
                {!imageLoadStates[category.id] && (
                  <Skeleton className="absolute inset-0 w-full h-full" />
                )}
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  loading="lazy"
                  onLoad={() => handleImageLoad(category.id)}
                  onError={() => handleImageError(category.id)}
                  className={`object-cover group-hover:scale-105 transition-all duration-300 ${
                    imageLoadStates[category.id] ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white">
                  <h3 className="text-sm md:text-xl font-semibold mb-1">{category.name}</h3>
                </div>
              </div>

              {/* Sub-categories overlay */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-3 md:p-4">
                <h4 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-center text-white">
                  {category.name}
                </h4>
                <div className="space-y-1 md:space-y-2">
                  {category.children?.slice(0, 4).map((subCategory) => (
                    <Link key={subCategory.id} href={subCategory.href}>
                      <button className="block text-xs md:text-sm text-white/80 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/20 relative z-10 w-full text-left cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>{subCategory.name}</span>
                        </div>
                      </button>
                    </Link>
                  ))}
                  <Separator className="my-2 md:my-3" />
                  <div className="flex justify-center">
                    <Button 
                      size="sm"
                      className="bg-white text-black hover:bg-white/90 text-xs font-medium cursor-pointer"
                    >
                      View All →
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
