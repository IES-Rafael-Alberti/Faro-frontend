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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4ZGQyM2Y0LTFjOGEtNDE2NC1iM2M0LTE0ZGYwZTg1YjkwOSIsImVtYWlsIjoibWFudWVsQGFkbWluLmNvbSIsImlhdCI6MTcxODgyMTg2NCwiZXhwIjoxNzE4ODI1NDY0fQ.TxWrzoaox7guM5l41g9L6Py0r0dUdgsGldcX64y9qSc'); // State to store authentication token.
  const [id, setId] = useState<string>('78dd23f4-1c8a-4164-b3c4-14df0e85b909'); // State to store user ID.
  const router = useRouter();
  
  /**
   * Redirects to the homepage if not logged in.
   */
  useEffect(() => {
    if(!isLogged || !token || !id){
      router.push('/');
    } else {
      // Set a timer to log out the user after 1 hour of inactivity
      const timer = setTimeout(() => {
        setIsLogged(false);
        setToken('');
        setId('');
        router.push('/');
      }, 60 * 60 * 1000); // 1 hour

      // Cleanup function to clear the timer if the component unmounts or the token changes
      return () => clearTimeout(timer);
    }
  }, [isLogged, token, id, router])

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}
