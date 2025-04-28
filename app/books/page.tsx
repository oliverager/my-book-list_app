"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { BookListWithApi } from "@/components/book-list-with-api"
import { SearchBar } from "@/components/search-bar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookCategory } from "@/types"

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-sm">
        <header className="flex items-center justify-between border-b p-4">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-black">My Book List</h1>
            <MainNav />
          </div>
          <UserNav />
        </header>

        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Books</h1>
            <Button asChild>
              <Link href="/add-book">
                <Plus className="mr-2 h-4 w-4" /> Add Book
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SearchBar onSearch={setSearchQuery} className="md:w-1/3" />

            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Reading">Reading</SelectItem>
                  <SelectItem value="Read">Read</SelectItem>
                  <SelectItem value="Plan to read">Plan to read</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
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
            </div>
          </div>

          <BookListWithApi searchQuery={searchQuery} statusFilter={statusFilter} categoryFilter={categoryFilter} />
        </div>
      </div>
    </main>
  )
}
