import type React from "react"
import { Header } from "./header"
import { AnnouncementBar } from "./announcement-bar"
import { Footer } from "./footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      {children}
      <Footer />
    </div>
  )
}
