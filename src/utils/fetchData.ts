import { FeedPublicationInterface } from '@/types/FeedPublication.interface'

// TODO: Implemente logs
// FIXME: If the URL target is not reachable, the app will crash
export async function fetchData<T = any> (url: string, token: string): Promise<T> {
  let response
  try {
    response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return await response.json() as T
  } catch (error) {
    console.error(`${response?.status} Error fetching data from ${url}: ${error}`)
    return Promise.reject(error)
  }
}

// TODO: Move url to an constant
export async function fetchFeedData (url: string, token: string): Promise<FeedPublicationInterface> {
  try {
    return await fetchData<FeedPublicationInterface>(url, token)
  } catch (error) {
    console.error(`Error fetching feed data from ${url}:`, error)
    return Promise.reject(error)
  }
}

// TODO: Implement the data interface
export async function fetchBasicUserInfo (url: string, token: string): Promise<any> {
  try {
    return await fetchData(url, token)
  } catch (error) {
    console.error(`Error fetching basic user info from ${url}:`, error)
    return Promise.reject(error)
  }
}
