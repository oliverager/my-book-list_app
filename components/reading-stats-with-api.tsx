"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, TrendingUp } from "lucide-react"
import { getReadingStats } from "@/lib/api"
import type { ReadingStat } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

export function ReadingStatsWithApi() {
  const [stats, setStats] = useState<ReadingStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const response = await getReadingStats()
        setStats(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching reading stats:", err)
        setError("Failed to load reading statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="h-4 w-4 text-muted-foreground" />
      case "TrendingUp":
        return <TrendingUp className="h-4 w-4 text-muted-foreground" />
      case "Clock":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  if (loading) {
    return <ReadingStatsSkeleton />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {getIcon(stat.icon)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

function ReadingStatsSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      ))}
    </>
  )
}
