"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { getBooks } from "@/lib/api"
import type { Book } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

interface BookListProps {
  searchQuery?: string
  statusFilter?: string
  categoryFilter?: string
}

export function BookListWithApi({ searchQuery, statusFilter, categoryFilter }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
  })

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        const response = await getBooks({
          search: searchQuery,
          status: statusFilter,
          category: categoryFilter,
          page: pagination.page,
          limit: pagination.limit,
        })
        setBooks(response.data)
        setPagination({
          total: response.total,
          page: response.page,
          limit: response.limit,
        })
        setError(null)
      } catch (err) {
        console.error("Error fetching books:", err)
        setError("Failed to load books. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [searchQuery, statusFilter, categoryFilter, pagination.page, pagination.limit])

  if (loading) {
    return <BookListSkeleton />
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  if (books.length === 0) {
    return <div className="p-4 text-center">No books found. Try adjusting your filters.</div>
  }

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead className="w-[120px]">Image</TableHead>
            <TableHead>Book title</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Categories</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>
                <div className="h-[150px] w-[100px] relative">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              </TableCell>
              <TableCell className="text-lg font-medium">{book.title}</TableCell>
              <TableCell>{book.score}</TableCell>
              <TableCell>
                <Badge
                  variant={book.status === "Read" ? "default" : book.status === "Reading" ? "secondary" : "outline"}
                >
                  {book.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="text-sm">
                    {book.progress.current}/{book.progress.total}
                  </div>
                  <Progress value={(book.progress.current / book.progress.total) * 100} className="h-2 w-[100px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {book.categories.map((category) => {
                    let variant: "default" | "secondary" | "outline" = "default"

                    if (category === "Romance") {
                      variant = "secondary"
                    } else if (category === "Young adults") {
                      variant = "default"
                    }

                    return (
                      <Badge key={category} variant={variant} className="bg-blue-500">
                        {category}
                      </Badge>
                    )
                  })}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function BookListSkeleton() {
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead className="w-[120px]">Image</TableHead>
            <TableHead>Book title</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Categories</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-6 w-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[150px] w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[200px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20" />
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-2 w-[100px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
