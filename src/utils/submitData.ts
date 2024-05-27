import Publication from '../types/Publication.interface'

export const submitData = async <T>(url: string, data: T, token: string = ''): Promise<T> => {
  try {
    console.log('submitData', url, data, token)
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
    console.error(`Error submitting data to ${url}:`, error)
    return Promise.reject(error)
  }
}

// TODO: Move the endpoint to an constant
export const submitPublication = async (publication: string, id: string, token: string = ''): Promise<Publication> => {
  return submitData<Publication>('http://localhost:3000/publications', { msg: publication, user_id: id }, token)
}
