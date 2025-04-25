"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { getBooks } from "@/lib/api"
import type { Book } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

export function BookCarouselWithApi() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startIndex, setStartIndex] = useState(0)

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        const response = await getBooks({ status: "Reading", limit: 10 })
        setBooks(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching books:", err)
        setError("Failed to load books")
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const visibleBooks = books.slice(startIndex, startIndex + 3)

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 1))
  }

  const handleNext = () => {
    setStartIndex(Math.min(books.length - 3, startIndex + 1))
  }

  if (loading) {
    return <BookCarouselSkeleton />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (books.length === 0) {
    return <div className="text-center p-4">No books currently being read.</div>
  }

  return (
    <div className="relative">
      <div className="flex space-x-6 overflow-hidden">
        {visibleBooks.map((book) => (
          <Link href={`/books/${book.id}`} key={book.id} className="block">
            <Card className="w-[200px] transition-all hover:shadow-md">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="relative h-[250px] w-[170px] mb-4">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
                <h3 className="font-semibold text-center line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground text-center mb-2">{book.author}</p>
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>
                      {book.progress.current}/{book.progress.total}
                    </span>
                  </div>
                  <Progress value={(book.progress.current / book.progress.total) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {startIndex > 0 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {startIndex < books.length - 3 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white"
          onClick={handleNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

function BookCarouselSkeleton() {
  return (
    <div className="flex space-x-6 overflow-hidden">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="w-[200px]">
          <CardContent className="p-4 flex flex-col items-center">
            <Skeleton className="h-[250px] w-[170px] mb-4" />
            <Skeleton className="h-5 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[120px] mb-4" />
            <div className="w-full space-y-1">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-10" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
