// src/app/router/Router.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Router () {
  const router = useRouter()

  const navigate = (path:string) => {
    router.push(path)
  }

  return (
        <nav>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/register')}>RegisterPage</button>
        </nav>
  )
}
