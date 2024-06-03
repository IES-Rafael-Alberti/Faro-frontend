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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkMGU4YTVjLTk1MjItNDY4Ni1iMmZjLWI3Y2IxNWQzM2QyOCIsImVtYWlsIjoicHJ1ZWJhQGFkbWluLmNvbSIsImlhdCI6MTcxNzQyOTgxMywiZXhwIjoxNzE3NDMzNDEzfQ.b0Ld0lzWhVSCiOd9DaEz17Mp1lcd6XyK7lZKJ5YZf3Y')
  const [id, setId] = useState<string>('6d0e8a5c-9522-4686-b2fc-b7cb15d33d28')

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {isLogged && <Navbar />}
      {children}
    </AuthContext.Provider>
  )
}