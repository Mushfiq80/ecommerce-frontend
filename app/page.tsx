import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { CollectionSliders } from "@/components/home/collection-sliders"
import { TestimonialsSection } from "@/components/home/testimonials-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <CollectionSliders />
      <TestimonialsSection />
    </main>
  )
}
