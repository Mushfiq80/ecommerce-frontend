"use client"

import { useState } from "react"
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ProductCard } from "@/components/shared/product-card"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"

const allProducts = [
  {
    id: "1",
    name: "Quantum Organic Avocados",
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
    originalPrice: 4.99,
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
  {
    id: "6",
    name: "Plasma Orange Juice",
    price: 6.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Beverages",
    rating: 4.5,
    reviews: 92,
    badge: "Cold-Pressed",
  },
  {
    id: "7",
    name: "Fusion Quinoa Bowl",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Health Foods",
    rating: 4.7,
    reviews: 45,
    badge: "New",
  },
  {
    id: "8",
    name: "Nano Blueberries",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fruits",
    rating: 4.8,
    reviews: 67,
    badge: "Fresh",
  },
]

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Seafood", "Bakery", "Beverages", "Health Foods"]
const brands = ["Quantum Foods", "Neo Fresh", "Cyber Bakery", "Stellar Dairy", "Hydroponic Farms"]

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
    return categoryMatch && priceMatch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category])
                          } else {
                            setSelectedCategories(selectedCategories.filter((c) => c !== category))
                          }
                        }}
                      />
                      <Label htmlFor={category} className="text-muted-foreground text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Price Range</h3>
                <div className="space-y-3">
                  <Slider value={priceRange} onValueChange={setPriceRange} max={50} step={1} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBrands([...selectedBrands, brand])
                          } else {
                            setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                          }
                        }}
                      />
                      <Label htmlFor={brand} className="text-muted-foreground text-sm">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">All Products</h1>
              <p className="text-muted-foreground mt-1">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-card border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSelectedCategories([])
                  setSelectedBrands([])
                  setPriceRange([0, 50])
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
