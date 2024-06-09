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
  const [isLogged, setIsLogged] = useState(false); // State to track login status.
  const [token, setToken] = useState<string>(''); // State to store authentication token.
  const [id, setId] = useState<string>(''); // State to store user ID.
  const router = useRouter();

  /**
   * Redirects to the homepage if not logged in.
   */
  useEffect(() => {
    if(!isLogged && !token && !id){
      router.push('/');
    }
  }, [isLogged, token, id, router]);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}
