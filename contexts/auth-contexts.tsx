"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useMemo } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/types"
import { getCurrentUser, login as loginApi, register as registerApi, logout as logoutApi } from "@/lib/api"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<User>
  register: (userData: { name: string; username: string; email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const initializeUser = async () => {
      setIsLoading(true)
      try {
        const response = await getCurrentUser()
        setUser(response)
      } catch (err) {
        console.error("No valid session", err)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initializeUser()

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth_state_change") {
        initializeUser()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const loginUser = async (email: string, password: string): Promise<User> => {
    setIsLoading(true)
    setError(null)

    try {
      await loginApi(email, password)
      const response = await getCurrentUser()
      setUser(response)

      localStorage.setItem("auth_state_change", Date.now().toString())

      // OPTIONAL: redirect after login
      router.push("/")

      return response
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
      await registerApi(userData)
      // You might want to automatically login the user after register here too
      // await loginApi(userData.email, userData.password)
      // const response = await getCurrentUser()
      // setUser(response)
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
      localStorage.setItem("auth_state_change", Date.now().toString())

      // OPTIONAL: redirect after logout
      router.push("/login")
    } catch (err) {
      console.error("Logout error:", err)
      setError(err instanceof Error ? err.message : "Failed to logout")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      error,
      login: loginUser,
      register: registerUser,
      logout: logoutUser,
      clearError,
    }),
    [user, isLoading, error]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
