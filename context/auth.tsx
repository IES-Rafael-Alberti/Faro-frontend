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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxODg0YmViLTFhZGUtNDVjNC04N2ViLThhNmFmZTU0Yjg5MyIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzE3Njk1MzU4LCJleHAiOjE3MTc2OTg5NTh9.xD3ujJQlz_FAdi9D425NGNDunoiDO7EBSgIO6YDSs04')
  const [id, setId] = useState<string>('91884beb-1ade-45c4-87eb-8a6afe54b893')
  
  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}