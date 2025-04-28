import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"
import type { Book } from "@/types"

interface BookCardProps {
  book: Book
  featured?: boolean
  compact?: boolean
  view?: "grid" | "list"
}

export function BookCard({ book, featured = false, compact = false, view = "grid" }: BookCardProps) {
  // Extract score as a number for rendering stars
  const scoreValue = book.score ? Number.parseFloat(book.score.split("/")[0]) : 0
  const maxScore = book.score ? Number.parseFloat(book.score.split("/")[1]) : 5
  const normalizedScore = (scoreValue / maxScore) * 5 // Normalize to a 5-star scale

  if (view === "list") {
    return (
      <div className="flex gap-4 p-4 border rounded-md hover:shadow-md transition-shadow">
        <div className="relative h-[150px] w-[100px] flex-shrink-0">
          <Image
            src={book.image || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover rounded-md"
            sizes="100px"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-black mb-1">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">by {book.author}</p>

          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(normalizedScore)
                    ? "text-yellow-400 fill-yellow-400"
                    : i < normalizedScore
                      ? "text-yellow-400 fill-yellow-400 opacity-50"
                      : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">{book.score}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {book.categories.slice(0, 3).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {book.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{book.categories.length - 3} more
              </Badge>
            )}
          </div>

          {book.description && <p className="text-gray-600 text-sm line-clamp-2 mb-2">{book.description}</p>}

          <div className="flex items-center justify-between">
            <Badge variant={book.status === "Read" ? "default" : book.status === "Reading" ? "secondary" : "outline"}>
              {book.status}
            </Badge>

            {book.status === "Reading" && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">
                  {Math.round((book.progress.current / book.progress.total) * 100)}%
                </span>
                <Progress value={(book.progress.current / book.progress.total) * 100} className="h-1 w-[60px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (compact) {
    return (
      <Link href={`/books/${book.id}`} className="block group">
        <div className="relative h-[180px] w-full mb-2 overflow-hidden rounded-md">
          <Image
            src={book.image || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 16vw"
          />
        </div>
        <h3 className="font-medium text-sm text-black line-clamp-1">{book.title}</h3>
        <p className="text-gray-600 text-xs">{book.author}</p>
      </Link>
    )
  }

  if (featured) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-[250px] w-full">
          <Image
            src={book.image || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <h3 className="font-bold text-white text-lg mb-1">{book.title}</h3>
            <p className="text-white/80 text-sm">by {book.author}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(normalizedScore)
                      ? "text-yellow-400 fill-yellow-400"
                      : i < normalizedScore
                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                        : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">{book.score}</span>
            </div>
            <Badge variant={book.status === "Read" ? "default" : book.status === "Reading" ? "secondary" : "outline"}>
              {book.status}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {book.categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {book.categories.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{book.categories.length - 2} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Link href={`/books/${book.id}`} className="block group">
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
        <div className="relative h-[250px] w-full">
          <Image
            src={book.image || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-black mb-1 line-clamp-1">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">by {book.author}</p>

          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(normalizedScore)
                    ? "text-yellow-400 fill-yellow-400"
                    : i < normalizedScore
                      ? "text-yellow-400 fill-yellow-400 opacity-50"
                      : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">{book.score}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {book.categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {book.categories.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{book.categories.length - 2} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Badge variant={book.status === "Read" ? "default" : book.status === "Reading" ? "secondary" : "outline"}>
              {book.status}
            </Badge>

            {book.status === "Reading" && (
              <div className="text-xs text-gray-600">
                {book.progress.current}/{book.progress.total}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
