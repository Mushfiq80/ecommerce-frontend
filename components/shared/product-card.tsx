"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/providers/cart-provider"
import { useWishlist } from "@/components/providers/wishlist-provider"

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
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
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

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && <Badge className="absolute top-2 left-2 z-10">{product.badge}</Badge>}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 z-10 bg-white/80 hover:bg-white ${
              isInWishlistState ? "text-red-500" : "text-muted-foreground"
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlistState ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{product.name}</h3>
          </div>

          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
