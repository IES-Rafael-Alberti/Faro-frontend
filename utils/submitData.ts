import Publication from '../types/Publication.interface'
import {  PUBLICATIONS_URL, REQUEST_URL } from '../types/consts'

export const submitData = async <Req,Res>(url: string, data: Req, token: string = ''): Promise<Res> => {
  console.log(data)
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
