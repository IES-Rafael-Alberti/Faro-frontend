import { EducationInterface } from '@/types/profile/education.interface';
import Publication from '../types/Publication.interface';
import { 
  PUBLICATIONS_COMMENTS_URL, 
  CREATE_EDUCATION_URL, 
  CREATE_EXPERIENCE_URL, 
  PUBLICATIONS_URL, 
  REQUEST_URL, 
  MESSAGE_URL, 
  UPLOAD_IMAGE_URL,
  PUBLICATIONS_LIKES_URL 
} from '../types/consts';
import { ExperienceInterface } from '@/types/profile/experience.interface';

/**
 * Submits data to a specified URL using the provided HTTP verb.
 * 
 * @template Req - The type of the request data.
 * @template Res - The type of the response data.
 * @param {string} url - The URL to which data is to be submitted.
 * @param {Req} data - The data to be submitted.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @param {string} [verb='POST'] - The HTTP verb to be used for the request.
 * @returns {Promise<Res>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const submitData = async <Req, Res>(url: string, data: Req, token: string = '', verb: string = 'POST'): Promise<Res> => {
  try {
    const response = await fetch(url, {
      method: verb,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    
    const responseData = response.headers.get('content-type')?.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      let errorMessage = `Error submitting data: ${response.status} ${response.statusText}`;
      if (responseData) {
        errorMessage += ` - ${responseData.message}`;
      }
    }

    return responseData;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Submits a publication.
 * 
 * @param {string} publication - The publication content.
 * @param {string} id - The user ID.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<Publication>} - A promise that resolves to the submitted publication data.
 * @throws Will throw an error if the request fails.
 */
export const submitPublication = async (publication: string, id: string, token: string = ''): Promise<Publication> => {
  return submitData<Publication, any>(PUBLICATIONS_URL, { msg: publication, user_id: id }, token);
};

/**
 * Submits a friend request.
 * 
 * @param {string} userId - The user ID.
 * @param {string} profileId - The profile ID of the user to connect with.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const submitFriendRequest = async (userId: string, profileId: string, token: string = ''): Promise<any> => {
  return submitData<any, any>(REQUEST_URL, { user_id: userId, connected_user_id: profileId }, token);
};

/**
 * Submits education information.
 * 
 * @param {EducationInterface} education - The education data to be submitted.
 * @param {string} id - The user ID.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const submitEducation = async (education: EducationInterface, id: string, token: string = ''): Promise<any> => {
  return submitData<EducationInterface, any>(CREATE_EDUCATION_URL, { ...education, profile: id }, token);
};

/**
 * Submits experience information.
 * 
 * @param {ExperienceInterface} experience - The experience data to be submitted.
 * @param {string} id - The user ID.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const submitExperience = async (experience: ExperienceInterface, id: string, token: string = ''): Promise<any> => {
  return submitData<any, any>(CREATE_EXPERIENCE_URL, { ...experience, profileId: id }, token);
};

/**
 * Submits a comment on a publication.
 * 
 * @param {string} publication_id - The publication ID.
 * @param {string} user_id - The user ID.
 * @param {string} comment - The comment content.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const submitPublicationComment = async (publication_id: string, user_id: string, comment: string, token: string = ''): Promise<any> => {
  return submitData<any, any>(PUBLICATIONS_COMMENTS_URL, { publication_id, user_id, comment }, token);
};

/**
 * Submits a like on a publication.
 * 
 * @param {string} publication_id - The publication ID.
 * @param {string} user_id - The user ID.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const submitLike = async (publication_id: string, user_id: string, token: string = ''): Promise<any> => {
  return submitData<any, any>(PUBLICATIONS_LIKES_URL, { user_id, publication_id }, token);
};

export const submitDislike = async (publication_id: string, user_id: string, token: string = ''): Promise<any> => {
  return submitData<any, any>(PUBLICATIONS_LIKES_URL, { user_id, publication_id }, token, 'DELETE');
};

/**
 * Submits an unlike on a publication.
 * 
 * @param {string} publication_id - The publication ID.
 * @param {string} user_id - The user ID.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const submitUnlike = async (publication_id: string, user_id: string, token: string = ''): Promise<any> => {
  return submitData<any, any>(PUBLICATIONS_LIKES_URL, { user_id, publication_id }, token, 'DELETE');
};

/**
 * Submits a message between users.
 * 
 * @param {string} msg - The message content.
 * @param {string} sender_id - The sender's user ID.
 * @param {string} receiver_id - The receiver's user ID.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const submitMessage = async (msg: string, sender_id: string, receiver_id: string, token: string = ''): Promise<any> => {
  return submitData<any, any>(MESSAGE_URL, { msg, sender_id, receiver_id }, token);
};

/**
 * Submits an avatar image for a user.
 * 
 * @param {File} avatar - The avatar image file.
 * @param {string} id - The user ID.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const submitAvatar = async (avatar: File, id: string, token: string = ''): Promise<any> => {
  try {
    const formData = new FormData();
    const buffer = await avatar.arrayBuffer();
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
      const errorText = await response.text();
      throw new Error(`Error uploading avatar: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};
