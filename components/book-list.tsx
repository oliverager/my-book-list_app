import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { MOCK_BOOKS } from "@/types"

export function BookList() {
  const books = MOCK_BOOKS

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
