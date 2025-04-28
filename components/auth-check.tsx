"use client"

import { useAuth } from "@/contexts/auth-contexts"
import type { ReactNode } from "react"
import { Loader2 } from "lucide-react"

interface AuthCheckProps {
  children: ReactNode
  fallback: ReactNode
}

export function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { user, isLoading } = useAuth()

  // Show a loading indicator while checking authentication status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg text-gray-600">Loading...</span>
      </div>
    )
  }

  return user ? <>{children}</> : <>{fallback}</>
}
