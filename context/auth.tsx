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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTdiNWE4LTVkMjUtNGI1NC05MzlkLWVjOTM5ZTYzM2Q5ZiIsImVtYWlsIjoianVhbmpvQGFkbWluLmNvbSIsImlhdCI6MTcxNzc4MDAyNCwiZXhwIjoxNzE3NzgzNjI0fQ.tT1H-wxZC4yNrHi4sn9DWxXaG9dFZfkLnpgrsubSKkw')
  const [id, setId] = useState<string>('68a7b5a8-5d25-4b54-939d-ec939e633d9f')
  
  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}
