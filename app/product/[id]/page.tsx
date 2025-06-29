"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/providers/cart-provider"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { ProductCard } from "@/components/shared/product-card"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"

// Mock product data
const product = {
  id: "1",
  name: "Quantum Organic Avocados",
  price: 4.99,
  originalPrice: 6.99,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  category: "Fruits",
  rating: 4.8,
  reviews: 124,
  badge: "Organic",
  description:
    "Premium organic avocados grown using advanced hydroponic technology. These nutrient-rich fruits are perfect for your healthy lifestyle.",
  features: [
    "100% Organic Certified",
    "Grown with Hydroponic Technology",
    "Rich in Healthy Fats",
    "Perfect Ripeness Guaranteed",
    "Sustainably Sourced",
  ],
  nutrition: {
    calories: "160 per avocado",
    fat: "15g",
    carbs: "9g",
    protein: "2g",
    fiber: "7g",
  },
  inStock: true,
  stockCount: 25,
}

const similarProducts = [
  {
    id: "2",
    name: "Neo-Fresh Salmon Fillet",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Seafood",
    rating: 4.9,
    reviews: 89,
    badge: "Fresh",
  },
  {
    id: "3",
    name: "Cyber Sourdough Bread",
    price: 5.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bakery",
    rating: 4.7,
    reviews: 156,
    badge: "Artisan",
  },
  {
    id: "4",
    name: "Stellar Greek Yogurt",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Dairy",
    rating: 4.6,
    reviews: 203,
    badge: "Premium",
  },
  {
    id: "5",
    name: "Hydroponic Baby Spinach",
    price: 2.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vegetables",
    rating: 4.8,
    reviews: 78,
    badge: "Organic",
  },
]

const reviews = [
  {
    id: 1,
    name: "Sarah Chen",
    rating: 5,
    date: "2024-01-15",
    comment: "Amazing quality! These avocados are perfectly ripe and taste incredible. Will definitely order again.",
    verified: true,
  },
  {
    id: 2,
    name: "Mike Johnson",
    rating: 5,
    date: "2024-01-10",
    comment:
      "Best avocados I've ever had. The hydroponic growing method really makes a difference in taste and texture.",
    verified: true,
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 4,
    date: "2024-01-08",
    comment: "Great product, arrived fresh and well-packaged. Slightly expensive but worth it for the quality.",
    verified: true,
  },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })
    }
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: product.category, href: `/category/${product.category.toLowerCase()}` },
          { name: product.name, href: `/product/${product.id}` },
        ]}
      />

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-card text-card-foreground border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.badge && <Badge className="absolute top-4 left-4">{product.badge}</Badge>}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-muted"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground text-sm uppercase tracking-wide mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="space-y-4 mb-6">
              <h3 className="font-semibold">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-lg border-muted">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center border-x border-muted">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">{product.stockCount} in stock</span>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlistToggle}
                className={`border-muted ${
                  isInWishlist(product.id) ? "text-red-500 border-red-500" : "text-muted-foreground"
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-muted">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Quality Guarantee</p>
                <p className="text-xs text-muted-foreground">100% satisfaction</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <RotateCcw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="grid w-full grid-cols-3 bg-secondary border-muted">
          <TabsTrigger
            value="description"
            className="data-[state=active]:bg-secondary/50 data-[state=active]:text-primary"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="nutrition"
            className="data-[state=active]:bg-secondary/50 data-[state=active]:text-primary"
          >
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="reviews" className="data-[state=active]:bg-secondary/50 data-[state=active]:text-primary">
            Reviews ({product.reviews})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card className="bg-card text-card-foreground border">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">{product.description}</p>
              <h4 className="font-semibold mb-3">Product Features:</h4>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition" className="mt-6">
          <Card className="bg-card text-card-foreground border">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4">Nutritional Information</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(product.nutrition).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-secondary rounded-lg">
                    <p className="text-2xl font-bold text-primary">{value}</p>
                    <p className="text-sm text-muted-foreground capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card className="bg-card text-card-foreground border">
            <CardContent className="p-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-muted pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h5 className="font-semibold">{review.name}</h5>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Similar Products */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
