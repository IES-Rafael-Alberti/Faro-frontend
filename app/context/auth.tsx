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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1YjVlY2YzLWJmM2YtNGI3Mi05YWNhLWMzOTMxZTNhZDA0YiIsImVtYWlsIjoianVhbnNoejVnNTQ0bDI0M2V6NTUxMTFAZ21haWwuY29tIiwiaWF0IjoxNzE3OTEyMTIzLCJleHAiOjE3MTc5MTU3MjN9.I-QEUbTvR6YA-b4cuyB7QTdsPt_Jh9Fui6chCHLCCXE')
  const [id, setId] = useState<string>('25b5ecf3-bf3f-4b72-9aca-c3931e3ad04b')


  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}
