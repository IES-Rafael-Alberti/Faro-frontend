import { EducationInterface } from '@/types/profile/education.interface'
import Publication from '../types/Publication.interface'
import { PUBLICATIONS_COMMENTS_URL, CREATE_EDUCATION_URL, CREATE_EXPERIENCE_URL, EDUCATION_URL, EXPERIENCE_URL, PUBLICATIONS_URL, REQUEST_URL, MESSAGE_URL, UPLOAD_IMAGE_URL } from '../types/consts'
import { ExperienceInterface } from '@/types/profile/experience.interface'
import { PUBLICATIONS_LIKES_URL } from '../types/consts'

export const submitData = async <Req,Res>(url: string, data: Req, token: string = '', verb: string = 'POST'): Promise<Res> => {
  console.log(data)
  try {
    const response = await fetch(url, {
      method: verb,
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

export const submitPublicationComment = async (publication_id: string, user_id: string ,comment: string, token: string = ''): Promise<any> => {
  return submitData<any,any>(PUBLICATIONS_COMMENTS_URL, { publication_id, user_id, comment }, token)
}

export const submitLike = async (publication_id: string, user_id: string, token: string = ''): Promise<any> => {
  return submitData<any,any>(PUBLICATIONS_LIKES_URL, { user_id, publication_id }, token)
}

export const submitUnlike = async (publication_id: string, user_id: string, token: string = ''): Promise<any> => {
  return submitData<any,any>(PUBLICATIONS_LIKES_URL, { user_id, publication_id }, token, 'DELETE')
}

export const submitMessage = async (msg: string, sender_id: string, receiver_id: string, token: string = ''): Promise<any> => {
  return submitData<any,any>(MESSAGE_URL, { msg, sender_id, receiver_id }, token)
}

export const submitAvatar = async (avatar: File, id: string, token: string = ''): Promise<any> => {
  try {
    const formData = new FormData();
    // Convert the file to an ArrayBuffer
    const buffer = await avatar.arrayBuffer();
    // Convert the ArrayBuffer to a Blob
    const blob = new Blob([buffer], { type: avatar.type });
    formData.append('file', blob, avatar.name);
    // Prepare and send the POST request
    const response = await fetch(`${UPLOAD_IMAGE_URL}${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      // Get the response text for more detailed error message
      const errorText = await response.text();
      throw new Error(`Error uploading avatar: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // Parse the JSON response
    return await response.json();
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};