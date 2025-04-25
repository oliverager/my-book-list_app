"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { MultiSelect } from "@/components/multi-select"
import { addBook } from "@/lib/api"
import { BookCategory } from "@/types"
import { useToast } from "@/hooks/use-toast"

// Define the form schema with validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  image: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  status: z.enum(["Read", "Reading", "Plan to read"]),
  currentPage: z.coerce.number().int().min(0, "Current page must be a positive number"),
  totalPages: z.coerce.number().int().min(1, "Total pages must be at least 1"),
  categories: z.array(z.nativeEnum(BookCategory)).min(1, "Select at least one category"),
  description: z.string().optional(),
  publishedDate: z.date().optional(),
  isbn: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function AddBookPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available categories
  const categoryOptions = Object.entries(BookCategory).map(([_, value]) => ({
    label: value,
    value: value,
  }))

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      image: "",
      status: "Plan to read",
      currentPage: 0,
      totalPages: 0,
      categories: [],
      description: "",
      isbn: "",
    },
  })

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      // Transform the form data to match the API expectations
      const bookData = {
        title: values.title,
        author: values.author,
        image: values.image || "/placeholder.svg?height=250&width=170",
        status: values.status,
        progress: {
          current: values.currentPage,
          total: values.totalPages,
        },
        categories: values.categories,
        description: values.description,
        publishedDate: values.publishedDate ? format(values.publishedDate, "yyyy-MM-dd") : undefined,
        isbn: values.isbn,
      }

      // Submit the book data to the API
      await addBook(bookData)

      // Show success message
      toast({
        title: "Book Added",
        description: `"${values.title}" has been added to your book list.`,
      })

      // Redirect to the books page
      router.push("/books")
    } catch (error) {
      console.error("Error adding book:", error)
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

        <div className="p-6 max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black">Add New Book</h1>
            <p className="text-gray-600 font-medium">Fill in the details to add a new book to your list.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Book Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium">Book Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter book title" {...field} className="placeholder:text-gray-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium">Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author name" {...field} className="placeholder:text-gray-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Book Cover Image URL */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium">Book Cover Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/book-cover.jpg"
                        {...field}
                        className="placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600">
                      Enter a URL for the book cover image. Leave blank to use a placeholder.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reading Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium">Reading Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-gray-700">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Read">Read</SelectItem>
                        <SelectItem value="Reading">Currently Reading</SelectItem>
                        <SelectItem value="Plan to read">Plan to Read</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reading Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="currentPage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium">Current Page</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} className="text-gray-700" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalPages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium">Total Pages</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} className="text-gray-700" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Categories */}
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium">Categories</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={categoryOptions}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select categories"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600">
                      Select all categories that apply to this book.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a brief description of the book"
                        className="resize-none placeholder:text-gray-400 text-gray-700"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Published Date */}
              <FormField
                control={form.control}
                name="publishedDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-black font-medium">Published Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal text-gray-700",
                              !field.value && "text-gray-500",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1800-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="text-gray-600">
                      When was this book published? (Optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ISBN */}
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium">ISBN</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="978-3-16-148410-0"
                        {...field}
                        className="placeholder:text-gray-400 text-gray-700"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600">
                      International Standard Book Number (Optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                  className="text-gray-700"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Adding..." : "Add Book"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}
