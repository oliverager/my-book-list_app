"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { User, LogIn, UserPlus } from "lucide-react"
import { useAuth } from "@/contexts/auth-contexts"
import Link from "next/link"

export function UserNav() {
  const { user, logout, isLoading } = useAuth()

  // If auth state is loading, show only the theme toggle
  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    )
  }

  // If user is not authenticated, show login/register buttons
  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* Show these buttons only on mobile */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <LogIn className="h-5 w-5" />
              <span className="sr-only">Login</span>
            </Link>
          </Button>
          <Button size="icon" asChild>
            <Link href="/register">
              <UserPlus className="h-5 w-5" />
              <span className="sr-only">Register</span>
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // If user is authenticated, show user dropdown
  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-6 w-6" />}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/books">My Books</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
