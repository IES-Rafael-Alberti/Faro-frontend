import { EditableProfileData } from "@/types/profile/editableProfileData.interface";
import { PROFILE_URL, UPDATE_USER_URL } from "../types/consts";
import { CompleteProfile } from "../types/profile/CompleteProfile.interface";
import { BasicUserInfoInterface } from "@/types/BasicUserInfo.interface";

/**
 * Updates data by sending a PUT request to the specified URL.
 * 
 * @template Req - The type of the request data.
 * @template Res - The type of the response data.
 * @param {string} url - The URL to which data is to be sent.
 * @param {Req} data - The data to be sent.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<Res>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const updateData = async <Req, Res>(url: string, data: Req, token: string = ''): Promise<Res> => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to update data, status: ${response.status}, details: ${errorDetails}`);
    }

    const responseData = await response.json();
    return responseData as Res;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Updates data by sending a PATCH request to the specified URL.
 * 
 * @template Req - The type of the request data.
 * @template Res - The type of the response data.
 * @param {string} url - The URL to which data is to be sent.
 * @param {Req} data - The data to be sent.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<Res>} - A promise that resolves to the response data.
 * @throws Will throw an error if the request fails.
 */
export const patchData = async <Req, Res>(url: string, data: Req, token: string = ''): Promise<Res> => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to update data, status: ${response.status}, details: ${errorDetails}`);
    }

    const responseData = await response.json();
    return responseData as Res;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Updates profile data by sending a PUT request to the profile URL.
 * 
 * @param {string} id - The user ID.
 * @param {EditableProfileData} profile - The profile data to be updated.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<CompleteProfile>} - A promise that resolves to the updated complete profile data.
 * @throws Will throw an error if the request fails.
 */
export const updateProfileData = async (id: string, profile: EditableProfileData, token: string = ''): Promise<CompleteProfile> => {
  return updateData<EditableProfileData, CompleteProfile>(`${PROFILE_URL}${id}`, profile, token);
};

/**
 * Updates user data by sending a PATCH request to the user URL.
 * 
 * @param {string} id - The user ID.
 * @param {BasicUserInfoInterface} user - The user data to be updated.
 * @param {string} [token=''] - The optional authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the updated user data.
 * @throws Will throw an error if the request fails.
 */
export const updateUserData = async (id: string, user: BasicUserInfoInterface, token: string = ''): Promise<any> => {
  return patchData<BasicUserInfoInterface, any>(`${UPDATE_USER_URL}${id}`, user, token);
};
