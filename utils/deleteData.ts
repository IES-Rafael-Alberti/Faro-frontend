import axios, { AxiosResponse } from "axios";
import { URL, PUBLICATIONS_COMMENTS_URL, CONNECTIONS_OF_AN_USER_URL } from "@/types/consts"; 

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
 * @param {string} id - The id of the comment to be deleted.
 * @param {string} user_id - The id of the user who made the comment.
 * @param {string} publication_id - The id of the publication where the comment was made.
 * @returns {Promise<string>} - A promise that resolves to '200' if the request is successful.
 * @throws Will throw an error if the request fails.
 */
export async function deleteComment(id: string, user_id: string, publication_id: string, token: string): Promise<string> {
    try {
        const response: AxiosResponse = await axios.delete(`${PUBLICATIONS_COMMENTS_URL}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                id,
                user_id,
                publication_id
            }
        });
      return '200';
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

/**
 * Sends a DELETE request to the specified endpoint to delete an user connection with another user.
 * 
 * @param {string} token - The authentication token to be included in the request headers.
 * @param {string} id - The id of the comment to be deleted.
 * @param {string} connected_user_id - The id of the user which has the connection with the user logged.
 * @returns {Promise<string>} - A promise that resolves to '200' if the request is successful.
 * @throws Will throw an error if the request fails.
 */
export async function deleteConnectionWithAnUser(token: string, id: string, connected_user_id: string): Promise<string> {
    try {
        const response: AxiosResponse = await axios.delete(`${CONNECTIONS_OF_AN_USER_URL}${id}/${connected_user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        return '200';
    } catch (error) {
        console.error('Error deleting connection:', error);
        throw error;
    }
}