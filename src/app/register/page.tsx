'use client'

import React, { useState } from 'react'
import GenericButton from '@/components/shared/GenericButton'
import Router from '@/app/router/Router'
import GenericInput from '@/components/shared/GenericInput'
import Link from 'next/link'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    repeat_password: ''
  })

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleClick = (e:any) => {
    e.preventDefault()
    console.log('Form Data:', formData)
  }

  return (
    <>
      <Router />
      <h1>REGISTRESE EN FARO</h1>
      <form>
        <GenericInput
          label="Nombre"
          type="text"
          name="name"
          placeholder="Ingrese su nombre"
          value={formData.name}
          onChange={handleInputChange}
        />
        <GenericInput
          label="Apellido"
          type="text"
          name="lastname"
          placeholder="Ingrese su apellido"
          value={formData.lastname}
          onChange={handleInputChange}
        />
        <GenericInput
          label="Email"
          type="email"
          name="email"
          placeholder="Ingrese su correo"
          value={formData.email}
          onChange={handleInputChange}
        />
        <GenericInput
          label="Contraseña"
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
          value={formData.password}
          onChange={handleInputChange}
        />
        <GenericInput
          label="Confirmar contraseña"
          type="password"
          name="repeat_password"
          placeholder="Repita su contraseña"
          value={formData.repeat_password}
          onChange={handleInputChange}
        />
        <GenericButton
          label="Registrarse"
          onClick={handleClick}
        />
        <p>¿Ya esta registrado? <Link href={'/'}>Conectese</Link></p>
      </form>
    </>
  )
}

export default RegisterPage
