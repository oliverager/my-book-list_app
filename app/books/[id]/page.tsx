"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getBook, updateBookProgress, deleteBook } from "@/lib/api"
import type { Book } from "@/types"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { BookCard } from "@/components/book-card"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Edit,
  Star,
  Trash2,
  BookMarked,
  Share2,
  Bookmark,
  Clock,
  BarChart3,
} from "lucide-react"

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [updatingProgress, setUpdatingProgress] = useState(false)
  const [deletingBook, setDeletingBook] = useState(false)

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true)
      try {
        const response = await getBook(params.id)
        setBook(response.data)
        setCurrentPage(response.data.progress.current)

        // In a real app, you would fetch related books based on categories
        // For now, we'll simulate this with a mock API call
        const mockRelatedBooks = await getBook(params.id)
        setRelatedBooks([mockRelatedBooks.data])
      } catch (err) {
        console.error("Error fetching book:", err)
        setError("Failed to load book details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [params.id])

  const handleProgressUpdate = async () => {
    if (!book) return

    setUpdatingProgress(true)
    try {
      await updateBookProgress(book.id, {
        current: currentPage,
        total: book.progress.total,
      })

      // Update local state
      setBook({
        ...book,
        progress: {
          ...book.progress,
          current: currentPage,
        },
      })

      toast({
        title: "Progress updated",
        description: `Your reading progress has been updated to ${currentPage} of ${book.progress.total} pages.`,
      })
    } catch (err) {
      console.error("Error updating progress:", err)
      toast({
        title: "Error",
        description: "Failed to update reading progress. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUpdatingProgress(false)
    }
  }

  const handleDeleteBook = async () => {
    if (!book) return

    setDeletingBook(true)
    try {
      await deleteBook(book.id)

      toast({
        title: "Book deleted",
        description: `"${book.title}" has been removed from your book list.`,
      })

      router.push("/books")
    } catch (err) {
      console.error("Error deleting book:", err)
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      })
      setDeletingBook(false)
    }
  }

  // Extract score as a number for rendering stars
  const scoreValue = book?.score ? Number.parseFloat(book.score.split("/")[0]) : 0
  const maxScore = book?.score ? Number.parseFloat(book.score.split("/")[1]) : 5
  const normalizedScore = (scoreValue / maxScore) * 5 // Normalize to a 5-star scale

  if (loading) {
    return <BookDetailSkeleton />
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-sm">
          <header className="flex items-center justify-between border-b p-4 dark:border-gray-700">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold">My Book List</h1>
              <MainNav />
            </div>
            <UserNav />
          </header>

          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "Book not found"}</p>
            <Button asChild>
              <Link href="/books">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Books
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const progressPercentage = (book.progress.current / book.progress.total) * 100

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-sm">
        <header className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold">My Book List</h1>
            <MainNav />
          </div>
          <UserNav />
        </header>

        <div className="p-6">
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/books">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Link>
          </Button>

          {/* Book details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - Book cover and actions */}
            <div className="md:col-span-1">
              <div className="relative aspect-[2/3] w-full max-w-[300px] mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(normalizedScore)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < normalizedScore
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
                            : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-medium">{book.score}</span>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <Button className="flex-1" asChild>
                    <Link href={`/books/${book.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex-1">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete "{book.title}" from your book list. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteBook}
                          disabled={deletingBook}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {deletingBook ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" className="flex-1">
                    <BookMarked className="mr-2 h-4 w-4" />
                    Add to List
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Right column - Book information */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">by {book.author}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {book.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <p className="font-medium">{book.status}</p>
                  </div>
                </div>
                {book.publishedDate && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Published</p>
                      <p className="font-medium">{book.publishedDate}</p>
                    </div>
                  </div>
                )}
                {book.isbn && (
                  <div className="flex items-center">
                    <Bookmark className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">ISBN</p>
                      <p className="font-medium">{book.isbn}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pages</p>
                    <p className="font-medium">{book.progress.total}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {book.description || "No description available for this book."}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">Reading Progress</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {book.progress.current} of {book.progress.total} pages
                    </span>
                    <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />

                  {book.status === "Reading" && (
                    <div className="pt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Update progress:</span>
                        <span className="text-sm font-medium">
                          {currentPage} / {book.progress.total} pages
                        </span>
                      </div>
                      <Slider
                        value={[currentPage]}
                        min={0}
                        max={book.progress.total}
                        step={1}
                        onValueChange={(value) => setCurrentPage(value[0])}
                        className="mb-4"
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleProgressUpdate} disabled={updatingProgress}>
                          {updatingProgress ? "Updating..." : "Update Progress"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs section */}
          <div className="mt-12">
            <Tabs defaultValue="related">
              <TabsList className="mb-4">
                <TabsTrigger value="related">Related Books</TabsTrigger>
                <TabsTrigger value="stats">Reading Stats</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="related">
                <h2 className="text-xl font-bold mb-4">Related Books</h2>
                {relatedBooks.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {relatedBooks.map((relatedBook) => (
                      <BookCard key={relatedBook.id} book={relatedBook} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No related books found.</p>
                )}
              </TabsContent>
              <TabsContent value="stats">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                      <h3 className="text-lg font-medium">Reading Statistics</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      This would show reading statistics in a real application.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notes">
                <div className="border rounded-lg p-6 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-4">Your Notes</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You haven't added any notes for this book yet. Notes would be displayed here in a real application.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}

function BookDetailSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-sm">
        <header className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold">My Book List</h1>
            <MainNav />
          </div>
          <UserNav />
        </header>

        <div className="p-6">
          <div className="h-10 w-24 mb-6">
            <Skeleton className="h-full w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - Book cover and actions */}
            <div className="md:col-span-1">
              <Skeleton className="aspect-[2/3] w-full max-w-[300px] mx-auto mb-6 rounded-lg" />

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-6 rounded-full" />
                  ))}
                  <Skeleton className="h-6 w-12 ml-2" />
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 flex-1" />
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 flex-1" />
                </div>
              </div>
            </div>

            {/* Right column - Book information */}
            <div className="md:col-span-2">
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />

              <div className="flex flex-wrap gap-2 mb-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20" />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-5 w-5 mr-2" />
                    <div>
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <Skeleton className="h-8 w-40 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="mb-8">
                <Skeleton className="h-8 w-40 mb-3" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex gap-2 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
            <Skeleton className="h-8 w-40 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col">
                  <Skeleton className="aspect-[2/3] w-full mb-2" />
                  <Skeleton className="h-5 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
