"use client"

import { useRouter } from 'next/router';
import { useEffect, useContext, ReactNode } from 'react';
import { AuthContext } from '@/app/context/auth';

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    if (!isLogged) {
      router.push('/public/login');
    }
  }, [isLogged, router]);

  if (!isLogged) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateLayout;