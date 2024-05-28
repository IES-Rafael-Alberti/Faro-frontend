import { FeedPublicationInterface } from '@/types/FeedPublication.interface'
import { PUBLICATIONS_URL } from '@/types/consts'

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

export async function fetchFeedData (page: number, token: string): Promise<FeedPublicationInterface> {
  try {
    return await fetchData<FeedPublicationInterface>(`${PUBLICATIONS_URL}${page}`, token)
  } catch (error) {
    console.error(`Error fetching feed data from ${PUBLICATIONS_URL}${page}:`, error)
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
