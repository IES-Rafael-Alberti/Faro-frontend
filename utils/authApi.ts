import axios, { AxiosResponse } from "axios";

interface AuthResponse {
  id: string;
  access_token: string;
}

const URL = 'http://localhost:3000/';

export async function authPost(src: string, body: object): Promise<AuthResponse> {

    console.log(body);

    try {
      const response: AxiosResponse<AuthResponse> = await axios.post<AuthResponse>(`${URL}${src}`, body, {
        headers: {
            'Content-Type': 'application/json'
          }
      });
  
      const { id, access_token } = response.data;
      
      return { id, access_token };
    } catch (error) {
      console.error('Error during auth:', error);
      throw error;
    }
}
