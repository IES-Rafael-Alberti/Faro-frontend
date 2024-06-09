'use client'
import Navbar from '@/components/navbar/navbar';
import React, { createContext, useState } from 'react'

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  setIsLogged: () => {},
  token: '',
  setToken: () => {},
  id: '',
  setId: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(true)
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1MDdlNTUzLWI2NjItNGExMS1hNTVlLTMxNzExMzA0MGM4YSIsImVtYWlsIjoianVhbnNoejVnNjQ0bDI0M2V6NTUxMTFAZ21haWwuY29tIiwiaWF0IjoxNzE3OTUxNDg2LCJleHAiOjE3MTc5NTUwODZ9.5xXa8iXkrfH9gn2Ahe6fpl4oML1fbuwNBoE6SNABB58')
  const [id, setId] = useState<string>('d507e553-b662-4a11-a55e-317113040c8a')


  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}
