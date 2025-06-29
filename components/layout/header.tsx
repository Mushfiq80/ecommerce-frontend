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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Store className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold hidden sm:block">ModernMart</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10 bg-muted/50" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
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
              <div className="hidden lg:flex flex-col items-start leading-tight">
                <p className="text-muted-foreground text-xs">Wishlist</p>
                <h2 className="text-sm font-medium">{wishlistItems} items</h2>
              </div>
            </Link>

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
              <div className="hidden lg:flex flex-col items-start leading-tight">
                <p className="text-muted-foreground text-xs">Cart</p>
                <h2 className="text-sm font-medium">${totalPrice.toFixed(2)}</h2>
              </div>
            </Link>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 hover:bg-muted p-3 rounded-lg transition-colors cursor-pointer">
                  <User className="h-6 w-6 text-foreground" />
                  <div className="hidden lg:flex flex-col items-start leading-tight">
                    <p className="text-muted-foreground text-xs">Welcome</p>
                    <h2 className="text-sm font-medium">Account</h2>
                  </div>
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

            {/* Language Selector */}
            <div className="flex items-center gap-2 hover:bg-muted p-3 rounded-lg transition-colors cursor-pointer">
              <Globe className="h-6 w-6 text-foreground" />
              <div className="hidden lg:flex flex-col items-start leading-tight">
                <p className="text-muted-foreground text-xs">Language</p>
                <h2 className="text-sm font-medium">EN</h2>
              </div>
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
      </div>

      {/* Navigation Section */}
      <div className="border-t">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center py-4">
            <div className="flex items-center gap-8">
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
            </div>
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t">
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
      </div>
    </header>
  )
}
