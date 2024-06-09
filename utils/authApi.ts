import axios, { AxiosResponse } from "axios"; 
import { URL } from "@/types/consts"; 

// Interface to define the structure of the authentication response
interface AuthResponse {
  id: string;
  access_token: string;
}


/**
 * Sends a POST request for authentication and returns the response data.
 * 
 * @param {string} src - The source endpoint to which the POST request is sent.
 * @param {object} body - The body of the POST request containing the payload.
 * @returns {Promise<AuthResponse>} - A promise that resolves to the authentication response containing the id and access token.
 * @throws Will throw an error if the request fails.
 */
export async function authPost(src: string, body: object): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post<AuthResponse>(`${URL}${src}`, body, {
        headers: {
            'Content-Type': 'application/json'
          }
      });
  
      // Extracting id and access_token from the response data
      const { id, access_token } = response.data;
      return { id, access_token };

    } catch (error) {
      console.error('Error during auth:', error);
      throw error;
    }
}
