"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types"
import { getCurrentUser, login as loginApi, register as registerApi, logout as logoutApi } from "@/lib/api"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: { name: string; username: string; email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeUser = async () => {
      setIsLoading(true)
      try {
        const response = await getCurrentUser()
        setUser(response.data)
      } catch (err) {
        console.error("No valid session", err)
        setUser(null) // ← IMPORTANT: just set user null, no redirect
      } finally {
        setIsLoading(false)
      }
    }
  
    initializeUser()
  }, [])  

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await loginApi(email, password)
      const response = await getCurrentUser()
      setUser(response.data)
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "Failed to login")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const registerUser = async (userData: { name: string; username: string; email: string; password: string }) => {
    setIsLoading(true)
    setError(null)

    try {
      const { user } = await registerApi(userData)
      setUser(user)
    } catch (err) {
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : "Failed to register")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logoutUser = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await logoutApi()
      setUser(null)
    } catch (err) {
      console.error("Logout error:", err)
      setError(err instanceof Error ? err.message : "Failed to logout")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
