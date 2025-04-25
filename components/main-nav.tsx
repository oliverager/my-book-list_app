"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-red-500" : "text-muted-foreground",
        )}
      >
        Home
      </Link>
      <Link
        href="/books"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/books" ? "text-red-500" : "text-muted-foreground",
        )}
      >
        My List
      </Link>
      <Link
        href="/discover"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/discover" ? "text-red-500" : "text-muted-foreground",
        )}
      >
        Discover
      </Link>
    </nav>
  )
}
