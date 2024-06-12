"use client";

import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/app/context/auth';

const Private = () => {
    const { isLogged } = useContext(AuthContext)
    useLayoutEffect(() => {
      if(!isLogged){
        redirect("/")
      }
    }, [isLogged])
  return (
    <></>
  );
};


export default Private;