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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA2ZTg4OGJlLTViZTEtNDUxNS1iMGJkLTZhZTIwMzc2OTIyNSIsImVtYWlsIjoicGFibG9AZ21haWwuY29tIiwiaWF0IjoxNzE3OTMzMzc1LCJleHAiOjE3MTc5MzY5NzV9.tK62irTKqhWv_u7b_H4r_Gr5PxCjTqizEb4eDkmkPdE')
  const [id, setId] = useState<string>('06e888be-5be1-4515-b0bd-6ae203769225')
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
