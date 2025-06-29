import { ProductCard } from "@/components/shared/product-card"

const featuredProducts = [
  {
    id: "1",
    name: "Organic Avocados",
    price: 4.99,
    originalPrice: 6.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fruits",
    rating: 4.8,
    reviews: 124,
    badge: "Organic",
  },
  {
    id: "2",
    name: "Fresh Salmon Fillet",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Seafood",
    rating: 4.9,
    reviews: 89,
    badge: "Fresh",
  },
  {
    id: "3",
    name: "Artisan Sourdough Bread",
    price: 5.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bakery",
    rating: 4.7,
    reviews: 156,
    badge: "Artisan",
  },
  {
    id: "4",
    name: "Premium Greek Yogurt",
    price: 3.99,
    originalPrice: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Dairy",
    rating: 4.6,
    reviews: 203,
    badge: "Premium",
  },
  {
    id: "5",
    name: "Organic Baby Spinach",
    price: 2.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vegetables",
    rating: 4.8,
    reviews: 78,
    badge: "Organic",
  },
  {
    id: "6",
    name: "Cold-Pressed Orange Juice",
    price: 6.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Beverages",
    rating: 4.5,
    reviews: 92,
    badge: "Cold-Pressed",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, chosen for their exceptional quality and value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
