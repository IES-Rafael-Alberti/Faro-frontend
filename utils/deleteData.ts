import axios, { AxiosResponse } from "axios";
import { URL } from "@/types/consts"; 

/**
 * Sends a DELETE request to the specified endpoint to delete data.
 * 
 * @param {string} src - The source endpoint to which the DELETE request is sent.
 * @param {string} token - The authentication token to be included in the request headers.
 * @returns {Promise<string>} - A promise that resolves to '200' if the request is successful.
 * @throws Will throw an error if the request fails.
 */
export async function deleteData(src: string, token: string): Promise<string> {
    try {
        const response: AxiosResponse = await axios.delete(`${URL}${src}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        
      return '200';
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

/**
 * Sends a DELETE request to the specified endpoint to delete a comment.
 * 
 * @param {string} src - The source endpoint to which the DELETE request is sent.
 * @param {string} token - The authentication token to be included in the request headers.
 * @returns {Promise<string>} - A promise that resolves to '200' if the request is successful.
 * @throws Will throw an error if the request fails.
 */
export async function deleteComment(src: string, token: string): Promise<string> {
    try {
        const response: AxiosResponse = await axios.delete(`${URL}${src}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        
      return '200';
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}
