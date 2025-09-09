"use client"

import type React from "react"
import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { AddToCartModal, type ProductForModal } from "./add-to-cart-modal"

interface ProductCardProps {
  product: {
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
    variants?: Array<{
      id: number
      name: string
      options: string[]
    }>
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    }
  }

  const isInWishlistState = isInWishlist(product.id)

  // Convert product to modal format
  const productForModal: ProductForModal = {
    ...product,
    inStock: product.inStock ?? true, // Default to true if not specified
  }

  return (
    <>
      <Link href={`/product/${product.id}`} className="group">
        <div className="bg-background rounded-md overflow-hidden border border-gray-100">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.badge && <Badge className="absolute top-1 sm:top-2 left-1 sm:left-2 z-10 text-xs">{product.badge}</Badge>}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-1 sm:top-2 right-1 sm:right-2 z-10 bg-white/80 hover:bg-white h-7 w-7 sm:h-8 sm:w-8 ${
                isInWishlistState ? "text-red-500" : "text-muted-foreground"
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isInWishlistState ? "fill-current" : ""}`} />
            </Button>
          </div>

          <div className="p-2 sm:p-4">
            <div className="mb-1 sm:mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
              <h3 className="font-semibold text-xs sm:text-sm group-hover:text-primary transition-colors leading-tight">{product.name}</h3>
            </div>

            {product.rating && (
              <div className="flex items-center gap-1 mb-1 sm:mb-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                        i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
            )}

            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-bold text-sm sm:text-lg">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="text-xs px-2 py-1 sm:px-3 sm:py-2"
              >
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" />
                <span className="hidden xs:inline sm:inline">Add</span>
                <span className="xs:hidden sm:hidden">+</span>
              </Button>
            </div>
          </div>
        </div>
      </Link>

      <AddToCartModal
        product={productForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
