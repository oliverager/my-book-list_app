import { Button } from "@/components/ui/button"
import { BookOpen, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function GuestWelcome() {
  return (
    <>
      {/* Hero Section for Guests */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-md">Your Personal Book Tracking Journey</h1>
            <p className="text-lg mb-6 text-white drop-shadow-md">
              Join thousands of readers who track their books, set reading goals, and discover new favorites.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link href="/register" className="flex items-center">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Get Started
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10 font-semibold"
              >
                <Link href="/login" className="flex items-center">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
            <Image src="/reading-collection.png" alt="Collection of books" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-black">Why Join My Book List?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md border flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black">Track Your Reading</h3>
            <p className="text-gray-600">
              Keep a detailed record of books you've read, are currently reading, or plan to read in the future.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600"
              >
                <path d="M2 12h10"></path>
                <path d="M9 4v16"></path>
                <path d="M14 9l3 3-3 3"></path>
                <path d="M14 3h7v7"></path>
                <path d="M14 14h7v7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black">Set Reading Goals</h3>
            <p className="text-gray-600">
              Challenge yourself with personalized reading goals and track your progress throughout the year.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M17 6.1H3"></path>
                <path d="M21 12.1H3"></path>
                <path d="M15.1 18H3"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black">Discover New Books</h3>
            <p className="text-gray-600">
              Find your next favorite read with personalized recommendations based on your reading history.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-black">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-lg">S</span>
                </div>
                <div>
                  <h4 className="font-semibold text-black">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Avid Reader</p>
                </div>
              </div>
              <p className="text-gray-700">
                "My Book List has transformed how I track my reading. I love being able to set goals and see my progress
                throughout the year!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold text-lg">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-black">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Book Club Organizer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The recommendation system is spot on! I've discovered so many great books I would have never found
                otherwise."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Reading Journey?</h2>
          <p className="text-xl mb-8">
            Join thousands of readers who are tracking their books and discovering new favorites.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link href="/register">Create Account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 font-semibold"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
