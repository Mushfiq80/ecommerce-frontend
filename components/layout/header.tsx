"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Search, Sun, Moon, Heart, ShoppingCart, User, Globe, Menu, X, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/components/providers/cart-provider"
import { useWishlist } from "@/components/providers/wishlist-provider"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { totalItems, totalPrice } = useCart()
  const { totalItems: wishlistItems } = useWishlist()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Group 1: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Store className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold hidden sm:block">ModernMart</span>
            </Link>
          </div>

          {/* Group 2: Navigation Links */}
          <div className="flex items-center">
            <nav className="hidden lg:flex items-center gap-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Group 3: Action Icons */}
          <div className="flex items-center gap-2">
            {/* Shopping Cart */}
            <Link href="/cart" className="flex items-center gap-2 hover:bg-muted p-3 rounded-lg transition-colors">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-foreground" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </div>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="flex items-center gap-2 hover:bg-muted p-3 rounded-lg transition-colors">
              <div className="relative">
                <Heart className="h-6 w-6 text-foreground" />
                {wishlistItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {wishlistItems}
                  </Badge>
                )}
              </div>
            </Link>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 hover:bg-muted p-3 rounded-lg transition-colors cursor-pointer">
                  <User className="h-6 w-6 text-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Create Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">My Account</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <div
              className="flex items-center gap-2 hover:bg-muted p-3 rounded-lg transition-colors cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-6 w-6 text-foreground" />
              ) : (
                <Moon className="h-6 w-6 text-foreground" />
              )}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 hover:bg-muted p-3 rounded-lg transition-colors cursor-pointer">
              <Globe className="h-6 w-6 text-foreground" />
            </div>

            {/* Search Toggle */}
            <div 
              className="flex items-center gap-2 hover:bg-muted p-3 rounded-lg transition-colors cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-6 w-6 text-foreground" />
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t mt-4">
            <div className="flex flex-col gap-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-start justify-center pt-20">
          <div className="bg-background border border-border rounded-lg shadow-2xl w-full max-w-2xl mx-4 animate-in slide-in-from-top-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Search Products</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for products, categories, brands..." 
                  className="pl-12 pr-4 py-3 text-lg bg-muted/50 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  autoFocus
                />
              </div>

              {/* Quick Search Suggestions */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Organic Fruits", "Fresh Vegetables", "Seafood", "Bakery Items", "Dairy Products"].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      className="text-xs hover:bg-primary hover:text-primary-foreground"
                      onClick={() => {
                        // Handle search term click
                        setIsSearchOpen(false)
                      }}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div className="space-y-3 mt-6">
                <p className="text-sm font-medium text-muted-foreground">Recent Searches</p>
                <div className="space-y-2">
                  {["Quantum Avocados", "Neo-Fresh Salmon", "Artisan Bread"].map((term) => (
                    <div
                      key={term}
                      className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        // Handle recent search click
                        setIsSearchOpen(false)
                      }}
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
