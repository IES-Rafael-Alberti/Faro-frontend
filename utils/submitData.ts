import { EducationInterface } from '@/types/profile/education.interface'
import Publication from '../types/Publication.interface'
import { CREATE_EDUCATION_URL, CREATE_EXPERIENCE_URL, EDUCATION_URL, EXPERIENCE_URL, PUBLICATIONS_URL, REQUEST_URL } from '../types/consts'
import { ExperienceInterface } from '@/types/profile/experience.interface'

export const submitData = async <Req,Res>(url: string, data: Req, token: string = ''): Promise<Res> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()
    return responseData
  } catch (error) {
    return Promise.reject(error)
  }
}

export const submitPublication = async (publication: string, id: string, token: string = ''): Promise<Publication> => {
  return submitData<Publication,any>(PUBLICATIONS_URL, { msg: publication, user_id: id }, token)
}

export const submitFriendRequest = async (userId: string, profileId: string, token: string = ''): Promise<any> => {
  return submitData<any,any>(REQUEST_URL, { user_id: userId, connected_user_id: profileId}, token)
}

export const submitEducation = async (education: EducationInterface, id: string, token: string = ''): Promise<any> => {
  return submitData<EducationInterface,any>(CREATE_EDUCATION_URL, { ...education, profileId: id }, token)
}

export const submitExperience = async (experience: ExperienceInterface, id: string, token: string = ''): Promise<any> => {
  return submitData<any,any>(CREATE_EXPERIENCE_URL, { ...experience, profileId: id }, token)
}