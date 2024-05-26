import axios from 'axios'

export async function fetchData<T = any> (url: string, token: string): Promise<T> {
  const response = await axios.get<T>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

interface FeedData {
  data: Array<{
    id: string;
    msg: string;
    created_at: string;
    user_id: string;
  }>;
  currentPage: number;
  totalPages: number;
}

export async function fetchFeedData (url: string, token: string): Promise<FeedData> {
  return fetchData<FeedData>(url, token)
}
