
import { FeedPublicationInterface } from '../types/FeedPublication.interface'
import { PUBLICATIONS_URL, USER_BASIC_INFO_URL, PROFILE_URL, USER_URL, EXPERIENCE_URL, EDUCATION_URL, RECOMMENDATION_URL, CONTACT_URL } from '../types/consts'
import { BasicUserInfoInterface } from '../types/BasicUserInfo.interface'
import { ProfileInterface } from '../types/profile/Profile.interface'
import { ExperienceInterface } from '../types/profile/experience.interface'
import { EducationInterface } from '../types/profile/education.interface'
import { RecommendationInterface } from '../types/profile/recomendation.interface'
import { CompleteProfile } from '../types/profile/CompleteProfile.interface'
import { ContactInterface } from '../types/profile/contact.interface'
import { PublicationInterface } from '../types/profile/publications.interface'
import { FeedPublicationInterface } from '@/types/FeedPublication.interface'
import { ALL_USERS_URL, CONNECTIONS_OF_AN_USER_URL, PUBLICATIONS_URL, USER_BASIC_INFO_URL } from '@/types/consts'
import { BasicUserInfoInterface } from '@/types/BasicUserInfo.interface'
import { User } from '@/types/User.interface'
import axios, { AxiosResponse } from 'axios'

// FIXME: If the URL target is not reachable, the app will crash
export async function fetchData<T = any> (url: string, token: string = ''): Promise<T> {
  let response
  try {
    response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    return await response.json() as T
  } catch (error) {
    return Promise.reject(error)
  }
}

// TODO: check the implementation of this function 
export async function fetchProfileData(id: string, token: string = ''): Promise<CompleteProfile> {
  try {
    let profile: ProfileInterface;
    let experience: ExperienceInterface[];
    let education: EducationInterface[];
    let recommendations: RecommendationInterface[];
    let contacts: ContactInterface[];
    let publications: PublicationInterface[];

    try {
      profile = await fetchData<ProfileInterface>(`${PROFILE_URL}${id}`, token);
    } catch (error) {
      throw error;
    }

    try {
      experience = await fetchData<ExperienceInterface[]>(`${EXPERIENCE_URL}${id}`, token);
    } catch (error) {
      throw error;
    }

    try {
      education = await fetchData<EducationInterface[]>(`${EDUCATION_URL}${id}`, token);
    } catch (error) {
      throw error;
    }

    try {
      recommendations = await fetchData<RecommendationInterface[]>(`${RECOMMENDATION_URL}${id}`, token);
    } catch (error) {
      throw error;
    }
    try {
      contacts = await fetchData<ContactInterface[]>(`${CONTACT_URL}${id}`, token);
    } catch (error) {
      throw error;
    }

    try{
      publications = await fetchData<PublicationInterface[]>(`${PUBLICATIONS_URL}${id}`, token);
    } catch (error) {
      throw error;
    }

    return {
      ...profile,
      experience,
      education,
      recommendations,
      contacts,
      publications
    };
  } catch (error) {
    console.error(`Error fetching complete profile data:`, error);
    return Promise.reject(error);
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