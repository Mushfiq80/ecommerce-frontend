import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { CartProvider } from "@/components/providers/cart-provider"
import { WishlistProvider } from "@/components/providers/wishlist-provider"
import { Layout } from "@/components/layout/layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ModernMart - Premium E-commerce Experience",
  description: "Discover premium products with exceptional quality and service",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <WishlistProvider>
              <Layout>{children}</Layout>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
