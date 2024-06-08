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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA2ZTg4OGJlLTViZTEtNDUxNS1iMGJkLTZhZTIwMzc2OTIyNSIsImVtYWlsIjoicGFibG9AZ21haWwuY29tIiwiaWF0IjoxNzE3ODU5MjMxLCJleHAiOjE3MTc4NjI4MzF9.lmHHTeW0m2H_XRJIuiaBqGuaX8cni5UR1KHK9Qo3eKs')
  const [id, setId] = useState<string>('06e888be-5be1-4515-b0bd-6ae203769225')

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}
