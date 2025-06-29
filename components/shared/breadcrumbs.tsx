import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
          {index === items.length - 1 ? (
            <span className="text-cyan-400 font-medium">{item.name}</span>
          ) : (
            <Link href={item.href} className="hover:text-cyan-400 transition-colors">
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
