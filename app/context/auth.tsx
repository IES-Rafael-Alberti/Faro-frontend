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
  const [isLogged, setIsLogged] = useState(false)
  const [token, setToken] = useState<string>('')
  const [id, setId] = useState<string>('')
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
