'use client'
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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2NmRiOTQ5LTkyZTAtNDZkNi04NmJiLTQzNjM4ZWIxYWNhMiIsImVtYWlsIjoianVhbnNoejVnNDRsMjQzZXo1NTExMUBnbWFpbC5jb20iLCJpYXQiOjE3MTc4NDM3MTgsImV4cCI6MTcxNzg0NzMxOH0.LioxQXprp4HegQdrVMW7M6hiFPe9Hrh-RnzvmmngsK8')
  const [id, setId] = useState<string>('166db949-92e0-46d6-86bb-43638eb1aca2')

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {children}
    </AuthContext.Provider>
  )
}
