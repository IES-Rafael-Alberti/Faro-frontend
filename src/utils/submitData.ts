import Publication from '../types/Publication.interface'
import { PUBLICATIONS_URL } from '@/types/consts'

export const submitData = async <T>(url: string, data: T, token: string = ''): Promise<T> => {
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
  return submitData<Publication>(PUBLICATIONS_URL, { msg: publication, user_id: id }, token)
}
