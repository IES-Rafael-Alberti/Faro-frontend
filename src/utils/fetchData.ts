// TODO: Implemente logs
// FIXME: If the URL target is not reachable, the app will crash
export async function fetchData<T = any> (url: string, token: string): Promise<T> {
  let response
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await response.json() as T
  } catch (error) {
    console.error(`${response?.status} Error fetching data from ${url}: ${error}`)
    return Promise.reject(error)
  }
}

// FIXME: Move this to an apropiate file
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

export async function fetchFeedData (url: string, token: string): Promise<FeedData> {
  try {
    return await fetchData<FeedData>(url, token)
  } catch (error) {
    console.error(`Error fetching feed data from ${url}:`, error)
    return Promise.reject(error)
  }
}

export async function fetchBasicUserInfo (url: string, token: string): Promise<any> {
  try {
    return await fetchData(url, token)
  } catch (error) {
    console.error(`Error fetching basic user info from ${url}:`, error)
    return Promise.reject(error)
  }
}
