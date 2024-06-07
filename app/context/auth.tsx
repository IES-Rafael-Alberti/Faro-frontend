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
  const [isLogged, setIsLogged] = useState(false)
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNGIwNzU0LTNmNDMtNDIyYS04ODQ2LTc5NTA4ZDc2M2JiZSIsImVtYWlsIjoianVhbnNoejVnNDRsMjQzZXo1NTExMUBnbWFpbC5jb20iLCJpYXQiOjE3MTc3NTQxOTksImV4cCI6MTcxNzc1Nzc5OX0.pSEYhHbZZ6HFnDjhWFMCp8wVGKPXWuTbRXc7tb1crp0')
  const [id, setId] = useState<string>('5a4b0754-3f43-422a-8846-79508d763bbe')

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {children}
    </AuthContext.Provider>
  )
}
