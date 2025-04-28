"use client"

import { useAuth } from "@/contexts/auth-contexts"
import type { ReactNode } from "react"

interface AuthCheckProps {
  children: ReactNode
  fallback: ReactNode
}

export function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { user } = useAuth()

  return user ? <>{children}</> : <>{fallback}</>
}
