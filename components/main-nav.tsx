"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-contexts"
import { BookOpen, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Navigation items for authenticated users
  const authenticatedNavItems = [
    { href: "/", label: "Home" },
    { href: "/books", label: "My List" },
    { href: "/discover", label: "Discover" },
  ]

  // Navigation items for guests (non-authenticated users)
  const guestNavItems = [{ href: "/discover", label: "Discover" }]

  // Choose which nav items to display based on authentication status
  const navItems = user ? authenticatedNavItems : guestNavItems

  return (
    <nav className="flex items-center space-x-6">
      {/* Logo for mobile - only show on small screens */}
      <Link href="/" className="md:hidden flex items-center">
        <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
        <span className="font-bold">BookList</span>
      </Link>

      {/* Navigation links */}
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-red-500" : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}

      {/* Auth buttons for guests - only show when not authenticated */}
      {!user && (
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login" className="flex items-center">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register" className="flex items-center">
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
