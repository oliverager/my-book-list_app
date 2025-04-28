"use client"

import { BookCarouselWithApi } from "@/components/book-carousel-with-api"
import { ReadingStatsWithApi } from "@/components/reading-stats-with-api"
import { ReadingGoals } from "@/components/reading-goals"
import { RecentActivity } from "@/components/recent-activity"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { BookOpen, ListChecks, TrendingUp } from "lucide-react"
import Link from "next/link"
import { GuestWelcome } from "@/components/guest-welcome"
import { AuthCheck } from "@/components/auth-check"
import { useAuth } from "@/contexts/auth-contexts"

export default function Home() {
  const { isLoading } = useAuth()

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

        <AuthCheck fallback={<GuestWelcome />}>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-md">Track Your Reading Journey</h1>
              <p className="text-lg mb-6 text-white drop-shadow-md">
                Keep track of your books, set reading goals, and discover your next favorite read.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="secondary" className="font-semibold">
                  <Link href="/books">View My Books</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10 font-semibold"
                >
                  <Link href="/add-book">Add New Book</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Currently Reading Section */}
          <section className="py-8 px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">Currently Reading</h2>
              <Button variant="ghost" asChild>
                <Link href="/books">View All</Link>
              </Button>
            </div>
            <BookCarouselWithApi />
          </section>

          {/* Stats Section */}
          <section className="py-8 px-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6 text-black">Reading Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ReadingStatsWithApi />
            </div>
          </section>

          {/* Reading Goals */}
          <section className="py-8 px-6">
            <h2 className="text-2xl font-bold mb-6 text-black">Reading Goals</h2>
            <ReadingGoals />
          </section>

          {/* Recent Activity */}
          <section className="py-8 px-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6 text-black">Recent Activity</h2>
            <RecentActivity />
          </section>

          {/* Features Section */}
          <section className="py-12 px-6">
            <h2 className="text-2xl font-bold mb-8 text-center text-black">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">Track Your Books</h3>
                <p className="text-gray-600">
                  Keep a record of books you've read, are currently reading, or plan to read in the future.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">Track Your Progress</h3>
                <p className="text-gray-600">
                  Monitor your reading progress, set page goals, and see your reading statistics over time.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <ListChecks className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">Set Reading Goals</h3>
                <p className="text-gray-600">
                  Challenge yourself with reading goals and track your progress towards achieving them.
                </p>
              </div>
            </div>
          </section>
        </AuthCheck>

        {/* Footer */}
        <footer className="py-6 px-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2023 My Book List. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Terms
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Help
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
