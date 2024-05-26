import axios from 'axios'

export async function fetchData<T = any> (url: string, token: string): Promise<T | null> {
  try {
    const response = await axios.get<T>(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.error(`Resource not found at ${url}`)
      return null
    } else {
      console.error(`Error fetching data from ${url}:`, error)
      throw error
    }
  }
}

interface FeedData {
  data: Array<{
    id: string;
    msg: string;
    created_at: string;
    user_id: string;
    name: string;
    user_role: string;
  }>;
  currentPage: number;
  totalPages: number;
}

export async function fetchFeedData (url: string, token: string): Promise<FeedData | null | undefined> {
  try {
    return fetchData<FeedData>(url, token)
  } catch (error) {
    console.error(`Error fetching feed data from ${url}:`, error)
  }
}
