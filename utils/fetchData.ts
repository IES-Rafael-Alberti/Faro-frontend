
import { FeedPublicationInterface } from '../types/FeedPublication.interface'
import { PUBLICATIONS_URL, ALL_USERS_URL, USER_BASIC_INFO_URL, PROFILE_URL, EXPERIENCE_URL, EDUCATION_URL, RECOMMENDATION_URL, CONNECTIONS_OF_AN_USER_URL, PUBLICATIONS_PROFILE_URL } from '../types/consts'
import { BasicUserInfoInterface } from '../types/BasicUserInfo.interface'
import { CompleteProfile } from '../types/profile/CompleteProfile.interface'
import { User } from '@/types/User.interface'
import axios, { AxiosResponse } from 'axios'

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
      { url: `${CONNECTIONS_OF_AN_USER_URL}${id}`, type: 'contacts' },
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
    console.log(contacts);
    
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

export async function fetchAllUsers (token: string = ''): Promise<User[]> {
  try {
    return await fetchData<User[]>(ALL_USERS_URL, token)
  } catch (error) {
    console.error(`Error fetching feed data from ${ALL_USERS_URL}:`, error)
    return Promise.reject(error)
  }
}

export async function fetchAllConnectionsOfAnUser (token: string = '', id: string): Promise<string[]> {
  try {
    return await fetchData<string[]>(`${CONNECTIONS_OF_AN_USER_URL}${id}`, token)
  } catch (error) {
    console.error(`Error fetching feed data from ${CONNECTIONS_OF_AN_USER_URL}${id}:`, error)
    return Promise.reject(error)
  }
}

export async function sendRequestToConnect(body: object, token: string = ''){
  try {
    const response: AxiosResponse = await axios.post(`http://localhost:3000/connections/request`, body, {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
    });
    return 201;
  } catch (error) {
    console.error('Error during auth:', error);
    throw error;
  }
}