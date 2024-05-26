import axios, { AxiosResponse } from "axios";

interface AuthResponse {
    token: string;
  }

const URL = 'http://localhost:3000/'


export async function authPost( src: string, body: object ): Promise<AuthResponse> {

    console.log(body)

    try {
      const response: AxiosResponse<AuthResponse> = await axios.post<AuthResponse>(`${URL}${src}`, body, {
        headers: {
            'Content-Type': 'application/json'
          }
      });
  
      const { token } = response.data;
  
      return { token };
    } catch (error) {
      console.error('Error during auth:', error);
      throw error;
    }
  }
