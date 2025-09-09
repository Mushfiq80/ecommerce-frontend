"use client"

import FlashSale from "./flash-sale"

// Dummy flash sale data
const flashSales = [
  {
    id: 1,
    name: "Weekend Flash Sale",
    ends_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    products: [
      {
        id: "fs1",
        name: "Organic Avocados",
        price: 3.99,
        originalPrice: 5.99,
        image: "/fp1.jpg",
        category: "Fruits",
        rating: 4.8,
        reviews: 145,
        badge: "50% OFF",
        inStock: true,
        stockCount: 20,
        flashSalePrice: 2.99,
        discount: 50,
      },
      {
        id: "fs2",
        name: "Premium Salmon Fillet",
        price: 18.99,
        originalPrice: 25.99,
        image: "/fp2.jpg",
        category: "Seafood",
        rating: 4.9,
        reviews: 89,
        badge: "27% OFF",
        inStock: true,
        stockCount: 12,
        flashSalePrice: 18.99,
        discount: 27,
      },
      {
        id: "fs3",
        name: "Artisan Sourdough Bread",
        price: 4.49,
        originalPrice: 6.99,
        image: "/fp3.jpg",
        category: "Bakery",
        rating: 4.7,
        reviews: 234,
        badge: "36% OFF",
        inStock: true,
        stockCount: 8,
        flashSalePrice: 4.49,
        discount: 36,
      },
      {
        id: "fs4",
        name: "Organic Baby Spinach",
        price: 2.99,
        originalPrice: 4.49,
        image: "/fp4.jpg",
        category: "Vegetables",
        rating: 4.6,
        reviews: 167,
        badge: "33% OFF",
        inStock: true,
        stockCount: 25,
        flashSalePrice: 2.99,
        discount: 33,
      },
      {
        id: "fs5",
        name: "Greek Yogurt",
        price: 3.99,
        originalPrice: 5.99,
        image: "/fp5.jpg",
        category: "Dairy",
        rating: 4.8,
        reviews: 198,
        badge: "33% OFF",
        inStock: true,
        stockCount: 15,
        flashSalePrice: 3.99,
        discount: 33,
      },
      {
        id: "fs6",
        name: "Free-Range Chicken Breast",
        price: 12.99,
        originalPrice: 16.99,
        image: "/fp6.jpg",
        category: "Meat",
        rating: 4.9,
        reviews: 123,
        badge: "24% OFF",
        inStock: true,
        stockCount: 10,
        flashSalePrice: 12.99,
        discount: 24,
      },
    ]
  }
]

export function FlashSaleCollection() {
  return flashSales.length > 0 ? (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {flashSales.map((item, index) => (
          <FlashSale item={item} key={index} />
        ))}
      </div>
    </section>
  ) : null
}
