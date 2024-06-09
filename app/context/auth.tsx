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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyY2RhYzk2LWY3ODYtNGNjOC1hZWE5LTBiMzRmNzA5YWU3MCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzE3OTY2NzMyLCJleHAiOjE3MTc5NzAzMzJ9.sN6FVajKo40UImDQm04q5tYQLvmKH7AAG6iQkd1-g3Q')
  const [id, setId] = useState<string>('b2cdac96-f786-4cc8-aea9-0b34f709ae70')
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
