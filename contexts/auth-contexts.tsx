"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types"
import { getCurrentUser, login, register, logout } from "@/lib/api"

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
    // Check if user is logged in on initial load
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser()
        setUser(response.data)
      } catch (err) {
        // User is not logged in, which is fine
        console.log("User not logged in", err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await login(email, password)
      setUser(response.data.user)
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
      const { user, message } = await register(userData)
      setUser(user)
      console.log(message) // Optional: display this in a toast or banner
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
      await logout()
      setUser(null)
    } catch (err) {
      console.error("Logout error:", err)
      setError(err instanceof Error ? err.message : "Failed to logout")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

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
