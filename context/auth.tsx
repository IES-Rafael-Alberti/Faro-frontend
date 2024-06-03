"use client";
import Navbar from '@/components/navbar/navbar';
import React, { createContext, useState, useEffect } from 'react'

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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJlNGQ0M2U3LTViMjUtNDcxZi1hYWVjLThlZjNmNjg3ODRmMiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzE3NDM4NDY2LCJleHAiOjE3MTc0NDIwNjZ9.GgXP8DaOi_QyxLdydZ1DXB6wPsBFOF198juiyM-xCcM')
  const [id, setId] = useState<string>('2e4d43e7-5b25-471f-aaec-8ef3f68784f2')

  console.log('isLogged:', isLogged, 'token:', token, 'id:', id)

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}