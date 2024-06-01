"use client";
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
  const [isLogged, setIsLogged] = useState(false)
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDU3MGI4LTk0MjctNDExYS1hMDJhLTdhY2IwYTkyMjU2ZSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzE3MjY1ODYzLCJleHAiOjE3MTcyNjk0NjN9.YK9LbbXoRZJw0HkRhV-ZvXCKpfTBMnYxp1Y2kJQ_yy8')
  const [id, setId] = useState<string>('670570b8-9427-411a-a02a-7acb0a92256e')

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {children}
    </AuthContext.Provider>
  )
}