import axios, { AxiosResponse } from 'axios';
import { 
  PUBLICATIONS_URL, 
  ALL_USERS_URL, 
  USER_BASIC_INFO_URL, 
  PROFILE_URL, 
  EXPERIENCE_URL, 
  EDUCATION_URL, 
  RECOMMENDATION_URL, 
  CONNECTIONS_OF_AN_USER_URL, 
  PUBLICATIONS_PROFILE_URL, 
  REQUEST_URL, 
  MESSAGE_URL,
  URL, 
  PUBLICATIONS_COMMENTS_URL, 
  PUBLICATIONS_LIKES_URL 
} from '../types/consts'; 
import { FeedPublicationInterface } from '../types/FeedPublication.interface'; 
import { BasicUserInfoInterface } from '../types/BasicUserInfo.interface';
import { CompleteProfile } from '../types/profile/CompleteProfile.interface';
import { User } from '@/types/User.interface';
import { EducationInterface } from '@/types/profile/education.interface';
import { ExperienceInterface } from '@/types/profile/experience.interface';
import { PublicationCommentsInterface } from '@/types/PublicationComments.interface';
import { UserMessageInterface } from '@/types/user-message.interface';
import { Dispatch, SetStateAction } from 'react';
import { RequestInterface } from '@/types/profile/requests.interface';

/**
 * Sends a GET request to the specified URL and returns the parsed JSON response.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<T>} - A promise that resolves to the parsed JSON response.
 * @throws Will throw an error if the request fails.
 */
export async function fetchData<T = any>(url: string, token: string = ''): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }

    return await response.json() as T;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Fetches the complete profile data for a user by their ID.
 * 
 * @param {string} id - The ID of the user whose profile data is to be fetched.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<CompleteProfile>} - A promise that resolves to the complete profile data.
 * @throws Will throw an error if the request fails.
 */
export async function fetchProfileData(id: string, token: string = ''): Promise<CompleteProfile> {
  try {
    const urls = [
      { url: `${PROFILE_URL}${id}`, type: 'profile' },
      { url: `${EXPERIENCE_URL}${id}`, type: 'experience' },
      { url: `${EDUCATION_URL}${id}`, type: 'education' },
      { url: `${RECOMMENDATION_URL}${id}`, type: 'recommendations' },
      { url: `${CONNECTIONS_OF_AN_USER_URL}${id}`, type: 'contacts' },
      { url: `${PUBLICATIONS_PROFILE_URL}${id}`, type: 'publications' },
      { url: `${REQUEST_URL}${id}`, type: 'requests'}
    ];

    const fetchPromises = urls.map(({ url }) => fetchData(url, token));

    const [
      profile,
      experience,
      education,
      recommendations,
      contacts,
      publications, 
      receivedRequests
    ] = await Promise.all(fetchPromises);

    return {
      ...profile,
      experience,
      education,
      recommendations,
      contacts,
      publications, 
      receivedRequests
    };
  } catch (error) {
    console.error('Error fetching complete profile data:', error);
    return Promise.reject(error);
  }
}

/**
 * Fetches the feed data for a specific page.
 * 
 * @param {number} page - The page number of the feed data to be fetched.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<FeedPublicationInterface>} - A promise that resolves to the feed publication data.
 * @throws Will throw an error if the request fails.
 */
export async function fetchFeedData(page: number, token: string = ''): Promise<FeedPublicationInterface> {
  try {
    return await fetchData<FeedPublicationInterface>(`${PUBLICATIONS_URL}${page}`, token);
  } catch (error) {
    console.error(`Error fetching feed data from ${PUBLICATIONS_URL}${page}:`, error);
    return Promise.reject(error);
  }
}

/**
 * Fetches basic user information for a user by their ID.
 * 
 * @param {string} id - The ID of the user whose basic information is to be fetched.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<BasicUserInfoInterface>} - A promise that resolves to the basic user information.
 * @throws Will throw an error if the request fails.
 */
export async function fetchBasicUserInfo(id: string, token: string = ''): Promise<BasicUserInfoInterface> {
  try {
    return await fetchData(`${USER_BASIC_INFO_URL}${id}`, token);
  } catch (error) {
    console.error(`Error fetching basic user info from ${USER_BASIC_INFO_URL}${id}:`, error);
    return Promise.reject(error);
  }
}

/**
 * Fetches the list of all users.
 * 
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<User[]>} - A promise that resolves to the list of all users.
 * @throws Will throw an error if the request fails.
 */
export async function fetchAllUsers(token: string = ''): Promise<User[]> {
  try {
    return await fetchData<User[]>(ALL_USERS_URL, token);
  } catch (error) {
    console.error(`Error fetching feed data from ${ALL_USERS_URL}:`, error);
    return Promise.reject(error);
  }
}

/**
 * Fetches all connections of a user by their ID.
 * 
 * @param {string} token - The authentication token to be included in the request headers.
 * @param {string} id - The ID of the user whose connections are to be fetched.
 * @returns {Promise<UserMessageInterface[]>} - A promise that resolves to the list of user connections.
 * @throws Will throw an error if the request fails.
 */
export async function fetchAllConnectionsOfAnUser(token: string = '', id: string): Promise<UserMessageInterface[]> {
  try {
    const userConnections: UserMessageInterface[] = [];
    const idList = await fetchData<string[]>(`${CONNECTIONS_OF_AN_USER_URL}${id}`, token);
    
    if (!idList || idList.length === 0) {
      return userConnections;
    }

    for (const element of idList) {
      const basicUserInfo = await fetchBasicUserInfo(element, token);
      const user: UserMessageInterface = {
        id: element,
        name: basicUserInfo.username,
        avatar: basicUserInfo.profile_picture,
        rol: 'Student', 
        last_msg_date: null,  
        last_msg: ''          
      };
      userConnections.push(user);
    }
    return userConnections;
  } catch (error) {
    console.error(`Error fetching connections data from ${CONNECTIONS_OF_AN_USER_URL}${id}:`, error);
    return Promise.reject(error);
  }
}

/**
 * Sends a request to connect with another user.
 * 
 * @param {object} body - The request payload containing connection details.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<number>} - A promise that resolves to the status code 201 if the request is successful.
 * @throws Will throw an error if the request fails.
 */
export async function sendRequestToConnect(body: object, token: string = ''): Promise<number> {
  try {
    const response: AxiosResponse = await axios.post(`${URL}connections/request`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return 201;
  } catch (error) {
    console.error('Error during connection request:', error);
    throw error;
  }
}

/**
 * Fetches basic user information for a list of user IDs.
 * 
 * @param {string[]} userIds - The list of user IDs whose basic information is to be fetched.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<BasicUserInfoInterface[]>} - A promise that resolves to the list of basic user information.
 * @throws Will throw an error if the request fails.
 */
export async function fetchSenderRecommendations(userIds: string[], token: string = ''): Promise<BasicUserInfoInterface[]> {
  const userBasicInfoList: BasicUserInfoInterface[] = [];
  for (const userId of userIds) {
    try {
      const basicInfo = await fetchBasicUserInfo(userId, token);
      userBasicInfoList.push(basicInfo);
    } catch (error) {
      throw error;
    }
  }
  return userBasicInfoList;
}

/**
 * Fetches the comments for a specific publication.
 * 
 * @param {string} publicationId - The ID of the publication whose comments are to be fetched.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<PublicationCommentsInterface[]>} - A promise that resolves to the list of publication comments.
 * @throws Will throw an error if the request fails.
 */
export async function fetchCommentsOfPublication(publicationId: string, token: string = ''): Promise<PublicationCommentsInterface[]> {
  try {
    return await fetchData<PublicationCommentsInterface[]>(`${PUBLICATIONS_COMMENTS_URL}${publicationId}`, token);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

/**
 * Fetches the number of comments for a specific publication.
 * 
 * @param {string} publicationId - The ID of the publication whose number of comments is to be fetched.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<number>} - A promise that resolves to the number of comments.
 * @throws Will throw an error if the request fails.
 */
export async function fetchNumberOfComments(publicationId: string, token: string = ''): Promise<number> {
  try {
    const comments = await fetchCommentsOfPublication(publicationId, token);
    return comments.length;
  } catch (error) {
    console.error('Error fetching number of comments:', error);
    return 0;
  }
}

/**
 * Fetches the number of likes for a specific publication.
 * 
 * @param {string} publicationId - The ID of the publication whose number of likes is to be fetched.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<number>} - A promise that resolves to the number of likes.
 * @throws Will throw an error if the request fails.
 */
export async function fetchLikesCount(publicationId: string, token: string = ''): Promise<number> {
  try {
    const likes = await fetchData(`${PUBLICATIONS_LIKES_URL}${publicationId}`, token);
    return likes.length;
  } catch (error) {
    console.error('Error fetching likes count:', error);
    return 0;
  }
}

/**
 * Fetches messages exchanged between a sender and a receiver.
 * 
 * @param {string} senderId - The ID of the message sender.
 * @param {string} receiverId - The ID of the message receiver.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the messages exchanged between the sender and receiver.
 * @throws Will throw an error if the request fails.
 */
export const fetchMessagesFromUser = async (senderId: string, receiverId: string, token: string = ''): Promise<any> => {
  return fetchData(`${MESSAGE_URL}sender/${senderId}/receiver/${receiverId}`, token);
};

export const getUserBasicData = async (
  id: string,
  token: string,
  setProfileData: Dispatch<SetStateAction<CompleteProfile | null>>,
  setUserInfo: Dispatch<SetStateAction<BasicUserInfoInterface | null>>
) => {
  try {
    const response = await fetchBasicUserInfo(id, token);
    console.log('User basic data:', response);
    
    setProfileData((prevProfileData) => {
      const updatedProfileData = {
        id: id,
        name: response.username || 'Default Name',
        experience: prevProfileData?.experience || [],
        education: prevProfileData?.education || [],
        recommendations: prevProfileData?.recommendations || [],
        contacts: prevProfileData?.contacts || [],
        publications: prevProfileData?.publications || [],
        receivedRequests: prevProfileData?.receivedRequests || []
      };
      return Object.assign({}, prevProfileData, updatedProfileData);
    });
    setUserInfo(response);
  } catch (error) {
    console.error('Error fetching user basic data:', error);
    return null;
  }
};

export const getProfileData = async (
  id: string,
  token: string,
  setProfileData: Dispatch<SetStateAction<CompleteProfile | null>>,
  setRequests:  Dispatch<SetStateAction<RequestInterface[]>>
) => {
  const response = await fetchProfileData(`${id}`, token);
  const { receivedRequests } = response;
  setProfileData(response);
  setRequests(receivedRequests);
  return response;
};