import { FeedPublicationInterface } from '../types/FeedPublication.interface'
import { PUBLICATIONS_URL, USER_BASIC_INFO_URL, PROFILE_URL, EXPERIENCE_URL, EDUCATION_URL, RECOMMENDATION_URL, CONTACT_URL, PUBLICATIONS_PROFILE_URL } from '../types/consts'
import { BasicUserInfoInterface } from '../types/BasicUserInfo.interface'
import { CompleteProfile } from '../types/profile/CompleteProfile.interface'

// FIXME: If the URL target is not reachable, the app will crash
export async function fetchData<T = any> (url: string, token: string = ''): Promise<T> {
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
    return Promise.reject(error)
  }
}

// TODO: check the implementation of this function
export async function fetchProfileData (id: string, token: string = ''): Promise<CompleteProfile> {
  try {
    const urls = [
      { url: `${PROFILE_URL}${id}`, type: 'profile' },
      { url: `${EXPERIENCE_URL}${id}`, type: 'experience' },
      { url: `${EDUCATION_URL}${id}`, type: 'education' },
      { url: `${RECOMMENDATION_URL}${id}`, type: 'recommendations' },
      { url: `${CONTACT_URL}${id}`, type: 'contacts' },
      { url: `${PUBLICATIONS_PROFILE_URL}${id}`, type: 'publications' }
    ]

    const fetchPromises = urls.map(({ url }) => fetchData(url, token))

    const [
      profile,
      experience,
      education,
      recommendations,
      contacts,
      publications
    ] = await Promise.all(fetchPromises)

    return {
      ...profile,
      experience,
      education,
      recommendations,
      contacts,
      publications
    }
  } catch (error) {
    console.error('Error fetching complete profile data:', error)
    return Promise.reject(error)
  }
}

export async function fetchFeedData (page: number, token: string = ''): Promise<FeedPublicationInterface> {
  try {
    return await fetchData<FeedPublicationInterface>(`${PUBLICATIONS_URL}${page}`, token)
  } catch (error) {
    console.error(`Error fetching feed data from ${PUBLICATIONS_URL}${page}:`, error)
    return Promise.reject(error)
  }
}

export async function fetchBasicUserInfo (id: string, token: string = ''): Promise<BasicUserInfoInterface> {
  try {
    return await fetchData(`${USER_BASIC_INFO_URL}${id}`, token)
  } catch (error) {
    console.error(`Error fetching basic user info from ${USER_BASIC_INFO_URL}${id}:`, error)
    return Promise.reject(error)
  }
}
