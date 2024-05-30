'use client'

import React from 'react'
import { AuthProvider } from './context/auth'
import './globals.css'

export const AuthContext = React.createContext(null)

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
