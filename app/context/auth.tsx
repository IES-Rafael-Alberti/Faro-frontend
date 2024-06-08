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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTJkM2UyLWM1OTQtNDFmOS1hOTE2LTY2NDk4ZTljNzNjZSIsImVtYWlsIjoicGFibG9AYWRtaW4uY29tIiwiaWF0IjoxNzE3ODM3NjM2LCJleHAiOjE3MTc4NDEyMzZ9.hFsOkrqDKmq6QEmqkT4Pnh-JihtLvCJ5wT0vqILnPHU')
  const [id, setId] = useState<string>('5ba2d3e2-c594-41f9-a916-66498e9c73ce')

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}
