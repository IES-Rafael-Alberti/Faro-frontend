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
  const [token, setToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlYmQ3MGY0LWZiNmUtNDM1Zi1hNWZhLTRjY2QyODJhMDk1NCIsImVtYWlsIjoianVhbnNoemc0NGwyNDNlejU1MTExQGdtYWlsLmNvbSIsImlhdCI6MTcxNzc0NTMwNCwiZXhwIjoxNzE3NzQ4OTA0fQ.6QoqsZHQLd1kIajV-K9IzaxXSN42PCPXDoDOmYefRUs')
  const [id, setId] = useState<string>('6ebd70f4-fb6e-435f-a5fa-4ccd282a0954')

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, id, setId }}>
      {children}
    </AuthContext.Provider>
  )
}
