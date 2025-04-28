"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { BookCategory } from "@/types"
import { getBooks } from "@/lib/api"
import type { Book } from "@/types"
import { BookOpen, TrendingUp, Clock, Filter } from "lucide-react"

export default function DiscoverPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([])
  const [newReleases, setNewReleases] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("popularity")
  const [view, setView] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        // Fetch all books for the main discover section
        const response = await getBooks({
          search: searchQuery,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          limit: 12,
        })
        setBooks(response.data)

        // Fetch featured books (in a real app, this would be a separate API call)
        const featuredResponse = await getBooks({ limit: 4 })
        setFeaturedBooks(featuredResponse.data.slice(0, 4))

        // Fetch new releases (in a real app, this would filter by publication date)
        const newReleasesResponse = await getBooks({ limit: 6 })
        setNewReleases(newReleasesResponse.data.slice(0, 6))
      } catch (error) {
        console.error("Error fetching books:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white shadow-sm">
        <header className="flex items-center justify-between border-b p-4">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-black">My Book List</h1>
            <MainNav />
          </div>
          <UserNav />
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-10 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-md">Discover Your Next Favorite Book</h1>
            <p className="text-lg mb-6 text-white drop-shadow-md max-w-2xl mx-auto">
              Explore our curated collection of books across various genres and find your next great read.
            </p>
            <div className="max-w-lg mx-auto">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search by title, author, or ISBN..."
                className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="py-8 px-6">
          <h2 className="text-2xl font-bold mb-6 text-black flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
            Featured Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[250px] w-full rounded-md" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : featuredBooks.map((book) => <BookCard key={book.id} book={book} featured />)}
          </div>
        </section>

        {/* New Releases */}
        <section className="py-8 px-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-black flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-500" />
            New Releases
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col space-y-2">
                    <Skeleton className="h-[180px] w-full rounded-md" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))
              : newReleases.map((book) => <BookCard key={book.id} book={book} compact />)}
          </div>
        </section>

        {/* Main Discover Section */}
        <section className="py-8 px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-black flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-green-500" />
              Browse Books
            </h2>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.values(BookCategory).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex rounded-md border overflow-hidden">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setView("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setView("list")}
                >
                  List
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Books</TabsTrigger>
              <TabsTrigger value="fiction">Fiction</TabsTrigger>
              <TabsTrigger value="nonfiction">Non-Fiction</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              {loading ? (
                <div
                  className={
                    view === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col space-y-4"
                  }
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={view === "grid" ? "flex flex-col space-y-3" : "flex gap-4 p-4 border rounded-md"}
                    >
                      <Skeleton
                        className={view === "grid" ? "h-[250px] w-full rounded-md" : "h-[150px] w-[100px] rounded-md"}
                      />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-2" />
                        {view === "list" && (
                          <>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full" />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : books.length > 0 ? (
                <div
                  className={
                    view === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col space-y-4"
                  }
                >
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} view={view} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="fiction" className="mt-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Fiction Books</h3>
                <p className="text-gray-500">This tab would show fiction books in a real application.</p>
              </div>
            </TabsContent>
            <TabsContent value="nonfiction" className="mt-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Non-Fiction Books</h3>
                <p className="text-gray-500">This tab would show non-fiction books in a real application.</p>
              </div>
            </TabsContent>
            <TabsContent value="recommended" className="mt-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Recommended For You</h3>
                <p className="text-gray-500">This tab would show personalized recommendations in a real application.</p>
              </div>
            </TabsContent>
          </Tabs>

          {!loading && books.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="py-6 px-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2023 My Book List. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Help
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
