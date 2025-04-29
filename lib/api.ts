import { type ApiResponse, type Activity, type Book, type ReadingGoal, type ReadingStat, type User, type UserBook, type BookResponseDto, NumberToBookCategoryMap } from "@/types"

const API_BASE_URLS = {
  auth: "http://localhost:8080/auth",
  books: "http://localhost:9090/api/Book",
  author: "http://localhost:9090/api/author",
  publisher: "http://localhost:9090/api/publisher",
  activities: "http://localhost:3500/activities",
  goals: "http://localhost:3500/goals",
  stats: "http://localhost:3500/stats",
  mylist: "http://localhost:5030/userbooks",
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    if (response.status === 401) {
      // Handle unauthorized access
      throw new Error("Unauthorized access. Please log in again.")
    }
    throw new Error(errorData.message || `API error: ${response.status}`)
  }
  return response.json()
}

// Authentication API calls
export async function getCurrentUser() {
  console.log("Calling getCurrentUser API")
  const response = await fetch(`${API_BASE_URLS.auth}/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("getCurrentUser response status:", response.status);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const user: User = await response.json();
  console.log("Parsed user from getCurrentUser:", user);

  return user;
}


export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URLS.auth}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  return handleResponse<{ token: string }>(response)
}

export async function register(userData: { name: string; username: string; email: string; password: string }) {
  const response = await fetch(`${API_BASE_URLS.auth}/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
  return handleResponse<{ user: User; message: string }>(response)
}

export async function logout() {
  const response = await fetch(`${API_BASE_URLS.auth}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ message: string }>(response)
}

// Books API calls
export async function getBooks() {
  const response = await fetch(`${API_BASE_URLS.books}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await handleResponse<BookResponseDto[]>(response); 
  // 👆 directly an array of BookResponseDto

  const mappedBooks: Book[] = result.map((book) => ({
    id: book.id,
    title: book.title,
    publisher: book.publisher?.name ?? undefined,
    author: `${book.author.firstName} ${book.author.lastName}`,
    image: book.coverUrl ?? "", // from backend
    pages: book.pageCount,
    categories: [NumberToBookCategoryMap[book.category]], // mapping number to name
    description: book.blurp,
    publishedDate: undefined,
    isbn: book.isbn,
    score: undefined,
  }));

  return mappedBooks;
}



export async function getBook(id: number) {
  const response = await fetch(`${API_BASE_URLS.books}/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<ApiResponse<Book>>(response)
}

export async function addBook(bookData: Partial<Book>) {
  const response = await fetch(`${API_BASE_URLS.books}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
  return handleResponse<{ data: Book; message: string }>(response)
}

export async function updateBook(id: string, bookData: Partial<Book>) {
  const response = await fetch(`${API_BASE_URLS.books}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
  return handleResponse<{ data: Book; message: string }>(response)
}

export async function deleteBook(id: number) {
  const response = await fetch(`${API_BASE_URLS.books}/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ message: string }>(response)
}

export async function getAuthor( id: string) {
  const response = await fetch(`${API_BASE_URLS.author}/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ data: Book[] }>(response)
}
export async function getPublisher(id: string) {
  const response = await fetch(`${API_BASE_URLS.publisher}/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ data: Book[] }>(response)
}

export async function updateBookProgress(id: number | string, progress: { current: number; total: number }) {
  const response = await fetch(`${API_BASE_URLS.books}/${id}/progress`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(progress),
  })
  return handleResponse<{ data: Book; message: string }>(response)
}

// User activities API calls
export async function getActivities(limit?: number) {
  const queryParams = limit ? `?limit=${limit}` : ""
  const response = await fetch(`${API_BASE_URLS.activities}${queryParams}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ data: Activity[] }>(response)
}

export async function addActivity(activityData: Activity) {
  const response = await fetch(`${API_BASE_URLS.activities}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityData),
  })
  return handleResponse<{ data: Activity; message: string }>(response)
}

// Reading goals API calls
export async function getGoals() {
  const response = await fetch(`${API_BASE_URLS.goals}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ data: ReadingGoal[] }>(response)
}

export async function updateGoal(id: number | string, goalData: ReadingGoal) {
  const response = await fetch(`${API_BASE_URLS.goals}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goalData),
  })
  return handleResponse<{ data: ReadingGoal; message: string }>(response)
}

export async function createGoal(goalData: ReadingGoal) {
  const response = await fetch(`${API_BASE_URLS.goals}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goalData),
  })
  return handleResponse<{ data: ReadingGoal; message: string }>(response)
}

// Reading stats API calls
export async function getReadingStats() {
  const response = await fetch(`${API_BASE_URLS.stats}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ data: ReadingStat }>(response)
}

// Categories API calls
export async function getCategories() {
  const response = await fetch(`${API_BASE_URLS.books}/categories`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ data: string[] }>(response)
}

// My List specific API calls (if needed)
export async function getMyList(userId: string) {
  const response = await fetch(`${API_BASE_URLS.mylist}/${userId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ data: UserBook[] }>(response)
}

export async function addToMyList(bookData: Partial<UserBook>) {
  const response = await fetch(`${API_BASE_URLS.mylist}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
  return handleResponse<{ data: UserBook; message: string }>(response)
}

export async function removeFromMyList(userBookId: string,) {  
  const response = await fetch(`${API_BASE_URLS.mylist}/${userBookId}/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ message: string }>(response)
}

export async function updateMyList(userId: string, bookId: string, bookData: Partial<UserBook>) {
  const response = await fetch(`${API_BASE_URLS.mylist}/${userId}/${bookId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
  return handleResponse<{ data: UserBook; message: string }>(response)
}