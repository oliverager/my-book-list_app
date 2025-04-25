import { ApiResponse, Activity, Book, ReadingGoal, ReadingStat, User } from "@/types"

const API_BASE_URLS = {
  auth: "http://localhost:3500/auth",
  books: "http://localhost:3500/books",
  users: "http://localhost:3500/users",
  activities: "http://localhost:3500/activities",
  goals: "http://localhost:3500/goals",
  stats: "http://localhost:3500/stats",
  mylist: "http://localhost:3500/mylist",
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `API error: ${response.status}`)
  }
  return response.json()
}

// Authentication API calls
export async function getCurrentUser() {
  const response = await fetch(`${API_BASE_URLS.auth}/me`, {
    method: "GET",
    credentials: "include", // Important for cookies
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<ApiResponse<User>>(response)
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
  return handleResponse<{ data: { user: User; token: string } }>(response)
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
export async function getBooks(params?: {
  search?: string
  status?: string
  category?: string
  page?: number
  limit?: number
}) {
  const queryParams = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString())
      }
    })
  }

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""

  const response = await fetch(`${API_BASE_URLS.books}${queryString}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ data: Book[]; total: number; page: number; limit: number }>(response)
}

export async function getBook(id: number | string) {
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

export async function updateBook(id: number | string, bookData: Partial<Book>) {
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

export async function deleteBook(id: number | string) {
  const response = await fetch(`${API_BASE_URLS.books}/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ message: string }>(response)
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
export async function getMyList() {
  const response = await fetch(`${API_BASE_URLS.mylist}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<{ data: Book[] }>(response)
}
