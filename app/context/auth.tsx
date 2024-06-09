'use client'
import Navbar from '@/components/navbar/navbar';
import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxMmIwYjBkLTEzM2QtNDRiYS05ZTZkLThhNWU4NzM2ODc1MSIsImVtYWlsIjoic2FyYUBhZG1pbi5jb20iLCJpYXQiOjE3MTc5NjAxMDYsImV4cCI6MTcxNzk2MzcwNn0.NCY6FI1lmDrXHvsrEI5uaSJ5i9NTGV6ELqUQwwRFbu4')
  const [id, setId] = useState<string>('b12b0b0d-133d-44ba-9e6d-8a5e87368751')
  const router = useRouter();

  useEffect(() => {
    if(!isLogged && !token && !id){
      router.push('/')
    }
  }, [children])

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}
