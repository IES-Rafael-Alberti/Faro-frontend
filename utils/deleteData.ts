import axios, { AxiosResponse } from "axios";

import { URL } from "@/types/consts";

export async function deleteData(src: string, token: string) {

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


export async function deleteComment(src: string, token: string) {

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
