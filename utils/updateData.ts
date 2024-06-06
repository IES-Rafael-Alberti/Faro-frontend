import { PROFILE_URL } from "../types/consts"
import { CompleteProfile } from "../types/profile/CompleteProfile.interface"



export const updateData = async <Req,Res>(url: string, data: Req, token: string = ''): Promise<Res> => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`Failed to update data, status: ${response.status}`);
      }
  
      const responseData = await response.json()
      return responseData
    } catch (error) {
      return Promise.reject(error)
    }
  }

export const updateProfileData = async (profile: CompleteProfile, token: string = ''): Promise<CompleteProfile> => {
    return updateData<CompleteProfile,any>(`${PROFILE_URL}${profile.id}`, profile, token)
}