"use client"
import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Context for managing authentication state.
 */
export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  setIsLogged: () => {},
  token: '',
  setToken: () => {},
  id: '',
  setId: () => {}
})

/**
 * Provides authentication context to its children components.
 * 
 * @param {React.ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} - The JSX element representing the authentication provider.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(true); // State to track login status.
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyY2RhYzk2LWY3ODYtNGNjOC1hZWE5LTBiMzRmNzA5YWU3MCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzE4NjQyNjg0LCJleHAiOjE3MTg2NDYyODR9.qOHyth2Td_DpOMAVBrWPkNOJZgW4KXQDMmPDN9pV3i0'); // State to store authentication token.
  const [id, setId] = useState<string>('b2cdac96-f786-4cc8-aea9-0b34f709ae70'); // State to store user ID.
  const router = useRouter();

  /**
   * Redirects to the homepage if not logged in.
   */
  useEffect(() => {
    if(!isLogged && !token && !id){
      router.push('/');
    }
  }, [isLogged, token, id, router])

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}
