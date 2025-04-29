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

export const NumberToBookCategoryMap: Record<number, BookCategory> = {
  1: BookCategory.Romance,
  2: BookCategory.YoungAdult,
  3: BookCategory.Fantasy,
  4: BookCategory.Action,
  5: BookCategory.ScienceFiction,
  6: BookCategory.Mystery,
  7: BookCategory.Thriller,
  8: BookCategory.Horror,
  9: BookCategory.HistoricalFiction,
  10: BookCategory.Biography,
  11: BookCategory.SelfHelp,
  12: BookCategory.Dystopian,
};


// Type Definitions
export type User = {
  id: number
  name: string
  username: string
  password: string
  email: string
  image?: string
}

export type BookStatus = "Read" | "Reading" | "Plan to read"

export type UserBook = {
  id: string;          // GUID
  userId: string;      // GUID
  bookId: string;      // GUID
  status: BookStatus; // restrict to known statuses
  score: number | null;  // rating, can be null if not rated yet
  progress: number | null;  // progress in %, pages, etc.
  finishedAt: string | null; // ISO date string or null
  createdAt: string;    // ISO date string
};


// Update the Book type to use the BookCategory enum
export type Book = {
  id: number;
  title: string;
  publisher?: string;
  author: string;
  image: string;
  score?: string;
  pages: number;
  categories: BookCategory[];
  description?: string;
  publishedDate?: string;
  isbn?: string;
};


export type BookResponseDto = {
  id: number;
  title: string;
  year: number;
  pageCount: number;
  coverUrl: string;
  isbn: string;
  blurp: string;
  category: number;
  author: {
    firstName: string;
    lastName: string;
  };
  publisher: {
    name: string;
  };
};


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

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: "finished",
    book: "Iron Flame",
    bookId: 1,
    date: "2 days ago",
    user: {
      name: "You",
      image: "https://m.media-amazon.com/images/I/81LOUMJqbDL._SL1500_.jpg?height=32&width=32",
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
      image: "https://m.media-amazon.com/images/I/91Yx43Yd5eL._SL1500_.jpg?height=32&width=32",
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
      image: "https://m.media-amazon.com/images/I/91Yx43Yd5eL._SL1500_.jpg?height=32&width=32",
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
      image: "https://m.media-amazon.com/images/I/91A6EgLH+2L._SL1500_.jpg?height=32&width=32",
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
