import { FeedPublicationInterface } from '../types/FeedPublication.interface'
import { PUBLICATIONS_URL, USER_BASIC_INFO_URL, PROFILE_URL, EXPERIENCE_URL, EDUCATION_URL, RECOMMENDATION_URL, CONTACT_URL } from '../types/consts'
import { BasicUserInfoInterface } from '../types/BasicUserInfo.interface'
import { ExperienceInterface } from '../types/profile/experience.interface'
import { EducationInterface } from '../types/profile/education.interface'
import { RecommendationInterface } from '../types/profile/recomendation.interface'
import { CompleteProfile } from '../types/profile/CompleteProfile.interface'
import { ContactInterface } from '../types/profile/contact.interface'
import { PublicationInterface } from '../types/profile/publications.interface'

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
      { url: `${PROFILE_URL}${id}`, key: 'profile' },
      { url: `${EXPERIENCE_URL}${id}`, key: 'experience' },
      { url: `${EDUCATION_URL}${id}`, key: 'education' },
      { url: `${RECOMMENDATION_URL}${id}`, key: 'recommendations' },
      { url: `${CONTACT_URL}${id}`, key: 'contacts' },
      { url: `${PUBLICATIONS_URL}${id}`, key: 'publications' }
    ]

    const fetchPromises = urls.map(({ url }) => fetchData(url, token))
    const results = await Promise.all(fetchPromises)

    const [profile, experience, education, recommendations, contacts, publications] = results

    return {
      ...profile,
      experience: experience as ExperienceInterface[],
      education: education as EducationInterface[],
      recommendations: recommendations as RecommendationInterface[],
      contacts: contacts as ContactInterface[],
      publications: publications as PublicationInterface[]
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
