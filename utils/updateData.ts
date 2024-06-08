import { EditableProfileData } from "@/types/profile/editableProfileData.interface";
import { PROFILE_URL } from "../types/consts";
import { CompleteProfile } from "../types/profile/CompleteProfile.interface";

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

export const updateProfileData = async (profile: EditableProfileData, token: string = ''): Promise<CompleteProfile> => {
  return updateData<EditableProfileData, CompleteProfile>(`${PROFILE_URL}${profile.id}`, profile, token);
};
