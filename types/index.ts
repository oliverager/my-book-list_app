export enum BookCategory {
  Romance = "Romance",
  YoungAdult = "Young adults",
  Fantasy = "Fantasy",
  Action = "Action",
  ScienceFiction = "Science Fiction",
  Mystery = "Mystery",
  Thriller = "Thriller",
  Horror = "Horror",
  HistoricalFiction = "Historical Fiction",
  Biography = "Biography",
  SelfHelp = "Self-Help",
  Dystopian = "Dystopian",
}

// Type Definitions
export type User = {
  id: number
  name: string
  username: string
  password: string
  email: string
  image?: string
}

// Update the Book type to use the BookCategory enum
export type Book = {
  id: number
  title: string
  author: string
  image: string
  score?: string
  status: "Read" | "Reading" | "Plan to read"
  progress: {
    current: number
    total: number
  }
  categories: BookCategory[]
  description?: string
  publishedDate?: string
  isbn?: string
}

export type Activity = {
  id: number
  type: "finished" | "started" | "progress" | "added"
  book: string
  bookId?: number
  pages?: number
  date: string
  user: {
    name: string
    image?: string
  }
}

export type ReadingGoal = {
  id: number
  title: string
  description: string
  target: number
  current: number
  unit: "books" | "pages"
  period: "year" | "month" | "week"
}

export type ReadingStat = {
  title: string
  value: string | number
  change: string
  icon: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: {
    items: T[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
  message?: string
}

// Mock Data
export const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: "Iron Flame",
    author: "Rebecca Yarros",
    image: "/placeholder.svg?height=250&width=170",
    score: "4.7/5.0",
    status: "Read",
    progress: {
      current: 955,
      total: 955,
    },
    categories: [BookCategory.Romance, BookCategory.YoungAdult, BookCategory.Action, BookCategory.Fantasy],
    description:
      "The first book in the Empyrean series, Iron Flame follows the journey of a young warrior in a world of dragons and magic.",
    publishedDate: "2023-05-15",
    isbn: "978-1234567890",
  },
  {
    id: 2,
    title: "A Court of Silver Flames",
    author: "Sarah J. Maas",
    image: "/placeholder.svg?height=250&width=170",
    score: "4.8/5.0",
    status: "Reading",
    progress: {
      current: 633,
      total: 784,
    },
    categories: [BookCategory.Romance, BookCategory.YoungAdult, BookCategory.Action, BookCategory.Fantasy],
    description:
      "Part of the Court of Thorns and Roses series, this book follows Nesta Archeron's journey of healing and self-discovery.",
    publishedDate: "2021-02-16",
    isbn: "978-1635574074",
  },
  {
    id: 3,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    image: "/placeholder.svg?height=250&width=170",
    score: "4.8/5.0",
    status: "Plan to read",
    progress: {
      current: 0,
      total: 320,
    },
    categories: [BookCategory.YoungAdult, BookCategory.Action, BookCategory.Fantasy],
    description:
      "The first book in the Harry Potter series, introducing the world of wizards, magic, and Hogwarts School of Witchcraft and Wizardry.",
    publishedDate: "1997-06-26",
    isbn: "978-0590353427",
  },
  {
    id: 4,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    image: "/placeholder.svg?height=250&width=170",
    score: "4.5/5.0",
    status: "Reading",
    progress: {
      current: 120,
      total: 374,
    },
    categories: [BookCategory.YoungAdult, BookCategory.Action, BookCategory.Dystopian],
    description:
      "In a dystopian future, teenagers are forced to participate in a televised death match called the Hunger Games.",
    publishedDate: "2008-09-14",
    isbn: "978-0439023481",
  },
]

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: "finished",
    book: "Iron Flame",
    bookId: 1,
    date: "2 days ago",
    user: {
      name: "You",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 2,
    type: "started",
    book: "A Court of Silver Flames",
    bookId: 2,
    date: "1 week ago",
    user: {
      name: "You",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 3,
    type: "progress",
    book: "A Court of Silver Flames",
    bookId: 2,
    pages: 120,
    date: "3 days ago",
    user: {
      name: "You",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 4,
    type: "added",
    book: "Harry Potter and the Sorcerer's Stone",
    bookId: 3,
    date: "2 weeks ago",
    user: {
      name: "You",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
]

export const MOCK_READING_GOALS: ReadingGoal[] = [
  {
    id: 1,
    title: "2025 Reading Challenge",
    description: "Goal: 24 books this year",
    target: 24,
    current: 12,
    unit: "books",
    period: "year",
  },
  {
    id: 2,
    title: "Monthly Reading Goal",
    description: "Goal: 800 pages this month",
    target: 800,
    current: 620,
    unit: "pages",
    period: "month",
  },
]

export const MOCK_READING_STATS: ReadingStat[] = [
  {
    title: "Books Read",
    value: 12,
    change: "+2 from last month",
    icon: "BookOpen",
  },
  {
    title: "Pages Read",
    value: 3842,
    change: "+20% from last month",
    icon: "TrendingUp",
  },
  {
    title: "Reading Time",
    value: "48h 23m",
    change: "+5h from last month",
    icon: "Clock",
  },
]
