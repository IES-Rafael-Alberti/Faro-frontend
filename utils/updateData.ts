import { EditableProfileData } from "@/types/profile/editableProfileData.interface";
import { PROFILE_URL, UPDATE_USER_URL } from "../types/consts";
import { CompleteProfile } from "../types/profile/CompleteProfile.interface";
import { BasicUserInfoInterface } from "@/types/BasicUserInfo.interface";

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

    console.log("RESPONDES DATA",responseData);
    return responseData as Res;
  } catch (error) {
    return Promise.reject(error);
  }
};

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

export const updateProfileData = async (id: string, profile: EditableProfileData, token: string = ''): Promise<CompleteProfile> => {
  console.log("PROFILE",profile);
  
  return updateData<EditableProfileData, CompleteProfile>(`${PROFILE_URL}${id}`, profile, token);
};

export const updateUserData = async (id: string, user: BasicUserInfoInterface, token: string = ''): Promise<any> => {
  return patchData<BasicUserInfoInterface, any>(`${UPDATE_USER_URL}${id}`, user, token);
}
